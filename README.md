# Near-RPS-Game
Rock Paper Scissors on Near 
<hr>
İnstall
yarn

yarn build
near dev-deploy ./build/release/simple.wasm

Creata new Rock Paper Scissors Game
near call <contract-id> createGame --account_id <account-id> --amount 1
  
Player 2 Join Game  
near call <contract-id> joinGame '{"gameId": <game-id>}' --account_id <account-id> --amount 1
  
Playing Game   
near call <contract-id> play '{"gameId": <game-id>, "selectedItem": "Tas"}' --account_id <account-id> --amount 1



