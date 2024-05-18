import { useRouter } from 'next/router'

import {
  InformO1JSCompilation,
  InformConnectWallet,
  RenderAnswer
} from "../../components/Info";

import {
  ComponentAnswerReset,
  ComponentAnswerEditor,
  ComponentAnswerAdd
} from "../../components/editing";

export default function Solve() {
  const router = useRouter()
  return (
    <article className="container gap-8 prose">
      <h1>Solve an existing puzzle</h1>
      <p>Contract address: {router.query.slug}</p>
      <InformO1JSCompilation/>
      <InformConnectWallet/>
      <RenderAnswer/>
      <ComponentAnswerEditor/>
      <ComponentAnswerReset/>
      <ComponentAnswerAdd/>
    </article>);
}
