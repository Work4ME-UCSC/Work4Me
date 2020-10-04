import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";

import PendingCard from "../../components/Employee/PendingCard";
import Colors from "../../constants/Colors";
import { cancelJobRequest } from "../../store/actions/employee";

const PendingRequestScreen = ({ navigation }) => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const pendingJobs = useSelector((state) => state.employee.appliedJobs);

  const dispatch = useDispatch();

  const withdrawHandler = async (id) => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(cancelJobRequest(id));
    } catch (e) {
      setError(e.message);
    }
    setIsLoading(false);
  };

  const renderItem = ({ item }) => {
    return (
      <PendingCard
        title={item.jobTitle}
        time={item.createdAt}
        id={item.id}
        img={item.jobImage}
        withdrawHandler={() => withdrawHandler(item.id)}
        onSelect={() => {
          navigation.navigate("detail", {
            jobID: item.jobID,
            jobTitle: item.jobTitle,
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
        <Text>No pending jobs...</Text>
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

export default PendingRequestScreen;
