import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import SignInput from "../components/SignInput";
import Submit from "../components/SubmitButton";
import epValidator from "../hooks/epValidator";

const color = "#ff8400";

const SigninScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [passwordEnd, setPasswordEnd] = useState(false);
  const [emailEnd, setEmailEnd] = useState(false);

  const {
    checkEmail,
    checkPassword,
    emailError,
    passwordError,
  } = epValidator();

  const onClickLogin = (email, password) => {
    setEmailEnd(true);
    setPasswordEnd(true);
    checkEmail(email);
    checkPassword(password);

    if (!emailError && !passwordError) {
      console.log("Email and password are in correct format5");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Sign in</Text>

      <SignInput
        name="Email Address"
        icon="email"
        autoCapitalize="none"
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

      {emailError && emailError != "initial" ? (
        <Text style={styles.error}>{emailError}</Text>
      ) : null}

      <SignInput
        name="Password"
        icon="lock"
        secureTextEntry={true}
        autoCapitalize="none"
        value={password}
        onChangeText={(pass) => {
          setPassword(pass);
          if (passwordEnd) checkPassword(pass);
        }}
        onEndEditing={() => {
          setPasswordEnd(true);
          checkPassword(password);
          onClickLogin(email, password);
        }}
      />

      {passwordError && passwordError != "initial" ? (
        <Text style={styles.error}>{passwordError}</Text>
      ) : null}

      <TouchableOpacity
        style={styles.forgotPassword}
        onPress={() => navigation.navigate("ForgotPassword", { mail: email })}
      >
        <Text
          style={{
            color,
            fontWeight: "bold",
          }}
        >
          FORGOT PASSWORD?
        </Text>
      </TouchableOpacity>

      <Submit title="LOGIN" onClick={() => onClickLogin(email, password)} />

      {/* <TouchableOpacity
        style={styles.loginButton}
        onPress={() => onClickLogin(email, password)}
      >
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity> */}

      <View style={styles.bottom}>
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
    //alignItems: "center",
    marginBottom: 60,
    marginHorizontal: 20,
  },

  heading: {
    fontSize: 30,
    fontWeight: "bold",
  },

  loginButton: {
    width: "100%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: color,
    borderRadius: 5,
    marginTop: 15,
  },

  loginText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
  },

  forgotPassword: {
    alignSelf: "flex-start",
    marginTop: 15,
  },

  signUp: {
    color: color,
    fontSize: 16,
    fontWeight: "bold",
  },

  error: {
    alignSelf: "flex-start",
    color: "#ff0000",
    fontSize: 12,
    fontWeight: "bold",
    margin: 1,
  },

  bottom: {
    flexDirection: "row",
    marginTop: 25,
    alignSelf: "center",
  },
});

export default SigninScreen;
