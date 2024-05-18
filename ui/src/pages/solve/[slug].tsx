import { PublicKey } from "o1js";

import { useRouter } from "next/router";
import { useEffect } from "react";

import { SunshineContextType, CastContext } from "../../components/AppContext";

import {
  InformO1JSCompilation,
  InformConnectWallet,
  InformAddressCorrect,
  RenderAnswer,
  RenderSolution,
  InformTXBuilding,
  InformTXHash,
} from "../../components/Info";

import {
  ComponentAnswerReset,
  ComponentAnswerEditor,
  ComponentAnswerAdd,
} from "../../components/editing";

import {
  ComponentLoadContract,
  ComponentSolve,
} from "../../components/interaction";

export default function Solve() {
  const context: SunshineContextType = CastContext();
  const router = useRouter();

  useEffect(() => {
    let slug: string | undefined;

    if (typeof router.query.slug === "string") {
      slug = router.query.slug;
    } else if (Array.isArray(router.query.slug)) {
      slug = router.query.slug[0]; // or handle array case as needed
    }

    if (slug) {
      try {
        const zkappPublicKey = PublicKey.fromBase58(slug);
        context.setState({
          ...context.state,
          address_correct: true,
          zkappPublicKeyBase58: zkappPublicKey.toBase58(),
        });
      } catch (e) {
        console.log(e);
        context.setState({ ...context.state, address_correct: false });
      }
    }
  }, [router.query.slug]);

  return (
    <article className="container gap-8 prose">
      <h1>Solve an existing puzzle</h1>
      <p>Contract address: {router.query.slug}</p>
      <InformAddressCorrect />
      <InformO1JSCompilation />
      <InformConnectWallet />
      <RenderAnswer />
      <ComponentAnswerEditor />
      <ComponentAnswerReset />
      <ComponentAnswerAdd />
      <RenderSolution />
      <ComponentLoadContract />
      <InformTXBuilding />
      <InformTXHash />
      <ComponentSolve />
    </article>
  );
}
