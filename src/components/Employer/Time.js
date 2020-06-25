import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Color from "../../constants/Colors";

const Time = (props) => {
  const [show, setShow] = useState(false);
  const date = props.date;

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    props.setDate(currentDate);
  };

  const showMode = () => {
    setShow(true);
  };

  const reset = () => {
    props.setDate(new Date(2020, 0));
  };

  return (
    <View>
      <Text style={styles.title}>{props.title}</Text>

      <View style={{ ...props.style }}>
        <Text>{props.subTitle}</Text>
        <View style={styles.timeContainer}>
          <MaterialCommunityIcons name="clock-outline" style={styles.icon} />

          <TouchableOpacity onPress={showMode} style={styles.time}>
            <Text style={styles.timeText}>
              {date.toLocaleTimeString().slice(0, 5)}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={reset} style={styles.reset}>
            <MaterialCommunityIcons
              name="close-circle-outline"
              size={20}
              color={Color.red}
            />
          </TouchableOpacity>
        </View>
      </View>

      {show && (
        <DateTimePicker
          {...props}
          testID="dateTimePicker"
          value={date}
          is24Hour={true}
          onChange={onChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
  },

  icon: {
    fontSize: 20,
  },

  timeContainer: {
    flexDirection: "row",
    marginTop: 5,
  },

  time: {
    backgroundColor: Color.lightGrey,
    width: 80,
    alignItems: "center",
    borderRadius: 5,
  },

  timeText: {
    fontSize: 16,
  },

  reset: {
    marginLeft: 6,
    justifyContent: "center",
  },
});

export default Time;
