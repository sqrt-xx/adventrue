import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <article className="container prose">
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">It's time for an Adventrue!</h1>
            <p className="py-6">
              I am an application which allows you to deploy and interact with
              scavenge hunting games running on MINA network.
            </p>
            <Link href="/create">
              <button className="btn btn-primary">
                Create your Adventrue!
              </button>
            </Link>
            <p>
              You can use me to create new games, fund the prize and spread
              clues around to promote your town or business. Check the{" "}
              <Link href="/about">about page</Link> to learn more!
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
