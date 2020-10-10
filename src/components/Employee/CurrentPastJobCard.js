import React from "react";
import { View, Text, Image, StyleSheet, ImageBackground } from "react-native";
import { Avatar, Divider, Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import { AirbnbRating } from "react-native-ratings";

import Colors from "../../constants/Colors";

const JobCard = (props) => {
  return (
    <View style={styles.container}>
      <ImageBackground source={{ uri: props.img }} style={styles.image}>
        <View style={styles.child}>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.subTitle} onPress={props.onSelect}>
            VIEW JOB
          </Text>
        </View>
      </ImageBackground>
      <View>
        <View>
          <View style={styles.completed}>
            <Ionicons
              name="md-checkmark-circle-outline"
              style={styles.icon}
              color={Colors.green}
            />
            <Text>{props.current ? "Job hired on" : "Job completed on"}</Text>
          </View>
          <Text style={styles.date}>
            {moment(props.date).format("DD MMMM YYYY")}
          </Text>
          <Divider />
        </View>

        <View style={styles.person}>
          <Text>Job hired by {props.personName}</Text>
        </View>

        <View style={styles.userContainer}>
          <Avatar.Image
            source={
              props.personImage
                ? { uri: props.personImage }
                : require("../../../assets/profile.png")
            }
            size={50}
          />
          {!props.current &&
            (props.isReviewed ? (
              <AirbnbRating
                defaultRating={props.isReviewed}
                size={15}
                isDisabled
                selectedColor={Colors.primaryOrange}
                showRating={false}
                starContainerStyle={{ alignItems: "flex-start" }}
              />
            ) : (
              <Button
                mode="contained"
                style={styles.button}
                color={Colors.primaryOrange}
                onPress={() => props.reviewHandler(props.id)}
              >
                Rate and Tip
              </Button>
            ))}

          {props.current && (
            <Button
              style={styles.button}
              mode="contained"
              color={Colors.primaryOrange}
              onPress={() => props.finishHandler(props.id, props.employerID)}
            >
              Finished
            </Button>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //marginHorizontal: 20,
    paddingHorizontal: 20,
    paddingBottom: 10,
    marginBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: Colors.darkGrey,
  },

  image: {
    width: "100%",
    height: 130,
  },

  child: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    color: "white",
    fontSize: 20,
  },

  subTitle: {
    color: "white",
    fontSize: 13,
  },

  completed: {
    flexDirection: "row",
    marginTop: 10,
  },

  date: {
    marginLeft: 25,
    marginBottom: 5,
    color: Colors.darkGrey,
  },

  person: {
    flexDirection: "row",
    marginTop: 8,
  },

  icon: {
    fontSize: 20,
    marginRight: 10,
  },

  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },

  button: {
    marginHorizontal: 15,
  },
});

export default JobCard;
