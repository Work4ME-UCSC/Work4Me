import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const color = "#ff8400";

const SubmitButton = ({ onClick, title = "Submit" }) => {
  return (
    <TouchableOpacity style={styles.submitContainer} onPress={onClick}>
      <Text style={styles.submit}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  submitContainer: {
    backgroundColor: color,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
    borderRadius: 5,
  },

  submit: {
    color: "white",
    fontWeight: "bold",
    fontSize: 24,
  },
});

export default SubmitButton;
