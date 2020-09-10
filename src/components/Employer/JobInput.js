import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Color from "../../constants/Colors";
import ErrorText from "../Authenticate/ErrorText";

const JobInput = (props) => {
  const [borderColor, setBorderColor] = useState("black");

  return (
    <View>
      <Text style={{ ...styles.title, color: borderColor }}>{props.label}</Text>
      <View style={{ marginBottom: 25 }}>
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
        {!props.error && <ErrorText title={props.errorMessage} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
  },

  inputContainer: {
    borderWidth: 1,
    flexDirection: "row",
    marginTop: 5,
    padding: 10,
    borderRadius:5,
    //marginBottom: 15,
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
