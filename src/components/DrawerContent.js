import React from "react";
import { View, StyleSheet } from "react-native";
import { Avatar, Title, Caption, Drawer, Text } from "react-native-paper";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { useSelector } from "react-redux";
import Colors from "../constants/Colors";

export const DrawerContent = (props) => {
  const firstName = useSelector((state) => state.auth.firstName);
  const lastName = useSelector((state) => state.auth.lastName);

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              <Avatar.Image
                source={{
                  uri:
                    "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
                }}
                size={70}
              />
              <View style={{ marginLeft: 15 }}>
                <Title style={styles.title}>{`${firstName} ${lastName}`}</Title>
                <View style={{ flexDirection: "row" }}>
                  <Caption style={styles.caption}>5.0</Caption>
                  <Icon name="star" style={styles.icon} />
                </View>
              </View>
            </View>
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              activeTintColor={Colors.red}
              icon={({ color, size }) => (
                <Icon name="home-outline" color={color} size={size} />
              )}
              label="Home"
              onPress={() => {
                props.navigation.navigate("Home");
              }}
            />

            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="account-outline" color={color} size={size} />
              )}
              label="Profile"
              onPress={() => {
                props.navigation.navigate("Profile");
              }}
            />

            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="settings-outline" color={color} size={size} />
              )}
              label="Settings"
              onPress={() => {
                props.navigation.navigate("Setting");
              }}
            />

            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="help-circle-outline" color={color} size={size} />
              )}
              label="Help"
              onPress={() => {
                props.navigation.navigate("Help");
              }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>

      <Drawer.Section style={styles.bottomDrawerSection}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text>Legal</Text>
          <Text>v1.0</Text>
        </View>
      </Drawer.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },

  userInfoSection: {
    paddingLeft: 20,
  },

  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },

  caption: {
    fontSize: 14,
    lineHeight: 14,
    marginRight: 3,
  },

  drawerSection: {
    marginTop: 15,
  },

  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
    marginHorizontal: 20,
  },

  icon: {
    fontSize: 14,
    alignSelf: "center",
  },
});
