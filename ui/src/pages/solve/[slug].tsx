import {
  PublicKey
} from "o1js";

import { useRouter } from 'next/router';
import { useEffect } from "react";

import {
  SunshineContextType,
  CastContext
} from "../../components/AppContext";

import {
  InformO1JSCompilation,
  InformConnectWallet,
  InformAddressCorrect,
  RenderAnswer,
  RenderSolution
} from "../../components/Info";

import {
  ComponentAnswerReset,
  ComponentAnswerEditor,
  ComponentAnswerAdd
} from "../../components/editing";

import {
  ComponentLoadContract
} from "../../components/interaction";

export default function Solve() {
  const context: SunshineContextType = CastContext();
  const router = useRouter()

  useEffect(() => {
    try {
      const zkappPublicKey = PublicKey.fromBase58(router.query.slug);
      context.setState({
        ...context.state,
        address_correct: true,
        zkappPublicKeyBase58: zkappPublicKey.toBase58(),
      });
    } catch (e) {
      console.log(e);
      context.setState({ ...context.state, address_correct: false });
    }
  }, [router.query.slug]);

  /*
  try {
    const zkappPublicKey: PublicKey = PublicKey.fromBase58(
      context.state.zkappPublicKeyBase58);
    context.setState({
      ...context.state,
      address_correct: true,
      zkappPublicKeyBase58: zkappPublicKey.toBase58()
    });
  } catch (e: any) {
    console.log(e);
    context.setState({...context.state, address_correct: false});
  }
  */
  return (
    <article className="container gap-8 prose">
      <h1>Solve an existing puzzle</h1>
      <p>Contract address: {router.query.slug}</p>
      <InformAddressCorrect/>
        <InformO1JSCompilation/>
        <InformConnectWallet/>
        <RenderAnswer/>
        <ComponentAnswerEditor/>
        <ComponentAnswerReset/>
        <ComponentAnswerAdd/>
        <RenderSolution/>
        <ComponentLoadContract/>
    </article>);
}
