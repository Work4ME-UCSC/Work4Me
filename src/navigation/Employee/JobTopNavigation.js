import React from "react";
import { useSafeArea } from "react-native-safe-area-context";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import CurrentJobScreen from "../../screens/Employee/CurrentJobScreen";
import PastJobScreen from "../../screens/Employee/PastJobScreen";
import PendingRequestScreen from "../../screens/Employee/PendingRequestScreen";
import ReviewScreen from "../../screens/ReviewScreen";
import Colors from "../../constants/Colors";

const pendingJobsStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="pending" component={PendingRequestScreen} />
    </Stack.Navigator>
  );
};

const currentJobsStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="current" component={CurrentJobScreen} />
      <Stack.Screen name="review" component={ReviewScreen} />
    </Stack.Navigator>
  );
};

const JobTopNavigation = () => {
  const insets = useSafeArea();
  const TopNavigator = createMaterialTopTabNavigator();

  return (
    <TopNavigator.Navigator
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        backgroundColor: Colors.primaryOrange,
      }}
      tabBarOptions={{
        activeTintColor: Colors.primaryOrange,
        inactiveTintColor: Colors.lightGrey,
        indicatorContainerStyle: {
          backgroundColor: Colors.white,
        },
        indicatorStyle: {
          backgroundColor: Colors.primaryOrange,
        },
      }}
    >
      <TopNavigator.Screen
        name="CurrentJobs"
        options={{ tabBarLabel: "Current Jobs" }}
        component={currentJobsStack}
      />
      <TopNavigator.Screen
        name="Pending"
        options={{ tabBarLabel: "Pending" }}
        component={pendingJobsStack}
      />
      <TopNavigator.Screen
        name="PastJobs"
        options={{ tabBarLabel: "Past Jobs" }}
        component={PastJobScreen}
      />
    </TopNavigator.Navigator>
  );
};

export default JobTopNavigation;
