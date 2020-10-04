import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";

import Color from "../constants/Colors";

const SubmitButton = ({ onClick, title = "Submit", style }) => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <TouchableCmp onPress={() => onClick()}>
      <View style={{ ...styles.submitContainer, ...style }}>
        <Text style={styles.submit}>{title}</Text>
      </View>
    </TouchableCmp>
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
