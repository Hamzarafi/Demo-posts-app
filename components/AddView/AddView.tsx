import { Text, View } from "../Themed";
import React, { useEffect, useState } from "react";
import { Button, StyleSheet, TextInput } from "react-native";

const AddView = () => {
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [user, setUser] = useState<string>("");

  const buttonClick = () => {
    //save request
  };

  useEffect(() => {}, []);

  return (
    <View>
      <View>
        <View
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
          style={styles.item}
        >
          <View lightColor="#eee" darkColor="rgba(255,255,255,0.0)">
            <Text style={styles.label}>Title</Text>

            <TextInput
              style={styles.input}
              multiline
              numberOfLines={2}
              onChangeText={(val) => setTitle(val)}
              value={title}
              placeholder="Title"
              keyboardType="name-phone-pad"
            />

            <Text style={styles.label}>Body</Text>
            <TextInput
              style={styles.input}
              multiline
              numberOfLines={4}
              onChangeText={(val) => setBody(val)}
              value={body}
              placeholder="Body"
              keyboardType="name-phone-pad"
            />

            <Text style={styles.label}>User Id</Text>
            <TextInput
              style={styles.input}
              numberOfLines={1}
              onChangeText={(val) => setUser(val)}
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
          disabled={title !== "" || body !== "" || user !== ""}
          color={"grey"}
        />
        <View style={{ marginTop: 10 }}>
          <Button title={"Cancel"} onPress={() => {}} color={"lightgrey"} />
        </View>
      </View>
    </View>
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
