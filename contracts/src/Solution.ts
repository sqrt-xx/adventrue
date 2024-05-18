import { Field, PublicKey, Poseidon, CircuitString } from 'o1js';

export class Solution {
  public contract_address: PublicKey;
  public answers: string[];
  constructor(contract_address: PublicKey, answers: string[]) {
    this.contract_address = contract_address;
    this.answers = answers;
  }

  solution(): Field {
    let preimage: Field[] = this.contract_address.toFields();
    for (let answer of this.answers) {
      // console.log(answer);
      preimage.push(CircuitString.fromString(answer).hash());
    }
    return Poseidon.hash(preimage);
  }

  commitment(): Field {
    return Poseidon.hash([this.solution()]);
  }
}
