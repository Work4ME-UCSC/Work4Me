import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";

import CurrentPastJobCard from "../../components/Employee/CurrentPastJobCard";
import Colors from "../../constants/Colors";
import { fetchPastJobs } from "../../store/actions/employee";

const PastJobScreen = ({ navigation }) => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const pendingJobs = useSelector((state) => state.employee.finishedJobs);

  const dispatch = useDispatch();

  const reviewHandler = async (id) => {
    navigation.navigate("review", { isSkip: false, id, user: "employee" });
  };

  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      await dispatch(fetchPastJobs());
      setIsLoading(false);
    };

    fetchJobs();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <CurrentPastJobCard
        title={item.jobTitle}
        //date={item.createdAt}
        img={item.jobImage}
        id={item.id}
        isReviewed={item.isEmployeeReviewed}
        personName={`${item.employer.firstName} ${item.employer.lastName}`}
        personImage={item.employer.avatar}
        date={item.jobPostedDate}
        reviewHandler={reviewHandler}
        onSelect={() => {
          navigation.navigate("detail", {
            jobID: item.jobID,
            jobTitle: item.jobTitle,
            isCompleted: true,
          });
        }}
      />
    );
  };

  useEffect(() => {
    if (error) {
      Alert.alert("Error", error, [{ text: "Okay" }]);
    }
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

  if (pendingJobs.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>Currently no jobs...</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <FlatList data={pendingJobs} renderItem={renderItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    marginVertical: 20,
  },

  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PastJobScreen;
