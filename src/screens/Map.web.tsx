import { View, Text, StyleSheet } from "react-native";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors } from "@/constants/theme";

export default function MapScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Web Map Placeholder</Text>
      <Text style={styles.subtitle}>
        Native maps load on Android device.
      </Text>
    </View>
  );
}

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.background,
    },
    title: {
      fontSize: 22,
      fontWeight: "bold",
      color: theme.text,
    },
    subtitle: {
      marginTop: 10,
      fontSize: 16,
      color: theme.text,
    },
  });