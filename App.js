import React from "react";
import { Feather } from "@expo/vector-icons";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import SigninScreen from "./src/screens/SigninScreen";
import SignupScreen from "./src/screens/SignupScreen";
import EmployeeHomeScreen from "./src/screens/Employee/EmployeeHomeSreen";
import JobDescription from "./src/screens/Employee/JobDescription";
import FavouriteScreen from "./src/screens/Employee/FavouriteScreen";
import CurrentJobScreen from "./src/screens/Employee/CurrentJobScreen";
import PastJobScreen from "./src/screens/Employee/PastJobScreen";
import PendingRequestScreen from "./src/screens/Employee/PendingRequestScreen";
import AccountScreen from "./src/screens/Employee/AccountScreen";
import ScreenSelect from "./src/screens/ScreenSelect";
import Home from "./src/screens/Employer/Home";
import AddJobs from "./src/screens/Employer/AddJobs";

//Authentication Navigation: Stack Navigation
const SignStack = createStackNavigator();

const SignStackScreen = () => {
  return (
    <SignStack.Navigator>
      <SignStack.Screen name="Signin" component={SigninScreen} />
      <SignStack.Screen name="Signup" component={SignupScreen} />
    </SignStack.Navigator>
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

//Employee navigation properties
//Home Screen: Stack Naviagation

const HomeEmployeeStack = createStackNavigator();

const HomeEmployeeStackScreen = () => {
  return (
    <HomeEmployeeStack.Navigator
    screenOptions={{
      headerShown: false
    }}>
      
      <HomeEmployeeStack.Screen name="Home" component={EmployeeHomeScreen} />
      <HomeEmployeeStack.Screen
        name="JobDescription"
        component={JobDescription} 
      />
    </HomeEmployeeStack.Navigator>
  );
};

//Favourite Screen: Stack Navigation
const FavouriteStack = createStackNavigator();

const FavouriteStackScreen = () => {
  return (
    <FavouriteStack.Navigator>
      <FavouriteStack.Screen name="Favourite" component={FavouriteScreen} />
      <FavouriteStack.Screen name="JobDescription" component={JobDescription} />
    </FavouriteStack.Navigator>
  );
};

//Job Screen: Top bar navigation
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
//End of Employee properties

//Employee Screen Bottom navigation
const EmployeeBottomTab = createBottomTabNavigator();

const EmployeeScreen = () => {
  return (
    <EmployeeBottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: "#f08a1d",
      }}
    >
      <EmployeeBottomTab.Screen
        name="Home"
        component={HomeEmployeeStackScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
        }}
      />
      <EmployeeBottomTab.Screen
        name="Favourite"
        component={FavouriteStackScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="heart" size={size} color={color} />
          ),
        }}
      />
      <EmployeeBottomTab.Screen
        name="Jobs"
        component={JobTopScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="list" size={size} color={color} />
          ),
        }}
      />
      <EmployeeBottomTab.Screen
        name="Account"
        component={AccountStackScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" size={size} color={color} />
          ),
        }}
      />
    </EmployeeBottomTab.Navigator>
  );
};
// End of Employee bottom naviagation

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
      <AddJobStack.Screen name="Add" component={AddJobs} />
    </AddJobStack.Navigator>
  );
};

//End of Emplyer properties

//Employer Screen bottom navigation
const EmployerStack = createBottomTabNavigator();

const EmployerScreen = () => {
  return (
    <EmployerStack.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: "#f08a1d",
      }}
    >
      <EmployerStack.Screen
        name="Home"
        component={HomeEmployerStackScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
        }}
      />
      <EmployerStack.Screen
        name="Add"
        component={AddJobScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="plus" size={size} color={color} />
          ),
        }}
      />
      <EmployerStack.Screen
        name="Account"
        component={AccountStackScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" size={size} color={color} />
          ),
        }}
      />
    </EmployerStack.Navigator>
  );
};

const Main = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Main.Navigator screenOptions={{ headerShown: false }}>
        <Main.Screen name="main" component={ScreenSelect} />
        <Main.Screen name="Sign" component={SignStackScreen} />
        <Main.Screen name="Employee" component={EmployeeScreen} />
        <Main.Screen name="Employer" component={EmployerScreen} />
      </Main.Navigator>
    </NavigationContainer>
  );
};

export default App;
