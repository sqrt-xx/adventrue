import React from "react";

import { PublicKey, PrivateKey } from "o1js";

import { SunshineContextType, CastContext } from "../components/AppContext";

export const ComponentPublicKey = (
  label: string,
  name: string,
  placeholder: string,
  description: string
) => {
  return (
    <div>
      <label className="form-control w-full max-w-xl">
        <div className="label">
          <span className="label-text">{label}</span>
        </div>
        <input
          className="input input-bordered w-full max-w-xl"
          type="text"
          name={name}
          placeholder={placeholder}
        />
      </label>
      <label className="label">
        <span className="label-text-alt">{description}</span>
      </label>
    </div>
  );
};

export const ComponentAnswerReset = () => {
  const context: SunshineContextType = CastContext();
  return (
    <button
      className="btn"
      onClick={() => {
        console.log("answer reset button clicked");
        context.setState({
          ...context.state,
          solution: [],
        });
      }}
    >
      Reset Answer
    </button>
  );
};

export const ComponentAnswerEditor = () => {
  const context: SunshineContextType = CastContext();
  return (
    <input
      className="input input-bordered w-full max-w-xl"
      name="last_answer"
      type="text"
      value={context.state.answer}
      onChange={(event: React.SyntheticEvent) => {
        context.setState({
          ...context.state,
          answer: (event.target as any).value,
        });
      }}
    />
  );
};

export const ComponentPrizeEditor = () => {
  const context: SunshineContextType = CastContext();
  return (
    <input
      className="input input-bordered w-full max-w-xl"
      name="mina_prize"
      type="number"
      value={context.state.prize_float}
      onChange={(event: React.SyntheticEvent) => {
        let prize: number = Math.round(
          (event.target as any).value * 1000000000
        );
        console.log("prize is", prize);
        context.setState({
          ...context.state,
          prize: prize,
          prize_float: (event.target as any).value,
        });
      }}
    />
  );
};

export const ComponentAnswerAdd = () => {
  const context: SunshineContextType = CastContext();
  console.log("answer is", context.state.answer);
  if (!context.state.answer) {
    return <button className="btn btn-disabled">Add</button>;
  } else {
    return (
      <button
        className="btn"
        onClick={() => {
          console.log("add answer button clicked");
          let solution = context.state.solution;
          solution.push(context.state.answer.trim());
          context.setState({
            ...context.state,
            solution: solution,
            answer: "",
          });
        }}
      >
        Add Answer
      </button>
    );
  }
};

export const ComponentGenerateSK = () => {
  const context: SunshineContextType = CastContext();
  if (context.compilationButtonState < 2) {
    return <button className="btn btn-disabled">Generate PrivateKey</button>;
  } else {
    return (
      <button
        className="btn"
        onClick={() => {
          console.log("generate sk button clicked");
          const sk: PrivateKey = PrivateKey.random();
          const pk: PublicKey = sk.toPublicKey();
          context.setState({
            ...context.state,
            zkappPublicKeyBase58: pk.toBase58(),
            zkappPrivateKeyBase58: sk.toBase58(),
          });
        }}
      >
        Generate PrivateKey
      </button>
    );
  }
};
