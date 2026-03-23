import { getRandomFloat } from "../utils"
import {CaptureSettings} from "./captureSettings"
import { captureProbability } from "./captureSystem"

export interface CaptureResult {
  success: boolean
  roll: number
}

export function runCaptureSimulation(settings: CaptureSettings): CaptureResult {
  const roll = getRandomFloat(0, 1)
  const success = roll <= captureProbability(settings)

  return {
    success,
    roll,
  }
}