import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

import { Text, useThemeColor, View } from "../components/Themed";
import { PrimaryColorLight } from "../constants/Colors";
import { useGlobalContext } from "../hooks/globalContext";

export default function SettingsScreen() {
  const { posts, selectedUser, setSelectedUser } = useGlobalContext();
  const [users, setUsers] = useState<string[]>(["All"]);

  const color = useThemeColor({}, "text");
  const backgroundColor = useThemeColor({}, "background");

  useEffect(() => {
    setUsers([
      "All",
      ...new Set(
        posts
          .map((item) => item.userId.toString())
          .sort((a, b) => parseInt(a) - parseInt(b))
      ),
    ]);
  }, [posts]);

  const renderList = () => {
    return users.map((user, itemIndex) => {
      return <Picker.Item key={itemIndex} label={user} value={user} />;
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.listItem}>
          <Text>Filter by user Id: </Text>
        </View>
        <Picker
          style={{ color }}
          dropdownIconColor={color}
          selectedValue={selectedUser}
          onValueChange={(itemValue, itemIndex) => setSelectedUser(itemValue)}
          itemStyle={{ backgroundColor, color }}
        >
          {renderList()}
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  row: {
    borderBottomWidth: 1,
    borderBottomColor: "grey",
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: PrimaryColorLight,
  },
});
