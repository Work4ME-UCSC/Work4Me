import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useSelector } from "react-redux";

import JobCard from "../../components/Employee/Jobcard";

const FavouriteScreen = ({ navigation }) => {
  const favJobs = useSelector((state) => state.jobs.favouriteJobs);

  const renderJobCard = ({ item }) => {
    return (
      <JobCard
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

const styles = StyleSheet.create({});

export default FavouriteScreen;
