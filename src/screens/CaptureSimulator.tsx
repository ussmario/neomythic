import React from "react";
import { View, Text, Button } from "react-native";
import { calculateCaptureChance } from "../systems/captureSystem";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors } from "@/constants/theme";
import Slider from '@react-native-community/slider'; // or Expo’s Slider
import { Picker } from '@react-native-picker/picker';
import { captureFormulaMVP } from '@/src/systems/captureSystem';

export default function CaptureSimulator() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];
  const chance = calculateCaptureChance({
    tierMultiplier: 1.4,
    grammarMultiplier: 1,
    precision: 0.82,
    attackerElement: "Fire",
    defenderElement: "Plant",
    currentHP: 20,
    resistance: 1
  });
  const [currentHP, setCurrentHP] = React.useState(100);
  const [precision, setPrecision] = React.useState(50); // 0–100%
  const [selectedElement, setSelectedElement] = React.useState('Fire');

  return (
    <View style={{ padding: 40, backgroundColor: theme.background, flex: 1,}}>
      <Text style={{ color: theme.text }}>Monster HP: {currentHP}</Text>
      <Slider
        minimumValue={0}
        maximumValue={100}
        value={currentHP}
        onValueChange={setCurrentHP}
        minimumTrackTintColor={theme.tint}
        maximumTrackTintColor="#888"
      />

      <Text style={{ color: theme.text }}>Precision: {precision}%</Text>
      <Slider
        minimumValue={0}
        maximumValue={100}
        value={precision}
        onValueChange={setPrecision}
        minimumTrackTintColor={theme.tint}
        maximumTrackTintColor="#888"
      />
      
      <Text style={{ color: theme.text }}>Element:</Text>
      <Picker
        selectedValue={selectedElement}
        onValueChange={setSelectedElement}
        style={{ color: theme.text }}
      >
        <Picker.Item label="Fire" value="Fire" />
        <Picker.Item label="Plant" value="Plant" />
        <Picker.Item label="Water" value="Water" />
        <Picker.Item label="Earth" value="Earth" />
        <Picker.Item label="Air" value="Air" />
        <Picker.Item label="Electric" value="Electric" />
        <Picker.Item label="Light" value="Light" />
        <Picker.Item label="Dark" value="Dark" />
        <Picker.Item label="Psy" value="Psy" />
      </Picker>
      <Text style={{ color: theme.text }}>
        Capture Chance: {captureFormulaMVP(currentHP, precision, selectedElement)}%
      </Text>
      <Text style={{ color: theme.text }}>Thorn Sprout Capture Test</Text>
      <Text style={{ color: theme.text }}>Chance: {(chance * 100).toFixed(2)}%</Text>
    </View>
  );
}