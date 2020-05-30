import React, { useState } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

const SignInput = ({
  name,
  icon = "",
  keyboardType = "default",
  secureTextEntry = false,
  value,
  onChangeText,
  onEndEditing,
  autoCapitalize = "sentences",
}) => {
  const [bottomColor, setBottomColor] = useState("black");
  const [visible, setVisible] = useState(keyboardType);
  const [eye, setEye] = useState("eye-off");

  return (
    <View style={[styles.container, { borderBottomColor: bottomColor }]}>
      {icon ? (
        <MaterialCommunityIcons
          name={icon}
          style={styles.iconStyle}
          color={bottomColor}
        />
      ) : null}

      <TextInput
        style={styles.inputStyle}
        autoCapitalize={autoCapitalize}
        placeholder={name}
        autoCorrect={false}
        keyboardType={visible}
        secureTextEntry={secureTextEntry}
        onFocus={() => {
          setBottomColor("#ff8400");
        }}
        onBlur={() => {
          setBottomColor("black");
        }}
        value={value}
        onChangeText={onChangeText}
        onEndEditing={onEndEditing}
      />

      {name == "Password" ? (
        <TouchableOpacity
          style={{ justifyContent: "center" }}
          onPress={() => {
            if (visible == "visible-password") {
              setEye("eye-off");
              setVisible("default");
            } else {
              setEye("eye");
              setVisible("visible-password");
            }
          }}
        >
          <MaterialCommunityIcons name={eye} style={styles.eye} />
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
    //marginHorizontal: 20,
    marginTop: 25,
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
