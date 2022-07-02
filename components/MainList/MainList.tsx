import { FlatList } from "react-native";
import React, { useEffect, useState } from "react";

import { Text, View } from "../../components/Themed";
import ListItem from "./ListItem";
import { API_URL } from "../../constants/URLs";
import Axios from "axios";

const MainList = ({ navigation }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    getData();
  }, []);

  const renderPost = ({ item }: { item: PostType }) => (
    <ListItem navigation={navigation} item={item} />
  );

  const getData = () => {
    let URL_POSTS = API_URL + "/posts";
    setIsLoading(true);
    console.log("refetching");

    Axios.get(URL_POSTS)
      .then((response) => {
        //console.log(response.data);
        setPosts(response.data);
      })
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
