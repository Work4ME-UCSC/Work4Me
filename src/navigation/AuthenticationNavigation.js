import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import Color from "../constants/Colors";

import WelcomeScreen from "../screens/Authenticate/WelcomeScreen";
import SigninScreen from "../screens/Authenticate/SigninScreen";
import NameInfo from "../screens/Authenticate/signup/NameInfo";
import EmailInfo from "../screens/Authenticate/signup/EmailInfo";
import PasswordInfo from "../screens/Authenticate/signup/PasswordInfo";
import ForgotPassword from "../screens/Authenticate/ForgotPassword";
import ForgotVerificationScreen from "../screens/Authenticate/ForgotVerificationScreen";
import SetNewPassword from "../screens/Authenticate/SetNewPassword";

const SignStack = createStackNavigator();

const AuthenticationNavigation = () => {
  return (
    <SignStack.Navigator initialRouteName="Welcome">
      <SignStack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />

      <SignStack.Screen
        name="Signin"
        component={SigninScreen}
        options={{ headerShown: false }}
      />

      <SignStack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{
          title: "Forgot Password",
          headerStyle: {
            backgroundColor:
              Platform.OS === "android" ? Color.primaryOrange : "",
          },
          headerTintColor:
            Platform.OS === "android" ? "black" : Color.primaryOrange,
        }}
      />
      <SignStack.Screen
        name="ForgotVerify"
        component={ForgotVerificationScreen}
        options={{ headerShown: false }}
      />
      <SignStack.Screen
        name="NewPassword"
        component={SetNewPassword}
        options={{ headerShown: false }}
      />

      <SignStack.Screen
        name="NameInfo"
        component={NameInfo}
        options={{ headerShown: false }}
      />

      <SignStack.Screen
        name="Email"
        component={EmailInfo}
        options={{ headerShown: false }}
      />

      <SignStack.Screen
        name="Password"
        component={PasswordInfo}
        options={{ headerShown: false }}
      />
    </SignStack.Navigator>
  );
};

export default AuthenticationNavigation;
