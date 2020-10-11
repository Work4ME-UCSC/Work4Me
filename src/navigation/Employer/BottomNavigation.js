import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import Home from "../../screens/Employer/Home";
import JobProfile from "../../screens/Employer/JobProfile";
import PublicProfile from "../../screens/PublicProfile";
import AddJobs, {
  screenOptions as addJobScreenOptions,
} from "../../screens/Employer/AddJobs";
import JobTopNavigation from "./JobTopNavigation";
import MessageScreen from "../../screens/MessageScreen";
import MessageListScreen from "../../screens/MessageListScreen";

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
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={defaultHeaderOptions}>
      <Stack.Screen
        name="Add"
        component={AddJobs}
        options={addJobScreenOptions}
      />
    </Stack.Navigator>
  );
};

const MessageScreenStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={defaultHeaderOptions}>
      <Stack.Screen
        name="messageList"
        component={MessageListScreen}
        options={{ headerTitle: "Messages" }}
      />
      <Stack.Screen
        name="messageScreen"
        component={MessageScreen}
        options={{ headerTitle: "Message" }}
      />
    </Stack.Navigator>
  );
};

const HomeBottomTabNavigatorScreen = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={defaultHeaderOptions}>
      <Stack.Screen
        name="Posted Jobs"
        component={Home}
        options={screenOptions}
      />
      <Stack.Screen
        name="JobProfile"
        component={JobProfile}
        options={{ headerTitle: "Job Requests" }}
      />
      <Stack.Screen
        name="PublicProfile"
        component={PublicProfile}
        options={{
          headerBackTitleVisible: false,
          headerTitle: false,
          headerTransparent: true,
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="message"
        component={MessageScreen}
        options={{ headerTitle: "Message" }}
      />
    </Stack.Navigator>
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
        keyboardHidesTabBar: true,
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
