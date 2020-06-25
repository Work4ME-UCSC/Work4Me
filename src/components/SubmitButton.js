import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

import Color from "../constants/Colors";

const SubmitButton = ({ onClick, title = "Submit", style }) => {
  return (
    <TouchableOpacity
      style={{ ...styles.submitContainer, ...style }}
      onPress={() => onClick()}
    >
      <Text style={styles.submit}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  submitContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    height: 35,
    backgroundColor: Color.primaryOrange,
  },

  submit: {
    color: "white",
    fontWeight: "bold",
    fontSize: 24,
  },
});

export default SubmitButton;
