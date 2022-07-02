import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";
import AddView from "../components/AddView";

import { Text, View } from "../components/Themed";

export default function AddModalScreen() {
  return (
    <View style={styles.container}>
      <AddView />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
