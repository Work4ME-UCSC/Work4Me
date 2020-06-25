import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { useSafeArea } from "react-native-safe-area-context";

import FullTextInput from "../../components/Authenticate/FullTextInput";
import SubmitButton from "../../components/SubmitButton";
import epValidator from "../../hooks/epValidator";
import ErrorText from "../../components/Authenticate/ErrorText";

const color = "#ff8400";

const SetNewPassword = () => {
  const [password, setPassword] = useState("");
  const [retype, setRetype] = useState("");
  const [passEnd, setPassEnd] = useState(false);
  const [reEnd, setReEnd] = useState(false);
  const [reError, setReError] = useState("");

  const insets = useSafeArea();

  const { checkPassword, passwordError } = epValidator();

  const checkRetype = (pass, retype) => {
    if (retype !== pass) return setReError("Password does not mismatch");
    return setReError("");
  };

  const handleSubmit = () => {
    if (passwordError || reError) {
      setPassEnd(true);
      setReEnd(true);
      checkPassword(password);
      checkRetype(password, retype);
      return;
    }
    console.log("Correct");
  };

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
        New password <Text style={{ color }}>*</Text>
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
        Retype new password <Text style={{ color }}>*</Text>
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
