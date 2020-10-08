import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { Text, Avatar } from "react-native-paper";
import { AirbnbRating } from "react-native-ratings";

import Colors from "../constants/Colors";

const ReviewCard = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Avatar.Image size={35} source={require("../../assets/profile.png")} />
        <View style={styles.titleContainer}>
          <Text style={styles.title}> Reviewer Name</Text>
        </View>
      </View>
      <View style={styles.reviewContainer}>
        <AirbnbRating
          defaultRating={3}
          size={20}
          showRating={false}
          isDisabled
          starContainerStyle={{ alignSelf: "flex-start" }}
        />

        <Text>
          Blah Blah very bad service and bad employee ever really bad time
          management and all bad
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    //height: 130,
    padding: 10,
    margin: 10,
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
