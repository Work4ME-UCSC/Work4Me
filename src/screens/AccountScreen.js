import React, { createRef, useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import Animated from "react-native-reanimated";
import BottomSheet from "reanimated-bottom-sheet";
import Toast from "react-native-simple-toast";
import { Avatar, Text, Divider } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

import Colors from "../constants/Colors";
import {
  uploadProfilePicture,
  deleteProfilePicture,
} from "../store/actions/auth";

const AccountScreen = ({ navigation }) => {
  const firstName = useSelector((state) => state.auth.firstName);
  const lastName = useSelector((state) => state.auth.lastName);
  const userType = useSelector((state) => state.auth.userType);
  const email = useSelector((state) => state.auth.email);
  const profilePic = useSelector((state) => state.auth.profilePic);

  const dispatch = useDispatch();

  const [image, setImage] = useState(profilePic);
  const [isLoading, setIsLoading] = useState(false);

  const bs = createRef();
  const fall = new Animated.Value(1);

  const takePhotoFromCamera = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status !== "granted") {
      Toast.show("Need permission to access camera");
    }

    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.6,
      });

      if (result.cancelled) {
        Toast.show("Cancelled Image Pick");
      } else {
        setImage(result.uri);
        const pictureData = {
          uri: result.uri,
          type: `test/${result.uri.split(".").pop()}`,
          name: `test.${result.uri.split(".").pop()}`,
        };
        setIsLoading(true);
        const data = new FormData();
        data.append("avatar", pictureData);

        await dispatch(uploadProfilePicture(data));
      }
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  const chooseFromGallery = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== "granted") {
      Toast.show("Need permission to access gallery");
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.6,
      });

      if (result.cancelled) {
        Toast.show("Cancelled Image Pick");
      } else {
        setImage(result.uri);
        const pictureData = {
          uri: result.uri,
          type: `test/${result.uri.split(".").pop()}`,
          name: `test.${result.uri.split(".").pop()}`,
        };
        setIsLoading(true);
        const data = new FormData();
        data.append("avatar", pictureData);

        await dispatch(uploadProfilePicture(data));
      }
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  const removePicture = () => {
    setIsLoading(true);
    dispatch(deleteProfilePicture())
      .then(() => {
        setImage(null);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        alert(e.message);
      });
  };

  const renderContent = () => (
    <View style={styles.panel}>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.panelTitle}>Upload photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
      </View>

      <TouchableOpacity
        style={styles.panelButton}
        onPress={takePhotoFromCamera}
      >
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.panelButton} onPress={chooseFromGallery}>
        <Text style={styles.panelButtonTitle}>Choose From Gallery</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          ...styles.panelButton,
          backgroundColor: image ? Colors.red : Colors.darkGrey,
        }}
        onPress={removePicture}
        disabled={image ? false : true}
      >
        <Text style={styles.panelButtonTitle}>Remove Profile Picture</Text>
      </TouchableOpacity>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <Text>Please Wait...</Text>
        <ActivityIndicator size="large" color={Colors.blue} />
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
      <BottomSheet
        ref={bs}
        snapPoints={[330, 0]}
        renderContent={renderContent}
        renderHeader={renderHeader}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
        enabledContentTapInteraction={false}
      />
      <Animated.View
        style={{ opacity: Animated.add(0.4, Animated.multiply(fall, 1.0)) }}
      >
        <TouchableOpacity
          style={styles.image}
          onPress={() => bs.current.snapTo(0)}
        >
          <Avatar.Image
            source={
              image ? { uri: image } : require("../../assets/profile2.png")
            }
            size={140}
          />
        </TouchableOpacity>
        <Divider />
        <View style={styles.container}>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>First name</Text>
            <Text style={styles.info}>{firstName}</Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.label}>Last name</Text>
            <Text style={styles.info}>{lastName}</Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.label}>User Type</Text>
            <Text style={styles.info}>{userType.toUpperCase()}</Text>
          </View>
        </View>

        <View style={styles.editable}>
          <TouchableOpacity
            style={styles.editableContainer}
            // onPress={() => navigation.navigate("ChangeEmail")}
          >
            <View style={styles.infoContainer}>
              <Text style={styles.editableLabel}>Email</Text>
              <Text style={styles.editableInfo}>{email}</Text>
            </View>
            <MaterialCommunityIcons name="pencil" style={styles.icon} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.editableContainer}
            //onPress={() => navigation.navigate("ChangePassword")}
          >
            <View style={styles.infoContainer}>
              <Text style={{ ...styles.editableLabel, marginBottom: 0 }}>
                Password
              </Text>
              <Text style={styles.password}>.......</Text>
            </View>
            <MaterialCommunityIcons name="pencil" style={styles.icon} />
          </TouchableOpacity>

          <Divider />

          <View style={styles.deleteContainer}>
            <Text style={styles.editableLabel}>Advanced</Text>
            <Text
              style={styles.deleteText}
              //onPress={() => navigation.navigate("Delete")}
            >
              Delete account
            </Text>
          </View>
        </View>
      </Animated.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    alignSelf: "center",
    marginVertical: 10,
  },

  container: {
    paddingHorizontal: 20,
  },

  editable: {
    marginTop: 10,
    paddingHorizontal: 20,
  },

  title: {
    marginBottom: 5,
  },

  infoContainer: {
    marginTop: 10,
    marginBottom: 5,
  },

  label: {
    fontSize: 18,
    marginBottom: 8,
    color: Colors.darkGrey,
  },

  info: {
    color: Colors.darkGrey,
    fontSize: 16,
  },

  editableContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  editableLabel: {
    fontSize: 18,
    marginBottom: 8,
  },

  editableInfo: {
    fontSize: 16,
  },

  icon: {
    fontSize: 24,
    marginTop: 10,
    marginRight: 10,
  },

  deleteContainer: {
    marginVertical: 20,
  },

  deleteText: {
    color: Colors.red,
    alignSelf: "flex-start",
  },

  password: {
    fontSize: 22,
  },

  header: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#333333",
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  panelHeader: {
    alignItems: "center",
  },

  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },

  panel: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    paddingTop: 20,
  },

  panelTitle: {
    fontSize: 27,
    height: 35,
  },

  panelSubtitle: {
    fontSize: 14,
    color: "gray",
    height: 30,
    marginBottom: 10,
  },

  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: Colors.red,
    alignItems: "center",
    marginVertical: 7,
  },

  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },

  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AccountScreen;
