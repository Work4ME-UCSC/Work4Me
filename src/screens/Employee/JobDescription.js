import React, { useCallback, useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Image,
  Dimensions,
  Platform,
  StatusBar,
} from "react-native";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { Button, Avatar } from "react-native-paper";
import HeaderImageScrollView, {
  TriggeringView,
} from "react-native-image-header-scroll-view";
import * as Animatable from "react-native-animatable";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";

import Colors from "../../constants/Colors";
import { toggleFavourite, applyForJob } from "../../store/actions/employee";
import { TouchableOpacity } from "react-native-gesture-handler";

const MIN_HEIGHT = Platform.OS === "ios" ? 90 : 55;
const MAX_HEIGHT = 350;

const JobDescription = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const navTitleView = useRef(null);

  const { jobID, isConfirmed, isCompleted } = props.route.params;

  const isApplied = useSelector((state) =>
    state.employee.appliedJobs.some((job) => job.jobID === jobID)
  );

  const isEmailVerified = useSelector((state) => state.auth.isEmailVerified);

  const isFav = useSelector((state) =>
    state.employee.favouriteJobs.some((job) => job.jobID === jobID)
  );

  const selectedJob = isConfirmed
    ? useSelector((state) =>
        state.employee.currentJobs.find((job) => job.jobID === jobID)
      )
    : isCompleted
    ? useSelector((state) =>
        state.employee.finishedJobs.find((job) => job.jobID === jobID)
      )
    : useSelector((state) =>
        state.employee.availableJobs.find((job) => job.jobID === jobID)
      );

  const dispatch = useDispatch();

  const toggleFavouriteHandler = useCallback(() => {
    dispatch(toggleFavourite(jobID));
  }, [dispatch, jobID]);

  const onApplyHandler = async () => {
    setError(null);
    if (!isEmailVerified) {
      setError("Please verify your email address before applying");
      return;
    }

    setIsLoading(true);
    try {
      await dispatch(applyForJob(jobID));
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occured", error, [{ text: "Okay" }]);
    }
  }, [error]);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <HeaderImageScrollView
        maxHeight={MAX_HEIGHT}
        minHeight={MIN_HEIGHT}
        maxOverlayOpacity={0.6}
        minOverlayOpacity={0.3}
        bounces={false}
        showsVerticalScrollIndicator={false}
        renderHeader={() => (
          <Image source={{ uri: selectedJob.jobImage }} style={styles.image} />
        )}
        renderForeground={() => (
          <View style={styles.titleContainer}>
            <Text style={styles.imageTitle}>{selectedJob.jobTitle}</Text>
          </View>
        )}
        renderFixedForeground={() => (
          <Animatable.View style={styles.navTitleView} ref={navTitleView}>
            <Text style={styles.navTitle}>{selectedJob.jobTitle}</Text>
          </Animatable.View>
        )}
      >
        <TriggeringView
          style={styles.section}
          onHide={() => navTitleView.current.fadeInUp(200)}
          onDisplay={() => navTitleView.current.fadeOut(100)}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <Text style={styles.title}>Overview</Text>
              <View style={styles.overview}>
                <Entypo name="location-pin" size={24} color="gray" />
                <Text>{selectedJob.jobLocation}</Text>
              </View>

              <View style={styles.overview}>
                <Entypo name="calendar" size={24} color="gray" />
                <Text style={styles.time}>
                  {moment(selectedJob.jobPostedDate).fromNow()}
                </Text>
              </View>

              <View style={styles.overview}>
                <Text style={styles.time}>{selectedJob.jobCategory}</Text>
              </View>
            </View>

            <View>
              <TouchableOpacity onPress={toggleFavouriteHandler}>
                <Ionicons
                  name={isFav ? "md-heart" : "md-heart-empty"}
                  size={50}
                  color="black"
                />
              </TouchableOpacity>
            </View>
          </View>
        </TriggeringView>

        <View style={styles.section}>
          <Text style={styles.title}>Job Description</Text>
          <Text style={styles.content}>{selectedJob.jobDescribtion}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>Job Details</Text>
          {selectedJob.jobDate && (
            <Text style={styles.content}>
              <Text style={styles.subTitle}>Date: </Text>
              {selectedJob.jobDate}
            </Text>
          )}
          {selectedJob.jobAddress && (
            <Text style={styles.content}>
              <Text style={styles.subTitle}>Address: </Text>
              {selectedJob.jobAddress}
            </Text>
          )}
          <Text style={styles.content}>
            <Text style={styles.subTitle}>Salary: </Text>
            {selectedJob.jobSalary ? selectedJob.jobSalary : "Negotiable"}
          </Text>

          <Text style={styles.content}>
            <Text style={styles.subTitle}>Applicant Sex: </Text>
            {selectedJob.sex}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>Posted By</Text>
          <View style={styles.ownerContainer}>
            <Avatar.Image
              source={
                selectedJob.employer.avatar
                  ? { uri: selectedJob.employer.avatar }
                  : require("../../../assets/profile.png")
              }
              size={70}
            />
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.ownerName}>
                {selectedJob.employer.firstName +
                  " " +
                  selectedJob.employer.lastName}
              </Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.rating}>
                  {selectedJob.employer.rate.toFixed(1)}
                </Text>
                <Entypo name="star" size={14} color={Colors.primaryOrange} />
              </View>
            </View>
          </View>
          <Button
            mode="outlined"
            onPress={() =>
              props.navigation.navigate("PublicProfile", {
                user: selectedJob.employer,
              })
            }
            style={styles.viewProfile}
            color={Colors.green}
          >
            View Profile
          </Button>
        </View>

        {isConfirmed || isCompleted ? null : (
          <View style={{ margin: 15 }}>
            <Button
              color={Colors.primaryOrange}
              mode="contained"
              onPress={onApplyHandler}
              disabled={isApplied}
              style={styles.button}
              loading={isLoading}
              contentStyle={{ height: 45 }}
              labelStyle={{
                fontSize: 22,
                color: Colors.white,
                fontWeight: "bold",
              }}
            >
              {isApplied ? "Already applied" : "Apply For Job"}
            </Button>
          </View>
        )}
      </HeaderImageScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  overview: {
    flexDirection: "row",
    marginVertical: 5,
  },

  ownerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  ownerName: {
    fontSize: 20,
  },

  button: {
    borderRadius: 20,
  },

  image: {
    height: MAX_HEIGHT,
    width: Dimensions.get("window").width,
    alignSelf: "stretch",
    resizeMode: "cover",
  },

  titleContainer: {
    flex: 1,
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
  },

  imageTitle: {
    color: "white",
    backgroundColor: "transparent",
    fontSize: 35,
  },

  navTitleView: {
    height: MIN_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Platform.OS === "ios" ? 40 : 5,
    opacity: 0,
  },

  navTitle: {
    color: "white",
    fontSize: 18,
    backgroundColor: "transparent",
  },

  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
    backgroundColor: "white",
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },

  subTitle: {
    fontWeight: "bold",
  },

  content: {
    fontSize: 16,
    //textAlign: "justify",
    marginVertical: 4,
  },

  rating: {
    color: Colors.darkGrey,
  },

  viewProfile: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: Colors.green,
  },
});

export default JobDescription;
