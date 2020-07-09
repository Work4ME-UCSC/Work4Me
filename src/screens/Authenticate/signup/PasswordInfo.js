import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useSafeArea } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

import PasswordInput from "../../../components/Authenticate/PasswordInput";
import SubmitButton from "../../../components/SubmitButton";
import ErrorText from "../../../components/Authenticate/ErrorText";
import myStyles from "./myStyles";
import Color from "../../../constants/Colors";

import { setUserPassword } from "../../../store/actions/signUpData";
import * as authActions from "../../../store/actions/auth";

const PasswordInfo = ({ navigation }) => {
  const insets = useSafeArea();

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.signUp);

  const [password, setPassword] = useState("");
  const [confrimPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [textColor, setTextColor] = useState("black");

  const [isLoading, setIsLoading] = useState(false);
  const [valError, setValError] = useState();

  const passwordInputHandler = (password) => {
    setPassword(password);
  };

  const confrimPasswordInputHandler = (password) => {
    setConfirmPassword(password);
  };

  const handleClickNext = async () => {
    if (
      !password.match(
        /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
      )
    ) {
      setError(true);
      setTextColor("red");
      setMessage("Please enter a valid password");

      return;
    } else if (password !== confrimPassword) {
      setError(true);

      setMessage("Password does not match");
      return;
    }

    setError(false);
    setTextColor("black");
    //dispatch(setUserPassword(password));
    setIsLoading(true);
    try {
      await dispatch(authActions.signup({ ...userData, password }));
      navigation.navigate("Password");
    } catch (e) {
      setValError(e.message);
      console.log(e.message);
      setIsLoading(false);
    }
    setValError(null);

    console.log({ ...userData, password });
  };

  let errorMessage;
  if (error)
    errorMessage = (
      <ErrorText
        title={message}
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
          <Text style={myStyles.heading}>Choose a password</Text>
        </View>

        <View style={myStyles.footer}>
          {errorMessage}

          <PasswordInput
            label="Password"
            placeholder="Password"
            blurOnSubmit
            value={password}
            onChangeText={passwordInputHandler}
          />

          <PasswordInput
            label="Confirm Password"
            placeholder="Confirm Password"
            blurOnSubmit
            value={confrimPassword}
            onChangeText={confrimPasswordInputHandler}
          />

          <Text style={{ color: textColor }}>
            Password must have at least 8 characters, contain at least one
            uppercase letter, at least one lower letter and at least one number
            or special character
          </Text>

          {isLoading ? (
            <ActivityIndicator size="large" color={Color.primaryOrange} />
          ) : (
            <SubmitButton
              title="Finish"
              style={myStyles.button}
              onClick={handleClickNext}
            />
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default PasswordInfo;
