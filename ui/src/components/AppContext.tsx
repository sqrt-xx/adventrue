import { createContext, useContext } from "react";

import ZkappWorkerClient from "../pages/zkAppWorkerClient";

/* connection state
   0 load o1js
   1 loading o1js (pulsing)
   2 compile contract
   3 contract compiling (pulsing)
   4 compiled (disabled)

   wallet state
   0 connect
   1 connecting (pulsing)
   2 connected
*/
export type SunshineContextStateType = {
  zkappWorkerClient: ZkappWorkerClient | null;
  zkappPublicKeyBase58: string;
  zkappPrivateKeyBase58: string;
  solution: string[];
  answer: string;
  prize: number;
  runLoadO1js: Function;
  runCompile: Function;
  connectWallet: Function;
  txstage: string;
  connectedAddress: string;
}

export type SunshineContextType = {
  state: SunshineContextStateType;
  setState: Function;
  compilationButtonState: number;
  setCompilationButtonState: Function;
  connectionButtonState: number;
  setConnectionButtonState: Function;
}

export type ContractStateType = {
  commitment: string,
  prize: number
}

export const AppContext = createContext<SunshineContextType | null>(null);

export function CastContext(): SunshineContextType {
  const context = useContext(AppContext);
  if (context === null) {
    throw Error("Context is not defined");
  }
  return context;
}

export function castZkAppWorkerClient(
  context: SunshineContextType,
): ZkappWorkerClient {
  if (context.state.zkappWorkerClient === null) {
    throw Error(
      "context.state.zkappWorkerClient is not defined, first load snarkyjs library",
    );
  }
  return context.state.zkappWorkerClient;
}
