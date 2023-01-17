import { StyleSheet, Text, View, Alert } from "react-native";
import { useEffect, useState } from "react";
import { requestForegroundPermissionsAsync } from "expo-location";
import Weather from "./Weather";

export default function App() {
  const [permission, setPermission] = useState(false);

  const getPermission = async () => {
    const { status } = await requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("위치 정보를 허용해주세요...");
      return;
    } else {
      setPermission(true);
    }
  };

  useEffect(() => {
    getPermission();
  }, []);

  if (!permission) return null;
  else {
    return (
      <View style={styles.container}>
        <Weather />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "center",
  },
  city: {
    color: "black",
    fontSize: 30,
  }
});