import AsyncStorage from "@react-native-async-storage/async-storage"
import { getGrimoire, setGrimoire } from "./grimoireStore"
import { migrateGrimoire } from "./grimoireMigration"
import { generateIVSet } from "../../systems/stats/ivGenerator"

const SAVE_KEY = "GRIMOIRE_SAVE"

export async function saveGrimoire() {
  const data = {
    version: 1,
    creatures: getGrimoire()
  }

  await AsyncStorage.setItem(SAVE_KEY, JSON.stringify(data))
}

let grimoireLoaded = false

export async function loadGrimoire() {
  if (grimoireLoaded) return

  const raw = await AsyncStorage.getItem(SAVE_KEY)

if (!raw) {
    initializeStarter()
    return
  }
  const parsed = JSON.parse(raw)
  const migrated = migrateGrimoire(parsed)

  if (!parsed || parsed.length === 0) {
    initializeStarter()
    return
  }

  setGrimoire(migrated.creatures)
  grimoireLoaded = true
}

function initializeStarter() {
  const starter = {
    species: "ThornSprout",
    level: 5,
    ivs: generateIVSet("common"),
    essence: 0,
    nickname: "Sprouty McSproutFace",
    id: "starter-001",
    capturedAt: Date.now(),
  }

  setGrimoire([starter])
  saveGrimoire()

  console.log("Starter initialized")
}