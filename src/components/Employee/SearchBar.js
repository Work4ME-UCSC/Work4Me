import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

import { Feather } from "@expo/vector-icons";

const SearchBar = (props) => {
  return (
    <View style={styles.SearchBar}>
      <Feather name={props.feather} style={styles.icon} />
      <TextInput
        {...props}
        style={styles.textStyle}
        placeholder={props.place_holder}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  SearchBar: {
    height: 50,
    marginHorizontal: 15,
    margin: 10,
    borderRadius: 10,
    backgroundColor: "#FFF",
    flexDirection: "row",
    elevation: 5,
  },

  textStyle: {
    flex: 1,
    fontSize: 18,
  },

  icon: {
    fontSize: 25,
    alignSelf: "center",
    marginHorizontal: 10,
  },
});

export default SearchBar;
