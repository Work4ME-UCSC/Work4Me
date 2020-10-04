import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { AirbnbRating } from "react-native-ratings";
import JobInput from "../components/Employer/JobInput";
import { Button } from "react-native-paper";
import Colors from "../constants/Colors";

const ReviewScreen = ({ navigation, route }) => {
  const [rating, setRating] = useState(0);
  const isSkip = route.params.isSkip;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS == "ios" ? "padding" : "height"}
    >
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={styles.screen}>
          <Text style={styles.skip} onPress={() => navigation.pop()}>
            {isSkip ? "SKIP" : "CANCEL"}
          </Text>
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
                size={30}
                onFinishRating={() => setRating(rating + 1)}
              />
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
              <Button
                style={styles.button}
                mode="contained"
                color={Colors.primaryOrange}
                onPress={() => {}}
              >
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                >
                  Submit
                </Text>
              </Button>
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
    paddingVertical: 10,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    marginTop: 20,
    // justifyContent: "center",
    alignItems: "center",
  },

  logo: {
    width: logo_height,
    height: logo_height,
  },
  footer: {
    //paddingHorizontal: 15,
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
    width: 300,
    padding: 5,
  },
  button: {
    // padding:10,
    //height: 50,
    borderRadius: 10,
    // marginVertical: 30,
  },

  skip: {
    alignSelf: "flex-end",
    marginRight: 20,
    fontSize: 15,
  },
});

export default ReviewScreen;
