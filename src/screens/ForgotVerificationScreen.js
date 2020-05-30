import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

import Submit from "../components/SubmitButton";

import { MaterialCommunityIcons } from "@expo/vector-icons";

const color = "#ff8400";

const ForgotVerificationScreen = ({ navigation }) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  return (
    <View style={styles.container}>
      {error ? (
        <View
          style={{
            flexDirection: "row",
            marginBottom: 10,
          }}
        >
          <MaterialCommunityIcons
            name="alert-circle-outline"
            style={styles.icon}
          />
          <Text style={styles.error}>
            The verification code you entered isn't valid. Please check the code
            and try again
          </Text>
        </View>
      ) : null}

      <Text style={styles.heading}>We just sent you a verification code</Text>
      <Text style={styles.content}>
        We just sent a verification code to your email. If you don't see out
        email in your inbox, check your spam folder
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputStyle}
          placeholder="Enter code"
          keyboardType="number-pad"
          value={code}
          onChangeText={setCode}
        />
      </View>
      <View style={styles.resendContainer}>
        <Text style={{ fontSize: 16 }}>Didn't receive the code? </Text>

        <TouchableOpacity>
          <Text style={styles.resend}>Resend</Text>
        </TouchableOpacity>
      </View>

      <Submit onClick={() => navigation.navigate("NewPassword")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 60,
  },

  heading: {
    fontSize: 22,
    fontWeight: "300",
  },

  content: {
    marginTop: 10,
    fontSize: 16,
  },

  inputContainer: {
    borderWidth: 1,
    marginTop: 20,
    height: 35,
    justifyContent: "center",
    borderRadius: 3,
    //alignItems: "center",
    borderRadius: 3,
  },

  inputStyle: {
    marginLeft: 10,
    fontSize: 16,
    flex: 1,
  },

  resendContainer: {
    flexDirection: "row",
    marginTop: 15,
  },

  resend: {
    fontWeight: "bold",
    color,
    fontSize: 16,
    marginBottom: 10,
  },

  error: {
    fontWeight: "bold",
    color: "red",
    marginRight: 20,
  },

  icon: {
    fontSize: 16,
    color: "red",
    marginRight: 8,
    marginTop: 2,
  },
});

export default ForgotVerificationScreen;
