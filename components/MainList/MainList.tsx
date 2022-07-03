import { TouchableOpacity, StyleSheet, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { SwipeListView } from "react-native-swipe-list-view";
import { FontAwesome } from "@expo/vector-icons";

import { Text, View } from "../../components/Themed";
import ListItem from "./ListItem";
import { API_URL } from "../../constants/URLs";
import { useGlobalContext } from "../../hooks/globalContext";

const MainList = ({ navigation }: any) => {
  const { posts, setPosts, selectedUser, setSelectedUser } = useGlobalContext();

  const [isLoading, setIsLoading] = useState(false);
  const [postsToShow, setPostsToShow] = useState<PostType[]>([]);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (posts) {
      if (selectedUser == "All") {
        setPostsToShow(posts);
      } else {
        setPostsToShow([
          ...posts.filter((item) => item.userId == selectedUser),
        ]);
      }
    }
  }, [selectedUser, posts]);

  const renderPost = ({ item }: { item: PostType }) => (
    <ListItem navigation={navigation} item={item} />
  );

  const renderHidden = (rowData: any, rowMap: any) => (
    <View style={styles.rowBack}>
      <TouchableOpacity onPress={() => deleteRow(rowMap, rowData.item.id)}>
        <FontAwesome
          name="trash-o"
          size={20}
          color={"red"}
          style={{ marginRight: 30 }}
        />
      </TouchableOpacity>
    </View>
  );

  const getData = () => {
    setIsLoading(true);
    fetch(API_URL + "/posts")
      .then((response) => response.json())
      .then((json) => setPosts(json))
      .then(() => setSelectedUser("All"))
      .finally(() => setIsLoading(false));
  };

  const deleteRow = (rowMap: any, rowKey: any) => {
    Alert.alert("Attention", "Are you sure you want to delete this item?", [
      {
        text: "Cancel",
        onPress: () => {
          rowMap[rowKey].closeRow();
        },
      },
      {
        text: "Delete",
        onPress: () =>
          fetch(API_URL + `/posts/${rowKey}`, {
            method: "DELETE",
          }).then(() => {
            rowMap[rowKey].closeRow();
            const newData = [...posts];
            const prevIndex = posts.findIndex(
              (element) => element.id === rowKey
            );
            newData.splice(prevIndex, 1);
            setPosts(newData);
          }),
      },
    ]);
  };

  return (
    <View style={{ flex: 1, marginTop: 50, width: "100%" }}>
      <SwipeListView<PostType>
        useFlatList={true}
        data={postsToShow}
        renderItem={renderPost}
        refreshing={isLoading}
        onRefresh={getData}
        keyExtractor={(post) => post.id.toString()}
        renderHiddenItem={renderHidden}
        disableRightSwipe={true}
        rightOpenValue={-75}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  rowBack: {
    position: "absolute",
    right: 0,
    top: 23,
  },
});

export default MainList;
