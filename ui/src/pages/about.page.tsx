export default function About() {
  return (
    <article className="container gap-8 columns-1 prose">
      <h1>
        About Adven<i>true</i>
      </h1>
      <div className="break-inside-avoid">
        <p>
          Mina is a lightweight zero knowledge (ZK) blockchain. It is themost
          advanced ZK blockchain for proving anything privately and securely.
        </p>
        <p>
          We decided to utilize Mina's unique properties to enable any user to
          create their own quest Adven-true game using zk technology to verify
          that the player solved the clues correctly and are entitled to a
          specific reward.
        </p>
        <p>
          In our example we used Krakow as inspiration for the clues. We tried
          to make them easy enough to solve in a relatively short space of time.{" "}
        </p>
        <p>
          The concept has the potential to be expanded in many directions. Eg,
          To create a global multi-player GEO-cache type adventure game, or on a
          less energetic level a way for users to ascertain they have completed
          a number of steps in order to be whitelisted for a certain rewards, or
          for example, to obtain a higher level of permissions into an online
          members club.
        </p>
        <p>
          The implementation could be expanded to incorporate a zkPassport /
          identity to ensure only verifiable users could participate. In
          addition to this, features such as time limits (based on block times)
          could be applied.
        </p>
      </div>
      <h2>How to play</h2>
      <ol>
        <li>Install Auro Wallet</li>
        <li>Switch to devnet on Auto Wallet</li>
        <li>Scan QR code on poster</li>
        <li>Click 'Load o1js' button</li>
        <li>Click 'Connect'</li>
        <li>
          Solve the puzzles on the posters 1 to 4 and submit the answers in turn
          1 to 4.
        </li>
        <li>
          Click the 'Check' button on the website to see if your answers are
          correct
        </li>
        <li>Click 'compile' button (this takes around 2 mins)</li>
        <li>Click 'Solve'</li>
        <li>
          Auro Wallet will pop out and click 'Approve / Send' on the Wallet
        </li>
        <li>
          To see if you have won the prize check the link provided in the Mina
          Explorer
        </li>
        <li>That's it!</li>
      </ol>
      <h2>How to create your own adventrue</h2>
      <ol>
        <li>install Auro Wallet</li>
        <li>Switch to devnet on Auto Wallet</li>
        <li>Click 'Load o1js' button</li>
        <li>Click 'Connect'</li>
        <li>Click 'Compile'</li>
        <li>Add answers (as many as you need) - case insensitive.</li>
        <li>
          Select Mina prize (if you don't have enough funds the transaction
          (game) will fail.
        </li>
        <li>
          Click 'Generate Private Key'. It will show private and public key,
          back these up somewhere safe
        </li>
        <li>Click 'Deploy'</li>
        <li>Wait around 2 mins for the transaction to be approved</li>
        <li>Approve transaction in Auro Wallet pop up</li>
        <li>The game will generate a URL to the Block explorer</li>
        <li>
          Your URL is created the link will be. adventrue.org/solve/PUBLICKEY
        </li>
        <li>You can there share with your contestants</li>
      </ol>
      <h2>Links</h2>
      <ol>
        <li>
          <a
            href="https://play.google.com/store/apps/details?id=com.aurowallet.www.aurowallet&hl=en&gl=US"
            target="_blank"
            rel="noreferrer"
          >
            AURO wallet for Android
          </a>
        </li>
        <li>
          <a
            href="https://play.google.com/store/apps/details?id=com.aurowallet.www.aurowallet&hl=en&gl=US"
            target="_blank"
            rel="noreferrer"
          >
            AURO wallet for iPhone
          </a>
        </li>
        <li>
          <a
            href="https://www.aurowallet.com/"
            target="_blank"
            rel="noreferrer"
          >
            AURO wallet for the browser
          </a>
        </li>
      </ol>
    </article>
  );
}
