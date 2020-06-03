import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

const color = "#ff8400";

const SubmitButton = ({ size = 35, onClick, title = "Submit" }) => {
  return (
    <TouchableOpacity
      style={[styles.submitContainer, { height: size }]}
      onPress={onClick}
    >
      <Text style={styles.submit}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  submitContainer: {
    backgroundColor: color,
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
