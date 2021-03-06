import React from "react";
import {
  View,
  StyleSheet,
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
} from "react-native";
import { Avatar, Button, Card } from "react-native-paper";

import Colors from "../../constants/Colors";

const RequestProfileCard = (props) => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <View style={styles.container}>
      <View>
        <TouchableCmp onPress={props.onSelect}>
          <Card
            style={{
              borderRadius: 10,
            }}
          >
            <Card.Content>
              <Card.Actions>
                <Avatar.Image
                  size={80}
                  source={
                    props.avatar
                      ? { uri: props.avatar }
                      : require("../../../assets/profile.png")
                  }
                />
                <Card.Title title={props.name} />
              </Card.Actions>
              <Card.Actions>
                <View style={styles.buttonContainer}>
                  <Button
                    mode="text"
                    style={styles.button}
                    color={Colors.primaryOrange}
                    onPress={() =>
                      props.handleJobAccept(props.jobID, props.userID, props.employee)
                    }
                  >
                    Accept
                  </Button>
                  <Button
                    mode="contained"
                    style={styles.button}
                    color={Colors.primaryOrange}
                    onPress={() =>
                      props.handleJobReject(props.jobID, props.userID)
                    }
                  >
                    Reject
                  </Button>
                </View>
              </Card.Actions>
            </Card.Content>
          </Card>
        </TouchableCmp>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },

  nameContainer: {
    flexDirection: "row",
  },

  buttonContainer: {
    flexDirection: "row",
    // justifyContent: "space-between",
    // alignItems: "stretch",
  },

  button: {
    flex: 1,
    borderWidth: 2,
    borderColor: Colors.primaryOrange,
    borderRadius: 10,
    margin: 10,
  },
});

export default RequestProfileCard;
