import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

import SignInput from "../components/SignInput";
import SubmitButton from "../components/SubmitButton";
import ErrorText from "../components/ErrorText";
import NavLink from "../components/NavLink";
import epValidator from "../hooks/epValidator";

const color = "#ff8400";

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

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
      <Text style={styles.heading}>Sign up</Text>

      <SignInput
        name="Name"
        icon="account"
        value={name}
        onChangeText={(name) => {
          setName(name);
          //checkEmail(mail);
        }}
        // onEndEditing={() => {
        //   setEmailEnd(true);
        //   checkEmail(email);
        // }}
      />

      {/* {emailEnd && emailError && emailError != "initial" ? (
        <ErrorText title={emailError} />
      ) : null} */}

      <SignInput
        name="Tel no"
        icon="phone"
        keyboardType="phone-pad"
        // value={password}
        // onChangeText={(pass) => {
        //   setPassword(pass);
        //   checkPassword(pass);
        // }}
        // onEndEditing={() => {
        //   setPasswordEnd(true);
        //   checkPassword(password);
        // }}
      />

      {/* {passwordEnd && passwordError && passwordError != "initial" ? (
        <ErrorText title={passwordError} />
      ) : null} */}

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

      <SubmitButton
        size={40}
        title="CREATE ACCOUNT"
        onClick={() => onClickLogin(email, password)}
      />

      <NavLink
        title="Already have an account?"
        button="SIGN IN"
        onClick={() => navigation.navigate("Signin")}
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
  },

  heading: {
    fontSize: 35,
    fontWeight: "bold",
  },
});

export default SignupScreen;
