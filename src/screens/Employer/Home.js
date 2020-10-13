import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Colors from "../../constants/Colors";
import RequestCard from "../../components/Employer/RequestCard";
import { fetchJobs } from "../../store/actions/employer";

export default function Home({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();

  const JOB_REQUESTS = useSelector((state) => state.employer.jobRequests);

  const dispatch = useDispatch();

  const renderRequestCard = ({ item }) => {
    return (
      <RequestCard
        title={item.jobTitle}
        img={item.jobImage}
        requestnumber={item.applicants.length}
        onSelect={() =>
          navigation.navigate("JobProfile", {
            requests: item.applicants,
            jobID: item.jobID,
          })
        }
      />
    );
  };

  const loadJobs = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(fetchJobs());
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

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <Text>Loading...</Text>
        <ActivityIndicator size="large" color={Colors.primaryOrange} />
      </View>
    );
  }

  if (JOB_REQUESTS.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>Currently no jobs posted...</Text>
        <Text>Keep adding new Jobs!!!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* <View style={styles.header}>
        <Text style={styles.headerText}>Posted Job List</Text>
      </View> */}
      <View style={styles.card}>
        <FlatList
          refreshing={isRefreshing}
          onRefresh={loadJobs}
          keyExtractor={(item) => item.jobID}
          data={JOB_REQUESTS}
          renderItem={renderRequestCard}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //width: "100%",
    flex: 1,
    padding: 5,
  },
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
  card: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
