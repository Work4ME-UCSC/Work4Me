import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

const Input = ({
  name,
  icon = "",
  keyboardType = "default",
  secureTextEntry = false,
  value,
  onChangeText,
  onEndEditing,
  autoCapitalize = "sentences",
  onSubmitEditing,
  blurOnSubmit,
}) => {
  const [borderColor, setBorderColor] = useState("black");
  const [titleColor, setTitleColor] = useState("black");
  const [visible, setVisible] = useState(false);
  const [placeholder, setPlaceholder] = useState(name);
  const [secure, setSecure] = useState(secureTextEntry);
  const [eye, setEye] = useState("eye-off");

  return (
    <View style={[styles.container, { borderBottomColor: borderColor }]}>
      {visible ? (
        <Text style={{ color: titleColor }}>{name}</Text>
      ) : (
        <Text></Text>
      )}

      <View style={styles.inputContainer}>
        <MaterialCommunityIcons
          name={icon}
          style={styles.iconStyle}
          color={borderColor}
        />

        <TextInput
          style={styles.inputStyle}
          placeholder={placeholder}
          placeholderTextColor="#8a8a8a"
          autoCapitalize={autoCapitalize}
          keyboardType={keyboardType}
          secureTextEntry={secure}
          onFocus={() => {
            setTitleColor("#ff8400");
            setBorderColor("#ff8400");
            setVisible(true);
            setPlaceholder("");
          }}
          onBlur={() => {
            setBorderColor("black");
            setPlaceholder(name);
            if (value) {
              setTitleColor("black");
              setVisible(true);
            } else setVisible(false);
          }}
          value={value}
          onChangeText={onChangeText}
          onEndEditing={onEndEditing}
        />

        {name == "Password" ? (
          <TouchableOpacity
            //style={{ alignSelf: "flex-end" }}
            onPress={() => {
              if (secure) {
                setEye("eye");
                setSecure(false);
              } else {
                setEye("eye-off");
                setSecure(true);
              }
            }}
          >
            <MaterialCommunityIcons name={eye} style={styles.eye} />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    height: 55,
  },

  inputContainer: {
    flexDirection: "row",
    flex: 1,
    alignItems: "flex-end",
  },

  inputStyle: {
    flex: 1,
    fontSize: 18,
    padding: 1,
  },

  iconStyle: {
    fontSize: 24,
    marginRight: 10,
    marginBottom: 2,
  },

  eye: {
    fontSize: 24,
    alignSelf: "flex-end",
    marginLeft: 10,
  },
});

export default Input;
