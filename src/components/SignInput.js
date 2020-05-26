import React, { useState } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

const SignInput = ({ name, icon, keyboardType, secureTextEntry }) => {
  const [bottomColor, setBottomColor] = useState("black");

  return (
    <View style={[styles.container, { borderBottomColor: bottomColor }]}>
      <MaterialCommunityIcons
        name={icon}
        style={styles.iconStyle}
        color={bottomColor}
      />
      <TextInput
        style={styles.inputStyle}
        autoCapitalize="none"
        placeholder={name}
        autoCorrect={false}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        onFocus={() => setBottomColor("#ff8400")}
        onBlur={() => setBottomColor("black")}
      />

      {name == "Password" ? (
        <TouchableOpacity style={{ justifyContent: "center" }}>
          <MaterialCommunityIcons name="eye" style={styles.eye} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderBottomWidth: 1,
    height: 40,
    marginHorizontal: 20,
    marginBottom: 30,
  },

  inputStyle: {
    flex: 1,
    fontSize: 18,
  },

  iconStyle: {
    fontSize: 24,
    alignSelf: "center",
    marginRight: 10,
  },

  eye: {
    fontSize: 24,
    alignSelf: "center",
    marginLeft: 10,
  },
});

export default SignInput;
