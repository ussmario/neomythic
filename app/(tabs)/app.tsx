import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CaptureSimulator from "../../src/screens/CaptureSimulator";
import { StatusBar } from "react-native/Libraries/Components/StatusBar/StatusBar";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight || 0 }}>
      <CaptureSimulator />
    </SafeAreaView>
  );
}