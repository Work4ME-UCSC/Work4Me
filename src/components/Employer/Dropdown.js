import React from "react";
import { View, Text, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Ionicons } from "@expo/vector-icons";

import Color from "../../constants/Colors";

const Dropdown = (props) => {
  return (
    <>
      <Text style={styles.title}>{props.title}</Text>
      <View style={{ ...styles.dropContainer, ...props.style }}>
        <DropDownPicker
          {...props}
          containerStyle={{ height: 40, marginBottom: 10 }}
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
  },

  icon: {
    fontSize: 18,
    marginRight: 5,
    color: Color.primaryOrange,
  },
});

export default Dropdown;
