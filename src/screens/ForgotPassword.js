import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import epValidator from "../hooks/epValidator";

const color = "#ff8400";

const ForgotPassword = ({ navigation, route }) => {
  const [email, setEmail] = useState(route.params.mail);
  const [emailEnd, setEmailEnd] = useState(false);
  const [emailValidation, setEmailValidation] = useState("");

  const { checkEmail, emailError } = epValidator();

  return (
    <View style={styles.container}>
      {emailValidation ? (
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <MaterialCommunityIcons
            name="alert-circle-outline"
            style={styles.icon}
          />
          <Text style={styles.error}>
            We couldn't find an account associated with {email}
          </Text>
        </View>
      ) : null}

      <Text style={styles.heading}>First, let's find your account</Text>

      <Text style={{ marginTop: 10 }}>
        Email <Text style={{ color }}>*</Text>
      </Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputStyle}
          placeholder="Enter your email"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          value={email}
          onChangeText={(mail) => {
            setEmail(mail);
            if (emailEnd) checkEmail(mail);
          }}
          onEndEditing={() => {
            setEmailEnd(true);
            checkEmail(email);
          }}
        />
      </View>

      {emailError && emailError != "initial" ? (
        <Text style={styles.error}>{emailError}</Text>
      ) : null}

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Find account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 30,
    //justifyContent: "center",
    //alignItems: "center",
  },

  heading: {
    fontSize: 22,
    marginTop: 25,
  },

  inputContainer: {
    borderWidth: 1,
    marginTop: 5,
    height: 35,
    justifyContent: "center",
    borderRadius: 3,
  },

  inputStyle: {
    marginLeft: 10,
    fontSize: 16,
  },

  button: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    height: 35,
    backgroundColor: color,
    borderRadius: 5,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },

  error: {
    fontWeight: "bold",
    color: "red",
  },

  icon: {
    fontSize: 16,
    color: "red",
    marginRight: 8,
    marginTop: 2,
  },
});

export default ForgotPassword;
