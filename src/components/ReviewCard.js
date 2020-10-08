import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { Text, Avatar } from "react-native-paper";
import { AirbnbRating } from "react-native-ratings";

import Colors from "../constants/Colors";

const ReviewCard = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Avatar.Image
          size={40}
          source={
            props.avatar
              ? { uri: props.avatar }
              : require("../../assets/profile.png")
          }
        />
        <View style={styles.titleContainer}>
          <Text style={styles.title}> {props.name}</Text>
        </View>
      </View>
      <View style={styles.reviewContainer}>
        <AirbnbRating
          defaultRating={props.rate}
          size={20}
          showRating={false}
          isDisabled
          starContainerStyle={{ alignSelf: "flex-start" }}
        />

        <Text>{props.review}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    //height: 130,
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
    //elevation: 10,
    overflow:
      Platform.OS === "android" && Platform.Version >= 21
        ? "hidden"
        : "visible",
    borderWidth: 1,
    borderColor: Colors.primaryOrange,
    borderRadius: 10,
  },
  headerContainer: {
    padding: 5,
    width: "100%",
    //height: "40%",
    flexDirection: "row",
    backgroundColor: Colors.primaryOrange,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },

  titleContainer: {
    marginLeft: 5,
    flexDirection: "column",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
  },

  reviewContainer: {
    margin: 10,
  },
});

export default ReviewCard;
