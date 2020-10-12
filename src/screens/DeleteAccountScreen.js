import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { Button } from "react-native-paper";
import Spinner from "react-native-loading-spinner-overlay";
import { useDispatch } from "react-redux";

import FullTextInput from "../components/Authenticate/FullTextInput";
import Colors from "../constants/Colors";
import { deleteAccount } from "../store/actions/auth";

const DeleteAccountScreen = () => {
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const deleteHandler = async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(deleteAccount(password));
    } catch (e) {
      setError(e.message);
      setIsLoading(false);
    }
  };

  const submitHandler = () => {
    Alert.alert("Are you sure", "Do you really want to delete your account?", [
      { text: "No", style: "default" },
      {
        text: "yes",
        style: "destructive",
        onPress: deleteHandler,
      },
    ]);
  };

  useEffect(() => {
    if (error) Alert.alert("Error", error, [{ text: "Okay" }]);
  }, [error]);

  const passwordInput = (text) => {
    if (text.trim().length < 8) setIsValid(false);
    else setIsValid(true);

    setPassword(text);
  };

  return (
    <View style={styles.screen}>
      <Spinner
        visible={isLoading}
        textContent={"Please wait..."}
        color={Colors.red}
      />
      <Text style={{ marginBottom: 20 }}>
        Once you delete your account, there's no getting it back. Make sure you
        want to do this.
      </Text>
      <FullTextInput
        placeholder="Confirm by typing your password"
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={true}
        value={password}
        onChangeText={passwordInput}
      />
      <Button
        mode="contained"
        color={Colors.red}
        disabled={!isValid}
        style={styles.button}
        onPress={submitHandler}
      >
        Delete my account
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
  },

  button: {
    marginVertical: 30,
    borderRadius: 8,
    borderColor: Colors.red,
  },
});

export default DeleteAccountScreen;
