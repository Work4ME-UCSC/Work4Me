import React from "react";
import { View, Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import RequestProfileCard from "../../components/Employer/RequestProfileCard";

const JobProfile = ({ route }) => {
  const requests = route.params.requests;
  console.log(requests);

  const renderItem = ({ item }) => (
    <RequestProfileCard
      name={item.applicantID.firstName + " " + item.applicantID.lastName}
      avatar={item.applicantID.avatar}
    />
  );
  return (
    <FlatList
      data={requests}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
    />
  );
};

export default JobProfile;
