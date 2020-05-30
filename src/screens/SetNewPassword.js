import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

import FullTextInput from "../components/FullTextInput";
import Submit from "../components/SubmitButton";

const color = "#ff8400";

const SerNewPassword = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Finally, choose a new password</Text>
      <Text style={styles.content}>
        Password must include at least 8 characters including at least 1 number
        and 1 special character
      </Text>

      <Text style={styles.inputTitle}>
        New password <Text style={{ color }}>*</Text>
      </Text>

      <FullTextInput placeholder="New password" />

      <Text style={styles.inputTitle}>
        Retype new password <Text style={{ color }}>*</Text>
      </Text>

      <FullTextInput placeholder="Retype new password" />

      <Submit />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 60,
    // justifyContent: "center",
    // alignItems: "center",
  },

  heading: {
    fontSize: 26,
    fontWeight: "300",
  },

  content: {
    marginTop: 10,
    fontSize: 16,
  },

  inputTitle: {
    marginTop: 20,
  },
});

export default SerNewPassword;
