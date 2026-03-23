import AsyncStorage from "@react-native-async-storage/async-storage"
import { getQueue, setQueue } from "./echoQueue"

const QUEUE_KEY = "ECHO_QUEUE"

export async function saveQueue() {
  const queue = getQueue()

  await AsyncStorage.setItem(
    QUEUE_KEY,
    JSON.stringify(queue)
  )
}

export async function loadQueue() {
  const raw = await AsyncStorage.getItem(QUEUE_KEY)

  if (!raw) return

  const queue = JSON.parse(raw)

  setQueue(queue)
}