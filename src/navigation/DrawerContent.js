import React from "react";
import { View, Text } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { Avatar, Divider, Caption } from "react-native-paper";
import { useSelector } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Colors from "../constants/Colors";

const DrawerContent = ({ children }) => {
  const firstName = useSelector((state) => state.auth.firstName);
  const lastName = useSelector((state) => state.auth.lastName);
  const profilePic = useSelector((state) => state.auth.profilePic);
  const rate = useSelector((state) => state.auth.rate);

  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      drawerContentOptions={{ activeTintColor: Colors.primaryOrange }}
      initialRouteName="HomeDrawer"
      drawerContent={(props) => (
        <DrawerContentScrollView contentContainerStyle={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Avatar.Image
                source={
                  profilePic
                    ? { uri: profilePic }
                    : require("../../assets/profile2.png")
                }
                style={{ margin: 15 }}
                size={80}
              />

              <View>
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                  {`${firstName} ${lastName}`}
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <Caption style={{ lineHeight: 14, marginRight: 3 }}>
                    {rate.toFixed(1)}
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
                label="Version 1.0"
                // icon={(props) => (
                //   <MaterialCommunityIcons
                //     name="logout"
                //     size={24}
                //     color={props.color}
                //   />
                // )}
              />
              <Divider />
            </View>
          </View>
        </DrawerContentScrollView>
      )}
    >
      {children}
    </Drawer.Navigator>
  );
};

export default DrawerContent;
