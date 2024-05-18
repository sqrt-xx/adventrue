import {
  Mina,
  PublicKey,
  PrivateKey,
  Field,
  fetchAccount,
  UInt64,
  AccountUpdate,
} from "o1js";

type Transaction = Awaited<ReturnType<typeof Mina.transaction>>;

// import type { Quest } from "../../../contracts/src/Quest";
// import type { Solution } from "../../../contracts/src/Solution";

import { Quest, Solution } from "sunshine-contracts";

const state = {
  Quest: null as null | typeof Quest,
  Solution: null as null | typeof Solution,
  zkapp: null as null | Quest,
  solution: null as null | Solution,
  transaction: null as null | Transaction,
};

state.Quest = Quest;
state.Solution = Solution;

const functions = {
  setActiveInstanceToNetwork: async (args: { endpoint: string }) => {
    const Network = Mina.Network(args.endpoint);
    Mina.setActiveInstance(Network);
  },
    loadContract: async (args: {}) => {
        /*
    const { Quest } = await import("../../../contracts/build/src/Quest.js");
    if (Quest === null) {
      throw Error("Quest type is null");
    }

    state.Quest = Quest;
    const { Solution } = await import(
      "../../../contracts/build/src/Solution.js"
    );
    if (Solution === null) {
      throw Error("Solution type is null");
    }
    state.Solution = Solution;
    */
  },
    compileContract: async (args: {}) => {
        console.log('worker compiling');
        await state.Quest!.compile();
        console.log('worker compiled');
  },
  fetchAccount: async (args: { publicKey58: string }) => {
    const pk = PublicKey.fromBase58(args.publicKey58);
    return await fetchAccount({ publicKey: pk });
  },
  initZkappInstance: async (args: { publicKey58: string }) => {
    const publicKey: PublicKey = PublicKey.fromBase58(args.publicKey58);
    state.zkapp = new state.Quest!(publicKey);
  },
  getContractState: async (args: {}) => {
    const commitment: Field = await state.zkapp!.commitment.get();
    return JSON.stringify({
      commitment: commitment.toString(),
      prize: state.zkapp!.account.balance.get().toBigInt(),
    });
  },
  createDeployTransaction: async (args: {
    zkAppPrivateKey58: string;
    feePayerAddress58: string;
    prize: number;
  }) => {
    if (state.solution === null) {
      throw Error("state.solution is null");
    }
    const zkAppPrivateKey: PrivateKey = PrivateKey.fromBase58(
      args.zkAppPrivateKey58
    );
    const zkAppPublicKey: PublicKey = zkAppPrivateKey.toPublicKey();
    const feePayer: PublicKey = PublicKey.fromBase58(args.feePayerAddress58);
    let transactionFee = 100_000_000;
    const _commitment: Field = state.solution.commitment();
    const transaction = await Mina.transaction(
      { sender: feePayer, fee: transactionFee },
      async () => {
        AccountUpdate.fundNewAccount(feePayer);
        await state.zkapp!.deploy();
          await state.zkapp!.initialize(_commitment);
        const account_update = AccountUpdate.createSigned(feePayer);
        account_update.send({
          to: zkAppPublicKey,
          amount: UInt64.from(args.prize),
        });
      }
    );
    transaction.sign([zkAppPrivateKey]);
    state.transaction = transaction;
  },
  proveTransaction: async (args: {}) => {
    await state.transaction!.prove();
  },
  getTransactionJSON: async (args: {}) => {
    return state.transaction!.toJSON();
  },
  setSolution: async (args: {
    contractPublicKey58: string;
    answers: string[];
  }) => {
    const zkAppPublicKey: PublicKey = PublicKey.fromBase58(
      args.contractPublicKey58
    );
    state.solution = new state.Solution!(zkAppPublicKey, args.answers);
  },
  fundPrize: async (args: {
    actorPublicKey58: string;
    contractPublicKey58: string;
    amount: number;
  }) => {
    const feePayer: PublicKey = PublicKey.fromBase58(args.actorPublicKey58);
    const contractPublicKey = PublicKey.fromBase58(args.contractPublicKey58);
    let transactionFee = 100_000_000;
    const transaction = await Mina.transaction(
      { sender: feePayer, fee: transactionFee },
      async () => {
        const account_update = AccountUpdate.createSigned(feePayer);
        account_update.send({
          to: contractPublicKey,
          amount: UInt64.from(args.amount),
        });
      }
    );
    state.transaction = transaction;
  },
  claimPrize: async (args: { actorPublicKey58: string }) => {
    if (state.solution === null) {
      throw Error("Before claiming prize you must submit a solution");
    }
    const feePayer: PublicKey = PublicKey.fromBase58(args.actorPublicKey58);
    let transactionFee = 100_000_000;
    const transaction = await Mina.transaction(
      { sender: feePayer, fee: transactionFee },
      async () => {
        if (state.solution === null) {
          throw Error("Before claiming prize you must submit a solution");
        }
        state.zkapp!.solve(state.solution.solution(), feePayer);
      }
    );
    state.transaction = transaction;
  },
};

export type WorkerFunctions = keyof typeof functions;

export type ZkappWorkerRequest = {
  id: number;
  fn: WorkerFunctions;
  args: any;
};

export type ZkappWorkerReponse = {
  id: number;
  data: any;
  error: boolean;
  errorMessage: string;
};

if (process.browser) {
  addEventListener(
    "message",
    async (event: MessageEvent<ZkappWorkerRequest>) => {
      try {
        const returnData = await functions[event.data.fn](event.data.args);

        const message: ZkappWorkerReponse = {
          id: event.data.id,
          data: returnData,
          error: false,
          errorMessage: "",
        };
        postMessage(message);
      } catch (error: unknown) {
        // If an error occurs, create a response with an error flag and message
        const message: string = (error as Error).message;
        const errorMessage: ZkappWorkerReponse = {
          id: event.data.id,
          data: null,
          error: true,
          errorMessage: message,
        };
        postMessage(errorMessage);
      }
    }
  );
}
