import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Button,
  KeyboardAvoidingView,
} from "react-native";

import { useSafeArea } from "react-native-safe-area-context";

import JobInput from "../../components/Employer/JobInput";
import Dropdown from "../../components/Employer/Dropdown";
import Radiobutton from "../../components/Employer/Radiobutton";
import Time from "../../components/Employer/Time";
import { LOCATION, CATEGORIES } from "../../data/addJobData";
import SubmitButton from "../../components/SubmitButton";

const AddJobs = () => {
  const [category, setCategory] = useState(null);
  const [location, setLocation] = useState(null);
  const [sex, setSex] = useState("Any");
  const [fromDate, setFromDate] = useState(new Date(2020, 0));
  const [toDate, setToDate] = useState(new Date(2020, 0));

  const insets = useSafeArea();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom }}
    >
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <JobInput
          label="Job Title"
          icon="pencil"
          placeholder="Enter Job title"
          autoCorrect={false}
        />

        <JobInput
          label="Job Description"
          placeholder="Enter Description"
          multiline
          textAlignVertical="top"
          style={styles.description}
          autoCapitalize="sentences"
        />

        <Dropdown
          title="Job Category"
          items={CATEGORIES}
          multiple={true}
          multipleText="%d categories have been selected."
          min={0}
          max={10}
          searchable
          placeholder="Select Categories"
          searchablePlaceholder="Search for a category"
          onChangeItem={(item) => {
            setCategory({ category: item });
          }}
        />
        {/* {console.log(category)} */}

        <Dropdown
          title="Location"
          items={LOCATION}
          searchable
          placeholder="Select Location"
          searchablePlaceholder="Search for a Location"
          onChangeItem={(item) => {
            setLocation({ location: item.value });
          }}
        />

        {/* {console.log(location)} */}

        <JobInput
          label="Address (Optional)"
          icon="pencil"
          placeholder="Enter Working address"
          autoCorrect={false}
        />

        <JobInput
          label="Salary (Optional)"
          icon="cash"
          keyboardType="decimal-pad"
          placeholder="Enter Salary"
        />

        <View style={styles.timeContainer}>
          <Time
            title="Time (Optional)"
            subTitle="From"
            mode="time"
            date={fromDate}
            setDate={setFromDate}
          />

          <Time subTitle="To" mode="time" date={toDate} setDate={setToDate} />
        </View>

        <Radiobutton
          title="Applicant Sex"
          radio_props={[
            { label: "Male", value: "Male" },
            { label: "Female", value: "Female" },
            { label: "Any", value: "Any" },
          ]}
          onPress={(value) => setSex(value)}
          initial={2}
          formHorizontal={true}
        />

        <SubmitButton style={styles.button} />
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
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 10,
    height: 150,
    padding: 5,
  },

  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  button: {
    borderRadius: 20,
    marginVertical: 30,
  },
});

export default AddJobs;
