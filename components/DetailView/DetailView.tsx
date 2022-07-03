import { Text, View, TextInput, Button } from "../../components/Themed";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { API_URL } from "../../constants/URLs";
import { useGlobalContext } from "../../hooks/globalContext";
import { PrimaryColorDark, PrimaryColorLight } from "../../constants/Colors";

interface Props {
  item: PostType;
  navigation: any;
}

const DetailView = ({ item, navigation }: Props) => {
  const { posts, setPosts } = useGlobalContext();

  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [user, setUser] = useState<string>("");
  const [post, setPost] = useState<PostType>(item);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
      setUser(post.userId);
    }
  }, [post]);

  const buttonClick = () => {
    if (editMode) {
      if (title == "" || body == "" || user == "") {
        alert("Please fill in all the fields");
        return;
      }

      try {
        const userId = parseInt(user);
        fetch(API_URL + `/posts/${item.id}`, {
          method: "PUT",
          body: JSON.stringify({
            id: item.id,
            title,
            body,
            userId,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        })
          .then((response) => response.json())
          .then((json) => {
            setPost(json);
            let newList = [
              ...posts.filter((item) => item.id !== json.id),
              json,
            ];
            newList.sort((a, b) => a.id - b.id);
            setPosts(newList);
          });
      } catch (error) {
        alert("Something went wrong");
      }

      setEditMode(false);
    } else {
      setEditMode(true);
    }
  };

  return (
    <KeyboardAwareScrollView>
      {editMode ? (
        <View>
          <View
            lightColor="#eee"
            darkColor="rgba(255,255,255,0.1)"
            style={styles.item}
          >
            <View lightColor="#eee" darkColor="rgba(255,255,255,0.0)">
              <Text
                lightColor={PrimaryColorLight}
                darkColor={PrimaryColorDark}
                style={styles.label}
              >
                Title
              </Text>
              <TextInput
                style={styles.input}
                multiline
                numberOfLines={2}
                onChangeText={(val) => setTitle(val)}
                value={title}
                placeholder="Title"
                keyboardType="name-phone-pad"
              />

              <Text
                lightColor={PrimaryColorLight}
                darkColor={PrimaryColorDark}
                style={styles.label}
              >
                Body
              </Text>
              <TextInput
                style={styles.input}
                multiline
                numberOfLines={4}
                onChangeText={(val) => setBody(val)}
                value={body}
                placeholder="Body"
                keyboardType="name-phone-pad"
              />

              <Text
                lightColor={PrimaryColorLight}
                darkColor={PrimaryColorDark}
                style={styles.label}
              >
                User Id
              </Text>
              <TextInput
                style={styles.input}
                numberOfLines={1}
                onChangeText={(val) => setUser(val.replace(/[^0-9]/g, ""))}
                value={user.toString()}
                placeholder="User Id"
                keyboardType="numeric"
              />
            </View>
          </View>
        </View>
      ) : (
        <View>
          <View
            lightColor="#eee"
            darkColor="rgba(255,255,255,0.1)"
            style={styles.item}
          >
            <View lightColor="#eee" darkColor="rgba(255,255,255,0.0)">
              <Text style={styles.title}>{post.title}</Text>
              <Text
                lightColor="gray"
                darkColor="lightgray"
                style={styles.textBody}
              >
                {post.body}
              </Text>
              <Text
                lightColor="gray"
                darkColor="lightgray"
                style={styles.textBody}
              >
                By User: {post.userId}
              </Text>
            </View>
          </View>
        </View>
      )}
      <View style={{ marginLeft: 20, marginRight: 20 }}>
        <Button title={editMode ? "Save" : "Edit"} onPress={buttonClick} />
        {editMode ? (
          <View style={{ marginTop: 10 }}>
            <Button title={"Cancel"} onPress={() => setEditMode(false)} />
          </View>
        ) : (
          <View style={{ marginTop: 10 }}>
            <Button title={"Back"} onPress={() => navigation.goBack()} />
          </View>
        )}
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  input: {
    margin: 12,
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
  label: {
    paddingTop: 5,
  },
  item: {
    padding: 15,
    borderRadius: 10,
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 20,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  textBody: {
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10,
  },
});

export default DetailView;
