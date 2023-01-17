import {
    requestForegroundPermissionsAsync,
    getCurrentPositionAsync,
    reverseGeocodeAsync,
  } from "expo-location";
  import { useState, useEffect } from "react";
  import axios from "axios";
  import { View, Text, StyleSheet, Dimensions } from "react-native";
  import Details from "./Detail";
  
  const API_KEY = "df78dc40d91eeaeca3b63966b8b6d21e";
  const width = Dimensions.get("window").width;
  
  export default function Weather() {
    const [location, setLocation] = useState<any>(null);
    const [city, setCity] = useState<string | null>("");
    const [street, setStreet] = useState<string | null>("");
    const [weather, setWeather] = useState<string | null>("");
    const [temperature, setTemperature] = useState<number | null>(null);
    const [feelsLike, setFeelsLike] = useState<number | null>(null);
    const [humidity, setHumidity] = useState<number | null>(null);
    const [pressure, setPressure] = useState<number | null>(null);
    const [windSpeed, setWindSpeed] = useState<number | null>(null);
    const [windDeg, setWindDeg] = useState<number | null>(null);
    const [sunrise, setSunrise] = useState<number>(0);
    const [sunset, setSunset] = useState<number>(0);
  
    const getLocation = async () => {
      const location = await getCurrentPositionAsync();
      const { latitude, longitude } = location.coords;
  
      setLocation(location.coords);
  
      await reverseGeocodeAsync({ latitude, longitude }).then((response) => {
        const data = response[0];
  
        if (data.district) setStreet(data.district);
        else if (data.street) setStreet(data.street);
        else if (data.name) setStreet(data.name);
        else setStreet("Unknown");
  
        if (data.city) setCity(data.city);
        else if (data.region) setCity(data.region);
        else setCity("Unknown");
      });
    };
    const getWeatherData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${API_KEY}&units=metric&lang=kr`
        );
  
        setTemperature(response.data.main.temp);
        setWeather(response.data.weather[0].description);
        setFeelsLike(response.data.main.feels_like);
        setHumidity(response.data.main.humidity);
        setPressure(response.data.main.pressure);
        setWindSpeed(response.data.wind.speed);
        setWindDeg(response.data.wind.deg);
        setSunrise(response.data.sys.sunrise);
        setSunset(response.data.sys.sunset);
      } catch (error) {
        console.log(error);
      }
    };
    const getDateTime = () => {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hour = date.getHours();
      const minute = date.getMinutes();
  
      return `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분`;
    };
  
    useEffect(() => {
      getLocation();
    }, []);
  
    useEffect(() => {
      if (location) getWeatherData();
    }, [location]);
  
    return (
      <View style={styles.container}>
        <View style={styles.cityBox}>
          <Text style={styles.cityText}>{city}</Text>
          <Text style={styles.streetText}>{street}</Text>
        </View>
        <View style={styles.dateTimeBox}>
          <Text style={styles.now}>현재 날씨</Text>
          <Text style={styles.now}>{`${getDateTime()} `}</Text>
        </View>
        <Details 
          weather={weather}
          temperature={temperature}
          feelsLike={feelsLike}
          humidity={humidity}
          pressure={pressure}
          windSpeed={windSpeed}
          windDeg={windDeg}
          sunrise={sunrise}
          sunset={sunset}
        />
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: width,
    },
    cityBox: {
      flex: 1,
      width: width,
      alignItems: "center",
      justifyContent: "center",
    },
    cityText: {
      fontSize: 30,
      fontWeight: "bold",
    },
    streetText: {
      fontSize: 20,
    },
    dateTimeBox: {
      flex: 1,
      width: width,
    },
    now: {
      fontSize: 20,
    },
  });