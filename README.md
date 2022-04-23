# Near-RPS-Game
<h1>Rock Paper Scissors on Near </h1>
Hi everyone
<hr>
İnstall
yarn

yarn build
near dev-deploy ./build/release/simple.wasm
<hr>

Creata new Rock Paper Scissors Game </br>
near call <contract-id> createGame --account_id <account-id> --amount 1
  
Player 2 Join Game  </br>
near call <contract-id> joinGame '{"gameId": "<game-id>"}' --account_id <account-id> --amount 1
  
Playing Game   </br>
near call <contract-id> play '{"gameId": "<game-id>", "selectedItem": "<selectedItem>"}' --account_id <account-id> --amount 1
  <hr>
  There is 1 AssemblyScript contracts in this project:

  <li>simple in the src/simple folder</li>
  
  https://www.loom.com/share/f1d23b8fbc9d4838a55c2472ac4741ce



