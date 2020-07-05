import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useDispatch } from "react-redux";

import * as authActions from "../store/actions/auth";

const SettingScreen = () => {
  const dispatch = useDispatch();

  return (
    <View style={styles.screen}>
      <Button
        color="red"
        title="Log out"
        onPress={() => dispatch(authActions.logout())}
      />
      <View style={{ marginTop: 20 }}>
        <Button
          color="red"
          title="Delete my account"
          onPress={() => dispatch(authActions.deleteAccount())}
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
