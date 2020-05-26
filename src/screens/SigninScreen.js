import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import SignInput from "../components/SignInput";

const SigninScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Sign in</Text>
      <SignInput
        name="Email Address"
        icon="email"
        keyboardType="email-address"
      />
      <SignInput name="Password" icon="lock" secureTextEntry={true} />

      <TouchableOpacity style={styles.login}>
        <Text style={{ fontSize: 25 }}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={{ fontSize: 20, color: "#ff8400" }}>Forgot password?</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: "row", marginTop: 10 }}>
        <Text>Don't have an account? </Text>

        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={{ color: "#ff8400" }}>Signup</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
  },

  heading: {
    fontSize: 30,
    marginBottom: 30,
  },

  login: {
    width: 250,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ff8400",
    borderRadius: 10,
    marginBottom: 15,
  },
});

export default SigninScreen;
