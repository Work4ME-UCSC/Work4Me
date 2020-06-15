import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useSafeArea } from "react-native-safe-area-context";

import FullTextInput from "../../components/Authenticate/FullTextInput";
import SubmitButton from "../../components/Authenticate/SubmitButton";
import ErrorText from "../../components/Authenticate/ErrorText";

const color = "#ff8400";

const ForgotVerificationScreen = ({ navigation }) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [inputError, setInputError] = useState(false);

  const insets = useSafeArea();

  const handleInput = (code) => {
    setCode(code.replace(/[^0-9]/g, ""));
  };

  let errorMessage;

  const handleSubmit = () => {
    if (code.length !== 4) {
      setInputError(true);
      return;
    }
    setInputError(false);
    navigation.navigate("NewPassword");
  };

  if (inputError)
    errorMessage = (
      <ErrorText
        title="Length of code should be 4 "
        icon="alert-circle-outline"
      />
    );

  return (
    <View
      style={{
        ...styles.container,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      {error ? (
        <ErrorText
          icon="alert-circle-outline"
          title="The verification code you entered isn't valid. Please check the code and try again"
        />
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
        maxLength={4}
      />

      {errorMessage}

      <View style={styles.resendContainer}>
        <Text style={{ fontSize: 16 }}>Didn't receive the code? </Text>

        <TouchableOpacity>
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
    color,
    fontSize: 16,
    marginBottom: 5,
  },
});

export default ForgotVerificationScreen;
