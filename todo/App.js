import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import { Fontisto } from "@expo/vector-icons";

export default function App() {
  const [travelling, setTravelling] = useState(false);
  const [text, setText] = useState("");
  const [todos, setTodos] = useState({});

  const travel = async () => {
    setTravelling(true);
  };
  const work = async () => {
    setTravelling(false);
  };

  const onChangeText = (payload) => setText(payload);
  const addTodo = async () => {
    if (text === "") return;

    const newTodos = {
      ...todos,
      [Date.now()]: { text, travelling, completed: false },
    };
    setTodos(newTodos);
    await storeData(newTodos);

    setText("");
  };
  const deleteTodo = async (id) => {
    Alert.alert("Delete Todo", "Are you sure?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          const newTodos = { ...todos };
          delete newTodos[id];
          setTodos(newTodos);
          await storeData(newTodos);
        },
      },
    ]);
  };

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@todos", jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@todos");
      setTodos(jsonValue != null ? JSON.parse(jsonValue) : null);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text
            style={{
              ...styles.buttonText,
              color: travelling ? "#3A3D40" : "white",
            }}
          >
            Work
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text
            style={{
              ...styles.buttonText,
              color: travelling ? "white" : "#3A3D40",
            }}
          >
            Travel
          </Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        value={text}
        placeholder={travelling ? "Add a To Do" : "Where do you want to go?"}
        onChangeText={onChangeText}
        returnKeyType="done"
        onSubmitEditing={addTodo}
      />
      <ScrollView>
        {Object.keys(todos).map((key) =>
          todos[key].travelling === travelling ? (
            <View key={key} style={styles.todo}>
              <Text style={styles.todoText}>{todos[key].text}</Text>
              <TouchableOpacity onPress={() => deleteTodo(key)}>
                <Fontisto name="trash" size={18} color={"#3A3D40"} />
              </TouchableOpacity>
            </View>
          ) : null
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingHorizontal: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 100,
  },
  buttonText: {
    fontSize: 38,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginVertical: 30,
    fontSize: 18,
  },
  todo: {
    backgroundColor: "#5C5C60",
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  todoText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
});