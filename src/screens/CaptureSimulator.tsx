import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { captureProbability } from "../systems/capture/captureSystem";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors } from "@/constants/theme";
import Slider from '@react-native-community/slider';
import { Picker } from '@react-native-picker/picker';
import { setCaptureSettings } from "../systems/capture/captureSettings";
import { loadGrimoire } from "../game/grimoire/grimoirePersistence"
import { getGrimoire } from "../game/grimoire/grimoireStore";
import { loadQueue } from "../systems/encounter/echoQueuePersistence";

export default function CaptureSimulator() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];
  const [tierMultiplier, setTierMultiplier] = useState(1.00);//1-1.07 for now
  const [grammarMultiplier, setGrammarMultiplier] = useState(1.00);//1-1.05 for now
  const [precision, setPrecision] = useState(100); // 0–100%
  const [selectedElement, setSelectedElement] = useState('Fire');
  const [HPPercent, setHPPercent] = useState(1);// 1–100%
  const [resistance, setResistance] = useState(1.00);//1-1.05 for now
  const [runeMastery, setRuneMastery] = useState(1.00);//1-1.05 for now

  useEffect(() => {
    loadGrimoire(),
    loadQueue()
  }, [])

  useEffect(() => {
    setCaptureSettings({
      tierMultiplier,
      grammarMultiplier,
      precision: precision / 100,
      attackerElement: selectedElement,
      defenderElement: "Plant",
      HPPercent: HPPercent / 100,
      resistance,
      runeMastery
    })
  }, [
    tierMultiplier,
    grammarMultiplier,
    precision,
    selectedElement,
    HPPercent,
    resistance,
    runeMastery
  ])
  console.log("Grimoire on load:", getGrimoire())

  return (
    <View style={{ padding: 40, backgroundColor: theme.background, flex: 1 }}>

      <Text style={{ color: theme.text, fontWeight: "bold" }}>Thorn Sprout Capture Test</Text>

      <Text style={{ color: theme.text }}>Tier Multiplier: {(tierMultiplier).toFixed(2)}</Text>
      <Slider
        minimumValue={1.00}
        maximumValue={1.07}
        value={tierMultiplier}
        onValueChange={setTierMultiplier}
        minimumTrackTintColor={theme.tint}
        maximumTrackTintColor="#888"
      />

      <Text style={{ color: theme.text }}>Grammar Multiplier: {(grammarMultiplier).toFixed(2)}</Text>
      <Slider
        minimumValue={1.00}
        maximumValue={1.05}
        value={grammarMultiplier}
        onValueChange={setGrammarMultiplier}
        minimumTrackTintColor={theme.tint}
        maximumTrackTintColor="#888"
      />

      <Text style={{ color: theme.text }}>Precision: {(precision).toFixed(2)}%</Text>
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

      <Text style={{ color: theme.text }}>Monster HP: {(HPPercent).toFixed(2)}%</Text>
      <Slider
        minimumValue={1}
        maximumValue={100}
        value={HPPercent}
        onValueChange={setHPPercent}
        minimumTrackTintColor={theme.tint}
        maximumTrackTintColor="#888"
      />

<Text style={{ color: theme.text }}>Resistance: {(resistance).toFixed(2)}</Text>
      <Slider
        minimumValue={1.00}
        maximumValue={1.05}
        value={resistance}
        onValueChange={setResistance}
        minimumTrackTintColor={theme.tint}
        maximumTrackTintColor="#888"
      />

<Text style={{ color: theme.text }}>Rune Mastery: {(runeMastery).toFixed(2)}</Text>
      <Slider
        minimumValue={1.00}
        maximumValue={1.05}
        value={runeMastery}
        onValueChange={setRuneMastery}
        minimumTrackTintColor={theme.tint}
        maximumTrackTintColor="#888"
      />

      <Text style={{ color: theme.text }}>
        Capture Chance: {(captureProbability({
          tierMultiplier: tierMultiplier,
          grammarMultiplier: grammarMultiplier,
          precision: precision / 100,
          attackerElement: selectedElement,
          defenderElement: "Plant",
          HPPercent: HPPercent / 100,
          resistance: resistance,
          runeMastery: runeMastery,
        }) * 100).toFixed(2)}%
      </Text>
    </View>
  );
}