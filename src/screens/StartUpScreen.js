import React, { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { useDispatch } from "react-redux";

import Colors from "../constants/Colors";
import { authenticate, tryAutoLogin } from "../store/actions/auth";

const StartUpScreen = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("UserData");
      if (!userData) {
        dispatch(tryAutoLogin());
        return;
      }
      const transformedData = JSON.parse(userData);
      const { token, userID, firstName, lastName, userType } = transformedData;

      if (!token || !userID || !firstName || !lastName || !userType) {
        dispatch(tryAutoLogin());
        return;
      }

      dispatch(authenticate(token, userID, firstName, lastName, userType));
    };

    tryLogin();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color={Colors.primaryOrange} />
    </View>
  );
};

export default StartUpScreen;
