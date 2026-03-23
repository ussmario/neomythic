let captureSettings = {
  tierMultiplier: 1,
  grammarMultiplier: 1,
  precision: 0.5,
  attackerElement: "Fire",
  defenderElement: "Plant",
  HPPercent: 1,
  resistance: 1,
  runeMastery: 1
}

export function setCaptureSettings(settings) {
  captureSettings = { ...captureSettings, ...settings }
}

export function getCaptureSettings(){
  return captureSettings
}