import { StoredCreature } from "./storedCreature"

let creatures: StoredCreature[] = []

export function getGrimoire(): StoredCreature[] {
  return creatures
}

export function addCreatureToGrimoire(creature: StoredCreature) {
  creatures.push(creature)
}

export function removeCreatureFromGrimoire(id: string) {
  creatures = creatures.filter(c => c.id !== id)
}

export function setGrimoire(newCreatures: StoredCreature[]) {
  creatures = newCreatures
}