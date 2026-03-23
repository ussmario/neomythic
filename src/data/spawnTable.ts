import { getRandomFloat } from "../systems/utils"

const spawnTables = {
  starter_valley: [
    { rarity: "common", species: "ThornSprout", weight: 69.99 },
    { rarity: "uncommon", species: "EmberWyrmling", weight: 30 },
    { rarity: "legendary", species: "MoonlitUnicorn", weight: 0.01 },
  ]
}

export function rollSpawn(spawnTableKey: string) {
  if (!spawnTableKey) {
    console.error("rollSpawn called with invalid key:", spawnTableKey);
    return null;
  }

  const biomeTable = spawnTables[spawnTableKey];

  if (!biomeTable) {
    console.error("No spawn table found for key:", spawnTableKey);
    return null;
  }

  if (biomeTable.length === 0) {
    console.error("Spawn table empty:", spawnTableKey);
    return null;
  }

  const totalWeight = biomeTable.reduce(
    (sum, entry) => sum + entry.weight,
    0
  );

  if (totalWeight <= 0) {
    console.error("Spawn table has zero total weight:", spawnTableKey);
    return null;
  }

  const roll = getRandomFloat(0, totalWeight);

  let cumulative = 0;

  for (const entry of biomeTable) {
    cumulative += entry.weight;

    if (roll <= cumulative) {
      return {
        rarity: entry.rarity,
        species: entry.species,
        level: Math.floor(getRandomFloat(1, 6))
      };
    }
  }

  // Mathematical fallback — should never happen
  console.warn("Spawn roll fell through — returning last entry");
  const last = biomeTable[biomeTable.length - 1];
  return {
    rarity: last.rarity,
    species: last.species,
    level: Math.floor(getRandomFloat(1, 6))
  };
}