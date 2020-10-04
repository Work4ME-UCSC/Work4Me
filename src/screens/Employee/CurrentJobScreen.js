import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";

import CurrentJobCard from "../../components/Employee/CurrentJobCard";
import Colors from "../../constants/Colors";
import { fetchCurrentJobs, jobFinished } from "../../store/actions/employee";

const CurrentJobScreen = ({ navigation }) => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const pendingJobs = useSelector((state) => state.employee.currentJobs);

  const dispatch = useDispatch();

  const finishJob = async (id) => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(jobFinished(id));
      navigation.navigate("review", { isSkip: true });
    } catch (e) {
      setError(e.message);
    }
    setIsLoading(false);
  };

  const clickFinishHandler = (id) => {
    Alert.alert("Important", "Have you completed this job", [
      { text: "Yes", onPress: () => finishJob(id) },
      { text: "No" },
    ]);
  };

  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      await dispatch(fetchCurrentJobs());
      setIsLoading(false);
    };

    fetchJobs();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <CurrentJobCard
        title={item.jobTitle}
        time={item.createdAt}
        img={item.jobImage}
        id={item.id}
        finishHandler={clickFinishHandler}
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

  if (pendingJobs.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>Currently no jobs...</Text>
      </View>
    );
  }

  return (
    <View>
      <FlatList data={pendingJobs} renderItem={renderItem} />
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
