import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

import PasswordInput from "../components/Authenticate/PasswordInput";

const PasswordConfirmScreen = () => {
  const [password, setPassword] = useState("");
  const passwordInputHandler = (password) => {
    setPassword(password);
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.heading}>First confirm your password</Text>
      <PasswordInput
        label="Password"
        placeholder="Password"
        blurOnSubmit
        value={password}
        onChangeText={passwordInputHandler}
      />
      <Button mode="contained">Next</Button>
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
