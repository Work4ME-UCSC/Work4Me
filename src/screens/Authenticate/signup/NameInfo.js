import React, { useState } from "react";
import { View, Text, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useSafeArea } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";

import SimpleInput from "../../../components/Authenticate/SimpleInput";
import SubmitButton from "../../../components/SubmitButton";
import ErrorText from "../../../components/Authenticate/ErrorText";
import myStyles from "./myStyles";
import { setUserName } from "../../../store/actions/signUpData";

const NameInfo = ({ navigation }) => {
  const insets = useSafeArea();

  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState(false);

  const firstNameInputHandler = (name) => {
    setFirstName(name);
  };

  const lastNameInputHandler = (name) => {
    setLastName(name);
  };

  const handleClickNext = () => {
    if (!firstName || !lastName) {
      setError(true);
      return;
    }
    setError(false);
    dispatch(setUserName(firstName, lastName));
    navigation.navigate("Email");
  };

  let errorMessage;
  if (error)
    errorMessage = (
      <ErrorText
        title="First name and Last name cannot be empty"
        icon="alert-circle-outline"
        style={myStyles.error}
      />
    );

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
          <Text style={myStyles.heading}>What's your name?</Text>
        </View>

        <View style={myStyles.footer}>
          {errorMessage}
          <SimpleInput
            label="First Name"
            style={myStyles.input}
            placeholder="First Name"
            autoCorrect={false}
            blurOnSubmit
            value={firstName}
            onChangeText={firstNameInputHandler}
          />

          <SimpleInput
            label="Last Name"
            style={myStyles.input}
            placeholder="Last Name"
            autoCorrect={false}
            blurOnSubmit
            value={lastName}
            onChangeText={lastNameInputHandler}
          />

          <SubmitButton
            title="Next"
            style={myStyles.button}
            onClick={handleClickNext}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default NameInfo;
