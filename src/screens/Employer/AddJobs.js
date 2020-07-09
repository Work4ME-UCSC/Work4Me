import React, { useReducer } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";

import JobInput from "../../components/Employer/JobInput";
import Dropdown from "../../components/Employer/Dropdown";
import Radiobutton from "../../components/Employer/Radiobutton";
import Time from "../../components/Employer/Time";
import { LOCATION, CATEGORIES, DAYS, SEX } from "../../data/addJobData";
import SubmitButton from "../../components/SubmitButton";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };

    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };

    let updatedFormIsValid = true;
    for (let key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }

    return {
      inputValues: updatedValues,
      inputValidities: updatedValidities,
      formIsValid: updatedFormIsValid,
    };
  }

  return state;
};

const AddJobs = ({ navigation }) => {
  // const [category, setCategory] = useState(null);
  // const [location, setLocation] = useState(null);
  // const [day, setDay] = useState(null);
  // const [sex, setSex] = useState("Any");
  // const [fromDate, setFromDate] = useState(new Date(2020, 0));
  // const [toDate, setToDate] = useState(new Date(2020, 0));

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: "",
      description: "",
      category: null,
      location: null,
      address: "",
      salary: "",
      day: null,
      fromDate: new Date(2020, 0),
      toDate: new Date(2020, 0),
      sex: "any",
    },

    inputValidities: {
      title: false,
      description: false,
      category: false,
      location: false,
      day: false,
    },

    formIsValid: false,
  });

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.title}>
          <JobInput
            label="Job Title"
            icon="pencil"
            placeholder="Enter Job title"
            autoCorrect={false}
          />
        </View>

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
          // onChangeItem={(item) => {
          //   setCategory({ category: item });
          // }}
        />

        <Dropdown
          title="Location"
          items={LOCATION}
          searchable
          placeholder="Select Location"
          searchablePlaceholder="Search for a Location"
          // onChangeItem={(item) => {
          //   setLocation({ location: item.value });
          // }}
        />

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

        <Dropdown
          title="Working Day"
          items={DAYS}
          multiple={true}
          multipleText="Selected %d"
          placeholder="Select Day"
          // onChangeItem={(item) => {
          //   setDay({ day: item });
          // }}
        />

        <View style={styles.timeContainer}>
          <Time
            title="Time (Optional)"
            subTitle="From"
            mode="time"
            date={formState.inputValues.fromDate}
            // setDate={setFromDate}
          />

          <Time
            subTitle="To"
            mode="time"
            date={formState.inputValues.toDate}
            //setDate={setToDate}
          />
        </View>

        <Radiobutton
          title="Applicant Sex"
          radio_props={SEX}
          //onPress={(value) => setSex(value)}
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

  title: {
    marginTop: 20,
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
