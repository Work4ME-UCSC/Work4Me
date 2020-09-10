import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Ionicons } from "@expo/vector-icons";

import Color from "../../constants/Colors";
import ErrorText from "../Authenticate/ErrorText";

const Dropdown = (props) => {
  return (
    <>
      <Text style={styles.title}>{props.title}</Text>
      <View style={{ ...styles.dropContainer, ...props.style }}>
        <DropDownPicker
          {...props}
          containerStyle={{ height: 50, marginBottom: 5 ,borderRadius:5}}
          dropDownStyle={{ backgroundColor: "#fafafa", marginTop: 2 }}
          style={{ paddingVertical: 10 }}
          //   itemStyle={{
          //     alignItems: "flex-start|flex-end|center",
          //   }}
          dropDownMaxHeight={200}
          customTickIcon={() => (
            <Ionicons name="md-checkmark" style={styles.icon} />
          )}
        />
        {!props.error && <ErrorText title={props.errorMessage} />}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    marginBottom: 5,
  },

  dropContainer: {
    paddingVertical: 10,
    // zIndex: Platform.OS === "ios" ? 15 : null,
  },

  icon: {
    fontSize: 18,
    marginRight: 5,
    color: Color.primaryOrange,
  },
});

export default Dropdown;
