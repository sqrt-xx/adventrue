import Link from "next/link";
import { SunshineContextType, CastContext } from "./AppContext";

const CircuitCompileButton = () => {
  const context: SunshineContextType = CastContext();
  if (context.compilationButtonState === 0) {
    return (
      <button
        className="btn"
        onClick={() => {
          console.log("run load o1js clicked");
          context.state.runLoadO1js(context);
        }}
      >
        Connect to DevNet
      </button>
    );
  } else if (context.compilationButtonState === 1) {
    return (
      <button className="btn btn-disabled animate-pulse">Loading o1js</button>
    );
  } else if (context.compilationButtonState === 2) {
    return (
      <button
        className="btn"
        onClick={() => {
          console.log("run compile clicked");
          context.state.runCompile(context);
        }}
      >
        Compile
      </button>
    );
  } else if (context.compilationButtonState === 3) {
    return (
      <button className="btn btn-disabled animate-pulse">Compiling</button>
    );
  } else {
    return <button className="btn btn-disabled">Compiled</button>;
  }
};

const ConnectButton = () => {
  const context: SunshineContextType = CastContext();
  if (context.connectionButtonState === 0) {
    return (
      <button
        className="btn"
        onClick={() => {
          console.log("run wallet connect clicked");
          context.state.connectWallet(context);
        }}
      >
        Connect AuroWallet
      </button>
    );
  } else if (context.connectionButtonState === 1) {
    return (
      <button className="btn btn-disabled animate-pulse">Connecting</button>
    );
  } else {
    return <button className="btn btn-disabled">Connected</button>;
  }
};

const Navbar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown z-10">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link href="/create">Create your Adventrue</Link>
            </li>
            <li>
              <Link href="/solve">Play Adventrue</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
          </ul>
        </div>
        <Link className="btn btn-ghost normal-case text-xl" href="/">
          <i>Home</i>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <div className="dropdown">
          <label tabIndex={1} className="btn btn-ghost">
            <Link href="">Adventrue</Link>
          </label>
          <ul
            tabIndex={1}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link href="/create">Create your Adventrue</Link>
            </li>
            <li>
              <Link href="/solve">Play Adventrue</Link>
            </li>
          </ul>
        </div>
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/about">About</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <CircuitCompileButton />
        <ConnectButton />
      </div>
    </div>
  );
};

export default Navbar;
