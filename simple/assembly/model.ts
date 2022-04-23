import {  RNG, context, PersistentUnorderedMap, u128, logging, math } from "near-sdk-as";

export enum GameState {
  Created,
  InProgress,
  Completed
}

@nearBindgen
export class RockPaperScissors{
  gameId: u32;
  gameState: GameState;
  player1: string;
  player2: string;
  nextPlayer: string;
  roundsPlayed: u8;
  lastChoosedItem: string;
  totalAmount: u128;
  creationAmount: u128;

  constructor() {
    let rng = new RNG<u32>(1, u32.MAX_VALUE);
    let roll = rng.next();
   // this.gameId =context.blockIndex;
   this.gameId=roll;
    
    this.gameState = GameState.Created;
    this.player1 = context.sender;
    this.player2 = "";
    this.roundsPlayed = 0;
    this.lastChoosedItem = "";
    this.totalAmount = context.attachedDeposit;
    this.creationAmount = context.attachedDeposit;
  }
}

export const games = new PersistentUnorderedMap<u32, RockPaperScissors>("g");

