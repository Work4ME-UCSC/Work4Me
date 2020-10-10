import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";

import JobCard from "../../components/Employer/JobCard";
import Colors from "../../constants/Colors";
import { fetchSelectedJobs } from "../../store/actions/employer";

const CurrentJobScreen = ({ navigation }) => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const currentJobs = useSelector((state) => state.employer.currentJobs);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      await dispatch(fetchSelectedJobs("confirmed"));
      setIsLoading(false);
    };

    fetchJobs();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <JobCard
        title={item.jobTitle}
        img={item.jobImage}
        id={item.id}
        employerID={item.employer._id}
        personName={`${item.owner.firstName} ${item.owner.lastName}`}
        personImage={item.owner.avatar}
        date={item.createdAt}
        current={true}
        onSelect={() => {
          navigation.navigate("detail", {
            jobID: item.jobID,
            jobTitle: item.jobTitle,
            isConfirmed: true,
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

  if (currentJobs.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>Currently no jobs...</Text>
      </View>
    );
  }

  return (
    <View style={{ marginVertical: 20 }}>
      <FlatList data={currentJobs} renderItem={renderItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CurrentJobScreen;
