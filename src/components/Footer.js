import React from "react";
import { View, Text, StyleSheet } from "react-native";

import SubmitButton from "./SubmitButton";
import NavLink from "./NavLink";

const Footer = ({ mainBtnTitle, navTitle, navBtn, navClick }) => {
  return (
    <View style={styles.container}>
      <SubmitButton size={40} title={mainBtnTitle} />
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
    marginVertical: 20,
  },

  horozontalLine: {
    borderWidth: 1,
    borderColor: "#a3a3a3",
    alignSelf: "flex-start",
    flex: 1,
    marginVertical: 10,
  },
});

export default Footer;
