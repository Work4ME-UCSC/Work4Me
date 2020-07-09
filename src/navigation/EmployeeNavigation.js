import React from "react";
import { Platform } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Color from "../constants/Colors";
import HeaderButton from "../components/HeaderButton";
import { DrawerContent } from "../components/DrawerContent";

//screens
import EmployeeHomeScreen from "../screens/Employee/EmployeeHomeSreen";
import JobDescription, {
  screenOptions as jobDesScreenOptions,
} from "../screens/Employee/JobDescription";
import FavouriteScreen from "../screens/Employee/FavouriteScreen";
import CurrentJobScreen from "../screens/Employee/CurrentJobScreen";
import PastJobScreen from "../screens/Employee/PastJobScreen";
import PendingRequestScreen from "../screens/Employee/PendingRequestScreen";
import AccountScreen from "../screens/Employee/AccountScreen";
import MessageScreen from "../screens/MessageScreen";
import SettingScreen from "../screens/SettingScreen";
import HelpScreen from "../screens/HelpScreen";

const defaultHeaderOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Color.primaryOrange : "",
  },
  headerTintColor: Platform.OS === "android" ? "black" : Color.primaryOrange,
};

const screenOptions = ({ navigation }) => ({
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
});

//Home Screen: Stack Naviagation
const HomeEmployeeStack = createStackNavigator();

const HomeEmployeeStackScreen = () => {
  console.log(jobDesScreenOptions);
  return (
    <HomeEmployeeStack.Navigator screenOptions={defaultHeaderOptions}>
      <HomeEmployeeStack.Screen
        name="Home"
        component={EmployeeHomeScreen}
        options={screenOptions}
      />
      <HomeEmployeeStack.Screen
        name="JobDescription"
        component={JobDescription}
        options={jobDesScreenOptions}
      />
    </HomeEmployeeStack.Navigator>
  );
};

//Favourite Screen: Stack Navigation
const FavouriteStack = createStackNavigator();

const FavouriteStackScreen = () => {
  return (
    <FavouriteStack.Navigator screenOptions={defaultHeaderOptions}>
      <FavouriteStack.Screen
        name="Favourite"
        component={FavouriteScreen}
        options={screenOptions}
      />
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
      <AccountStack.Screen
        name="Account"
        component={AccountScreen}
        options={screenOptions}
      />
    </AccountStack.Navigator>
  );
};

const MessageStack = createStackNavigator();

const MessageScreenStack = () => {
  return (
    <MessageStack.Navigator screenOptions={defaultHeaderOptions}>
      <MessageStack.Screen
        name="Message"
        component={MessageScreen}
        options={screenOptions}
      />
    </MessageStack.Navigator>
  );
};

const SettingStack = createStackNavigator();

const SettingScreenStack = () => {
  return (
    <SettingStack.Navigator screenOptions={defaultHeaderOptions}>
      <SettingStack.Screen
        name="Settings"
        component={SettingScreen}
        options={screenOptions}
      />
    </SettingStack.Navigator>
  );
};

const HelpStack = createStackNavigator();

const HelpScreenStack = () => {
  return (
    <HelpStack.Navigator screenOptions={defaultHeaderOptions}>
      <HelpStack.Screen
        name="Help"
        component={HelpScreen}
        options={screenOptions}
      />
    </HelpStack.Navigator>
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
        name="Messages"
        component={MessageScreenStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name={Platform.OS === "android" ? "android-messages" : "message"}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </BottomTabNavigator.Navigator>
  );
};

const Drawer = createDrawerNavigator();

const EmployeeNavigation = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="HomeDrawer" component={BottomNavigation} />
      <Drawer.Screen name="Profile" component={AccountStackScreen} />
      <Drawer.Screen name="Setting" component={SettingScreenStack} />
      <Drawer.Screen name="Help" component={HelpScreenStack} />
    </Drawer.Navigator>
  );
};

export default EmployeeNavigation;
