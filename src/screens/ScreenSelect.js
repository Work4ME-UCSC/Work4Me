import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const ScreenSelect = ({ navigation }) => {
  return (
    <View style={styles.view}>
      <Text>ScreenSelect</Text>
      <Button
        title="Autentication Screeen"
        onPress={() => navigation.navigate("Sign")}
      />
      <Button
        title="Employee Screeen"
        onPress={() => navigation.navigate("Employee")}
      />
      <Button
        title="Employer Screeen"
        onPress={() => navigation.navigate("Employer")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
  },
});

export default ScreenSelect;
