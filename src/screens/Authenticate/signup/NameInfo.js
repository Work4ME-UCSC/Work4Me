import React, { useState } from "react";
import { View, Text, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useSafeArea } from "react-native-safe-area-context";

import SimpleInput from "../../../components/Authenticate/SimpleInput";
import SubmitButton from "../../../components/Authenticate/SubmitButton";
import ErrorText from "../../../components/Authenticate/ErrorText";
import NavLink from "../../../components/Authenticate/NavLink";
import myStyles from "./myStyles";

const NameInfo = ({ navigation }) => {
  const insets = useSafeArea();

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
    console.log("Next");
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
          <View style={{ justifyContent: "space-between", flex: 1 }}>
            <SubmitButton
              title="Next"
              style={myStyles.button}
              onClick={handleClickNext}
            />
            <NavLink
              title="Already have an account?"
              button="Sign in"
              onClick={() => navigation.navigate("Signin")}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default NameInfo;
