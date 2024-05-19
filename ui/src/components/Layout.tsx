import { ReactNode } from "react";

import Navbar from "./navbar";
import Head from "next/head";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Head>
        <title>zkSunshine</title>
      </Head>
      <section className="flex flex-row-reverse">
        <Navbar />
      </section>
      <section className="container mb-44 xl:mb-16 lg:mb-16 md:mb-44 sm:mb-44">
        {children}
      </section>
      <section className="fixed inset-x-0 bottom-0">
        <footer className="footer items-center p-4 bg-neutral text-neutral-content z-50">
          <div className="items-center grid-flow-col">
            <a href="https://sqrtxx.com/" target="_blank" rel="noreferrer">
              <img
                style={{ height: 36 }}
                alt="a logo of sqrtxx.com"
                src="/logo.svg"
              />
            </a>
            <a href="https://zkok.io/" target="_blank" rel="noreferrer">
              <img
                style={{ height: 36 }}
                alt="a logo of ZKOK"
                src="/zkok-logo.png"
              />
            </a>
            <p>
              Copyright © 2024 - All right reserved by{" "}
              <a href="https://sqrtxx.com/" target="_blank" rel="noreferrer">
                sqrtxx.com
              </a>{" "}
              <a
                href="https://mareknarozniak.com/"
                target="_blank"
                rel="noreferrer"
              >
                Marek
              </a>
              ,{" "}
              <a href="/pepe_hacker.png" target="_blank" rel="noreferrer">
                Midori
              </a>
              ,{" "}
              <a
                href="https://x.com/minacryptocom"
                target="_blank"
                rel="noreferrer"
              >
                Pete
              </a>{" "}
              and{" "}
              <a
                href="https://x.com/georgethms1"
                target="_blank"
                rel="noreferrer"
              >
                zkGeorge
              </a>{" "}
              for{" "}
              <a href="zkkrakow.com" target="_blank" rel="noreferrer">
                zkHack Krakow
              </a>
              .
            </p>
          </div>
        </footer>
      </section>
    </div>
  );
};

export default Layout;
