import React from "react";
import { View, Text, StyleSheet } from "react-native";

import PendingCard from "../../components/Employee/PendingCard";

const PendingRequestScreen = () => {
  return (
    <View>
      <PendingCard />
      <PendingCard />
    </View>
  );
};

const styles = StyleSheet.create({});

export default PendingRequestScreen;
