import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Color from "../constants/Colors";

//screens
import Home from "../screens/Employer/Home";
import AddJobs from "../screens/Employer/AddJobs";
import AccountScreen from "../screens/Employee/AccountScreen";

//Employer properties

const HomeEmployerStack = createStackNavigator();

const HomeEmployerStackScreen = () => {
  return (
    <HomeEmployerStack.Navigator>
      <HomeEmployerStack.Screen name="Home" component={Home} />
    </HomeEmployerStack.Navigator>
  );
};

//Add jobs screen: Stack Navigation
const AddJobStack = createStackNavigator();

const AddJobScreen = () => {
  return (
    <AddJobStack.Navigator>
      <AddJobStack.Screen
        name="Add"
        component={AddJobs}
        options={{
          headerTitle: "Post a Job",
          headerStyle: {
            backgroundColor: Color.primaryOrange,
          },
        }}
      />
    </AddJobStack.Navigator>
  );
};

//Account setting navigation: Stack Navigation
const AccountStack = createStackNavigator();

const AccountStackScreen = () => {
  return (
    <AccountStack.Navigator>
      <AccountStack.Screen name="Account" component={AccountScreen} />
    </AccountStack.Navigator>
  );
};

//Employer Screen bottom navigation
const EmployerStack = createBottomTabNavigator();

const EmployerNavigation = () => {
  return (
    <EmployerStack.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: Color.primaryOrange,
        inactiveTintColor: Color.black,
      }}
    >
      <EmployerStack.Screen
        name="Home"
        component={HomeEmployerStackScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <EmployerStack.Screen
        name="Add"
        component={AddJobScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="plus" size={size} color={color} />
          ),
        }}
      />
      <EmployerStack.Screen
        name="Account"
        component={AccountStackScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" size={size} color={color} />
          ),
        }}
      />
    </EmployerStack.Navigator>
  );
};

export default EmployerNavigation;
