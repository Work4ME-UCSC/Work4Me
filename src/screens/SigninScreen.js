import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import SignInput from "../components/SignInput";
import SubmitButton from "../components/SubmitButton";
import ErrorText from "../components/ErrorText";
import NavLink from "../components/NavLink";
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
      console.log("Email and password are in correct format6");
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
          checkEmail(mail);
        }}
        onEndEditing={() => {
          setEmailEnd(true);
          checkEmail(email);
        }}
      />

      {emailEnd && emailError && emailError != "initial" ? (
        <ErrorText title={emailError} />
      ) : null}

      <SignInput
        name="Password"
        icon="lock"
        secureTextEntry={true}
        autoCapitalize="none"
        value={password}
        onChangeText={(pass) => {
          setPassword(pass);
          checkPassword(pass);
        }}
        onEndEditing={() => {
          setPasswordEnd(true);
          checkPassword(password);
        }}
      />

      {passwordEnd && passwordError && passwordError != "initial" ? (
        <ErrorText title={passwordError} />
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

      <SubmitButton
        size={40}
        title="LOGIN"
        onClick={() => onClickLogin(email, password)}
      />

      <NavLink
        title="Don't have an account?"
        button="SIGN UP"
        onClick={() => navigation.navigate("Signup")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: "center",
    //marginBottom: 60,
    marginHorizontal: 20,
    marginTop: 150,
    //borderWidth: 2,
  },

  heading: {
    fontSize: 35,
    fontWeight: "bold",
  },

  forgotPassword: {
    marginTop: 15,
  },
});

export default SigninScreen;
