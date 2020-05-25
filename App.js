import React from "react";
import { Feather } from "@expo/vector-icons";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import SigninScreen from "./src/screens/SigninScreen";
import SignupScreen from "./src/screens/SignupScreen";
import HomeScreen from "./src/screens/Employee/HomeSreen";
import JobDescription from "./src/screens/Employee/JobDescription";
import FavouriteScreen from "./src/screens/Employee/FavouriteScreen";
import CurrentJobScreen from "./src/screens/Employee/CurrentJobScreen";
import PastJobScreen from "./src/screens/Employee/PastJobScreen";
import PendingRequestScreen from "./src/screens/Employee/PendingRequestScreen";
import AccountScreen from "./src/screens/Employee/AccountScreen";
import ScreenSelect from "./src/screens/ScreenSelect";
import Home from "./src/screens/Employer/Home";
import AddJobs from "./src/screens/Employer/AddJobs";

//Navigators
const Stack = createStackNavigator();
const Top = createMaterialTopTabNavigator();
const Bottom = createBottomTabNavigator();

//Authentication Navigation: Stack Navigation
const SignStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Signin" component={SigninScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
};

//Account setting navigation: Stack Navigation
const AccountStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Account" component={AccountScreen} />
    </Stack.Navigator>
  );
};

//Employee navigation properties

//Home Screen: Stack Naviagation
const HomeEmployeeStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="JobDescription" component={JobDescription} />
    </Stack.Navigator>
  );
};

//Favourite Screen: Stack Navigation
const FavouriteStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Favourite" component={FavouriteScreen} />
      <Stack.Screen name="JobDescription" component={JobDescription} />
    </Stack.Navigator>
  );
};

//Job Screen: Top bar navigation
const JobTopScreen = () => {
  return (
    <Top.Navigator>
      <Top.Screen name="CurrentJobs" component={CurrentJobScreen} />
      <Top.Screen name="PastJobs" component={PastJobScreen} />
      <Top.Screen name="Pending" component={PendingRequestScreen} />
    </Top.Navigator>
  );
};

//End of Employee properties

//Employee Screen Bottom navigation

const EmployeeScreen = () => {
  return (
    <Bottom.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: "#f08a1d",
      }}
    >
      <Bottom.Screen
        name="Home"
        component={HomeEmployeeStackScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
        }}
      />
      <Bottom.Screen
        name="Favourite"
        component={FavouriteStackScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="heart" size={size} color={color} />
          ),
        }}
      />
      <Bottom.Screen
        name="Jobs"
        component={JobTopScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="list" size={size} color={color} />
          ),
        }}
      />
      <Bottom.Screen
        name="Account"
        component={AccountStackScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" size={size} color={color} />
          ),
        }}
      />
    </Bottom.Navigator>
  );
};
// End of Employee bottom naviagation

//Employer properties
const HomeEmployerBottomScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

//Add jobs screen: Stack Navigation
const AddJobScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Add" component={AddJobs} />
    </Stack.Navigator>
  );
};

//End of Employer properties

//Employer Screen bottom navigation

const EmployerScreen = () => {
  return (
    <Bottom.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: "#f08a1d",
      }}
    >
      <Bottom.Screen
        name="Home"
        component={HomeEmployerBottomScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
        }}
      />
      <Bottom.Screen
        name="Add"
        component={AddJobScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="plus" size={size} color={color} />
          ),
        }}
      />
      <Bottom.Screen
        name="Account"
        component={AccountStackScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" size={size} color={color} />
          ),
        }}
      />
    </Bottom.Navigator>
  );
};

//End Employer bottom navigation

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="main" component={ScreenSelect} />
        <Stack.Screen name="Sign" component={SignStackScreen} />
        <Stack.Screen name="Employee" component={EmployeeScreen} />
        <Stack.Screen name="Employer" component={EmployerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
