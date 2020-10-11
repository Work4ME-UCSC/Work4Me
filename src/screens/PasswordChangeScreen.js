import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { useSelector } from "react-redux";

import FullTextInput from "../components/Authenticate/FullTextInput";
import SubmitButton from "../components/SubmitButton";
import epValidator from "../hooks/epValidator";
import ErrorText from "../components/Authenticate/ErrorText";
import Colors from "../constants/Colors";
import workApi from "../api/workApi";

const SetNewPassword = ({ navigation, route }) => {
  const [password, setPassword] = useState("");
  const [retype, setRetype] = useState("");
  const [passEnd, setPassEnd] = useState(false);
  const [reEnd, setReEnd] = useState(false);
  const [reError, setReError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const { checkPassword, passwordError } = epValidator();
  const oldPassword = route.params.password;

  const checkRetype = (pass, retype) => {
    if (retype !== pass) return setReError("Password does not mismatch");
    return setReError("");
  };

  const token = useSelector((state) => state.auth.token);

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
      await workApi.patch(
        "/users/updatePassword",
        { oldPassword, newPassword: password },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsLoading(false);
      navigation.navigate("Account");
    } catch (e) {
      console.log(e);
      //setError(e);
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
        textContent={"Please wait..."}
        color={Colors.primaryOrange}
        overlayColor="rgba(10, 0, 0, 0.25)"
      />
    );
  }

  return (
    <View style={styles.container}>
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
