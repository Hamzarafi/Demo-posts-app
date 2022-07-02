import { FlatList } from "react-native";
import React, { useEffect, useState } from "react";

import { Text, View } from "../../components/Themed";
import ListItem from "./ListItem";
import { API_URL } from "../../constants/URLs";
import { useGlobalContext } from "../../hooks/globalContext";

import Axios from "axios";

const MainList = ({ navigation }: any) => {
  const [isLoading, setIsLoading] = useState(false);

  const { posts, setPosts } = useGlobalContext();

  useEffect(() => {
    getData();
  }, []);

  const renderPost = ({ item }: { item: PostType }) => (
    <ListItem navigation={navigation} item={item} />
  );

  const getData = () => {
    setIsLoading(true);

    fetch(API_URL + "/posts")
      .then((response) => response.json())
      .then((json) => setPosts(json))
      .finally(() => setIsLoading(false));
  };

  return (
    <View style={{ flex: 1, marginTop: 50 }}>
      <FlatList<PostType>
        data={posts}
        renderItem={renderPost}
        refreshing={isLoading}
        onRefresh={getData}
        keyExtractor={(post) => post.id.toString()}
      />
    </View>
  );
};

export default MainList;
