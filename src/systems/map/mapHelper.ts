import { biomes } from "../../data/biomes";

function pointInPolygon(point, polygon) {
  let inside = false;

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].lat;
    const yi = polygon[i].lng;
    const xj = polygon[j].lat;
    const yj = polygon[j].lng;

    const intersect =
      yi > point.lng !== yj > point.lng &&
      point.lat < ((xj - xi) * (point.lng - yi)) / (yj - yi) + xi;

    if (intersect) inside = !inside;
  }

  return inside;
}

export function getBiomeFromCoords(coords) {
  for (const biome of biomes) {
    if (!biome.polygon) continue;

    if (pointInPolygon(coords, biome.polygon)) {
      return biome;
    }
  }

  // fallback
  return biomes.find(b => b.id === "global_fallback");
}