let queue = []

export function addSeedToQueue(seed) {
  console.log("ADDING SEED:", seed)
  queue.push(seed)
}

export function resolveNextSeed() {
  if (queue.length === 0) return null
  const shiftSeed = queue.shift();
  return shiftSeed
}

export function setQueue(newQueue) {
  queue = newQueue
}

export function getQueue() {
  return [...queue]
}

export function getQueueLength() {
  return queue.length
}

export function peekQueue() {
  return [...queue]
}