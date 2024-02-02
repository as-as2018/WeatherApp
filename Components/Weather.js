import React from "react";
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
