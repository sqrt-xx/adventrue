import QRCode from "react-qr-code";

import { SunshineContextType, CastContext } from "../components/AppContext";

export const ContractQRCode = () => {
  const context: SunshineContextType = CastContext();
  if (context.state.zkappPublicKeyBase58 !== "") {
    const url: string =
      "https://adventrue.org/solve/" + context.state.zkappPublicKeyBase58;
    return <QRCode value={url} />;
  }
};

export const InformO1JSCompilation = () => {
  const context: SunshineContextType = CastContext();
  if (context.compilationButtonState === 0) {
    return (
      <p>Your contract is not yet compiled and o1js library is not loaded.</p>
    );
  } else if (context.compilationButtonState === 1) {
    return <p>o1js is loading now...</p>;
  } else if (context.compilationButtonState === 2) {
    return <p>o1js library is loaded but contract is not compiled</p>;
  } else if (context.compilationButtonState === 3) {
    return (
      <p>
        o1js library is loaded but the contract is still compiling, hold on a
        bit...
      </p>
    );
  } else {
    return <p>o1js library is loaded and contract is compiled.</p>;
  }
};

export const InformConnectWallet = () => {
  const context: SunshineContextType = CastContext();
  if (context.connectionButtonState === 0) {
    return <p>Your wallet is not connected.</p>;
  } else if (context.connectionButtonState === 1) {
    return <p>Your wallet is still connecting...</p>;
  } else {
    return (
      <p>
        Wallet is connected. You are <i>{context.state.connectedAddress}</i>
      </p>
    );
  }
};

export const InformTXBuilding = () => {
  const context: SunshineContextType = CastContext();
  if (!context.state.txstage) {
    return <p>Currently not building any transaction</p>;
  } else {
    return (
      <p>
        <i>{context.state.txstage}</i>
      </p>
    );
  }
};

export const InformTXHash = () => {
  const context: SunshineContextType = CastContext();
  if (!context.state.txhash) {
    return <p>Currently no transaction was submitted yet...</p>;
  } else {
    let url = "https://minascan.io/devnet/tx/" + context.state.txhash;
    return (
      <div>
        Your last transaction is{" "}
        <a href={url} target="_blank" rel="noreferrer">
          {context.state.txhash}
        </a>
      </div>
    );
  }
};

export const InformAddressCorrect = () => {
  const context: SunshineContextType = CastContext();
  if (context.state.address_correct) {
    return <p>MINA contract address is valid.</p>;
  }
  return <p>MINA contract address is not valid.</p>;
};

export const RenderAnswer = () => {
  const context: SunshineContextType = CastContext();
  console.log("solution is", context.state.solution);
  if (context.state.solution.length === 0) {
    return <p>Solution empty. Add some answers...</p>;
  }
  return (
    <ol>
      {context.state.solution.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ol>
  );
};

export const RenderSK = () => {
  const context: SunshineContextType = CastContext();
  if (!context.state.zkappPrivateKeyBase58) {
    return <p>Private and public keypair has not been generated yet.</p>;
  }
  return (
    <p>
      The contract PrivateKey is going to be{" "}
      <i>{context.state.zkappPrivateKeyBase58}</i> and PublicKey (address) is
      going to be <i>{context.state.zkappPublicKeyBase58}</i>
    </p>
  );
};

export const RenderPrize = () => {
  const context: SunshineContextType = CastContext();
  let prize: number = context.state.prize / 1000000000;
  if (!context.state.commitment) {
    return <p>Load contract to check the funded prize.</p>;
  }
  if (context.state.prize === 0) {
    return (
      <p>
        Unfortunately the prize is 0 MINA, someone already won it or it has not
        been funded yet.
      </p>
    );
  }
  return <p>The funded prize for this Adventrue is {prize} MINA.</p>;
};

export const RenderSolution = () => {
  const context: SunshineContextType = CastContext();
  console.log("render solution: commitment", context.state.commitment);
  console.log("render solution: prize", context.state.prize);
  if (!context.state.commitment || context.state.solution.length === 0) {
    return <p>Load contract first and submit solution</p>;
  }
  if (context.state.correct) {
    return <p>Congrats! Your solution is correct! You solved the puzzle!</p>;
  }
  return <p>The solution is not correct.</p>;
};
