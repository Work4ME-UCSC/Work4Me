import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

const FullTextInput = (props) => {
  return (
    <View style={styles.container}>
      <TextInput
        {...props}
        style={styles.inputStyle}
        placeholderTextColor="gray"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    marginTop: 5,
    height: 40,
    justifyContent: "center",
    borderRadius: 8,
  },

  inputStyle: {
    marginLeft: 10,
    fontSize: 16,
    flex: 1,
  },
});

export default FullTextInput;
