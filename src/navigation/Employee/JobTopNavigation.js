import React from "react";
import { useSafeArea } from "react-native-safe-area-context";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import CurrentJobScreen from "../../screens/Employee/CurrentJobScreen";
import PastJobScreen from "../../screens/Employee/PastJobScreen";
import PendingRequestScreen from "../../screens/Employee/PendingRequestScreen";
import Colors from "../../constants/Colors";

const TopNavigator = createMaterialTopTabNavigator();

const JobTopNavigation = () => {
  const insets = useSafeArea();
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
        component={CurrentJobScreen}
      />
      <TopNavigator.Screen
        name="Pending"
        options={{ tabBarLabel: "Pending" }}
        component={PendingRequestScreen}
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
