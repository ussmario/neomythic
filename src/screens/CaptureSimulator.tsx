import React from "react";
import { View, Text, Button } from "react-native";
import { calculateCaptureChance } from "../systems/captureSystem";

export default function CaptureSimulator() {
  const chance = calculateCaptureChance({
    tierMultiplier: 1.4,
    grammarMultiplier: 1,
    precision: 0.82,
    attackerElement: "Fire",
    defenderElement: "Plant",
    currentHP: 20,
    resistance: 1
  });

  return (
    <View style={{ padding: 40 }}>
      <Text>Thorn Sprout Capture Test</Text>
      <Text>Chance: {(chance * 100).toFixed(2)}%</Text>
    </View>
  );
}