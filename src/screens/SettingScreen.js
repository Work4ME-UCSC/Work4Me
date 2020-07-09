import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Button,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";

import * as authActions from "../store/actions/auth";

const SettingScreen = () => {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    Alert.alert("Are you sure", "Do you want to sign out?", [
      { text: "No", style: "default" },
      {
        text: "yes",
        style: "destructive",
        onPress: () => dispatch(authActions.logout()),
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
});

export default SettingScreen;
