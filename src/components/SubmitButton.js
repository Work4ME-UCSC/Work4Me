import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

const SubmitButton = ({
  size = 35,
  onClick,
  title = "Submit",
  color = "#ff8400",
}) => {
  return (
    <TouchableOpacity
      style={[styles.submitContainer, { height: size, backgroundColor: color }]}
      onPress={onClick}
    >
      <Text style={styles.submit}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  submitContainer: {
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
