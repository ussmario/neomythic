import { getRandomFloat } from "../utils";

export type Coords = {
  latitude: number;
  longitude: number;
  dist?: number
};

export interface VirtualAvatar {
  coords: Coords;
  movementEnergy: number;
  mode: "DRIFT" | "MANUAL";
  targetCoords?: Coords;
}

function drift(coords: Coords) {
  return {
    latitude: coords.latitude + getRandomFloat(-0.0001, 0.0001),
    longitude: coords.longitude + getRandomFloat(-0.0001, 0.0001)
  };
}

function moveToward(current: Coords, target: Coords, step = 0.00003): Coords {
  const dx = target.latitude - current.latitude;
  const dy = target.longitude - current.longitude;
  const dist = Math.sqrt(dx * dx + dy * dy);

  if (dist <= step) {
    return { ...target, dist: 0 };
  }

  return {
    latitude: current.latitude + (dx / dist) * step,
    longitude: current.longitude + (dy / dist) * step,
    dist: dist - step
  };
}

export function virtualAvatarTick(avatar: VirtualAvatar): VirtualAvatar {
  let newCoords = avatar.coords;
  let newTarget = avatar.targetCoords;
  let newMode = avatar.mode;

  if (avatar.mode === "DRIFT") {
    newCoords = drift(avatar.coords);
  }

  if (avatar.mode === "MANUAL" && avatar.targetCoords) {
    newCoords = moveToward(avatar.coords, avatar.targetCoords);

    if (newCoords.dist && newCoords.dist < 0.000001) {
      newTarget = undefined,
        newMode = "DRIFT";
    }
  }

  return {
    ...avatar,
    coords: newCoords,
    targetCoords: newTarget,
    mode: newMode,
    movementEnergy: Math.max(
      0,
      avatar.movementEnergy - (avatar.mode === "DRIFT" ? 0.1 : 0)
    ),
  };
}

export function setVirtualAvatarTarget(
  avatar: VirtualAvatar,
  target: Coords
): VirtualAvatar {
  return {
    ...avatar,
    mode: "MANUAL",
    targetCoords: target,
  };
}