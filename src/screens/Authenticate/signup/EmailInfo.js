import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useSafeArea } from "react-native-safe-area-context";
import validator from "validator";
import { useDispatch } from "react-redux";

import SimpleInput from "../../../components/Authenticate/SimpleInput";
import SubmitButton from "../../../components/SubmitButton";
import ErrorText from "../../../components/Authenticate/ErrorText";
import myStyles from "./myStyles";
import Color from "../../../constants/Colors";

import { setUserEmail } from "../../../store/actions/signUpData";
import * as authActions from "../../../store/actions/auth";

const EmailInfo = ({ navigation }) => {
  const insets = useSafeArea();

  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [valError, setValError] = useState();

  const emailInputHandler = (email) => {
    setEmail(email);
  };

  const handleClickNext = async () => {
    if (!validator.isEmail(email)) {
      setError(true);
      return;
    }
    setError(false);
    dispatch(setUserEmail(email));
    setIsLoading(true);
    try {
      await dispatch(authActions.emailCheck({ email }));
      navigation.navigate("Password");
    } catch (e) {
      setValError(e.message);
      console.log(e.message);
      setIsLoading(false);
    }
    setValError(null);
  };

  let errorMessage;
  if (error)
    errorMessage = (
      <ErrorText
        title="Please enter a valid email address"
        icon="alert-circle-outline"
        style={myStyles.error}
      />
    );

  useEffect(() => {
    if (valError) {
      Alert.alert("An Error occured", valError, [{ text: "Okay" }]);
    }
  }, [valError]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={{
          ...myStyles.container,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        }}
      >
        <View style={myStyles.header}>
          <Text style={myStyles.heading}>Enter your email address</Text>
        </View>

        <View style={myStyles.footer}>
          {errorMessage}
          <SimpleInput
            label="Email Address"
            style={myStyles.input}
            placeholder="Email Address"
            autoCorrect={false}
            blurOnSubmit
            value={email}
            onChangeText={emailInputHandler}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          {isLoading ? (
            <ActivityIndicator size="large" color={Color.primaryOrange} />
          ) : (
            <SubmitButton
              title="Next"
              style={myStyles.button}
              onClick={handleClickNext}
            />
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default EmailInfo;
