import { SunshineContextType, CastContext } from "../components/AppContext";

import {
  ContractQRCode,
  InformO1JSCompilation,
  InformConnectWallet,
  RenderAnswer,
  RenderSK,
  InformTXBuilding,
  InformTXHash,
} from "../components/Info";

import {
  ComponentAnswerReset,
  ComponentAnswerEditor,
  ComponentAnswerAdd,
  ComponentGenerateSK,
  ComponentPrizeEditor,
} from "../components/editing";

import { ComponentButtonDeploy } from "../components/interaction";

export default function Create() {
  return (
    <article className="container gap-8 prose">
      <h1>Create a new Adventrue puzzle</h1>
      <InformO1JSCompilation />
      <InformConnectWallet />
      <RenderAnswer />
      <ComponentAnswerEditor />
      <ComponentAnswerReset />
      <ComponentAnswerAdd />
      <p>The MINA prize is:</p>
      <ComponentPrizeEditor />
      <RenderSK />
      <ContractQRCode />
      <ComponentGenerateSK />
      <InformTXBuilding />
      <InformTXHash />
      <ComponentButtonDeploy />
    </article>
  );
}
