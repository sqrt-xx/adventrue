import {
  Field,
  Mina,
  PrivateKey,
  PublicKey,
  AccountUpdate,
  UInt64,
  Poseidon,
} from 'o1js';

import { Quest } from './Quest';
import { Solution } from './Solution';

let proofsEnabled = false;

describe('Quest', () => {
  let deployerAccount: Mina.TestPublicKey,
    deployerKey: PrivateKey,
    senderAccount: Mina.TestPublicKey,
    senderKey: PrivateKey,
    aliceAccount: Mina.TestPublicKey,
    bobAccount: Mina.TestPublicKey,
    zkAppAddress: PublicKey,
    zkAppPrivateKey: PrivateKey,
    zkApp: Quest;

  beforeAll(async () => {
    if (proofsEnabled) await Quest.compile();
  });

  beforeEach(async () => {
    const Local = await Mina.LocalBlockchain({ proofsEnabled });
    Mina.setActiveInstance(Local);
    [deployerAccount, senderAccount, aliceAccount, bobAccount] =
      Local.testAccounts;
    deployerKey = deployerAccount.key;
    senderKey = senderAccount.key;

    zkAppPrivateKey = PrivateKey.random();
    zkAppAddress = zkAppPrivateKey.toPublicKey();
    zkApp = new Quest(zkAppAddress);
  });

  function assertBalance(account: PublicKey, value: number) {
    Mina.getBalance(account).assertEquals(UInt64.from(value));
  }

  async function localDeploy(commitment: Field) {
    const txn = await Mina.transaction(deployerAccount, async () => {
      AccountUpdate.fundNewAccount(deployerAccount);
      await zkApp.deploy();
      await zkApp.initialize(commitment);
    });
    await txn.prove();
    await txn.sign([deployerKey, zkAppPrivateKey]).send();
  }

  async function transfer(
    sender: Mina.TestPublicKey,
    receiver: PublicKey,
    amount: number
  ) {
    const txn = await Mina.transaction(sender, async () => {
      const account_update = AccountUpdate.createSigned(
        sender.key.toPublicKey()
      );
      account_update.send({
        to: receiver,
        amount: UInt64.from(amount),
      });
    });
    await txn.prove();
    await txn.sign([sender.key]).send();
  }

  async function localDeployPrize(commitment: Field, amount: number) {
    const txn = await Mina.transaction(deployerAccount, async () => {
      AccountUpdate.fundNewAccount(deployerAccount);
      await zkApp.deploy();
      await zkApp.initialize(commitment);
      const account_update = AccountUpdate.createSigned(
        deployerAccount.key.toPublicKey()
      );
      account_update.send({
        to: zkAppAddress,
        amount: UInt64.from(amount),
      });
    });
    await txn.prove();
    await txn.sign([deployerKey, zkAppPrivateKey]).send();
  }

  async function claimPrize(winner: Mina.TestPublicKey, solution: Field) {
    const txn = await Mina.transaction(winner, async () => {
      await zkApp.solve(solution, winner.key.toPublicKey());
    });
    await txn.prove();
    await txn.sign([winner.key]).send();
  }

  it('generates and deploys the `Quest` smart contract', async () => {
    const solution: Field = Field.random();
    const commitment: Field = Poseidon.hash([solution]);
    await localDeploy(commitment);

    // check the initial balances
    assertBalance(aliceAccount.key.toPublicKey(), 1000000000000);
    assertBalance(bobAccount.key.toPublicKey(), 1000000000000);
    assertBalance(zkAppAddress, 0);

    // transfer prize to the contract
    await transfer(aliceAccount, zkAppAddress, 10000);

    // check balances after prize transfer
    assertBalance(aliceAccount.key.toPublicKey(), 999999990000);
    assertBalance(bobAccount.key.toPublicKey(), 1000000000000);
    assertBalance(zkAppAddress, 10000);

    // attempt to withdraw with wrong solution
    await expect(async () => {
      await claimPrize(bobAccount, Field.random());
    }).rejects.toThrow();

    // balances unaffected
    assertBalance(aliceAccount.key.toPublicKey(), 999999990000);
    assertBalance(bobAccount.key.toPublicKey(), 1000000000000);
    assertBalance(zkAppAddress, 10000);

    // now with a correct solution
    await claimPrize(bobAccount, solution);

    // balances should be affected, Bob should have the prize
    assertBalance(aliceAccount.key.toPublicKey(), 999999990000);
    assertBalance(bobAccount.key.toPublicKey(), 1000000010000);
    assertBalance(zkAppAddress, 0);
  });

  it('tests the `Quest` smart contract with actual strings solution', async () => {
    const correct_solution: Solution = new Solution(zkAppAddress, [
      'chocolate',
      'pizza',
      'soda',
    ]);
    const incorrect_solution: Solution = new Solution(zkAppAddress, [
      'broccoli',
      'vitamins',
      'water',
    ]);

    await localDeploy(correct_solution.commitment());

    // check the initial balances
    assertBalance(aliceAccount.key.toPublicKey(), 1000000000000);
    assertBalance(bobAccount.key.toPublicKey(), 1000000000000);
    assertBalance(zkAppAddress, 0);

    // transfer prize to the contract
    await transfer(aliceAccount, zkAppAddress, 10000);

    // check balances after prize transfer
    assertBalance(aliceAccount.key.toPublicKey(), 999999990000);
    assertBalance(bobAccount.key.toPublicKey(), 1000000000000);
    assertBalance(zkAppAddress, 10000);

    await expect(async () => {
      await claimPrize(bobAccount, incorrect_solution.solution());
    }).rejects.toThrow();

    // balances unaffected
    assertBalance(aliceAccount.key.toPublicKey(), 999999990000);
    assertBalance(bobAccount.key.toPublicKey(), 1000000000000);
    assertBalance(zkAppAddress, 10000);

    // now with a correct solution
    await claimPrize(bobAccount, correct_solution.solution());

    // balances should be affected, Bob should have the prize
    assertBalance(aliceAccount.key.toPublicKey(), 999999990000);
    assertBalance(bobAccount.key.toPublicKey(), 1000000010000);
    assertBalance(zkAppAddress, 0);
  });

  it('tests the `Quest` smart contract with actual strings solution and prize funding at deployment', async () => {
    const correct_solution: Solution = new Solution(zkAppAddress, [
      'chocolate',
      'pizza',
      'soda',
    ]);
    const incorrect_solution: Solution = new Solution(zkAppAddress, [
      'broccoli',
      'vitamins',
      'water',
    ]);

    await localDeployPrize(correct_solution.commitment(), 10000);

    // check the initial balances
    assertBalance(aliceAccount.key.toPublicKey(), 1000000000000);
    assertBalance(bobAccount.key.toPublicKey(), 1000000000000);
    assertBalance(zkAppAddress, 10000);

    await expect(async () => {
      await claimPrize(bobAccount, incorrect_solution.solution());
    }).rejects.toThrow();

    // balances unaffected
    assertBalance(aliceAccount.key.toPublicKey(), 1000000000000);
    assertBalance(bobAccount.key.toPublicKey(), 1000000000000);
    assertBalance(zkAppAddress, 10000);

    // now with a correct solution
    await claimPrize(bobAccount, correct_solution.solution());

    // balances should be affected, Bob should have the prize
    assertBalance(aliceAccount.key.toPublicKey(), 1000000000000);
    assertBalance(bobAccount.key.toPublicKey(), 1000000010000);
    assertBalance(zkAppAddress, 0);
  });
});
