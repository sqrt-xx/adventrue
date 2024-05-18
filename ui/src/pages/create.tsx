import {
  SunshineContextType,
  CastContext
} from "../components/AppContext";

import {
  InformO1JSCompilation,
  InformConnectWallet,
  RenderAnswer,
  RenderSK,
  InformTXBuilding,
  InformTXHash
} from "../components/Info";

import {
  ComponentAnswerReset,
  ComponentAnswerEditor,
  ComponentAnswerAdd,
  ComponentGenerateSK
} from "../components/editing";

import {
  ComponentButtonDeploy
} from "../components/interaction";

export default function Create() {
  return (
    <article className="container gap-8 prose">
      <h1>Create a new puzzle</h1>
      <InformO1JSCompilation/>
      <InformConnectWallet/>
      <RenderAnswer/>
      <ComponentAnswerEditor/>
      <ComponentAnswerReset/>
      <ComponentAnswerAdd/>
      <RenderSK/>
      <ComponentGenerateSK/>
      <InformTXBuilding/>
      <InformTXHash/>
      <ComponentButtonDeploy/>
    </article>);
}
