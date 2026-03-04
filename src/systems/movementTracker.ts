let lastCoords = null;
let accumulatedDistance = 0;
let nextThreshold = rollNextThreshold();

function rollNextThreshold() {
  return Math.floor(Math.random() * 200) + 1; // 1–200
}

export function trackMovement(coords) {
  if (!lastCoords) {
    lastCoords = coords;
    return null;
  }

  const distance = getDistance(lastCoords, coords);
  accumulatedDistance += distance;
  lastCoords = coords;

  if (accumulatedDistance >= nextThreshold) {
    accumulatedDistance -= nextThreshold;
    nextThreshold = rollNextThreshold();

    return {
      triggerSeed: true
    };
  }

  return { triggerSeed: false };
}

function getDistance(a, b) {
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