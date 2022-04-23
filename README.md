# Near-RPS-Game
<h1>Rock Paper Scissors on Near </h1> </br>
Hi everyone,
2 player enter the game. They deposit money at the start of game. Whoever wins after making their guesses, the prizes goes to them.
</br>
<hr>
<h2>Getting started</h2>
INSTALL NEAR CLI first like this: </br>
1) npm i -g near-cli </br>
2) yarn </br>
3) near login </br>
4) yarn build </br>
5) near dev-deploy ./build/release/simple.wasm </br>
<hr>

<h2>Creata new Rock Paper Scissors Game </h2>
</br>
<h3> Create Game </h3>
near call "contract-id" createGame --account_id "account-id" --amount 1
  </br>
<h3>Player 2 Join Game </h3> </br>
near call <contract-id> joinGame '{"gameId": "game-id"}' --account_id "account-id" --amount 1
  </br>
<h3>Playing Game  </h3> </br>
near call <contract-id> play '{"gameId": "game-id", "selectedItem": "selectedItem"}' --account_id "account-id" --amount 1
  <hr>
  
  There is 1 AssemblyScript contracts in this project:

  <li>simple in the src/simple folder</li>
  </br>
  </br>
  ![son test](https://user-images.githubusercontent.com/74310970/164916727-88d83200-7c19-48a1-82d1-179229400858.png)
</br>
  
  https://www.loom.com/share/f1d23b8fbc9d4838a55c2472ac4741ce



