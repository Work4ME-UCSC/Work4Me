import React, { useState } from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import validator from "validator";

import Input from "../components/Authenticate/Input";
import ErrorText from "../components/Authenticate/ErrorText";
import Colors from "../constants/Colors";

const EmailChangeScreen = () => {
  const [email, setEmail] = useState("");
  const [inputError, setInputError] = useState(true);
  const [error, setError] = useState();

  const inputHandler = (text) => {
    if (!validator.isEmail(text)) setInputError(true);
    else setInputError(false);
    setEmail(text);
  };

  const handleSubmit = () => {};

  return (
    <View style={{ marginTop: 20, marginHorizontal: 20 }}>
      <Text style={{ marginBottom: 10 }}>Enter New Email Address</Text>
      <Input
        name="Email Address"
        place="Email"
        icon="email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={inputHandler}
      />
      {inputError && <ErrorText title="Please enter a valid email address" />}
      <Button
        mode="contained"
        color={Colors.primaryOrange}
        labelStyle={{ color: Colors.white, fontSize: 18 }}
        style={{ marginTop: 20 }}
        disabled={inputError}
        onPress={handleSubmit}
      >
        Submit
      </Button>
    </View>
  );
};

export default EmailChangeScreen;
