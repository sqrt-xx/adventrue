import "@/styles/globals.css";
// import "../styles/globals.css";

import { createContext, useEffect, useState, useContext } from "react";
import type { AppProps } from "next/app";

import {
  SunshineContextStateType,
  SunshineContextType,
  CastContext,
  castZkAppWorkerClient,
  AppContext,
} from "../components/AppContext";

import Layout from "../components/Layout";

import ZkappWorkerClient from "./zkAppWorkerClient";

async function timeout(seconds: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, seconds * 1000);
  });
}

async function runLoadO1js(context: SunshineContextType) {
  // toast.error("failed to create deploy transaction!");
  // toast(<ExampleToast />, {hideProgressBar: true});
  // toast("failed", {className: "alert alert-error"})
  console.log("runLoadO1JS");
  // indicate it is compiling now
  await context.setCompilationButtonState(1);
  // await context.setConnectionError("");
  console.log("loading web worker");
  const zkappWorkerClient = new ZkappWorkerClient();
  await timeout(5);
  console.log("done loading web worker");
  await context.setState({
    ...context.state,
    zkappWorkerClient: zkappWorkerClient,
  });
  // const network_endpoint = "https://proxy.berkeley.minaexplorer.com/graphql";
  const network_endpoint = "https://proxy.devnet.minaexplorer.com/graphql";
  // console.log("setting active instance to " + nice_name);
  try {
    await zkappWorkerClient.setActiveInstanceToNetwork(network_endpoint);
  } catch (error) {
    // toastError("Failed to connect to " + nice_name);
    console.error(error);
    await context.setCompilationButtonState(0);
    // await context.setConnectionError("Failed to reach " + nice_name);
    return;
  }

  // network reachable, proceed
  console.log("berkeley loaded");
  console.log("loading contract");
  await zkappWorkerClient.loadContract();
  console.log("contract loaded");
  // await context.setBlockchainLength(length);
  // await context.setBlockFetchDate(new Date());
  await context.setCompilationButtonState(2);
  // await context.setConnectionError("");
  // toastSuccess("Successfully connected to " + nice_name);
}

async function runCompile(context: SunshineContextType) {
  const zkappWorkerClient: ZkappWorkerClient = castZkAppWorkerClient(context);
  console.log("runCompile");
  await context.setCompilationButtonState(3);
  try {
    console.log("compiling");
    console.time("contract-compilation");
    await zkappWorkerClient.compileContract();
    console.timeEnd("contract-compilation");
    console.log("compiled");
    await context.setCompilationButtonState(4);
    // toastSuccess("Successfully compiled the smart contract");
  } catch (e: any) {
    console.log(e);
    await context.setCompilationButtonState(2);
    // toastError("Failed to compile the smart contract");
  }
}

async function connectAURO(): Promise<string[]> {
  const mina = (window as any).mina;
  if (mina == null) {
    return [];
  }
  const publicKeyBase58: string[] = await mina.requestAccounts();
  console.log("auro connected");
  console.log(publicKeyBase58);
  return publicKeyBase58;
}

async function connectWallet(context: SunshineContextType) {
  console.log("connectWallet");
  await context.setConnectionButtonState(0);
  setTimeout(async () => {
    await context.setConnectionButtonState(1);
    try {
      // await zkappWorkerClient.setActiveInstanceToBerkeley();
      const publicKeyBase58: string[] = await connectAURO();
      /*
      context.setConnectedAddress(publicKeyBase58[0]);
      */

      await context.setState({
        ...context.state,
        connectedAddress: publicKeyBase58[0],
      });
      await context.setConnectionButtonState(2);
    } catch (e: any) {
      console.log(e);
      await context.setConnectionButtonState(0);
    }
  }, 2000);
}

export default function App({ Component, pageProps }: AppProps) {
  const initial_state: SunshineContextStateType = {
    zkappWorkerClient: null,
    zkappPublicKeyBase58: "",
    zkappPrivateKeyBase58: "",
    address_correct: false,
    solution: [],
    answer: "",
    commitment: "",
    correct: false,
    prize: 0,
    prize_float: 0.0,
    runLoadO1js: runLoadO1js,
    runCompile: runCompile,
    connectWallet: connectWallet,
    txstage: "",
    txhash: "",
    connectedAddress: "",
  };
  let [state, setState] = useState(initial_state);
  let [compilationButtonState, setCompilationButtonState] = useState(0);
  let [connectionButtonState, setConnectionButtonState] = useState(0);
  return (
    <AppContext.Provider
      value={{
        state,
        setState,
        compilationButtonState,
        setCompilationButtonState,
        connectionButtonState,
        setConnectionButtonState,
      }}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppContext.Provider>
  );
}
