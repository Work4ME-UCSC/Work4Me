import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Text, Badge, Avatar, Divider } from "react-native-paper";
import { color } from "react-native-reanimated";
import Colors from "../constants/Colors";
// import { Badge } from 'native-base';
// import Colors from "../../constants/Colors";

const MessageScreen = () => {
  return (
    <View>
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Avatar.Image size={35} source={require('../../assets/profile.png')} />
        <View style={styles.titleContainer}>
          <Text style={styles.title}> Reviewer Name</Text>
        </View>
      </View>
      <View style={styles.reviewContainer}>
        <Text>
          Blah Blah very bad service and bad employee ever really bad time management and all bad
        </Text>
      </View>
    </View>

    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Avatar.Image size={35} source={require('../../assets/profile.png')} />
        <View style={styles.titleContainer}>
          <Text style={styles.title}> Reviewer Name</Text>
        </View>
      </View>
      <View style={styles.reviewContainer}>
        <Text>
          Blah Blah very bad service and bad employee ever really bad time management and all bad
        </Text>
      </View>
    </View>

    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Avatar.Image size={35} source={require('../../assets/profile.png')} />
        <View style={styles.titleContainer}>
          <Text style={styles.title}> Reviewer Name</Text>
        </View>
      </View>
      <View style={styles.reviewContainer}>
        <Text>
          Blah Blah very bad service and bad employee ever really bad time management and all bad
        </Text>
      </View>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    height: 130,
    padding: 10,
    margin: 10,
    borderRadius: 10,
    elevation: 5,
    overflow:
      Platform.OS === "android" && Platform.Version >= 21
        ? "hidden"
        : "visible",
    borderWidth: 1,
    borderColor: Colors.primaryOrange,
    borderRadius: 10,

  },
  headerContainer: {
    padding:5,
    width:"100%",
    height: "40%",
    flexDirection: "row",
    backgroundColor: Colors.primaryOrange, 
    borderTopLeftRadius: 10,
    borderTopRightRadius:10,
  },

  titleContainer:{
        marginLeft:5,
        flexDirection:"column",
        justifyContent:"center",
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
  },

  reviewContainer:{
    margin: 10,
  },
});

export default MessageScreen;
