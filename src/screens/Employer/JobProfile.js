import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Alert, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";

import RequestProfileCard from "../../components/Employer/RequestProfileCard";
import Colors from "../../constants/Colors";
import { acceptRequest, rejectRequest } from "../../store/actions/employer";

const JobProfile = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { jobID } = route.params;

  const jobRequests = useSelector((state) =>
    state.employer.jobRequests.find((request) => request.jobID === jobID)
  );

  const handleJobReject = async (jobId, userId) => {
    try {
      setIsLoading(true);
      await dispatch(rejectRequest(jobId, userId));
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const handleJobAccept = async (jobId, userId, user) => {
    try {
      setIsLoading(true);
      await dispatch(acceptRequest(jobId, userId, user));
      navigation.navigate("Home");
    } catch (e) {
      setIsLoading(false);
      console.log(e);
    }
  };

  const confirmAccept = (jobId, userId, user) => {
    Alert.alert(
      "Important",
      "Are you sure about hiring the selected employee for the job",
      [
        { text: "No" },
        { text: "Yes", onPress: () => handleJobAccept(jobId, userId, user) },
      ]
    );
  };

  const confirmReject = (jobId, userId) => {
    Alert.alert(
      "Important",
      "Are you sure about rejecting the selected employee for the job",
      [
        { text: "No" },
        { text: "Yes", onPress: () => handleJobReject(jobId, userId) },
      ]
    );
  };

  useEffect(() => {
    if (error) {
      Alert.alert("Error", "Something went wrong", [{ text: "Okay" }]);
    }
  }, [error]);

  const renderItem = ({ item }) => (
    <RequestProfileCard
      name={item.applicantID.firstName + " " + item.applicantID.lastName}
      avatar={item.applicantID.avatar}
      userID={item.applicantID._id}
      jobID={jobID}
      employee={item.applicantID}
      handleJobAccept={confirmAccept}
      handleJobReject={confirmReject}
      onSelect={() =>
        navigation.navigate("PublicProfile", { user: item.applicantID })
      }
    />
  );

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

  if (jobRequests.applicants.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Currently no one has applied for the job...</Text>
      </View>
    );
  }

  return (
    <View>
      {/* <View style={styles.header}>
        <Text style={styles.headerText}>Job Requests</Text>
      </View> */}
      <FlatList
        data={jobRequests.applicants}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#F27523",
    height: 50,
    margin: 2,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    padding: 10,
  },
  headerText: {
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 20,
  },
});

export default JobProfile;
