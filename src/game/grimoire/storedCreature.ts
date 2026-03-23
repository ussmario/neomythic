export interface StoredCreature {
  id: string
  species: string
  level: number
  essence: number
  capturedAt: number
}

export function createStoredCreature(creature) {
  return {
    id: generateId(),
    species: creature.species,
    level: creature.level,
    essence: 0,
    capturedAt: Date.now(),
  }
}

function generateId(): string {
  return Math.random().toString(36).slice(2)//username-incrementer
}