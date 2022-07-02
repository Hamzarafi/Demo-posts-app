import { FlatList } from "react-native";
import React, { useEffect, useState } from "react";

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

  const getData = () => {
    setIsLoading(true);

    fetch(API_URL + "/posts")
      .then((response) => response.json())
      .then((json) => setPosts(json))
      .then(() => setSelectedUser("All"))
      .finally(() => setIsLoading(false));
  };

  return (
    <View style={{ flex: 1, marginTop: 50, width: "100%" }}>
      <FlatList<PostType>
        data={postsToShow}
        renderItem={renderPost}
        refreshing={isLoading}
        onRefresh={getData}
        keyExtractor={(post) => post.id.toString()}
      />
    </View>
  );
};

export default MainList;
