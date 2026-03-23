import { BattleState } from "./battleTypes"
import { determineTurnOrder, performAttack } from "./combatSystem"

let battleState: BattleState = BattleState.IDLE
let playerCombatant
let enemyCombatant
let turnOrder = []

export function getBattleState() {
  return battleState
}

export function getCombatants() {
  return { playerCombatant, enemyCombatant }
}

export function startBattle(player, enemy) {
  playerCombatant = player
  enemyCombatant = enemy
  turnOrder = determineTurnOrder(playerCombatant, enemyCombatant)
  battleState = turnOrder[0] === playerCombatant ? BattleState.PLAYER_TURN : BattleState.ENEMY_TURN
}

export function executeTurn() {
  if (battleState !== BattleState.PLAYER_TURN &&
    battleState !== BattleState.ENEMY_TURN) {
    return null
  }

  const attacker = battleState === BattleState.PLAYER_TURN ? playerCombatant : enemyCombatant
  const defender = battleState === BattleState.PLAYER_TURN ? enemyCombatant : playerCombatant
  const result = performAttack(attacker, defender)

  if (result.fainted) {
    battleState = attacker === playerCombatant ? BattleState.VICTORY : BattleState.DEFEAT
  } else {
    battleState = battleState === BattleState.PLAYER_TURN ? BattleState.ENEMY_TURN : BattleState.PLAYER_TURN
  }

  return result
}