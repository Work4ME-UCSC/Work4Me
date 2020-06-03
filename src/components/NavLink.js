import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const color = "#ff8400";

const NavLink = ({ title, button, onClick }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <TouchableOpacity onPress={onClick}>
        <Text style={styles.nav}>{button}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 25,
    alignSelf: "center",
  },

  title: {
    fontSize: 16,
    marginRight: 6,
  },

  nav: {
    color,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default NavLink;
