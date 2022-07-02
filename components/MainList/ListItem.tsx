import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Text, View } from "../../components/Themed";

interface Props {
  item: PostType;
  navigation: any;
}

const ItemTapHandler = (item: PostType, navigation: any) => {
  navigation.navigate("Detail", { item: item });
};

const ListItem = ({ item, navigation }: Props) => {
  return (
    <TouchableOpacity onPress={() => ItemTapHandler(item, navigation)}>
      <View
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
        style={styles.item}
      >
        <View
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.0)"
          style={styles.itemLeft}
        >
          <Text style={styles.itemText} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.itemText}>By User: {item.userId}</Text>
        </View>
        <View style={styles.circular}>{/* arrow here */}</View>
      </View>
    </TouchableOpacity>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  item: {
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    marginRight: 10,
    marginLeft: 10,
  },
  itemLeft: {
    flexDirection: "column",
  },
  itemText: {
    maxWidth: "95%",
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: "#55BCF6",
    borderWidth: 2,
    borderRadius: 5,
  },
});
