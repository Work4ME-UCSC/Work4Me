import React from "react";
import { View, Text, StyleSheet } from "react-native";

const MessageScreen = () => {
  return (
    <View style={styles.screen}>
      <Text>Message</Text>
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

export default MessageScreen;
