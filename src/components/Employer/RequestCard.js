import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Text, Badge, Button } from "react-native-paper";
// import { Badge } from 'native-base';
import Colors from "../../constants/Colors";

const RequestCard = (props) => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <TouchableCmp onPress={props.onSelect}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          {props.img ? (
            <Image source={{ uri: props.img }} style={styles.image} />
          ) : (
            <Image
              source={require("../../../assets/noImage.png")}
              style={styles.image}
            />
          )}
        </View>
        <View style={styles.DetailsContainer}>
          <View style={styles.item}>
            <Text style={{ ...styles.title, fontSize: 20 }} numberOfLines={1}>
              {props.title}
            </Text>
          </View>
          <View style={styles.item}>
            <Badge style={{ backgroundColor: Colors.primaryOrange }} size={30}>
              {props.requestnumber} Job Requests
            </Badge>
          </View>
        </View>
      </View>
    </TouchableCmp>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 160,
    margin: 10,
    backgroundColor: "#fff2e6",
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
    //width: "45%",
    marginLeft: 5,
    justifyContent: "center",
  },

  title: {
    fontSize: 15,
    fontWeight: "600",
    //marginTop: 25,
    //marginBottom: 8,
    fontFamily: "Roboto_medium",
  },

  item: {
    flexDirection: "row",
    marginVertical: 5,
    marginLeft: 5,
  },
});

export default RequestCard;
