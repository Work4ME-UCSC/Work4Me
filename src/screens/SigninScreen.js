import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import SignInput from "../components/SignInput";

// const checkPassword = (password) => {
//   return password.length < 6 ? true : false;
// };

const SigninScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Sign in</Text>

      <SignInput
        name="Email Address"
        icon="email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        onEndEditing={() => console.log(email)}
      />

      <SignInput
        name="Password"
        icon="lock"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
        onEndEditing={() => setPasswordError("Password must be 6 characters")}
      />
      {passwordError != "" && password.length < 6 ? (
        <Text style={styles.error}>{passwordError}</Text>
      ) : null}
      <TouchableOpacity
        style={styles.forgotPassword}
        onPress={() => navigation.navigate("ForgotPassword")}
      >
        <Text
          style={{
            color: "#ff8400",
            fontWeight: "bold",
          }}
        >
          FORGOT PASSWORD?
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: "row", marginTop: 25 }}>
        <Text style={{ fontSize: 16 }}>Don't have an account? </Text>

        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.signUp}>SIGN UP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 60,
  },

  heading: {
    fontSize: 30,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginLeft: 20,
  },

  loginButton: {
    width: "90%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ff8400",
    borderRadius: 10,
    marginTop: 15,
  },

  loginText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
  },

  forgotPassword: {
    alignSelf: "flex-start",
    marginLeft: 20,
    marginTop: 15,
  },

  signUp: {
    color: "#ff8400",
    fontSize: 16,
    fontWeight: "bold",
  },

  error: {
    alignSelf: "flex-start",
    marginLeft: 20,
    color: "red",
    marginTop: 3,
  },
});

export default SigninScreen;
