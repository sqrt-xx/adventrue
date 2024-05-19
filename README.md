# <p align="center"> AdvenTRUE
## A true adventure, with zk. Complete and easily create “treasure hunt” style quiz games with prizes on Mina. 
Mina is a lightweight (22kb) zero knowledge blockchain with smart contract functionality. We decided to utilize Mina's o1js smart contract to enable any user to create their own quest game with a mix of off-chain and on-chain dynamics. Users can create quiz games and set a fixed prize award for the first user to complete the quiz. Anyone can join a set quiz game through using the smart contract public key. This works through using physical in-person questions. The first user can then submit the list of answers on-chain, and if correct, the contract will allow them to claim the prize.

In our example we used Krakow as inspiration for the questions. We tried to make them easy enough to solve in a relatively short space of time. The reward for solving the puzzles can theoretically be anything, some spicy testnet MINA (in this scenario), a MINA NFT, or even a physical prize.

The concept has the potential to be expanded in many directions. Another possible mechanism if we had more time would be to integrate zkLocus (Mina zkApp project), or another proof of geolocation, to ensure users are at the actual location. Further modifications to the PoC could include utilising Protokit to manage progress through the game with on-chain state updated after each question rather than just at the end, and potentially time-sensitive contracts (E.g. 10 blocks time window for completion = 30 minutes on Mina devnet). 

<p align="center">
  <img src="https://github.com/sqrt-xx/adventrue/assets/37027892/aac3b126-b1d3-4abd-a3e3-a3d247fe69eb" width="750" height="750">
