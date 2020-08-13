import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import SearchBar from "../../components/Employee/SearchBar";
import JobCard from "../../components/Employee/Jobcard";
import * as jobActions from "../../store/actions/employee";
import Colors from "../../constants/Colors";

const EmployeeHomeScreen = (props) => {
  const jobs = useSelector((state) => state.employee.availableJobs);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();

  const loadJobs = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(jobActions.fetchJobs());
      await dispatch(jobActions.fetchAppliedJobs());
    } catch (e) {
      setError(e.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    if (error) {
      Alert.alert("An Error occured", error, [{ text: "Okay" }]);
    }
  }, [error]);

  useEffect(() => {
    setIsLoading(true);
    loadJobs().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadJobs]);

  const renderJobCard = ({ item }) => {
    return (
      <JobCard
        id={item.jobID}
        name={item.jobTitle}
        img={item.jobImage}
        date={item.jobDate}
        location={item.jobLocation}
        time={item.jobTime}
        onSelect={() => {
          props.navigation.navigate("JobDescription", {
            jobID: item.jobID,
            jobTitle: item.jobTitle,
            applicants: item.applicants,
          });
        }}
      />
    );
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <Text>Loading...</Text>
        <ActivityIndicator size="large" color={Colors.primaryOrange} />
      </View>
    );
  }

  return (
    <>
      <SearchBar feather="search" place_holder="search" />

      {jobs.length === 0 ? (
        <View style={styles.centered}>
          <Text>Currently no jobs available</Text>
        </View>
      ) : (
        <FlatList
          refreshing={isRefreshing}
          onRefresh={loadJobs}
          keyExtractor={(item) => item.jobID}
          data={jobs}
          renderItem={renderJobCard}
          showsVerticalScrollIndicator={false}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default EmployeeHomeScreen;
