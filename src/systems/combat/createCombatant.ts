import { calculateFinalStats } from "./statCalculator"
import { creatureBaseStats } from "../../data/creatureBaseStats"

export function createCombatant(creature) {
  const base = creatureBaseStats[creature.species]
  const stats = calculateFinalStats(
    base,
    creature.ivs,
    creature.level
  )

  return {
    ...creature,
    stats,
    currentHP: stats.hp,
    statStages: {
      atk: 0,
      def: 0,
      spd: 0
    }
  }
}