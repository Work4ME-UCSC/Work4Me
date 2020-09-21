import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions, Image ,KeyboardAvoidingView ,ScrollView } from "react-native";
import { Rating, AirbnbRating } from 'react-native-ratings';
import JobInput from "../components/Employer/JobInput";
import SubmitButton from "../components/SubmitButton";
import Colors from "../constants/Colors";


const MessageScreen = () => {

  const [rating, setRating] = useState(0);

  return (
    <KeyboardAvoidingView style={{flex:1}} 
     behavior={Platform.OS == "ios" ? "padding" : "height"}>
    <ScrollView style={{flex:1}} >
    <View style={styles.screen}>
      <View style={styles.header}>
        <Image
          source={require("../../assets/review.png")}
          style={styles.logo}
          resizeMode="stretch"
        />
      </View>
      <View style={styles.footer}>
        <Text style={styles.title}>How was your work with Employer ?</Text>
      <View>
        <AirbnbRating
          reviews={["Terrible", "Bad", "Meh", "OK", "Good"]}
          defaultRating={0}
          size={25}
          onFinishRating={() => setRating(rating + 1)} />
      </View>
      <View>
        <JobInput
          // label="Job Review"
          icon="pencil"
          placeholder="Enter Review"
          multiline
          textAlignVertical="top"
          style={styles.reviewbox}
        />
      </View>
      <View>
        <SubmitButton style={styles.button}/>
      </View>
      </View>
    </View>
    </ScrollView>
    </KeyboardAvoidingView>
  );
};

const { height } = Dimensions.get("screen");
const logo_height = height * 0.28;

const styles = StyleSheet.create({
  screen: {
    padding:10,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    marginTop: 50,
    // justifyContent: "center",
    alignItems: "center",
  },

  logo: {
    width: logo_height,
    height: logo_height,
  },
  footer: {
    paddingHorizontal: 15,
    paddingVertical: 30,
  },
  title: {
    // color: Colors.primaryOrange,
    fontSize: 18,
    fontWeight: "400",
    alignSelf: "center",
  },
  reviewbox: {
    borderWidth: 1,
    borderRadius: 10,
    height: 100,
    width:300,
    padding: 5,
  },
  button: {
    // padding:10,
    height:50,
    borderRadius: 10,
    // marginVertical: 30,
  },
});

export default MessageScreen;
