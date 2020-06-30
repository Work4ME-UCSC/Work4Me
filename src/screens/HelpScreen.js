import React from "react";
import { View, Text, StyleSheet } from "react-native";

const HelpScreen = () => {
  return (
    <View style={styles.screen}>
      <Text>Help</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HelpScreen;
