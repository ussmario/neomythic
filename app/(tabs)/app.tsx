import React from "react";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CaptureSimulator from "../../src/screens/CaptureSimulator";


export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight || 0 }}>
      <CaptureSimulator />
    </SafeAreaView>
  );
}