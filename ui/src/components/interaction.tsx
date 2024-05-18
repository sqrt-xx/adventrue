import {
  PublicKey,
  PrivateKey
} from "o1js";

import {
  SunshineContextType,
  ContractStateType,
  CastContext,
  castZkAppWorkerClient,
} from "../components/AppContext";

import ZkappWorkerClient from "../pages/zkAppWorkerClient";


async function contractRefreshState(context: SunshineContextType) {
  const zkappWorkerClient: ZkappWorkerClient = castZkAppWorkerClient(context);

  // refresh the contract state
  const contract_state = await zkappWorkerClient.getContractState();
  const contract_state_parsed = JSON.parse(contract_state) as ContractStateType;
  console.log(contract_state_parsed);
  context.setState({
    ...context.state,
    prize: contract_state_parsed.prize
  });
}

export async function contractDeploy(context: SunshineContextType) {
  const zkappWorkerClient: ZkappWorkerClient = castZkAppWorkerClient(context);
  const transactionFee = 0.1;
  await context.setState({
    ...context.state,
    txstage: "Preparing..."
  });
  if (!context.state.connectedAddress) {
    throw Error("wallet not connected");
  }
  const connectedAddress58: string = context.state.connectedAddress;
  const connectedAddress: PublicKey = PublicKey.fromBase58(connectedAddress58);
  console.log("fetchAccount");
  await zkappWorkerClient.fetchAccount({ publicKey: connectedAddress });

  console.log("initZkappInstance");
  const zkappPublicKey: PublicKey = PublicKey.fromBase58(
    context.state.zkappPublicKeyBase58);
  await zkappWorkerClient.initZkappInstance(zkappPublicKey);
  console.log("createDeployTransaction");
  if (!context.state.zkappPrivateKeyBase58) {
    throw Error("Private key is not defined");
  }
  const zkappPrivateKey: PrivateKey = PrivateKey.fromBase58(
    context.state.zkappPrivateKeyBase58);

  await zkappWorkerClient.setSolution(zkappPublicKey, context.state.solution);
  await context.setState({
    ...context.state,
    txstage: "Building...",
  });
  try {
    await zkappWorkerClient.createDeployTransaction(
      zkappPrivateKey,
      connectedAddress,
      context.state.prize
    );
  } catch (e: any) {
    console.log("failed to create deploy transaction!");
    console.log(e);
    await context.setState({
      ...context.state,
      txstage: ""
    });
    return;
  }
  console.log("setState");
  await context.setState({
    ...context.state,
    txstage: "Proving...",
  });
  console.log("proveTransaction");
  try {
    await zkappWorkerClient.proveTransaction();
  } catch (e: any) {
    await context.setState({
      ...context.state,
      txstage: ""
    });
    return;
  }
  console.log("transaction proved");
  await context.setState({
    ...context.state,
    txstage: "Initiating...",
  });
  console.log("getTransactionJSON");
  const transactionJSON = await zkappWorkerClient.getTransactionJSON();
  console.log(transactionJSON);
  const { hash } = await (window as any).mina.sendTransaction({
    transaction: transactionJSON,
    feePayer: {
      memo: "",
    },
  });
  // TODO await context.setTxHash(hash);
  console.log("done");
  console.log(hash);
  // await context.setTxHash(hash);
  await context.setState({
    ...context.state,
    txstage: "",
    txhash: hash
  });
  // toastSuccess("Transaction sent!");
}

export const ComponentButtonDeploy = () => {
  const context: SunshineContextType = CastContext();
  if (context.compilationButtonState != 4) {
    return (
      <button className="btn btn-disabled">Deploy</button>
    );
  } else if (context.state.txstage !== "") {
    return (
      <button className="btn btn-disabled animate-pulse">Deploy</button>
    );
  } else {
    return (
      <button className="btn" onClick={async () => {
        console.log('add answer button clicked');
        await contractDeploy(context);
      }}>Deploy</button>
    );
  }
}
