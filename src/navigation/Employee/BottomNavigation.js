import React from "react";
import { createStackNavigator, HeaderTitle } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import EmployeeHomeScreen from "../../screens/Employee/EmployeeHomeSreen";
import JobDescription from "../../screens/Employee/JobDescription";
import PublicProfile from "../../screens/PublicProfile";
import FavouriteScreen from "../../screens/Employee/FavouriteScreen";
import MessageScreen from "../../screens/MessageScreen";
import JobTopNavigation from "./JobTopNavigation";
import Colors from "../../constants/Colors";
import HeaderButton from "../../components/HeaderButton";

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

const defaultHeaderOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primaryOrange : "",
  },
  headerTintColor: Platform.OS === "android" ? "black" : Colors.primaryOrange,
};

const HomeStackScreen = () => {
  const HomeEmployeeStack = createStackNavigator();

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
        options={{
          headerBackTitleVisible: false,
          headerTitle: false,
          headerTransparent: true,
          headerTintColor: "#fff",
        }}
      />
      <HomeEmployeeStack.Screen
        name="PublicProfile"
        component={PublicProfile}
        options={{
          headerBackTitleVisible: false,
          headerTitle: false,
          headerTransparent: true,
          headerTintColor: "#fff",
        }}
      />
    </HomeEmployeeStack.Navigator>
  );
};

const FavouriteStackScreen = () => {
  const FavouriteStack = createStackNavigator();

  return (
    <FavouriteStack.Navigator screenOptions={defaultHeaderOptions}>
      <FavouriteStack.Screen
        name="Favourite"
        component={FavouriteScreen}
        options={screenOptions}
      />
      <FavouriteStack.Screen
        name="JobDescription"
        component={JobDescription}
        options={{
          headerBackTitleVisible: false,
          headerTitle: false,
          headerTransparent: true,
          headerTintColor: "#fff",
        }}
      />
    </FavouriteStack.Navigator>
  );
};

const MessageScreenStack = () => {
  const MessageStack = createStackNavigator();

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

const BottomNavigation = () => {
  const BottomTabNavigator = createBottomTabNavigator();

  return (
    <BottomTabNavigator.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: Colors.primaryOrange,
        inactiveTintColor: Colors.black,
        keyboardHidesTabBar: true,
      }}
    >
      <BottomTabNavigator.Screen
        name="Home"
        component={HomeStackScreen}
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
        component={JobTopNavigation}
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

export default BottomNavigation;
