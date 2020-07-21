import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useSelector } from "react-redux";

import Card from "../../components/Employer/Card";

export default function Home() {
  const JOBS = useSelector((state) => state.jobs.postedJobs);

  const renderCard = ({ item }) => {
    return (
      <Card
        name={item.jobTitle}
        img={item.jobImage}
        date={item.jobDate}
        location={item.jobLocation}
        time={item.jobTime}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <FlatList
          keyExtractor={(item) => item.jobID}
          data={JOBS}
          renderItem={renderCard}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    padding: 10,
    backgroundColor: "#dcdcdc",
  },
  card: {
    flex: 1,
  },
});
