import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";

import * as Animatable from "react-native-animatable";
import Swiper from "react-native-swiper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const color = "#ff8400";

const WelcomeScreen = ({ navigation }) => {
  const [viewAnimation, setViewAnimation] = useState(null);
  const [show, setShow] = useState(false);

  const onIndexChanged = (index) => {
    if (index == 3) {
      setViewAnimation("fadeInUpBig");
      setShow(true);
    } else {
      setViewAnimation(null);
      setShow(false);
    }
  };

  return (
    <Swiper
      loop={false}
      dot={<View style={styles.dot} />}
      activeDot={<View style={styles.activeDot} />}
      onIndexChanged={(index) => onIndexChanged(index)}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require("../../../assets/interview.png")}
            style={styles.logo}
            resizeMode="stretch"
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.title}>No Interviews</Text>
          <Text style={styles.text}>
            Find your favourite from the list of part time Jobs available
          </Text>
        </View>
      </View>

      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require("../../../assets/cv1.png")}
            style={styles.logo}
            resizeMode="stretch"
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.title}>No need CVs</Text>
          <Text style={styles.text}>Request part time job which suits you</Text>
        </View>
      </View>

      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require("../../../assets/money.png")}
            style={styles.logo}
            resizeMode="stretch"
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.title}>Earn within Hours</Text>
          <Text style={styles.text}>
            Complete the assigned job and earn within hours
          </Text>
        </View>
      </View>

      <View style={styles.container}>
        <View style={styles.header}>
          <Animatable.Image
            animation={show ? "fadeInUp" : null}
            duration={1000}
            source={require("../../../assets/logosample.png")}
            style={styles.logo}
            resizeMode="stretch"
          />
        </View>
        {show ? (
          <Animatable.View
            style={styles.footer}
            animation={viewAnimation}
            delay={0}
          >
            <Text style={styles.title}>Find Your Jobs Easily...</Text>
            <Text style={[styles.text, { alignSelf: "flex-start" }]}>
              Sign in with your account
            </Text>

            <TouchableOpacity
              style={styles.getStart}
              onPress={() => navigation.navigate("Signin")}
            >
              <Text style={styles.textStart}>Get Started</Text>
              <MaterialCommunityIcons
                name="arrow-right"
                size={20}
                color={color}
              />
            </TouchableOpacity>
          </Animatable.View>
        ) : null}
      </View>
    </Swiper>
  );
};

const { height } = Dimensions.get("screen");
const logo_height = height * 0.28;

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
    alignSelf: "center",
  },

  text: {
    color: "grey",
    marginTop: 15,
    fontSize: 16,
    alignSelf: "center",
    fontSize: 18,
  },

  getStart: {
    width: 150,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    flexDirection: "row",
    borderColor: color,
    borderWidth: 1,
    alignSelf: "flex-end",
    marginTop: 30,
  },

  textStart: {
    //color: "white",
    fontWeight: "bold",
    marginRight: 5,
  },

  dot: {
    backgroundColor: "#a3a3a3",
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 5,
    marginVertical: 3,
  },

  activeDot: {
    backgroundColor: color,
    width: 20,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 5,
    marginVertical: 3,
  },
});

export default WelcomeScreen;
