import AsyncStorage from "@react-native-async-storage/async-storage"
import { setGrimoire } from "../../game/grimoire/grimoireStore"
import { getQueueLength, setQueue } from "../encounter/echoQueue"
import { generateIVSet } from "../stats/ivGenerator"

export async function wipeAllData() {

  await AsyncStorage.removeItem("GRIMOIRE")
  await AsyncStorage.removeItem("ECHO_QUEUE")
  
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
  setQueue([])

  console.log("All save data wiped")
}

export function getDebugState() {
  return {
    seeds: getQueueLength()
  }
}