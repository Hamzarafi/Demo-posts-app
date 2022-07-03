import { Text, View, TextInput, Button } from "../Themed";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { API_URL } from "../../constants/URLs";
import { useGlobalContext } from "../../hooks/globalContext";
import { PrimaryColorDark, PrimaryColorLight } from "../../constants/Colors";

interface Props {
  navigation: any;
}

const AddView = ({ navigation }: Props) => {
  const { posts, setPosts } = useGlobalContext();

  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [user, setUser] = useState<string>("");

  const buttonClick = () => {
    try {
      const userId = parseInt(user);
      fetch(API_URL + "/posts", {
        method: "POST",
        body: JSON.stringify({
          title,
          body,
          userId,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => setPosts([...posts, json]));
      navigation.goBack();
    } catch (error) {
      alert("Something went wrong");
    }
  };

  useEffect(() => {}, []);

  return (
    <KeyboardAwareScrollView>
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
      <View style={{ marginLeft: 20, marginRight: 20 }}>
        <Button
          title={"Save"}
          onPress={buttonClick}
          disabled={title == "" || body == "" || user == ""}
        />
        <View style={{ marginTop: 10 }}>
          <Button title={"Cancel"} onPress={() => navigation.goBack()} />
        </View>
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

export default AddView;
