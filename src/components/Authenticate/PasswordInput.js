import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const color = "#ff8400";

const PasswordInput = (props) => {
  const [borderColor, setBorderColor] = useState("black");
  const [isFoused, setIsFoused] = useState(false);
  const [secure, setSecure] = useState(true);

  const handelFocus = () => {
    setBorderColor(color);
    setIsFoused(true);
  };

  const handleBlur = () => {
    setBorderColor("black");
    setIsFoused(false);
  };

  const handlePasswordVisible = () => {
    secure ? setSecure(false) : setSecure(true);
  };

  return (
    <>
      {isFoused || props.value ? (
        <Text style={{ ...styles.label, color: borderColor }}>
          {props.label}
        </Text>
      ) : (
        <Text></Text>
      )}
      <View
        style={{ ...styles.inputContainer, borderBottomColor: borderColor }}
      >
        <TextInput
          {...props}
          style={{
            ...styles.input,
            ...props.style,
          }}
          placeholderTextColor="grey"
          onFocus={handelFocus}
          onBlur={handleBlur}
          autoCapitalize="none"
          secureTextEntry={secure}
          autoCorrect={false}
        />
        <TouchableOpacity onPress={handlePasswordVisible}>
          {secure ? (
            <MaterialCommunityIcons name="eye-off" size={24} color="black" />
          ) : (
            <MaterialCommunityIcons name="eye" size={24} color={color} />
          )}
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    paddingHorizontal: 5,
    fontSize: 16,
    flex: 1,
  },

  label: {
    paddingHorizontal: 5,
    marginBottom: 5,
  },

  inputContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    marginBottom: 20,
  },
});

export default PasswordInput;
