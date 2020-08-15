import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useSelector } from "react-redux";

import RequestCard from "../../components/Employer/RequestCard";

export default function Home() {
  const JOBS = useSelector((state) => state.employer.postedJobs);

  const renderRequestCard = ({ item }) => {
    return (

      <RequestCard
        name={item.jobTitle}
      />
      
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Job Requests</Text>
      </View>
      <View style={styles.card}>
        <FlatList
          keyExtractor={(item) => item.jobID}
          data={JOBS}
          renderItem={renderRequestCard}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    padding: 5,
  },
  header:{
    backgroundColor: "#F27523",
    height:50,
    margin: 2,
    borderBottomLeftRadius:15,
    borderBottomRightRadius:15,
    padding:10,
  },
  headerText:{
    textAlign:'center',
    color:"#FFFFFF",
    fontSize: 20,

  },
  card: {
    flex: 1,
  },

});
