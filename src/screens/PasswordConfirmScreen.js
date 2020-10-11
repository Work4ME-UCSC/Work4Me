import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { Button } from "react-native-paper";
import { useSelector } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";

import PasswordInput from "../components/Authenticate/PasswordInput";
import ErrorText from "../components/Authenticate/ErrorText";
import Colors from "../constants/Colors";
import workApi from "../api/workApi";

const PasswordConfirmScreen = ({ navigation, route }) => {
  const navMode = route.params.nav;

  const [password, setPassword] = useState("");
  const [inputError, setInputError] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const token = useSelector((state) => state.auth.token);

  const passwordInputHandler = (password) => {
    if (password.length < 8) setInputError(true);
    else setInputError(false);
    setPassword(password);
  };

  const onSubmitHandler = async () => {
    try {
      setError();
      setIsLoading(true);
      await workApi.post(
        "/users/verifyPassword",
        { password },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsLoading(false);
      navigation.navigate(navMode, { password });
    } catch (e) {
      setIsLoading(false);
      if (e.response.data === "Incorrect Password")
        setError("Incorrect Password");
      else setError("Something went wrong");
    }
  };

  useEffect(() => {
    if (error) Alert.alert("Error", error, [{ text: "Okay" }]);
  }, [error]);

  if (isLoading) {
    return (
      <Spinner
        visible={isLoading}
        textContent={"Please wait..."}
        color={Colors.red}
        overlayColor="rgba(10, 0, 0, 0.25)"
      />
    );
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.heading}>
        First confirm your password to continue
      </Text>
      <PasswordInput
        label="Password"
        placeholder="Password"
        blurOnSubmit
        value={password}
        onChangeText={passwordInputHandler}
      />
      {inputError && (
        <ErrorText title="Please enter a password of 8 characters" />
      )}
      <Button
        mode="contained"
        color={Colors.primaryOrange}
        labelStyle={{ color: Colors.white, fontSize: 18 }}
        onPress={onSubmitHandler}
        disabled={inputError}
        style={{ marginTop: 20 }}
      >
        Next
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },

  heading: {
    marginBottom: 10,
  },
});

export default PasswordConfirmScreen;
