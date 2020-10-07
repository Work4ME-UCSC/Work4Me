import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  Dimensions,
} from "react-native";
import HeaderImageScrollView, {
  TriggeringView,
} from "react-native-image-header-scroll-view";
import * as Animatable from "react-native-animatable";
import { Entypo } from "@expo/vector-icons";
import moment from "moment";
import { Button } from "react-native-paper";
import { DotsLoader } from "react-native-indicator";
import { useDispatch, useSelector } from "react-redux";

import Colors from "../constants/Colors";
import { fetchReviews } from "../store/actions/reviews";

const MIN_HEIGHT = Platform.OS === "ios" ? 90 : 55;
const MAX_HEIGHT = 300;

const PublicProfile = ({ route, navigation }) => {
  const user = route.params.user;
  const userName = `${user.firstName} ${user.lastName}`;
  const navTitleView = useRef(null);
  const reviews = useSelector((state) => state.review.reviews);

  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const handleReview = async () => {
      try {
        setIsLoading(true);
        await dispatch(fetchReviews(user._id));
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        console.log(e);
      }
    };
    handleReview();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading</Text>
        <DotsLoader color={Colors.primaryOrange} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <HeaderImageScrollView
        maxHeight={MAX_HEIGHT}
        minHeight={MIN_HEIGHT}
        maxOverlayOpacity={0.6}
        minOverlayOpacity={0.3}
        showsVerticalScrollIndicator={false}
        renderHeader={() => (
          <Image source={{ uri: user.avatar }} style={styles.image} />
        )}
        renderFixedForeground={() => (
          <Animatable.View style={styles.navTitleView} ref={navTitleView}>
            <Text style={styles.navTitle}>{userName}</Text>
          </Animatable.View>
        )}
      >
        <TriggeringView
          style={styles.section}
          onHide={() => navTitleView.current.fadeInUp(200)}
          onDisplay={() => navTitleView.current.fadeOut(100)}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={styles.ownerName}>{userName}</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.rating}>{user.rate.toFixed(1)}</Text>
              <Entypo name="star" size={15} color={Colors.primaryOrange} />
              <Text>({user.reviewCount})</Text>
            </View>
          </View>
        </TriggeringView>
        <View style={styles.section}>
          <Text style={styles.title}>About</Text>

          <Text style={styles.content}>
            <Text style={styles.subTitle}>
              {user.userType === "employer"
                ? "Jobs Hired: "
                : "Jobs Completed: "}
            </Text>
            {user.jobCompleted}
          </Text>

          <Text style={styles.content}>
            <Text style={styles.subTitle}>Joined On: </Text>
            {moment(user.createdAt).format("DD MMMM YYYY")}
          </Text>
        </View>

        <View style={styles.section}>
          <Button
            mode="outlined"
            style={styles.button}
            color={Colors.green}
            //onPress={navigation.navigate("Messages")}
          >
            Message
          </Button>
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>Reviews</Text>
        </View>
      </HeaderImageScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  overview: {
    flexDirection: "row",
    marginVertical: 5,
  },

  ownerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  ownerName: {
    fontSize: 20,
  },

  button: {
    borderWidth: 1,
    borderColor: Colors.green,
    borderRadius: 20,
  },

  image: {
    height: MAX_HEIGHT,
    width: Dimensions.get("window").width,
    alignSelf: "stretch",
    resizeMode: "cover",
  },

  navTitleView: {
    height: MIN_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Platform.OS === "ios" ? 40 : 5,
    opacity: 0,
  },

  navTitle: {
    color: "white",
    fontSize: 18,
    backgroundColor: "transparent",
  },

  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
    backgroundColor: "white",
  },

  title: {
    fontSize: 19,
    fontWeight: "bold",
    marginBottom: 5,
  },

  subTitle: {
    fontWeight: "bold",
  },

  content: {
    fontSize: 16,
    textAlign: "justify",
    marginVertical: 4,
  },

  rating: {
    //color: Colors.darkGrey,
    marginHorizontal: 3,
  },

  viewProfile: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: Colors.green,
  },
});

export default PublicProfile;
