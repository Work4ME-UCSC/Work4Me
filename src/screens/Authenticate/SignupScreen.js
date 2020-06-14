import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Input from "../../components/Authenticate/Input";
import ErrorText from "../../components/Authenticate/ErrorText";
import Footer from "../../components/Authenticate/Footer";
import epValidator from "../../hooks/epValidator";

const color = "#ff8400";

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [passwordEnd, setPasswordEnd] = useState(false);
  const [emailEnd, setEmailEnd] = useState(false);
  const [nameEnd, setNameEnd] = useState(false);
  const [phoneEnd, setPhoneEnd] = useState(false);

  const {
    checkEmail,
    checkPassword,
    emailError,
    passwordError,
  } = epValidator();

  const onClickCreate = (email, password) => {
    setNameEnd(true);
    setPhoneEnd(true);
    setEmailEnd(true);
    setPasswordEnd(true);
    checkEmail(email);
    checkPassword(password);

    if (!emailError && !passwordError) {
      console.log("Email and password are in correct format");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.heading}>Sign up</Text>
          </View>
          <View style={styles.footer}>
            <Input
              name="First name"
              place="First name"
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
              place="Tel no"
              icon="phone"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={(no) => {
                setPhone(no);
                //checkPassword(pass);
              }}
              onEndEditing={() => {
                setPhoneEnd(true);
                //checkPassword(password);
              }}
            />

            {phoneEnd && phone.length != 10 ? (
              <ErrorText title={"Please enter a valid phone number"} />
            ) : (
              <Text></Text>
            )}

            <Input
              name="Email"
              place="Email"
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
              place="Password (8+ characters)"
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
              onClick={() => onClickCreate(email, password)}
              navTitle="Already have an account?"
              navBtn="SIGN IN"
              navClick={() => navigation.navigate("Signin")}
              mystyle={{ flex: 1 }}
            />
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color,
  },

  header: {
    flex: 2,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  footer: {
    flex: 6,
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
