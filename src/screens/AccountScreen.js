import React, { createRef, useState, useEffect } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from "react-native";
import Animated from "react-native-reanimated";
import BottomSheet from "reanimated-bottom-sheet";
//import Toast from "react-native-simple-toast";
import { Avatar, Text, Divider } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { Rating } from "react-native-ratings";

import Colors from "../constants/Colors";
import {
  uploadProfilePicture,
  deleteProfilePicture,
} from "../store/actions/auth";

const AccountScreen = ({ navigation }) => {
  const firstName = useSelector((state) => state.auth.firstName);
  const lastName = useSelector((state) => state.auth.lastName);
  const rate = useSelector((state) => state.auth.rate);
  const rateCount = useSelector((state) => state.auth.rateCount);
  const jobCompleted = useSelector((state) => state.auth.jobCompleted);
  const email = useSelector((state) => state.auth.email);
  const profilePic = useSelector((state) => state.auth.profilePic);
  const userType = useSelector((state) => state.auth.userType);

  const dispatch = useDispatch();

  const [image, setImage] = useState(profilePic);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const bs = createRef();
  const fall = new Animated.Value(1);

  const takePhotoFromCamera = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status !== "granted") {
      //Toast.show("Need permission to access camera");
    }
    setError(null);
    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.6,
      });

      if (result.cancelled) {
        //.show("Cancelled Image Pick");
      } else {
        const pictureData = {
          uri: result.uri,
          type: `test/${result.uri.split(".").pop()}`,
          name: `test.${result.uri.split(".").pop()}`,
        };
        setIsLoading(true);
        const data = new FormData();
        data.append("avatar", pictureData);

        await dispatch(uploadProfilePicture(data));
        setImage(result.uri);
      }
    } catch (e) {
      setError(e.message);
    }
    setIsLoading(false);
  };

  const chooseFromGallery = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== "granted") {
      //Toast.show("Need permission to access gallery");
    }
    setError(null);
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.6,
      });

      if (result.cancelled) {
        //Toast.show("Cancelled Image Pick");
      } else {
        const pictureData = {
          uri: result.uri,
          type: `test/${result.uri.split(".").pop()}`,
          name: `test.${result.uri.split(".").pop()}`,
        };
        setIsLoading(true);
        const data = new FormData();
        data.append("avatar", pictureData);

        await dispatch(uploadProfilePicture(data));
        setImage(result.uri);
      }
    } catch (e) {
      setError(e.message);
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
        <Text style={{ ...styles.panelButtonTitle, color: Colors.white }}>
          Remove Profile Picture
        </Text>
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

  useEffect(() => {
    if (error) {
      Alert.alert("Important", error, [{ text: "Okay" }]);
    }
  }, [error]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <Text>Please Wait...</Text>
        <ActivityIndicator size="large" color={Colors.blue} />
      </View>
    );
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "white" }}
      contentContainerStyle={{ flexGrow: 1 }}
    >
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
        <Text style={styles.name}>{`${firstName} ${lastName}`}</Text>
        <Divider />

        <View style={styles.editable}>
          <View style={styles.editableContainer}>
            <View style={styles.infoContainer}>
              <Text style={styles.editableLabel}>Email</Text>
              <Text style={styles.editableInfo}>{email}</Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("passwordConfirm", { nav: "emailChange" })
              }
            >
              <MaterialCommunityIcons name="pencil" style={styles.icon} />
            </TouchableOpacity>
          </View>

          <View style={styles.editableContainer}>
            <View style={styles.infoContainer}>
              <Text style={{ ...styles.editableLabel, marginBottom: 0 }}>
                Password
              </Text>
              <Text style={styles.password}>.......</Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("passwordConfirm", {
                  nav: "passwordChange",
                })
              }
            >
              <MaterialCommunityIcons name="pencil" style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
        <Divider />

        <View style={styles.unditable}>
          <View style={{ ...styles.uneditContent, borderRightWidth: 1 }}>
            <Text>Ratings</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Rating
                type="custom"
                startingValue={rate}
                imageSize={25}
                readonly
                ratingColor={Colors.primaryOrange}
                showRating={false}
                style={{ marginTop: 5, marginRight: 5 }}
              />
              <Text style={{ fontWeight: "bold" }}>({rateCount})</Text>
            </View>
          </View>

          <View style={styles.uneditContent}>
            <Text>
              {userType === "employee" ? "Completed Jobs" : "Jobs Hired"}
            </Text>
            <Text style={{ marginTop: 5, fontWeight: "bold" }}>
              {jobCompleted}
            </Text>
          </View>
        </View>
        <Divider />
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
    borderWidth: 1,
    borderColor: Colors.primaryOrange,
    alignItems: "center",
    marginVertical: 7,
  },

  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: Colors.primaryOrange,
  },

  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  name: {
    fontSize: 20,
    alignSelf: "center",
    fontFamily: "Roboto",
    marginBottom: 5,
  },

  unditable: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: Colors.darkGrey,
    marginHorizontal: 10,
    //marginTop: 10,
  },

  uneditContent: {
    alignItems: "center",
    flex: 1,
    marginVertical: 25,
  },
});

export default AccountScreen;
