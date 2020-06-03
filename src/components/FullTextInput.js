import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

const FullTextInput = ({
  placeholder,
  autoCapitalize = "sentences",
  autoCorrect = true,
  secureTextEntry = false,
  keyboardType = "default",
  value,
  onChangeText,
  onEndEditing,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputStyle}
        placeholder={placeholder}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        value={value}
        onChangeText={onChangeText}
        onEndEditing={onEndEditing}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    marginTop: 5,
    height: 35,
    justifyContent: "center",
    borderRadius: 3,
  },

  inputStyle: {
    marginLeft: 10,
    fontSize: 16,
    flex: 1,
  },
});

export default FullTextInput;
