import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Feather, Entypo, MaterialCommunityIcons } from "@expo/vector-icons";

import { toggleFavourite } from "../../store/actions/jobs";

const JobCard = (props) => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  const { id } = props;

  const isFav = useSelector((state) =>
    state.jobs.favouriteJobs.some((job) => job.jobID === id)
  );

  const dispatch = useDispatch();

  const handleFavourite = () => {
    dispatch(toggleFavourite(id));
  };

  return (
    <TouchableCmp onPress={props.onSelect}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: props.img }} style={styles.image} />
        </View>

        <View style={styles.DetailsContainer}>
          <View style={{ flex: 1, alignSelf: "center" }}>
            <Text style={styles.title}>{props.name}</Text>
          </View>
          <View style={styles.item}>
            <Feather name="calendar" style={styles.icon} color="black" />
            <Text style={{ color: "grey" }}>{props.date}</Text>
          </View>
          <View style={styles.item}>
            <Entypo name="location-pin" style={styles.icon} color="black" />
            <Text style={{ color: "grey" }}>{props.location}</Text>
          </View>
          <View style={styles.item}>
            <Feather name="clock" style={styles.icon} color="black" />
            <Text style={{ color: "grey" }}>{props.time}</Text>
          </View>
        </View>

        <View style={styles.FavContainer}>
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={handleFavourite}
          >
            <MaterialCommunityIcons
              name={isFav ? "heart" : "heart-outline"}
              size={30}
              color="orange"
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableCmp>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 150,
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

  imageContainer: {
    width: "40%",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  image: {
    height: "100%",
    width: "100%",
    alignSelf: "center",
    overflow: "hidden",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },

  DetailsContainer: {
    width: "45%",
    marginBottom: 10,
  },

  FavContainer: {
    paddingRight: 10,
    marginRight: 10,
    marginBottom: 10,
    flexDirection: "column",
    width: "15%",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 8,
    marginLeft: 10,
  },

  icon: {
    fontSize: 20,
    marginHorizontal: 10,
  },

  item: {
    flexDirection: "row",
    //justifyContent: "center",
    marginVertical: 5,
    marginLeft: 5,
  },

  favoriteButton: {
    justifyContent: "flex-end",
  },
});
export default JobCard;
