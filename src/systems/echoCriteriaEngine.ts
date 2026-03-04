import { addSeedToQueue } from "./echoQueue";

export function evaluateEchoCriteria(movementData) {
  if (!movementData) return;

  if (movementData.triggerSeed) {
    addSeedToQueue({
      type: "wild"
    });
  }
}

function getBiomeFromCoords(coords) {
  // loop through zone polygons
  // check point-in-polygon
  // return biome type
}