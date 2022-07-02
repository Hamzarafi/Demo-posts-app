import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";
import type { RouteProp } from "@react-navigation/native";

import DetailView from "../components/DetailView";

import { Text, View } from "../components/Themed";

interface Props {
  route: any;
  navigation: any;
}

export default function DetailScreen({ route, navigation }: Props) {
  return (
    <View style={styles.container}>
      <DetailView item={route.params.item} />
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
