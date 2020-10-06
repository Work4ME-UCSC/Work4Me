import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import validator from "validator";
import Spinner from "react-native-loading-spinner-overlay";

import SubmitButton from "../../components/SubmitButton";
import ErrorText from "../../components/Authenticate/ErrorText";
import FullTextInput from "../../components/Authenticate/FullTextInput";
import Colors from "../../constants/Colors";
import { sendOtp } from "../../hooks/forgotPassword";

const ForgotPassword = ({ navigation, route }) => {
  const [email, setEmail] = useState(route.params.mail);
  const [emailError, setEmailError] = useState("");
  const [emailValidation, setEmailValidation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailInput = (email) => {
    setEmail(email);
    if (!validator.isEmail(email)) setEmailError(true);
    else setEmailError(false);
  };

  let errorMessage;

  const handleSubmit = async () => {
    if (!validator.isEmail(email)) {
      setEmailError(true);
      return;
    }
    setEmailError("");
    try {
      setIsLoading(true);
      setEmailValidation("");
      await sendOtp(email);
      setIsLoading(false);
      navigation.navigate("ForgotVerify", { email });
    } catch (e) {
      setIsLoading(false);
      setEmailValidation(e);
    }
  };

  if (emailError)
    errorMessage = (
      <ErrorText
        title="Please enter a valid email address"
        icon="alert-circle-outline"
      />
    );

  if (isLoading) {
    return (
      <Spinner
        visible={isLoading}
        //textContent={"Please wait..."}
        color={Colors.primaryOrange}
        overlayColor="rgba(10, 0, 0, 0.25)"
      />
    );
  }

  return (
    <View style={styles.container}>
      {emailValidation ? (
        <ErrorText title={emailValidation} icon="alert-circle-outline" />
      ) : null}

      <Text style={styles.heading}>First, let's find your account</Text>

      <Text style={{ marginTop: 10 }}>
        Email <Text style={{ color: Colors.primaryOrange }}>*</Text>
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
