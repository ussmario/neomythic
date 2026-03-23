import { getRandomFloat } from "../utils"

const ivWeights = [
  { value: 0, weight: 18 },
  { value: 1, weight: 16 },
  { value: 2, weight: 14 },
  { value: 3, weight: 12 },
  { value: 4, weight: 10 },
  { value: 5, weight: 8 },
  { value: 6, weight: 7 },
  { value: 7, weight: 6 },
  { value: 8, weight: 5 },
  { value: 9, weight: 4 }
]

function createEmptyIVs() {
  return {
    iv_hp: 0,
    iv_atk: 0,
    iv_def: 0,
    iv_spd: 0
  }
}

function rollWeightedIV() {
  const totalWeight = ivWeights.reduce((s, i) => s + i.weight, 0)
  const roll = getRandomFloat(0, totalWeight)

  let cumulative = 0

  for (const iv of ivWeights) {
    cumulative += iv.weight
    if (roll <= cumulative) return iv.value
  }

  return 0
}

export function generateIVSet(rarity: string) {
  const IVs = createEmptyIVs()

  // 1 in 1,000,000 perfect roll
  const jackpot = Math.floor(getRandomFloat(1, 1_000_001))
  let pick;

  //unlock achievement 1 in a million once acheivements are implemented
  if (jackpot === 1 || rarity ==="unique") {
    Object.keys(IVs).forEach(stat => {
      IVs[stat as keyof typeof IVs] = 9
    })

    return IVs
  }

  if (rarity === "legendary") {
    pick = Object.keys(IVs)[Math.floor(Math.random() * Object.keys(IVs).length)]
  }

  Object.keys(IVs).forEach(element => {
    if (element === pick) {
      IVs[element as keyof typeof IVs] = 9
    } else {
      IVs[element as keyof typeof IVs] = rollWeightedIV()
    }
  });

  return IVs
}