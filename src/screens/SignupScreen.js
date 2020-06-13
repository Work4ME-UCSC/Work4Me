import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

import Input from "../components/Input";
import ErrorText from "../components/ErrorText";
import Footer from "../components/Footer";
import epValidator from "../hooks/epValidator";

const color = "#ff8400";

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [passwordEnd, setPasswordEnd] = useState(false);
  const [emailEnd, setEmailEnd] = useState(false);
  const [nameEnd, setNameEnd] = useState(false);
  const [telEnd, setTelEnd] = useState(false);

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
      <View style={styles.header}>
        <Text style={styles.heading}>Sign up</Text>
      </View>
      <View style={styles.footer}>
        <Input
          name="First name"
          icon="account"
          value={name}
          onChangeText={(name) => {
            setName(name);
            //checkEmail(mail);
          }}
          onEndEditing={() => {
            setNameEnd(true);
            //checkEmail(email);
          }}
        />

        {nameEnd && !name ? (
          <ErrorText title={"Please enter your name"} />
        ) : (
          <Text></Text>
        )}

        <Input
          name="Tel no"
          icon="phone"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={(no) => {
            setPhone(no);
            //checkPassword(pass);
          }}
          onEndEditing={() => {
            setTelEnd(true);
            //checkPassword(password);
          }}
        />

        {telEnd && phone.length != 10 ? (
          <ErrorText title={"Please enter a valid phone number"} />
        ) : (
          <Text></Text>
        )}

        <Input
          name="Email"
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
        ) : (
          <Text></Text>
        )}

        <Input
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
        ) : (
          <Text></Text>
        )}

        <Footer
          mainBtnTitle="CREATE ACCOUNT"
          navTitle="Already have an account?"
          navBtn="SIGN IN"
          navClick={() => navigation.navigate("Signin")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color,
  },

  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  footer: {
    flex: 3,
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: "#fff",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },

  heading: {
    fontSize: 35,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default SignupScreen;
