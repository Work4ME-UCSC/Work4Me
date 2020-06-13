import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import * as Animatable from "react-native-animatable";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const color = "#ff8400";
const { height } = Dimensions.get("screen");
const logo_height = height * 0.28;

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Animatable.Image
          animation="bounceIn"
          duration={2500}
          source={require("../../assets/logosample.png")}
          style={styles.logo}
          resizeMode="stretch"
        />
      </View>

      <Animatable.View style={styles.footer} animation="fadeInUpBig">
        <Text style={styles.title}>Find Your Jobs Easily...</Text>
        <Text style={styles.text}>Sign in with account</Text>

        <TouchableOpacity
          style={styles.getStart}
          onPress={() => navigation.navigate("Signin")}
        >
          <Text style={styles.textStart}>Get Started</Text>
          <MaterialCommunityIcons name="arrow-right" size={20} color="#fff" />
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color,
  },

  header: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },

  footer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 50,
  },

  logo: {
    width: logo_height,
    height: logo_height,
  },

  title: {
    color: "#05375a",
    fontSize: 30,
    fontWeight: "bold",
  },

  text: {
    color: "grey",
    marginTop: 5,
    fontSize: 16,
  },

  getStart: {
    width: 150,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    flexDirection: "row",
    backgroundColor: "black",
    alignSelf: "flex-end",
    marginTop: 30,
  },

  textStart: {
    color: "white",
    fontWeight: "bold",
    marginRight: 5,
  },
});

export default WelcomeScreen;
