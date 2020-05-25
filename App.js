import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import HomeScreen from "./src/screens/HomeSreen";
import JobDescription from "./src/screens/JobDescription";
import FavouriteScreen from "./src/screens/FavouriteScreen";
import CurrentJobScreen from "./src/screens/CurrentJobScreen";
import PastJobScreen from "./src/screens/PastJobScreen";
import PendingRequestScreen from "./src/screens/PendingRequestScreen";
import AccountScreen from "./src/screens/AccountScreen";

const HomeStack = createStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="JobDescription" component={JobDescription} />
    </HomeStack.Navigator>
  );
};

const FavouriteStack = createStackNavigator();

const FavouriteStackScreen = () => {
  return (
    <FavouriteStack.Navigator>
      <FavouriteStack.Screen name="Favourite" component={FavouriteScreen} />
      <FavouriteStack.Screen name="JobDescription" component={JobDescription} />
    </FavouriteStack.Navigator>
  );
};

const JobTop = createMaterialTopTabNavigator();

const JobTopScreen = () => {
  return (
    <JobTop.Navigator>
      <JobTop.Screen name="CurrentJobs" component={CurrentJobScreen} />
      <JobTop.Screen name="PastJobs" component={PastJobScreen} />
      <JobTop.Screen name="Pending" component={PendingRequestScreen} />
    </JobTop.Navigator>
  );
};

const AccountStack = createStackNavigator();

const AccountStackScreen = () => {
  return (
    <AccountStack.Navigator>
      <AccountStack.Screen name="Account" component={AccountScreen} />
    </AccountStack.Navigator>
  );
};

const BottomTab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <BottomTab.Navigator>
        <BottomTab.Screen name="Home" component={HomeStackScreen} />
        <BottomTab.Screen name="Favourite" component={FavouriteStackScreen} />
        <BottomTab.Screen name="Jobs" component={JobTopScreen} />
        <BottomTab.Screen name="Account" component={AccountStackScreen} />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
};

export default App;
