import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";

import BottomNavigation from "./BottomNavigation";
import {
  AccountStackScreen,
  SettingStackScreen,
  HelpStackScreen,
} from "./DrawerScreens";
import DrawerContent from "../DrawerContent";

const MainNavigation = () => {
  const Drawer = createDrawerNavigator();

  return (
    <DrawerContent>
      <Drawer.Screen
        name="HomeDrawer"
        component={BottomNavigation}
        options={{
          drawerIcon: (props) => (
            <MaterialCommunityIcons
              name="home-outline"
              size={23}
              color={props.color}
            />
          ),
          drawerLabel: "Home",
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={AccountStackScreen}
        options={{
          drawerIcon: (props) => (
            <MaterialCommunityIcons
              name="account-outline"
              size={23}
              color={props.color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Setting"
        component={SettingStackScreen}
        options={{
          drawerIcon: (props) => (
            <MaterialCommunityIcons
              name="settings"
              size={23}
              color={props.color}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Help"
        component={HelpStackScreen}
        options={{
          drawerIcon: (props) => (
            <MaterialCommunityIcons name="help" size={23} color={props.color} />
          ),
        }}
      />
    </DrawerContent>
  );
};

export default MainNavigation;
