import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { useSafeArea } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";

import JobInput from "../../components/Employer/JobInput";
import Dropdown from "../../components/Employer/Dropdown";

const AddJobs = () => {
  //const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const [category, setCategory] = useState(null);
  const [location, setLocation] = useState(null);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const insets = useSafeArea();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom }}
    >
      <ScrollView style={styles.container}>
        <JobInput
          label="Job Title"
          icon="pencil"
          placeholder="Enter Job title"
        />

        <JobInput
          label="Job Description"
          placeholder="Enter Description"
          multiline
          textAlignVertical="top"
          style={styles.description}
        />

        <Dropdown
          title="Job Category"
          items={[
            { label: "Household", value: "Household" },
            { label: "IT", value: "IT" },
            { label: "Delivery", value: "Delivery" },
            { label: "Shop keeper", value: "Shop keeper" },
            { label: "Cashier", value: "Cashier" },
          ]}
          multiple={true}
          multipleText="%d categories have been selected."
          min={0}
          max={10}
          searchable
          placeholder="Select categories"
          searchablePlaceholder="Search for a category"
          onChangeItem={(item) => {
            setCategory({ category: item });
          }}
        />
        {console.log(category)}

        <Dropdown
          title="Location"
          items={[
            { label: "All", value: "All" },
            { label: "Colombo 01", value: "Colombo 01" },
            { label: "Colombo 02", value: "Colombo 02" },
            { label: "Colombo 03", value: "Colombo 03" },
            { label: "Colombo 04", value: "Colombo 04" },
            { label: "Colombo 05", value: "Colombo 05" },
            { label: "Colombo 06", value: "Colombo 06" },
            { label: "Colombo 07", value: "Colombo 07" },
            { label: "Colombo 08", value: "Colombo 08" },
            { label: "Colombo 09", value: "Colombo 09" },
            { label: "Colombo 10", value: "Colombo 10" },
            { label: "Colombo 11", value: "Colombo 11" },
            { label: "Colombo 12", value: "Colombo 12" },
            { label: "Colombo 13", value: "Colombo 13" },
            { label: "Colombo 14", value: "Colombo 14" },
            { label: "Colombo 15", value: "Colombo 15" },
          ]}
          searchable
          placeholder="Select Location"
          searchablePlaceholder="Search for a Location"
          onChangeItem={(item) => {
            setLocation({ location: item.value });
          }}
        />

        {console.log(location)}

        <JobInput
          label="Address (Optional)"
          icon="pencil"
          placeholder="Enter Working address"
        />

        <JobInput
          label="Salary (Optional)"
          icon="cash"
          keyboardType="decimal-pad"
          placeholder="Enter salary"
        />

        <View>
          <Text>Time (Optional)</Text>

          <View>
            <View style={{ flexDirection: "row", marginTop: 5 }}>
              <MaterialCommunityIcons name="clock-outline" size={20} />
              <TouchableOpacity>
                <Text>14.00</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* <DateTimePicker mode="time" value={new Date()} /> */}
        </View>

        <View style={{ marginVertical: 10 }}>
          <Button title="Submit" />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
  },

  description: {
    //marginBottom: 20,
    borderWidth: 1,
    borderRadius: 10,
    height: 100,
  },
});

export default AddJobs;
