# AdvenTRUE
## A true adventure, with zk. Complete and easily create “treasure hunt” style games with prizes on Mina. 
Mina is a lightweight (22kb) zero knowledge blockchain with smart contract functionality. We decided to utilize Mina's o1js smart contract to enable any user to create their own quest game with a mix of off-chain and on-chain dynamics. Users can create quiz games and set a fixed prize award for the first user to complete the quiz. Anyone can join a set quiz game through using the smart contract public key. This works through using physical in-person questions. The first user can then submit the list of answers on-chain, and if correct, the contract will allow them to claim the prize.

In our example we used Krakow as inspiration for the questions. We tried to make them easy enough to solve in a relatively short space of time. The reward for solving the puzzles can theoretically be anything, some spicy testnet MINA (in this scenario), a MINA NFT, or even a physical prize.

The concept has the potential to be expanded in many directions. We were working on integrating zkLocus (Mina zkApp project), or another mechanism to act as a proof of geolocation, but were unable to fully incorporate in the time constraints.

