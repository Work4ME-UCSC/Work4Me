import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const color = "#ff8400";

const SimpleInput = (props) => {
  const [borderColor, setBorderColor] = useState("black");
  const [isFoused, setIsFoused] = useState(false);

  const handelFocus = () => {
    setBorderColor(color);
    setIsFoused(true);
  };

  const handleBlur = () => {
    setBorderColor("black");
    setIsFoused(false);
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
      <TextInput
        {...props}
        style={{
          ...styles.input,
          ...props.style,
          borderBottomColor: borderColor,
        }}
        placeholderTextColor="grey"
        onFocus={handelFocus}
        onBlur={handleBlur}
      />
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    paddingHorizontal: 5,
    fontSize: 16,
  },

  label: {
    paddingHorizontal: 5,
  },
});

export default SimpleInput;
