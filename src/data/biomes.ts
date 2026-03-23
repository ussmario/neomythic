export const biomes = [
   {
    id: "starter_valley",
    name: "Starter Valley",
    polygon: [
      { latitude: 34.0, longitude: -118.5 },
      { latitude: 34.5, longitude: -118.5 },
      { latitude: 34.5, longitude: -118.0 },
      { latitude: 34.0, longitude: -118.0 }
    ],
    spawnTable: "starter_valley"
  },

  // GLOBAL FALLBACK BIOME
  {
    id: "global_fallback",
    name: "Wandering Wilds",
    polygon: null,
    spawnTable: "starter_valley"
  }
];