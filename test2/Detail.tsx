import { View, Text, StyleSheet } from "react-native";

interface Props {
  temperature: number | null;
  weather: string | null;
  feelsLike: number | null;
  humidity: number | null;
  pressure: number | null;
  windSpeed: number | null;
  windDeg: number | null;
  sunrise: number;
  sunset: number;
}

export default function Details(props : Props) {
  return (
    <View style={styles.weatherBox}>
      <Text style={styles.temperature}>{`${props.temperature}\xB0C`}</Text>
      <Text style={styles.weather}>{props.weather}</Text>
      <Text style={styles.weather}>{`체감온도: ${props.feelsLike}\xB0C`}</Text>
      <Text style={styles.weather}>{`습도: ${props.humidity}%`}</Text>
      <Text style={styles.weather}>{`기압: ${props.pressure}hPa`}</Text>
      <Text style={styles.weather}>{`풍속: ${props.windSpeed}m/s`}</Text>
      <Text style={styles.weather}>{`풍향: ${props.windDeg}\xB0`}</Text>
      <Text style={styles.weather}>{`일출: ${new Date(
        props.sunrise * 1000
      )}`}</Text>
      <Text style={styles.weather}>{`일몰: ${new Date(
        props.sunset * 1000
      )}`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  weatherBox: {
    flex: 4,
  },
  temperature: {
    fontSize: 50,
    fontWeight: "bold",
  },
  weather: {
    fontSize: 30,
  },
});