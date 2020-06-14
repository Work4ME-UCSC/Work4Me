import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

import FullTextInput from "../../components/Authenticate/FullTextInput";
import SubmitButton from "../../components/Authenticate/SubmitButton";
import epValidator from "../../hooks/epValidator";
import ErrorText from "../../components/Authenticate/ErrorText";

const color = "#ff8400";

const SerNewPassword = () => {
  const [password, setPassword] = useState("");
  const [retype, setRetype] = useState("");
  const [passEnd, setPassEnd] = useState(false);
  const [reEnd, setReEnd] = useState(false);
  const [reError, setReError] = useState("");

  const { checkPassword, passwordError } = epValidator();

  const checkRetype = (pass, retype) => {
    if (retype != pass) return setReError("Password does not mismatch");
    return setReError("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Finally, choose a new password</Text>
      <Text style={styles.content}>
        Password must include at least 8 characters including at least 1 number
        and 1 special character
      </Text>

      <Text style={styles.inputTitle}>
        New password <Text style={{ color }}>*</Text>
      </Text>

      <FullTextInput
        placeholder="New password"
        autoCapitalize="none"
        secureTextEntry={true}
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

      <SubmitButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 60,
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
});

export default SerNewPassword;
