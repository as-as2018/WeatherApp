# Weather App Using Expo React-Native
1. ```npx create-expo-app WeatherApp```
2. ```cd WeatherApp``` 
3. ```npx expo start```
4. ```npx expo install react-dom react-native-web @expo/metro-runtime @expo/webpack-config``` for web support
5. ```npx expo install expo-location``` to get the current colocation
6. ```npx expo install react-native-maps``` for map view.
7. get api key from https://openweathermap.org/ for that you need to create account.
8. Create Components directory and inside it create Weather.js components
``` import React from "react";
    import { View, Text, StyleSheet } from "react-native";
    import { MaterialCommunityIcons } from "@expo/vector-icons";
    import PropTypes from "prop-types";
    import { weatherConditions } from "../utils/WeatherConditions";

    const Weather = ({ currentLocation, weather, temperature }) => {
    if (weather != null) {
        return (
        <View
            style={[
            styles.weatherContainer,
            { backgroundColor: weatherConditions[weather].color },
            ]}
        >
            <View style={styles.headerContainer}>
            <View style={styles.tempWrapper}>
                <MaterialCommunityIcons
                size={72}
                name={weatherConditions[weather].icon}
                color={"#fff"}
                />
                <Text style={styles.tempText}>{temperature}˚</Text>
            </View>
            <View>
                <Text style={styles.locationText}>{currentLocation}</Text>
            </View>
            </View>
            <View style={styles.bodyContainer}>
            <Text style={styles.title}>{weatherConditions[weather].title}</Text>
            <Text style={styles.subtitle}>
                {weatherConditions[weather].subtitle}
            </Text>
            </View>
        </View>
        );
    } else {
        return (
        <View>
            <Text>Oh no, something went wrong</Text>
        </View>
        );
    }
    };

    Weather.propTypes = {
    temperature: PropTypes.number.isRequired,
    weather: PropTypes.string,
    };

    const styles = StyleSheet.create({
    weatherContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    headerContainer: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    tempWrapper: {
        flexDirection: "row",
    },
    locationText: {
        textAlign: "center",
        fontSize: 40,
        color: "#fff",
    },
    tempText: {
        fontSize: 72,
        color: "#fff",
        textAlign: "center",
    },
    bodyContainer: {
        flex: 2,
        alignItems: "center",
        justifyContent: "flex-end",
        alignItems: "center",
        marginBottom: 40,
    },
    title: {
        fontSize: 60,
        color: "#fff",
        textAlign: "center",
    },
    subtitle: {
        fontSize: 24,
        color: "#fff",
        textAlign: "center",
    },
    });

    export default Weather;
```
9. Create utils directory inside it create WeatherApiKey.js and put your api key inside it.
```
    export const API_KEY = 'YourKey';
```
10. create WeatherConditions.js inside utils directory put all weather condition css objects inside it.
```
    export const weatherConditions = {
    Rain: {
        color: '#005BEA',
        title: 'Raining',
        subtitle: 'Get a cup of coffee',
        icon: 'weather-rainy'
    },
    Clear: {
        color: '#f7b733',
        title: 'So Sunny',
        subtitle: 'It is hurting my eyes',
        icon: 'weather-sunny'
    },
    Thunderstorm: {
        color: '#616161',
        title: 'A Storm is coming',
        subtitle: 'Because Gods are angry',
        icon: 'weather-lightning'
    },
    Clouds: {
        color: '#1F1C2C',
        title: 'Clouds',
        subtitle: 'Everywhere',
        icon: 'weather-cloudy'
    },

    Snow: {
        color: '#00d2ff',
        title: 'Snow',
        subtitle: 'Get out and build a snowman for me',
        icon: 'weather-snowy'
    },
    Drizzle: {
        color: '#076585',
        title: 'Drizzle',
        subtitle: 'Partially raining...',
        icon: 'weather-hail'
    },
    Haze: {
        color: '#66A6FF',
        title: 'Haze',
        subtitle: 'Another name for Partial Raining',
        icon: 'weather-hail'
    },
    Mist: {
        color: '#3CD3AD',
        title: 'Mist',
        subtitle: "Don't roam in forests!",
        icon: 'weather-fog'
    }
    };
```
11. open App.js put these code inside it.
```
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
```
12. create build for that install ```npm install -g eas-cli```
13. run command ```eas build -p android```
