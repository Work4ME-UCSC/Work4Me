import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from "react-native";
import { AirbnbRating } from "react-native-ratings";
import JobInput from "../components/Employer/JobInput";
import { Button } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";

import Colors from "../constants/Colors";
import { addReview } from "../store/actions/employee";

const ReviewScreen = ({ navigation, route }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const isSkip = route.params.isSkip;
  const id = route.params.id;

  const dispatch = useDispatch();

  const job = useSelector((state) =>
    state.employee.finishedJobs.find((job) => job.id === id)
  );

  const submitHandler = async () => {
    try {
      setIsLoading(true);
      await dispatch(
        addReview(job.employer._id, rating, review, job.jobID, id)
      );
      navigation.pop();
    } catch (e) {
      console.log(e);
      setError("Something went wrong");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (error) Alert.alert("Error", error, [{ text: "Okay" }]);
  }, [error]);

  if (isLoading) {
    return (
      <Spinner
        visible={isLoading}
        textContent={"Please wait..."}
        color={Colors.red}
        overlayColor="rgba(10, 0, 0, 0.25)"
      />
    );
  }

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
                reviews={["Terrible", "Bad", "Meh", "Ok", "Good"]}
                defaultRating={0}
                size={30}
                onFinishRating={(rate) => setRating(rate)}
              />
            </View>
            <View>
              <JobInput
                value={review}
                onChangeText={setReview}
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
                onPress={submitHandler}
                disabled={!rating}
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
