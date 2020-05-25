import React from "react";
import { Feather } from "@expo/vector-icons";

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
      <BottomTab.Navigator
        initialRouteName="Home"
        tabBarOptions={{
          activeTintColor: "#f08a1d",
        }}
      >
        <BottomTab.Screen
          name="Home"
          component={HomeStackScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Feather name="home" size={size} color={color} />
            ),
          }}
        />
        <BottomTab.Screen
          name="Favourite"
          component={FavouriteStackScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Feather name="heart" size={size} color={color} />
            ),
          }}
        />
        <BottomTab.Screen
          name="Jobs"
          component={JobTopScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Feather name="list" size={size} color={color} />
            ),
          }}
        />
        <BottomTab.Screen
          name="Account"
          component={AccountStackScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Feather name="user" size={size} color={color} />
            ),
          }}
        />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
};

export default App;
