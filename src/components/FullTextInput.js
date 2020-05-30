import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

const FullTextInput = ({ placeholder }) => {
  return (
    <View style={styles.container}>
      <TextInput style={styles.inputStyle} placeholder={placeholder} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    marginTop: 10,
    height: 35,
    justifyContent: "center",
    borderRadius: 3,
    borderRadius: 3,
  },

  inputStyle: {
    marginLeft: 10,
    fontSize: 16,
    flex: 1,
  },
});

export default FullTextInput;
