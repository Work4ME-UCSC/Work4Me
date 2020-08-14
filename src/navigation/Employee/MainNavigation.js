import React from "react";
import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Avatar, Divider, Caption } from "react-native-paper";
import { useSelector } from "react-redux";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";

import Colors from "../../constants/Colors";

import BottomNavigation from "./BottomNavigation";
import {
  AccountStackScreen,
  SettingStackScreen,
  HelpStackScreen,
} from "./DrawerScreens";

const MainNavigation = () => {
  const Drawer = createDrawerNavigator();

  const firstName = useSelector((state) => state.auth.firstName);
  const lastName = useSelector((state) => state.auth.lastName);

  return (
    <Drawer.Navigator
      drawerContentOptions={{ activeTintColor: Colors.primaryOrange }}
      initialRouteName="HomeDrawer"
      drawerContent={(props) => (
        <DrawerContentScrollView contentContainerStyle={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Avatar.Image
                source={{
                  uri:
                    "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
                }}
                style={{ margin: 15 }}
                size={80}
              />

              <View>
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                  {`${firstName} ${lastName}`}
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <Caption style={{ lineHeight: 14, marginRight: 3 }}>
                    5.0
                  </Caption>
                  <MaterialCommunityIcons
                    name="star"
                    style={{ alignSelf: "center" }}
                  />
                </View>
              </View>
            </View>
            <Divider />

            <View style={{ flex: 1, marginTop: 10 }}>
              <DrawerItemList {...props} />
              <Divider />
            </View>
            <View style={{ marginVertical: 20, justifyContent: "center" }}>
              <Divider />
              <DrawerItem
                label="Log Out"
                //onPress={logoutHandler}
                icon={(props) => (
                  <MaterialCommunityIcons
                    name="logout"
                    size={24}
                    color={props.color}
                  />
                )}
              />
              <Divider />
            </View>
          </View>
        </DrawerContentScrollView>
      )}
    >
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
    </Drawer.Navigator>
  );
};

export default MainNavigation;
