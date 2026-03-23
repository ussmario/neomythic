import React, { useState } from "react"
import { View, Text, Button } from "react-native"
import { getActiveBattle, clearBattle } from "../game/gameState"
import { performAttack } from "../systems/combat/combatSystem"

export default function BattleScreen() {
  const battle = getActiveBattle()
  const [_, forceUpdate] = useState(0)

  if (!battle) return null

  const { player, enemy } = battle

  function handleAttack() {
    const result = performAttack(player, enemy)

    if (result.fainted) {
      clearBattle()
      return
    }

    forceUpdate(x => x + 1)
  }

  return (
    <View style={{ padding: 20 }}>
      <Text>Player HP: {player.currentHP}</Text>
      <Text>Enemy HP: {enemy.currentHP}</Text>
      <Button title="Attack" onPress={handleAttack} />
    </View>
  )
}


/* import React, { useState } from "react"
import { View, Text, Button } from "react-native"
import { getBattleState, executeTurn, getCombatants} from "../systems/combat/battleEngine"
import { BattleState } from "../systems/combat/battleTypes"

export default function BattleScreen() {
  const [_, forceUpdate] = useState(0)
  const { playerCombatant, enemyCombatant } = getCombatants()
  const state = getBattleState()

  function handleAttack() {
    executeTurn()
    forceUpdate(n => n + 1)
  }

  if (!playerCombatant || !enemyCombatant) {
    return <Text>No active battle</Text>
  }

  return (
    <View style={{ padding: 20 }}>
      <Text>
        State: {state}
        Player HP: {playerCombatant.currentHP} / {playerCombatant.stats.hp}
        Enemy HP: {enemyCombatant.currentHP} / {enemyCombatant.stats.hp}
      </Text>

      {(state === BattleState.PLAYER_TURN ||
        state === BattleState.ENEMY_TURN) && (
          <Button title="Attack" onPress={handleAttack} />
        )}
      {state === BattleState.VICTORY && <Text>You Win!</Text>}
      {state === BattleState.DEFEAT && <Text>You Lose!</Text>}
    </View>
  )
} */