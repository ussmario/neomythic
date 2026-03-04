let queue: any[] = [];

export function addSeedToQueue(seed) {
  queue.push({
    id: Date.now(),
    ...seed
  });
}

export function getNextSeed() {
  return queue[0] ?? null;
}

export function resolveNextSeed() {
  queue.shift();
}

export function getQueueLength() {
  return queue.length;
}