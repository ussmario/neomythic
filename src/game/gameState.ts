export enum GamePhase {
  MAP = "MAP",
  BATTLE = "BATTLE",
}

let currentPhase: GamePhase = GamePhase.MAP
let currentBattle = null

export function getGamePhase() {
  return currentPhase
}

export function setGamePhase(phase: GamePhase) {
  currentPhase = phase
}

export function setActiveBattle(battleData) {
  currentBattle = battleData
}

export function getActiveBattle() {
  return currentBattle
}

export function clearBattle() {
  currentBattle = null
  currentPhase = GamePhase.MAP
}