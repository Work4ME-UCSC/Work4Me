import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Color from "../constants/Colors";
import HeaderButton from "../components/HeaderButton";
import { DrawerContent } from "../components/DrawerContent";
import MessageScreen from "../screens/MessageScreen";
import SettingScreen from "../screens/SettingScreen";
import HelpScreen from "../screens/HelpScreen";
import DeleteAccountScreen from "../screens/DeleteAccountScreen";

//screens
import Home from "../screens/Employer/Home";
import AddJobs, {
  screenOptions as addJobScreenOptions,
} from "../screens/Employer/AddJobs";
import AccountScreen from "../screens/Employee/AccountScreen";

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

//Employer properties

const HomeBottomTabNavigator = createStackNavigator();

const HomeBottomTabNavigatorScreen = () => {
  return (
    <HomeBottomTabNavigator.Navigator screenOptions={defaultHeaderOptions}>
      <HomeBottomTabNavigator.Screen
        name="Home"
        component={Home}
        options={screenOptions}
      />
    </HomeBottomTabNavigator.Navigator>
  );
};

//Add jobs screen: Stack Navigation
const AddJobStack = createStackNavigator();

const AddJobScreen = () => {
  return (
    <AddJobStack.Navigator screenOptions={defaultHeaderOptions}>
      <AddJobStack.Screen
        name="Add"
        component={AddJobs}
        options={addJobScreenOptions}
      />
    </AddJobStack.Navigator>
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

//Account setting navigation: Stack Navigation
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

const SettingStack = createStackNavigator();

const SettingScreenStack = () => {
  return (
    <SettingStack.Navigator screenOptions={defaultHeaderOptions}>
      <SettingStack.Screen
        name="Settings"
        component={SettingScreen}
        options={screenOptions}
      />
      <SettingStack.Screen
        name="Delete"
        component={DeleteAccountScreen}
        options={{ headerTitle: "Delete Account" }}
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

//Employer Screen bottom navigation
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

const EmployerNavigation = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="HomeDrawer" component={BottomNavigation} />
      <Drawer.Screen name="Profile" component={AccountStackScreen} />
      <Drawer.Screen name="Setting" component={SettingScreenStack} />
      <Drawer.Screen name="Help" component={HelpScreenStack} />
    </Drawer.Navigator>
  );
};

export default EmployerNavigation;
