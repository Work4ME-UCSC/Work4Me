import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Color from "../constants/Colors";
import HeaderButton from "../components/HeaderButton";

//screens
import EmployeeHomeScreen from "../screens/Employee/EmployeeHomeSreen";
import JobDescription from "../screens/Employee/JobDescription";
import FavouriteScreen from "../screens/Employee/FavouriteScreen";
import CurrentJobScreen from "../screens/Employee/CurrentJobScreen";
import PastJobScreen from "../screens/Employee/PastJobScreen";
import PendingRequestScreen from "../screens/Employee/PendingRequestScreen";
import AccountScreen from "../screens/Employee/AccountScreen";
import { Platform } from "react-native";

const defaultHeaderOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Color.primaryOrange : "",
  },
  headerTintColor: Platform.OS === "android" ? "black" : Color.primaryOrange,
};

//Home Screen: Stack Naviagation
const HomeEmployeeStack = createStackNavigator();

const HomeEmployeeStackScreen = ({ navigation }) => {
  return (
    <HomeEmployeeStack.Navigator screenOptions={defaultHeaderOptions}>
      <HomeEmployeeStack.Screen
        name="Home"
        component={EmployeeHomeScreen}
        options={{
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Menu"
                iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
                onPress={() => {
                  navigation.toggleDrawer();
                }}
              />
            </HeaderButtons>
          ),
        }}
      />
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
    <FavouriteStack.Navigator screenOptions={defaultHeaderOptions}>
      <FavouriteStack.Screen name="Favourite" component={FavouriteScreen} />
      <FavouriteStack.Screen name="JobDescription" component={JobDescription} />
    </FavouriteStack.Navigator>
  );
};

//Job Screen: Top bar navigation
const TopNavigator = createMaterialTopTabNavigator();

const TopNavigatorScreen = () => {
  return (
    <TopNavigator.Navigator>
      <TopNavigator.Screen name="CurrentJobs" component={CurrentJobScreen} />
      <TopNavigator.Screen name="PastJobs" component={PastJobScreen} />
      <TopNavigator.Screen name="Pending" component={PendingRequestScreen} />
    </TopNavigator.Navigator>
  );
};

const AccountStack = createStackNavigator();

const AccountStackScreen = () => {
  return (
    <AccountStack.Navigator screenOptions={defaultHeaderOptions}>
      <AccountStack.Screen name="Account" component={AccountScreen} />
    </AccountStack.Navigator>
  );
};

//Employee Screen Bottom navigation
const BottomTabNavigator = createBottomTabNavigator();

const BottomNavigation = () => {
  return (
    <BottomTabNavigator.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: Color.primaryOrange,
        inactiveTintColor: Color.black,
      }}
    >
      <BottomTabNavigator.Screen
        name="Home"
        component={HomeEmployeeStackScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <BottomTabNavigator.Screen
        name="Favourite"
        component={FavouriteStackScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="heart" size={size} color={color} />
          ),
        }}
      />
      <BottomTabNavigator.Screen
        name="Jobs"
        component={TopNavigatorScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="playlist-edit"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <BottomTabNavigator.Screen
        name="Account"
        component={AccountStackScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" size={size} color={color} />
          ),
        }}
      />
    </BottomTabNavigator.Navigator>
  );
};

const Drawer = createDrawerNavigator();

const EmployeeNavigation = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={BottomNavigation} />
      <Drawer.Screen name="Fav" component={FavouriteStackScreen} />
    </Drawer.Navigator>
  );
};

export default EmployeeNavigation;
