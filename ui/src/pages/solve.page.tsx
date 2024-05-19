import React from "react";

import { useRouter, NextRouter } from "next/router";

import { ComponentPublicKey } from "../components/editing";

const EntrySecretKey = () => {
  return ComponentPublicKey(
    "zkApp public key",
    "base58pk",
    "Required for interaction",
    ""
  );
};

async function EditorFormSubmission(
  event: React.SyntheticEvent,
  router: NextRouter
) {
  event.preventDefault();
  const contract_address = (event.target as any).base58pk.value;
  router.push("/solve/" + contract_address + "/");
}

export default function Solve() {
  const router = useRouter();
  console.log(typeof router);
  return (
    <article className="container gap-8 prose">
      <h1>Solve an existing Adventrue puzzle</h1>
      <p>
        Every puzzle is a MINA smart contract which can be identified
        by a MINA public key.
      </p>
      <form
        onSubmit={async (event) => {
          await EditorFormSubmission(event, router);
        }}
      >
        <EntrySecretKey />
        <button type="submit" className="btn btn-active">
          Submit
        </button>
      </form>
    </article>
  );
}
