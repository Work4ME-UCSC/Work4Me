import React from "react";
import { View, Text, StyleSheet } from "react-native";
import RadioForm from "react-native-simple-radio-button";

import Color from "../../constants/Colors";

const Radiobutton = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      <RadioForm
        {...props}
        buttonColor={Color.primaryOrange}
        selectedButtonColor={Color.primaryOrange}
        style={{ justifyContent: "space-between" }}
        buttonSize={15}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },

  title: {
    marginBottom: 5,
    fontSize: 16,
  },
});

export default Radiobutton;
