import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { useSafeArea } from "react-native-safe-area-context";
import Spinner from "react-native-loading-spinner-overlay";

import FullTextInput from "../../components/Authenticate/FullTextInput";
import SubmitButton from "../../components/SubmitButton";
import epValidator from "../../hooks/epValidator";
import ErrorText from "../../components/Authenticate/ErrorText";
import Colors from "../../constants/Colors";
import { resetPassword } from "../../hooks/forgotPassword";

const SetNewPassword = ({ navigation, route }) => {
  const [password, setPassword] = useState("");
  const [retype, setRetype] = useState("");
  const [passEnd, setPassEnd] = useState(false);
  const [reEnd, setReEnd] = useState(false);
  const [reError, setReError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const insets = useSafeArea();

  const { checkPassword, passwordError } = epValidator();
  const email = route.params.email;

  const checkRetype = (pass, retype) => {
    if (retype !== pass) return setReError("Password does not mismatch");
    return setReError("");
  };

  const handleSubmit = async () => {
    if (passwordError || reError) {
      setPassEnd(true);
      setReEnd(true);
      checkPassword(password);
      checkRetype(password, retype);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      await resetPassword(email, password);
      setIsLoading(false);
      navigation.navigate("Signin");
    } catch (e) {
      setError(e);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      Alert.alert("Error", error, [{ text: "Okay" }]);
    }
  }, [error]);

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
      <Text style={styles.heading}>Finally, choose a new password</Text>
      <Text style={styles.content}>
        Password must have at least 8 characters, contain at least one uppercase
        letter, at least one lower letter and at least one number or special
        character
      </Text>

      <Text style={styles.inputTitle}>
        New password <Text style={{ color: Colors.primaryOrange }}>*</Text>
      </Text>

      <FullTextInput
        placeholder="New password"
        autoCapitalize="none"
        secureTextEntry
        value={password}
        onChangeText={(pass) => {
          setPassword(pass);
          checkPassword(pass);
        }}
        onEndEditing={() => {
          setPassEnd(true);
          checkPassword(password);
        }}
      />

      {passEnd && passwordError && passwordError != "initial" ? (
        <ErrorText title={passwordError} />
      ) : null}

      <Text style={styles.inputTitle}>
        Retype new password{" "}
        <Text style={{ color: Colors.primaryOrange }}>*</Text>
      </Text>

      <FullTextInput
        placeholder="Retype new password"
        autoCapitalize="none"
        secureTextEntry={true}
        value={retype}
        onChangeText={(re) => {
          setRetype(re);
          checkRetype(password, re);
        }}
        onEndEditing={() => {
          setReEnd(true);
          checkRetype(password, retype);
        }}
      />

      {reEnd && reError ? <ErrorText title={reError} /> : null}

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
    fontSize: 26,
    fontWeight: "300",
  },

  content: {
    marginTop: 10,
    fontSize: 16,
  },

  inputTitle: {
    marginTop: 20,
  },

  button: {
    marginTop: 25,
  },
});

export default SetNewPassword;
