import React, { useEffect, useState } from "react"
import { Button, Text, View } from "react-native"
import { /* addCreatureToGrimoire, */ getGrimoire } from "../game/grimoire/grimoireStore"
import { getQueueLength, resolveNextSeed, getQueue } from "../systems/encounter/echoQueue"
import { createCombatant } from "../systems/combat/createCombatant"
import { determineTurnOrder, performAttack } from "../systems/combat/combatSystem"
import { setGamePhase, setActiveBattle, GamePhase } from "../game/gameState"
import { startBattle } from "../systems/combat/battleEngine"
import { saveQueue } from "../systems/encounter/echoQueuePersistence"
/* import { saveGrimoire } from "../game/grimoire/grimoirePersistence"
import { getRandomFloat } from "../systems/utils"
import { createStoredCreature } from "../game/grimoire/storedCreature"
import { getCaptureSettings } from "../systems/capture/captureSettings"
import { captureProbability } from "../systems/capture/captureSystem" */

function testCombat() {
  const wildSeed = getQueue()[0]
  if (!wildSeed) return

  const player = createCombatant(getGrimoire()[0])
  const enemy = createCombatant(wildSeed)
  const [first, second] = determineTurnOrder(player, enemy)
  const result = performAttack(first, second)

  console.log("Damage:", result.damage)
  console.log("Defeated:", result.defenderRemainingHP)
  console.log("Fainted:", result.fainted)
}

export default function QueueResolver() {
  const [result, setResult] = useState("")
  const [queueSize, setQueueSize] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      setQueueSize(getQueueLength())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    console.log("result:", result)
  }, [result])

  function resolveEncounter() {
    const newSeed = resolveNextSeed()
    saveQueue()
    if (!newSeed) {
      setResult("No encounters queued")
      return
    }

    const enemy = createCombatant(newSeed)
    const playerCreature = getGrimoire()[0] // MVP: first creature only
    if (!playerCreature) {
      setResult("No creature available to fight")
      return
    }
    const player = createCombatant(playerCreature)

    startBattle(player, enemy)
    setActiveBattle({ player, enemy })
    setGamePhase(GamePhase.BATTLE)
  }

  return (
    <View style={{ padding: 5 }}>
      <Text>Queue Size: {queueSize}</Text>
      <Text>{result}</Text>
      {queueSize > 0 && getGrimoire().length > 0 && (
        <Button title="Resolve Encounter" onPress={() => {
          console.log("Queue before resolve:", getQueueLength())
          testCombat()
          resolveEncounter();
        }} />
      )}

    </View>
  )
}

/* function resolveEncounter() {
  const newSeed = resolveNextSeed()
  const settings = getCaptureSettings()
  const probability = captureProbability(settings)
  const roll = getRandomFloat(0, 1)
  const caught = roll <= probability

  if (!newSeed) {
    setResult("No encounters queued")
    return
  }

  if (caught) {
    const stored = createStoredCreature(newSeed)
    addCreatureToGrimoire(stored)
    saveGrimoire()
    setResult(
      `Captured ${stored.species}! ${(probability * 100).toFixed(1)}% roll ${(roll * 100).toFixed(1)}%`
    )
    console.log("Creature added to grimoire:", getGrimoire())
  } else {
    setResult(
      `Escaped! ${(probability * 100).toFixed(1)}% roll ${(roll * 100).toFixed(1)}%`
    )
  }
}
 */