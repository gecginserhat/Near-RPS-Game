import {  context, PersistentVector, ContractPromiseBatch, u128, logging, math } from "near-sdk-as";
import { RockPaperScissors, games, GameState } from "./model";


export function viewGame(gameId: u32): RockPaperScissors {
  return games.getSome(gameId);
}

export function createGame(): u32 {
  assert(context.attachedDeposit == u128.fromString('1000000000000000000000000'), 'Please deposit exactly 1 NEAR to create a game');

  const game = new RockPaperScissors();
  games.set(game.gameId, game);

  return game.gameId;
}


export function play(gameId: u32, selectedItem: string ): string {
  assert(games.contains(gameId), 'GameId not found');

  let hashedSelectedItem = math.hash(selectedItem);
  logging.log(hashedSelectedItem);

  let game = games.getSome(gameId);
  let currentPlayer = context.sender;

  assert(game.nextPlayer == currentPlayer, 'Its not your turn'); //
  assert(game.gameState == GameState.InProgress, 'Game is not in progress');

  assert( selectedItem == "Rock" || selectedItem == "Paper" || selectedItem == "Scissors", 'Invalid Item');
  let message = "";
  if (game.lastChoosedItem == "") 
  {
      game.player1 = context.sender;
      game.lastChoosedItem = selectedItem;
      game.gameState = GameState.InProgress;
      message = 'Player1 played';
  }
  else
  {
      assert(game.gameState == GameState.InProgress, 'Game is not in progress');
      assert(game.player1 != context.sender,'Same Player.It is not your turn');
      game.player2 = context.sender;
    
      if(game.lastChoosedItem == "Rock" && selectedItem =="Paper")
         message=finishGame(game,game.player2,currentPlayer);
      else if(game.lastChoosedItem == "Rock"  && selectedItem =="Scissors")
        message=finishGame(game,game.player1,currentPlayer);
      else if(game.lastChoosedItem == "Paper"  && selectedItem =="Scissors")
        message=finishGame(game,game.player2,currentPlayer);
      else if(game.lastChoosedItem == "Paper"  && selectedItem =="Tas")
        message=finishGame(game,game.player1,currentPlayer);
      else if(game.lastChoosedItem == "Scissors"  && selectedItem =="Tas")
        message=finishGame(game,game.player2,currentPlayer);
      else if(game.lastChoosedItem == "Scissors"  && selectedItem =="Paper")
        message=finishGame(game,game.player1,currentPlayer);
      else if(game.lastChoosedItem == selectedItem)
      {
          game.lastChoosedItem = "";
          message="Same item selected";
      }
  }

  game.roundsPlayed++;
  if (game.roundsPlayed == 5) {
    game.gameState = GameState.Completed;
    games.set(game.gameId, game);
    return "Game tied. No winners!"
  }
  
  games.set(game.gameId, game);
  return message;
}

export function joinGame(gameId: u32): string {
  assert(games.contains(gameId), 'Game does not exists');
  assert(context.attachedDeposit == u128.fromString('1000000000000000000000000'), 'Please deposit exactly 1 NEAR to join a game');

  let game = games.getSome(gameId);
  assert(game.player2 == "", 'This game already has two players');
  assert(game.player1 != context.sender, 'You cant play with youself :(');

  game.player2 = context.sender;
  game.gameState = GameState.InProgress;

  games.set(gameId, game);

  return "Joined the game, lets play!";
}
function setNextPlayer(player: string, game: RockPaperScissors): void {
  if (player == game.player1) {
    game.nextPlayer = game.player2;
  } else if (player == game.player2) {
    game.nextPlayer = game.player1;
  }
}
export function finishGame(game: RockPaperScissors, winnerId: string, player:string): string {
  game.gameState = GameState.Completed;
  const to_winner = ContractPromiseBatch.create(player);
  const amount_to_receive = game.totalAmount;
  to_winner.transfer(amount_to_receive);
  
  games.set(game.gameId, game);
  //return `Congratulations: ${winnerId} is the winner`;
  return `Congratulations: ${player} and received ${amount_to_receive} `;
}

function returnMoney(game: RockPaperScissors, player1: string, player2: string): void {
  // transfer NEAR back to players
  const to_player1 = ContractPromiseBatch.create(player1);
  const to_player2 = ContractPromiseBatch.create(player2);

  // amount of NEAR each player deposited
  const amount_to_receive = u128.sub(game.totalAmount, game.creationAmount);
  // logging.log(amount_to_receive);

  to_player1.transfer(amount_to_receive);
  to_player2.transfer(amount_to_receive);

  games.set(game.gameId, game);
}

