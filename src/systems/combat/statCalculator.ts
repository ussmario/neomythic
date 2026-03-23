export type BaseStats = Record<string, number>
export type IVSet = Record<string, number>

type StatOptions = {
  growth: number
  ivScale: number
}

const DEFAULT_OPTIONS: StatOptions = {
  growth: 0.35,
  ivScale: 0.25
}

export function calculateFinalStats(
  baseStats: BaseStats,
  ivs: IVSet,
  level: number,
  options: Partial<StatOptions> = {}
) {
  const { growth, ivScale } = { ...DEFAULT_OPTIONS, ...options }

  const finalStats: Record<string, number> = {}

  Object.keys(baseStats).forEach(statKey => {
    const base = baseStats[statKey]
    const ivKey = `iv_${statKey}`
    const iv = ivs[ivKey] ?? 0
    const levelBonus = level * growth
    const ivBonus = iv * level * ivScale

    finalStats[statKey] = Math.floor(base + levelBonus + ivBonus)
  })

  return finalStats
}