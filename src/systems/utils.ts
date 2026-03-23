export function getRandomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function getDistance(a, b) {
  const R = 6371e3;
  const φ1 = (a.latitude * Math.PI) / 180;
  const φ2 = (b.latitude * Math.PI) / 180;
  const Δφ = ((b.latitude - a.latitude) * Math.PI) / 180;
  const Δλ = ((b.longitude - a.longitude) * Math.PI) / 180;

  const x =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) *
    Math.cos(φ2) *
    Math.sin(Δλ / 2) *
    Math.sin(Δλ / 2);

  const y = 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
  return R * y;
}

export function weightedRandom(table) {
  const totalWeight = table.reduce((sum, entry) => sum + entry.weight, 0)

  let roll = getRandomFloat(0, totalWeight)

  for (const entry of table) {
    if (roll < entry.weight) {
      return entry
    }

    roll -= entry.weight
  }
}

//this one for diag. other 1 for real
function rollNextThreshold() {
  return Math.floor(getRandomFloat(30, 35))
}
/* function rollNextThreshold() {
  return Math.floor(getRandomFloat(180, 200))
  } */

export function createMovementTracker() {
  let lastCoords = null
  let accumulatedDistance = 0
  let nextThreshold = rollNextThreshold()

  return function trackMovement(coords) {
    if (!lastCoords) { lastCoords = coords; return }

    const distance = getDistance(lastCoords, coords)
    console.log(`Distance from last coords: ${distance.toFixed(2)}m`)
    if (distance < 15) return // ignore small GPS noise

    accumulatedDistance += distance
    lastCoords = coords
    console.log("Accumulated distance:", accumulatedDistance.toFixed(2))
    let burstSpawn = 0;
    while (accumulatedDistance >= nextThreshold) {
      accumulatedDistance -= nextThreshold
      burstSpawn++
      nextThreshold = rollNextThreshold()
    }
    console.log(`Distance: ${distance.toFixed(2)}m, accumulatedDistance: ${accumulatedDistance.toFixed(2)}m, nextThreshold: ${nextThreshold}m, coords: ${coords.latitude.toFixed(5)}, ${coords.longitude.toFixed(5)}`)
    return {
      type: "distanceTrigger",
      coords,
      burstSpawn
    }
  }
  return
}