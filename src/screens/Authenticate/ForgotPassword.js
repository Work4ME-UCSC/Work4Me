import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import validator from "validator";

import SubmitButton from "../../components/Authenticate/SubmitButton";
import ErrorText from "../../components/Authenticate/ErrorText";
import FullTextInput from "../../components/Authenticate/FullTextInput";

const color = "#ff8400";

const ForgotPassword = ({ navigation, route }) => {
  const [email, setEmail] = useState(route.params.mail);
  const [emailError, setEmailError] = useState(false);
  const [emailValidation, setEmailValidation] = useState("");

  const handleEmailInput = (email) => {
    setEmail(email);
  };

  let errorMessage;

  const handleSubmit = () => {
    if (!validator.isEmail(email)) {
      setEmailError(true);
      return;
    }
    setEmailError("");
    navigation.navigate("ForgotVerify");
  };

  if (emailError)
    errorMessage = (
      <ErrorText
        title="Please enter a valid email address"
        icon="alert-circle-outline"
      />
    );

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
        onChangeText={handleEmailInput}
      />

      {errorMessage}

      {/* {emailError ? <ErrorText title="emailError" /> : null} */}

      <SubmitButton
        style={styles.button}
        title="Find account"
        onClick={handleSubmit}
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

  button: {
    marginTop: 25,
  },
});

export default ForgotPassword;
