import React from "react";

// import { scanQRCode } from "qr-code-scanner-sumzai";
import { PublicKey } from "o1js";
import { Scanner } from "@yudiel/react-qr-scanner";
import { useRouter, NextRouter } from "next/router";

import { SunshineContextType, CastContext } from "../components/AppContext";

import { ComponentPublicKey } from "../components/editing";

export const ComponentAddressEditor = () => {
  const context: SunshineContextType = CastContext();
  return (
    <input
      className="input input-bordered w-full max-w-xl"
      name="base58pk"
      type="text"
      value={context.state.zkappPublicKeyBase58Candidate}
      onChange={(event: React.SyntheticEvent) => {
        context.setState({
          ...context.state,
          zkappPublicKeyBase58Candidate: (event.target as any).value,
        });
      }}
    />
  );
};

function findMinaAddress(input: string): string | null {
  const regex = /B62/;
  const match = regex.exec(input);

  if (match) {
    const startIndex = match.index;
    const substring = input.substring(startIndex, startIndex + 55);

    if (substring.length === 55) {
      return substring;
    }
  }
  return null;
}

export const ScanQRCodeError = () => {
  const context: SunshineContextType = CastContext();
  if (context.state.qr_scanner_error != "") {
    return <p>{context.state.qr_scanner_error}</p>;
  }
};

export const ScanQRCodeButton = () => {
  const context: SunshineContextType = CastContext();
  if (context.state.qr_scanner_on) {
    return (
      <div>
        <Scanner
          onScan={async (result) => {
            console.log(result);
            let address_: string = context.state.zkappPublicKeyBase58Candidate;
            let qr_scanner_error: string = "";
            if (result.length > 0) {
              console.log(result[0].rawValue);
              const extracted_address: string | null = findMinaAddress(
                result[0].rawValue
              );
              if (extracted_address !== null) {
                console.log(extracted_address);
                address_ = extracted_address;
              } else {
                qr_scanner_error =
                  "Scanned QR code does not contain MINA address.";
              }
              console.log();
            }
            await context.setState({
              ...context.state,
              qr_scanner_on: false,
              qr_scanner_error: qr_scanner_error,
              zkappPublicKeyBase58Candidate: address_,
            });
          }}
        />
        <button
          className="btn"
          onClick={async () => {
            console.log("stop scan button clicked");
            await context.setState({
              ...context.state,
              qr_scanner_on: false,
            });
          }}
        >
          Stop Scanning
        </button>
      </div>
    );
  }
  return (
    <div>
      <ScanQRCodeError />
      <button
        className="btn"
        onClick={async () => {
          console.log("start scan button clicked");
          await context.setState({
            ...context.state,
            qr_scanner_on: true,
          });
        }}
      >
        Start Scanning
      </button>
    </div>
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

export const SolveEntryInterface = (
  router: NextRouter,
  context: SunshineContextType
) => {
  if (context.state.qr_scanner_on) {
    return (
      <article className="container gap-8 prose">
        <ScanQRCodeButton />
      </article>
    );
  }
  return (
    <article className="container gap-8 prose">
      <h1>Solve an existing Adventrue puzzle</h1>
      <p>
        Every puzzle is a MINA smart contract which can be identified by a MINA
        public key. You may enter the public key manually in the following form
        field.
      </p>
      <form
        onSubmit={async (event) => {
          await EditorFormSubmission(event, router);
        }}
      >
        <ComponentAddressEditor />
        <p>Or you can also scan it as a QR code.</p>
        <ScanQRCodeButton />

        <button type="submit" className="btn btn-active">
          Submit
        </button>
      </form>
    </article>
  );
};

export default function Solve() {
  const router = useRouter();
  const context: SunshineContextType = CastContext();
  return SolveEntryInterface(router, context);
}
