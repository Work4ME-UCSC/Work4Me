import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";

import PastJobCard from "../../components/Employee/PastJobCard";
import Colors from "../../constants/Colors";
import { fetchSelectedJobs } from "../../store/actions/employer";

const PastJobScreen = ({ navigation }) => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const pastJobs = useSelector((state) => state.employer.pastJobs);

  const dispatch = useDispatch();

  const reviewHandler = async (id) => {
    navigation.navigate("review", { isSkip: false, id });
  };

  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      await dispatch(fetchSelectedJobs("finished"));
      setIsLoading(false);
    };

    fetchJobs();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <PastJobCard
        title={item.jobTitle}
        time={item.createdAt}
        img={item.jobImage}
        id={item.id}
        isReviewed={item.isEmployeeReviewed}
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

  if (pastJobs.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>Currently no jobs...</Text>
      </View>
    );
  }

  return (
    <View>
      <FlatList data={pastJobs} renderItem={renderItem} />
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

export default PastJobScreen;
