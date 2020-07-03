import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useSafeArea } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";

import NavLink from "../../../components/Authenticate/NavLink";
import myStyles from "./myStyles";
import Color from "../../../constants/Colors";
import { setUserType } from "../../../store/actions/signUpData";

const UserSelect = ({ navigation }) => {
  const insets = useSafeArea();

  const dispatch = useDispatch();

  const handlePress = (type) => {
    dispatch(setUserType(type));
    navigation.navigate("NameInfo");
  };

  return (
    <View
      style={{
        ...myStyles.container,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <View style={myStyles.header}>
        <Text style={myStyles.heading}>Select your account type</Text>
      </View>

      <View style={myStyles.footer}>
        <View style={{ justifyContent: "space-between", flex: 1 }}>
          <View>
            <TouchableOpacity
              style={styles.container}
              onPress={() => handlePress("employee")}
            >
              <Text style={styles.text}>I want to Work</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.container}
              onPress={() => handlePress("employer")}
            >
              <Text style={styles.text}>I want to Hire</Text>
            </TouchableOpacity>
          </View>
          <NavLink
            title="Already have an account?"
            button="Sign in"
            onClick={() => navigation.navigate("Signin")}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    borderColor: Color.primaryOrange,
    backgroundColor: Color.white,
    marginVertical: 20,
  },

  text: {
    fontSize: 18,
  },
});

export default UserSelect;
