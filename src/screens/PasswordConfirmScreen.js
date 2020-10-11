import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

import PasswordInput from "../components/Authenticate/PasswordInput";
import ErrorText from "../components/Authenticate/ErrorText";
import Colors from "../constants/Colors";

const PasswordConfirmScreen = ({ navigation, route }) => {
  const navMode = route.params.nav;

  const [password, setPassword] = useState("");
  const [inputError, setInputError] = useState(true);
  const passwordInputHandler = (password) => {
    if (password.length < 8) setInputError(true);
    else setInputError(false);
    setPassword(password);
  };

  const onSubmitHandler = () => {
    navigation.navigate(navMode);
  };

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
