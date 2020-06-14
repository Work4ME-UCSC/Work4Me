import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

import epValidator from "../../hooks/epValidator";
import SubmitButton from "../../components/Authenticate/SubmitButton";
import ErrorText from "../../components/Authenticate/ErrorText";
import FullTextInput from "../../components/Authenticate/FullTextInput";

const color = "#ff8400";

const ForgotPassword = ({ navigation, route }) => {
  const [email, setEmail] = useState(route.params.mail);
  const [emailEnd, setEmailEnd] = useState(false);
  const [emailValidation, setEmailValidation] = useState("");

  const { checkEmail, emailError } = epValidator();

  return (
    <View style={styles.container}>
      {emailValidation ? (
        <ErrorText
          title={`We couldn't find an account associated with ${email}`}
          icon="alert-circle-outline"
        />
      ) : null}

      <Text style={styles.heading}>First, let's find your account</Text>

      <Text style={{ marginTop: 10 }}>
        Email <Text style={{ color }}>*</Text>
      </Text>

      <FullTextInput
        placeholder="Enter your email"
        autoCapitalize="none"
        autoCorrect={false}
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

      <SubmitButton
        title="Find account"
        onClick={() => navigation.navigate("ForgotVerify")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 30,
  },

  heading: {
    fontSize: 22,
    marginTop: 10,
  },
});

export default ForgotPassword;
