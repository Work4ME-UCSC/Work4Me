import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useSafeArea } from "react-native-safe-area-context";
import Spinner from "react-native-loading-spinner-overlay";

import FullTextInput from "../../components/Authenticate/FullTextInput";
import SubmitButton from "../../components/SubmitButton";
import ErrorText from "../../components/Authenticate/ErrorText";
import Colors from "../../constants/Colors";
import { confirmOtp, sendOtp } from "../../hooks/forgotPassword";

const ForgotVerificationScreen = ({ navigation, route }) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [resend, setResend] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const email = route.params.email;

  const insets = useSafeArea();

  const handleInput = (code) => {
    setCode(code.replace(/[^0-9]/g, ""));
    if (code.length !== 6) setInputError(true);
    else setInputError(false);
  };

  let errorMessage;

  const handleSubmit = async () => {
    if (code.length !== 6) {
      setInputError(true);
      return;
    }
    setInputError(false);
    try {
      setIsLoading(true);
      setError("");
      setResend(false);
      await confirmOtp(email, code);
      setIsLoading(false);
      navigation.navigate("NewPassword", { email });
    } catch (e) {
      setIsLoading(false);
      setError(e);
    }
  };

  const handleResend = async () => {
    setError("");
    try {
      setIsLoading(true);
      await sendOtp(email);
      setResend(true);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      setError(e);
    }
  };

  if (inputError)
    errorMessage = (
      <ErrorText
        title="Length of code should be 6 "
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
    <View
      style={{
        ...styles.container,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      {error ? <ErrorText icon="alert-circle-outline" title={error} /> : null}

      {resend ? (
        <Text style={{ color: Colors.green, fontWeight: "bold", fontSize: 16 }}>
          Please check your email
        </Text>
      ) : null}

      <Text style={styles.heading}>We just sent you a verification code</Text>

      <Text style={styles.content}>
        We just sent a verification code to your email. If you don't see out
        email in your inbox, check your spam folder
      </Text>

      <FullTextInput
        placeholder="Enter code"
        keyboardType="number-pad"
        value={code}
        onChangeText={handleInput}
        maxLength={6}
      />

      {errorMessage}

      <View style={styles.resendContainer}>
        <Text style={{ fontSize: 16 }}>Didn't receive the code? </Text>

        <TouchableOpacity onPress={handleResend}>
          <Text style={styles.resend}>Resend</Text>
        </TouchableOpacity>
      </View>

      <SubmitButton style={styles.button} onClick={handleSubmit} />
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
    fontWeight: "300",
  },

  content: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 16,
  },

  resendContainer: {
    flexDirection: "row",
    marginTop: 15,
  },

  button: {
    marginTop: 25,
  },

  resend: {
    fontWeight: "bold",
    color: Colors.primaryOrange,
    fontSize: 16,
    marginBottom: 5,
  },
});

export default ForgotVerificationScreen;
