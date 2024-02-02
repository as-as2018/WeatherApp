import React, { useState, useEffect } from 'react';
import { API_KEY } from './utils/WeatherAPIKey';
import { StyleSheet,SafeAreaView, View, Image,Text,  Pressable,Platform   } from "react-native";
import Weather from './Components/Weather';
import * as Location from 'expo-location';
const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState(0);
  const [temperature, setTemperature] = useState(0);
  const [weatherCondition, setWeatherCondition] = useState(null);
  const getPermissions = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log("Please grant location permissions");
      return;
    }
  
    let currentLocation = await Location.getCurrentPositionAsync({});
    console.log("Location:");
    console.log(currentLocation);
    console.log(currentLocation.coords.latitude);
    console.log(currentLocation.coords.longitude);
    fetchWeather(currentLocation.coords.latitude,currentLocation.coords.longitude)
  };

  useEffect(() => {
    const currentLocation=getPermissions()
    console.log("currentLocation.coords.latitude",currentLocation);
     
  }, []);

  const fetchWeather = (lat, lon) => {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`
    )
      .then(res => res.json())
      .then(json => {
        console.log(json.name);
        setName(json.name);
        setTemperature(json.main.temp);
        setWeatherCondition(json.weather[0].main);
        setIsLoading(false);
      })
      .catch(error => {
        setError('Error Fetching Weather');
        setIsLoading(false);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Fetching The Weather</Text>
        </View>
      ) : (
        <Weather currentLocation={name} weather={weatherCondition} temperature={temperature} />
      )}
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  button: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFDE4'
  },
  loadingText: {
    fontSize: 30
  }
});

export default App;
