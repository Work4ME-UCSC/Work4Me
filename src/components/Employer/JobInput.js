import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Color from "../../constants/Colors";

const JobInput = (props) => {
  const [borderColor, setBorderColor] = useState("black");

  return (
    <View>
      <Text style={{ ...styles.title, color: borderColor }}>{props.label}</Text>

      <View
        style={{
          ...styles.inputContainer,
          borderColor,
          ...props.style,
        }}
      >
        <MaterialCommunityIcons
          name={props.icon}
          style={{ ...styles.icon, color: borderColor }}
        />
        <TextInput
          {...props}
          placeholderTextColor="gray"
          style={styles.input}
          onFocus={() => setBorderColor(Color.primaryOrange)}
          onBlur={() => setBorderColor("black")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
  },

  inputContainer: {
    borderBottomWidth: 1,
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 25,
  },

  input: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 2,
  },

  icon: {
    marginRight: 5,
    fontSize: 25,
  },
});

export default JobInput;