import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useSafeArea } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";

import Input from "../../components/Authenticate/Input";
import ErrorText from "../../components/Authenticate/ErrorText";
import Footer from "../../components/Authenticate/Footer";
import epValidator from "../../hooks/epValidator";
import Color from "../../constants/Colors";

import * as authActions from "../../store/actions/auth";

const SigninScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [passwordEnd, setPasswordEnd] = useState(false);
  const [emailEnd, setEmailEnd] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const dispatch = useDispatch();

  const {
    checkEmail,
    checkPassword,
    emailError,
    passwordError,
  } = epValidator();

  const onClickLogin = async (email, password) => {
    setEmailEnd(true);
    setPasswordEnd(true);
    checkEmail(email);
    checkPassword(password);

    if (!emailError && !passwordError) {
      setIsLoading(true);
      try {
        await dispatch(authActions.login({ email, password }));
      } catch (e) {
        //console.log(e.message);
        setError(e.message);
        setIsLoading(false);
      }
      setError(null);
    }
  };

  const onEndEmail = (email) => {
    if (email) {
      setEmailEnd(true);
      // checkEmail(email);
    }
  };

  const onEndPassword = (password) => {
    if (password) {
      setPasswordEnd(true);
      //checkPassword(password);
    }
  };

  const insets = useSafeArea();

  useEffect(() => {
    if (error) {
      Alert.alert("An Error occured", error, [{ text: "Okay" }]);
    }
  }, [error]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={{
            ...styles.container,
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
          }}
        >
          <View style={styles.header}>
            <Text style={styles.heading}>Sign in</Text>
          </View>

          <View style={styles.footer}>
            <Input
              name="Email Address"
              place="Email"
              icon="email"
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={(mail) => {
                setEmail(mail.replace(/\s/g, ""));
                checkEmail(mail);
              }}
              onEndEditing={() => onEndEmail(email)}
            />

            {emailEnd && emailError && emailError != "initial" ? (
              <ErrorText title={emailError} />
            ) : (
              <Text></Text>
            )}

            <Input
              name="Password"
              place="Password"
              icon="lock"
              secureTextEntry={true}
              autoCapitalize="none"
              value={password}
              onChangeText={(pass) => {
                setPassword(pass.replace(/\s/g, ""));
                checkPassword(pass);
              }}
              onEndEditing={() => onEndPassword(password)}
            />

            {passwordEnd && passwordError && passwordError != "initial" ? (
              <ErrorText title={passwordError} />
            ) : (
              <Text></Text>
            )}

            <TouchableOpacity
              style={styles.forgotPassword}
              onPress={() =>
                navigation.navigate("ForgotPassword", { mail: email })
              }
            >
              <Text
                style={{
                  color: Color.primaryOrange,
                  fontWeight: "bold",
                }}
              >
                FORGOT PASSWORD?
              </Text>
            </TouchableOpacity>

            {isLoading ? (
              <ActivityIndicator size="large" color={Color.primaryOrange} />
            ) : null}

            <Footer
              mainBtnTitle="LOGIN"
              onClick={() => onClickLogin(email, password)}
              navTitle="Don't have an account?"
              navBtn="SIGN UP"
              navClick={() => navigation.navigate("User")}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.primaryOrange,
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

  forgotPassword: {
    marginTop: 10,
    alignSelf: "flex-start",
  },
});

export default SigninScreen;
