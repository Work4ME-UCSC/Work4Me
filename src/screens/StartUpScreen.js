import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, Alert } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { useDispatch } from "react-redux";

import Colors from "../constants/Colors";
import { authenticate, tryAutoLogin } from "../store/actions/auth";

const StartUpScreen = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState();
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
      try {
        await dispatch(
          authenticate(token, userID, firstName, lastName, userType)
        );
      } catch (e) {
        setError(e.message);
        console.log(e.message);
      }
    };

    tryLogin();
  }, []);

  useEffect(() => {
    if (error) Alert.alert("Error", error, [{ text: "Okay" }]);
  }, [error]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color={Colors.primaryOrange} />
    </View>
  );
};

export default StartUpScreen;
