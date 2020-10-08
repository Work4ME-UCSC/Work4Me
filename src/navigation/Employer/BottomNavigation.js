import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import Home from "../../screens/Employer/Home";
import JobProfile from "../../screens/Employer/JobProfile";
import AddJobs, {
  screenOptions as addJobScreenOptions,
} from "../../screens/Employer/AddJobs";
import JobTopNavigation from "./JobTopNavigation";
import MessageScreen from "../../screens/MessageScreen";

import Color from "../../constants/Colors";
import HeaderButton from "../../components/HeaderButton";

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

const AddJobScreen = () => {
  const stack = createStackNavigator();
  return (
    <stack.Navigator screenOptions={defaultHeaderOptions}>
      <stack.Screen
        name="Add"
        component={AddJobs}
        options={addJobScreenOptions}
      />
    </stack.Navigator>
  );
};

const MessageScreenStack = () => {
  const stack = createStackNavigator();
  return (
    <stack.Navigator screenOptions={defaultHeaderOptions}>
      <stack.Screen
        name="Message"
        component={MessageScreen}
        options={screenOptions}
      />
    </stack.Navigator>
  );
};

const HomeBottomTabNavigatorScreen = () => {
  const stack = createStackNavigator();
  return (
    <stack.Navigator screenOptions={defaultHeaderOptions}>
      <stack.Screen name="Home" component={Home} options={screenOptions} />
      <stack.Screen name="JobProfile" component={JobProfile} />
    </stack.Navigator>
  );
};

const BottomNavigation = () => {
  const BottomTabNavigator = createBottomTabNavigator();

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
        component={HomeBottomTabNavigatorScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <BottomTabNavigator.Screen
        name="Add"
        component={AddJobScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="plus" size={size} color={color} />
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
