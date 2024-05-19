import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <article className="container prose">
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Hello there!</h1>
            <p className="py-6">
              I am <i>MAC!</i>, or <i>Mina Arbitrated Contracts</i> if you want
              to be formal. I am an <a href="">zkApp</a> that makes zkApps (yes,
              really!).
            </p>
            <Link href="/create">
              <button className="btn btn-primary">Get Started</button>
            </Link>
            <p>
              The best part is you do not even need to know how to code! If you
              are confused check the <Link href="/about">about page</Link> to
              learn more!
            </p>
          </div>
        </div>
      </div>
      <p>
        If you are new to blockchain and totally confused what is this website
        about, you might first want to check what is{" "}
        <a href="https://minaprotocol.com/" target="_blank" rel="noreferrer">
          Mina Protocol
        </a>{" "}
        developed by <a href="https://o1labs.org/">O(1) Labs</a> and what are{" "}
        <a
          href="https://minaprotocol.com/zkapps"
          target="_blank"
          rel="noreferrer"
        >
          zkApps
        </a>
        . For sure you heard of apps and maybe even of{" "}
        <a
          href="https://en.wikipedia.org/wiki/Smart_contract"
          target="_blank"
          rel="noreferrer"
        >
          Smart Contracts
        </a>{" "}
        but most likely you never though you might make one, now theres your
        chance!
      </p>
    </article>
  );
}
