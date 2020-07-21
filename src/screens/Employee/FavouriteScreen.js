import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useSelector } from "react-redux";

import JobCard from "../../components/Employee/Jobcard";

const FavouriteScreen = ({ navigation }) => {
  const favJobs = useSelector((state) => state.jobs.favouriteJobs);

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
          navigation.navigate("JobDescription", {
            jobID: item.jobID,
            jobTitle: item.jobTitle,
          });
        }}
      />
    );
  };

  if (favJobs.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No Jobs Found</Text>
      </View>
    );
  }

  return (
    <>
      <FlatList
        keyExtractor={(item) => item.jobID}
        data={favJobs}
        renderItem={renderJobCard}
      />
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

export default FavouriteScreen;
