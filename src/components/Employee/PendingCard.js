import React from "react";
import {
  View,
  Text,
  Platform,
  Image,
  TouchableOpacity,
  TouchableNativeFeedback,
  StyleSheet,
  Alert,
} from "react-native";
import { Button } from "react-native-paper";
import moment from "moment";

import Colors from "../../constants/Colors";

const PendingCard = (props) => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  const clickHandler = () => {
    Alert.alert("Important", "Do you really want to cancel the job request", [
      { text: "Yes", onPress: props.withdrawHandler },
      { text: "No" },
    ]);
  };

  return (
    <TouchableCmp onPress={props.onSelect}>
      <View style={styles.container}>
        {props.img ? (
          <Image source={{ uri: props.img }} style={styles.image} />
        ) : (
          <Image
            source={require("../../../assets/noImage.png")}
            style={styles.image}
          />
        )}
        <View style={styles.detail}>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.time}>{`Sent ${moment(
            props.time
          ).fromNow()}`}</Text>
          <Button
            style={styles.button}
            mode="contained"
            color={Colors.red}
            onPress={clickHandler}
          >
            Withdraw
          </Button>
        </View>
      </View>
    </TouchableCmp>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    margin: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    elevation: 5,
    overflow:
      Platform.OS === "android" && Platform.Version >= 21
        ? "hidden"
        : "visible",
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
  },

  image: {
    height: 150,
    width: "45%",
    alignSelf: "center",
    overflow: "hidden",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    marginRight: 10,
  },

  detail: {
    flex: 1,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: "center",
  },

  title: {
    marginVertical: 5,
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 5,
  },

  time: {
    color: Colors.darkGrey,
    marginLeft: 5,
  },

  button: {
    marginVertical: 10,
    alignSelf: "flex-start",
    borderRadius: 5,
  },
});

export default PendingCard;
