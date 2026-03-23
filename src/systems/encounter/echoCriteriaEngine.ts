import { addSeedToQueue } from "./echoQueue";
import { getBiomeFromCoords } from "../map/mapHelper";
import { rollSpawn } from "../../data/spawnTable";
import { generateIVSet } from "../stats/ivGenerator";

export function evaluateEchoCriteria(movementData) {
  if (!movementData?.coords) return;

  const biome = getBiomeFromCoords(movementData.coords);

  if (!biome) return;
  while (movementData.burstSpawn > 0) {
    movementData.burstSpawn--;
    console.log("Spawn table:", biome.spawnTable);
    const creature = rollSpawn(biome.spawnTable);

    if (!creature) {
      console.warn("Spawn failed. Skipping burst iteration.");
      continue;
    }

    console.log("Seed spawn triggered at coords:", movementData.coords.latitude.toFixed(5), movementData.coords.longitude.toFixed(5));
    const ivSet = generateIVSet(creature.rarity);
    const ivString = Object.values(ivSet).join("/");
    addSeedToQueue({
      type: "wild",
      ...creature,
      ivs: ivSet,
      debugLabel: `${creature.species} Lv${creature.level} IVs ${ivString}`,
      biomeId: biome.id,
      timestamp: Date.now(),
    });
    console.log("seed added");
    console.log("Biome resolved:", biome);
  }}