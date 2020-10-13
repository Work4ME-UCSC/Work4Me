import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
  TouchableNativeFeedback,
  Platform,
} from "react-native";
import { Button, Divider, Avatar } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

import Colors from "../constants/Colors";
import url from "../constants/url";
import * as authActions from "../store/actions/auth";

const SettingScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const firstName = useSelector((state) => state.auth.firstName);
  const lastName = useSelector((state) => state.auth.lastName);
  const profilePic = useSelector((state) => state.auth.profilePic);
  const email = useSelector((state) => state.auth.email);

  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  const logoutHandler = () => {
    Alert.alert("Are you sure", "Do you want to sign out?", [
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
      { text: "No", style: "default" },
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
      <View style={styles.user}>
        <Avatar.Image
          size={80}
          source={
            profilePic
              ? { uri: profilePic }
              : require("../../assets/profile2.png")
          }
        />
        <View style={{ marginHorizontal: 10 }}>
          <Text>{`${firstName} ${lastName}`}</Text>
          <Text>{email}</Text>
        </View>
      </View>

      <TouchableCmp onPress={() => navigation.navigate("Delete")}>
        <View style={styles.user}>
          <Text style={{ fontWeight: "bold", color: Colors.red }}>
            Delete Account
          </Text>
        </View>
      </TouchableCmp>

      <TouchableCmp onPress={logoutHandler}>
        <View style={{ ...styles.user, borderBottomWidth: 0 }}>
          <Text style={{ fontWeight: "bold" }}>Sign out</Text>
        </View>
      </TouchableCmp>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    //alignItems: "center",
    //justifyContent: "flex-end",
    //marginVertical: 20,
    //paddingHorizontal: 20,
  },

  user: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGrey,
  },

  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SettingScreen;
