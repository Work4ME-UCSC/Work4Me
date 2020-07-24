import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Button,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useDispatch } from "react-redux";

import Colors from "../constants/Colors";
import * as authActions from "../store/actions/auth";

const SettingScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    Alert.alert("Are you sure", "Do you want to sign out?", [
      { text: "No", style: "default" },
      {
        text: "yes",
        style: "destructive",
        onPress: async () => {
          setIsLoading(true);
          try {
            await dispatch(authActions.logout());
          } catch (e) {
            console.log(e);
            setIsLoading(false);
          }
        },
      },
    ]);
  };

  const deleteHandler = () => {
    Alert.alert("Are you sure", "Do you really want to delete your account?", [
      { text: "No", style: "default" },
      {
        text: "yes",
        style: "destructive",
        onPress: () => dispatch(authActions.deleteAccount()),
      },
    ]);
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <Text>Logging out</Text>
        <ActivityIndicator size="large" color={Colors.primaryOrange} />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Button color="#787878" title="Sign out" onPress={logoutHandler} />

      <View style={{ marginTop: 20 }}>
        <Button
          color="#cc0e00"
          title="Delete my account"
          onPress={deleteHandler}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    //alignItems: "center",
    justifyContent: "flex-end",
    margin: 20,
  },

  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SettingScreen;
