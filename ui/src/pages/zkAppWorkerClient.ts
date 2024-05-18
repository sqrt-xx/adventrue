import { fetchAccount, PublicKey, PrivateKey, Field } from "o1js";

import type {
  ZkappWorkerRequest,
  ZkappWorkerReponse,
  WorkerFunctions,
} from "./zkAppWorker";

export default class ZkappWorkerClient {
  setActiveInstanceToNetwork(endpoint: string) {
    return this._call("setActiveInstanceToNetwork", {
      endpoint: endpoint,
    });
  }

  loadContract() {
    return this._call("loadContract", {});
  }

  compileContract() {
    return this._call("compileContract", {});
  }

  async fetchAccount(publicKey: PublicKey): ReturnType<typeof fetchAccount> {
    return await this._callFetchAccount("fetchAccount", {
      publicKey58: publicKey.toBase58(),
    });
  }

  initZkappInstance(publicKey: PublicKey) {
    return this._call("initZkappInstance", {
      publicKey58: publicKey.toBase58(),
    });
  }

  async getContractState() {
    return await this._call("getContractState", {});
  }

  async createDeployTransaction(
    zkAppPrivateKey: PrivateKey,
    feePayerAddress: PublicKey,
    prize: number
  ) {
    return await this._call("createDeployTransaction", {
      zkAppPrivateKey58: zkAppPrivateKey.toBase58(),
      feePayerAddress58: feePayerAddress.toBase58(),
      prize: prize,
    });
  }

  async proveTransaction() {
    return await this._call("proveTransaction", {});
  }

  async getTransactionJSON() {
    const result = await this._call("getTransactionJSON", {});
    return result;
  }

  async setSolution(contractPublicKey58: PublicKey, answers: string[]) {
    const result = await this._call("setSolution", {
      contractPublicKey58: contractPublicKey58.toBase58(),
      answers: answers,
    });
    return result;
  }

  async getCommitmentFromSolution(
    contractPublicKey58: PublicKey,
    answers: string[]
  ) {
    const result = await this._call("getCommitmentFromSolution", {
      contractPublicKey58: contractPublicKey58.toBase58(),
      answers: answers,
    });
    return result;
  }

  async fundPrize(
    actorPublicKey: PublicKey,
    contractPublicKey: PublicKey,
    amount: number
  ) {
    const result = await this._call("fundPrize", {
      actorPublicKey58: actorPublicKey.toBase58(),
      contractPublicKey58: contractPublicKey.toBase58(),
      amount: amount,
    });
    return result;
  }

  async claimPrize(actorPublicKey: PublicKey) {
    const result = await this._call("claimPrize", {
      actorPublicKey58: actorPublicKey.toBase58(),
    });
    return result;
  }

  worker: Worker;

  promises: {
    [id: number]: { resolve: (res: any) => void; reject: (err: any) => void };
  };

  nextId: number;

  constructor() {
    this.worker = new Worker(new URL("./zkappWorker.ts", import.meta.url));
    this.promises = {};
    this.nextId = 0;

    this.worker.onmessage = (event: MessageEvent<ZkappWorkerReponse>) => {
      const response = event.data;
      if (response.error) {
        this.promises[response.id].reject(new Error(response.errorMessage));
      } else {
        this.promises[response.id].resolve(response.data);
      }
      delete this.promises[response.id];
    };
  }

  _call(fn: WorkerFunctions, args: any): Promise<string> {
    return new Promise((resolve, reject) => {
      this.promises[this.nextId] = { resolve, reject };

      const message: ZkappWorkerRequest = {
        id: this.nextId,
        fn,
        args,
      };

      this.worker.postMessage(message);

      this.nextId++;
    });
  }

  _callFetchAccount(
    fn: WorkerFunctions,
    args: any
  ): Promise<ReturnType<typeof fetchAccount>> {
    return new Promise((resolve, reject) => {
      this.promises[this.nextId] = { resolve, reject };

      const message: ZkappWorkerRequest = {
        id: this.nextId,
        fn,
        args,
      };

      this.worker.postMessage(message);

      this.nextId++;
    });
  }
}
