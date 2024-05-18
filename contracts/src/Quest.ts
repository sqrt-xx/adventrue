import {
  Field,
  SmartContract,
  state,
  State,
  method,
  Poseidon,
  PublicKey,
} from 'o1js';

export class Quest extends SmartContract {
  @state(Field) commitment = State<Field>();

  @method async init() {
    super.init();
    this.commitment.set(Field(0));
  }

  @method async initialize(commitment: Field) {
    // ensure commitment is not yet set
    this.commitment.requireEquals(Field(0));

    // set the commitment
    this.commitment.set(commitment);
  }

  @method async solve(solution: Field, prize_receiver: PublicKey) {
    this.account.balance.requireEquals(this.account.balance.get());
    const currentState = this.commitment.getAndRequireEquals();

    // check if user knows the solution
    currentState.equals(Poseidon.hash([solution])).assertTrue();

    // proceed with the withdrawal
    this.send({ to: prize_receiver, amount: this.self.account.balance.get() });
  }
}
