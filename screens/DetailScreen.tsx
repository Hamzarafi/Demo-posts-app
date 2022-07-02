import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";

import DetailView from "../components/DetailView";
import { Text, View } from "../components/Themed";

interface Props {
  route: any;
  navigation: any;
}

export default function DetailScreen({ route, navigation }: Props) {
  return (
    <View style={styles.container}>
      <DetailView item={route.params.item} navigation={navigation} />
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
