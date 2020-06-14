import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

const ErrorText = ({ icon, title }) => {
  return (
    <View style={styles.container}>
      {icon ? <MaterialCommunityIcons name={icon} style={styles.icon} /> : null}
      <Text style={styles.error}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 10,
    marginTop: 2,
  },

  icon: {
    fontSize: 16,
    color: "red",
    marginRight: 8,
    marginTop: 2,
  },

  error: {
    fontWeight: "bold",
    color: "red",
    marginRight: 20,
    fontSize: 13,
  },
});

export default ErrorText;
