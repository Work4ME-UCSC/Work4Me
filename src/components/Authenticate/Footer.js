import React from "react";
import { View, Text, StyleSheet } from "react-native";

import SubmitButton from "../SubmitButton";
import NavLink from "./NavLink";

const Footer = ({ mainBtnTitle, onClick, navTitle, navBtn, navClick }) => {
  return (
    <View style={styles.container}>
      <SubmitButton
        title={mainBtnTitle}
        onClick={onClick}
        style={styles.button}
      />
      <View style={styles.orContainer}>
        <View style={styles.horozontalLine}></View>
        <Text style={{ marginHorizontal: 5 }}>OR</Text>
        <View style={styles.horozontalLine}></View>
      </View>

      <NavLink title={navTitle} button={navBtn} onClick={navClick} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    flex: 1,
  },

  orContainer: {
    flexDirection: "row",
    //marginVertical: 20,
  },

  horozontalLine: {
    borderWidth: 0.5,
    borderColor: "#999999",
    alignSelf: "flex-start",
    flex: 1,
    marginVertical: 10,
  },

  button: {
    height: 40,
    marginTop: 25,
  },
});

export default Footer;
