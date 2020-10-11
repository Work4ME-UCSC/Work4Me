import React, { useState, useEffect } from "react";
import { View, Text, Alert } from "react-native";
import { Button } from "react-native-paper";
import validator from "validator";
import { useDispatch } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";

import Input from "../components/Authenticate/Input";
import ErrorText from "../components/Authenticate/ErrorText";
import Colors from "../constants/Colors";
import { changeEmail } from "../store/actions/auth";

const EmailChangeScreen = ({ navigation, route }) => {
  const [email, setEmail] = useState("");
  const [inputError, setInputError] = useState(true);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const password = route.params.password;

  const inputHandler = (text) => {
    if (!validator.isEmail(text)) setInputError(true);
    else setInputError(false);
    setEmail(text);
  };

  const handleSubmit = async () => {
    setError();
    setIsLoading(true);
    try {
      await dispatch(changeEmail(email, password));
      navigation.navigate("Account");
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      setError(e.message);
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
