export function calculateDamage(attacker, defender) {
  const raw = attacker.stats.atk - defender.stats.def * 0.5
  return Math.max(1, Math.floor(raw))
}

export function performAttack(attacker, defender) {
  const damage = calculateDamage(attacker, defender)
  defender.currentHP -= damage

  return {
    damage,
    defenderRemainingHP: Math.max(0, defender.currentHP),
    fainted: defender.currentHP <= 0
  }
}

export function determineTurnOrder(a, b) {
  if (a.stats.spd > b.stats.spd) return [a, b]
  if (b.stats.spd > a.stats.spd) return [b, a]

  return Math.random() < 0.5 ? [a, b] : [b, a]
}