import { Text, View } from "../../components/Themed";
import React, { useEffect, useState } from "react";
import { Button, StyleSheet, TextInput } from "react-native";

interface Props {
  item: PostType;
}

const DetailView = ({ item }: Props) => {
  const [editMode, setEditMode] = useState(false);

  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [user, setUser] = useState<string>("");

  const buttonClick = () => {
    if (editMode) {
      if (title == "" || body == "" || user == "") {
        alert("Please fill in all the fields");
        return;
      }

      try {
        const userId = parseInt(user);
      } catch (error) {
        alert("UserId should be a number");
      }

      //save request
      setEditMode(false);
    } else {
      setEditMode(true);
    }
  };

  useEffect(() => {
    if (item) {
      setTitle(item.title);
      setBody(item.body);
      setUser(item.userId);
    }
  }, []);

  return (
    <View>
      {editMode ? (
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
      ) : (
        <View>
          <View
            lightColor="#eee"
            darkColor="rgba(255,255,255,0.1)"
            style={styles.item}
          >
            <View lightColor="#eee" darkColor="rgba(255,255,255,0.0)">
              <Text style={styles.title}>{item.title}</Text>
              <Text
                lightColor="gray"
                darkColor="lightgray"
                style={styles.textBody}
              >
                {item.body}
              </Text>
              <Text
                lightColor="gray"
                darkColor="lightgray"
                style={styles.textBody}
              >
                By User: {item.userId}
              </Text>
            </View>
          </View>
        </View>
      )}
      <View style={{ marginLeft: 20, marginRight: 20 }}>
        <Button
          title={editMode ? "Save" : "Edit"}
          onPress={buttonClick}
          color={"grey"}
        />
        {editMode && (
          <View style={{ marginTop: 10 }}>
            <Button
              title={"Cancel"}
              onPress={() => setEditMode(false)}
              color={"lightgrey"}
            />
          </View>
        )}
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

export default DetailView;
