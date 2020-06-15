import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSafeArea } from "react-native-safe-area-context";

import SimpleInput from "../../../components/Authenticate/SimpleInput";
import SubmitButton from "../../../components/Authenticate/SubmitButton";
import ErrorText from "../../../components/Authenticate/ErrorText";

const color = "#ff8400";

const NameInfo = () => {
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
  };

  let errorMessage;
  if (error)
    errorMessage = (
      <ErrorText title="First name and Last name cannot be empty" />
    );

  return (
    <View
      style={{
        ...styles.container,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <View style={styles.header}>
        <Text style={styles.heading}>What's your name?</Text>
      </View>

      <View style={styles.footer}>
        {errorMessage}
        <SimpleInput
          label="First Name"
          style={styles.input}
          placeholder="First Name"
          autoCorrect={false}
          blurOnSubmit
          value={firstName}
          onChangeText={firstNameInputHandler}
        />

        <SimpleInput
          label="Last Name"
          style={styles.input}
          placeholder="Last Name"
          autoCorrect={false}
          blurOnSubmit
          value={lastName}
          onChangeText={lastNameInputHandler}
        />

        <SubmitButton
          title="Next"
          style={styles.button}
          onClick={handleClickNext}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color,
  },

  header: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 20,
  },

  footer: {
    flex: 2,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 30,
  },

  heading: {
    fontSize: 22,
    fontWeight: "bold",
  },

  input: {
    //marginTop: 5,
    marginBottom: 15,
  },

  button: {
    marginTop: 20,
  },
});

export default NameInfo;
