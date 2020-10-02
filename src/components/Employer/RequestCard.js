import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Avatar, Button, Card, Title, Text } from "react-native-paper";

const RequestCard = (props) => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <TouchableCmp onPress={props.onSelect}>
      <Card style={styles.container}>
        <Card.Content>
          <Title>{props.name}</Title>
          <Card.Actions>
            <Avatar.Image size={30} label="XD" />
            <Card.Title title={props.title} />
          </Card.Actions>
          {/* <Card.Actions>
            <Button
              color="#F27523"
              mode="outlined"
              onPress={() => console.log("Pressed")}
              style={styles.button}
            >
              Accept
            </Button>
            <Button
              color="#F27523"
              mode="contained"
              onPress={() => console.log("Pressed")}
            >
              Reject
            </Button>
          </Card.Actions> */}
        </Card.Content>
      </Card>
    </TouchableCmp>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 5,
    padding: 2,
    borderRadius: 5,
  },
  button: {
    marginRight: 20,
  },
});

export default RequestCard;
