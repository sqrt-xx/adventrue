import {
  SunshineContextType,
  CastContext
} from "../components/AppContext";


export const InformO1JSCompilation = () => {
  const context: SunshineContextType = CastContext();
  if (context.compilationButtonState === 0) {
    return (
      <p>Your contract is not yet compiled and o1js library is not loaded.</p>
    );
  } else if (context.compilationButtonState === 1) {
    return (
      <p>o1js is loading now...</p>
    );
  } else if (context.compilationButtonState === 2) {
    return (
      <p>o1js library is loaded but contract is not compiled</p>
    );
  } else if (context.compilationButtonState === 3) {
    return (
      <p>o1js library is loaded but the contract is still compiling, hold on a bit...</p>
    );
  } else {
    return (
      <p>o1js library is loaded and contract is compiled.</p>
    );
  }
};

export const InformConnectWallet = () => {
  const context: SunshineContextType = CastContext();
  if (context.connectionButtonState === 0) {
    return (
      <p>Your wallet is not connected.</p>
    );
  } else if (context.connectionButtonState === 1) {
    return (
      <p>Your wallet is still connecting...</p>
    );
  } else {
    return (
      <p>Wallet is connected. You are <i>{context.state.connectedAddress}</i></p>
    );
  }
}

export const InformTXBuilding = () => {
  const context: SunshineContextType = CastContext();
  if (!context.state.txstage) {
    return (
      <p>Currently not building any transaction</p>
    );
  } else {
    return (
      <p><i>{context.state.txstage}</i></p>
    );
  }
}

export const InformTXHash = () => {
  const context: SunshineContextType = CastContext();
  if (!context.state.txhash) {
    return (
      <p>Currently no transaction was submitted yet...</p>
    );
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
}

export const RenderAnswer = () => {
  const context: SunshineContextType = CastContext();
  console.log("solution is", context.state.solution);
  if (context.state.solution.length === 0) {
    return (
      <p>Solution empty. Add some answers...</p>
    );
  }
  return (
    <ol>
      {context.state.solution.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ol>
  );
}

export const RenderSK = () => {
  const context: SunshineContextType = CastContext();
  if (!context.state.zkappPrivateKeyBase58) {
    return (
      <p>Private and public keypair has not been generated yet.</p>
    );
  }
  return (
    <p>The contract PrivateKey is going to be <i>{context.state.zkappPrivateKeyBase58}</i> and PublicKey (address) is going to be <i>{context.state.zkappPublicKeyBase58}</i></p>
  );
}
