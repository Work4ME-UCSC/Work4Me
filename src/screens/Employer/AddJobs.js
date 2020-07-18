import React, { useReducer, useCallback } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";

import JobInput from "../../components/Employer/JobInput";
import Dropdown from "../../components/Employer/Dropdown";
import Radiobutton from "../../components/Employer/Radiobutton";
import Time from "../../components/Employer/Time";
import { LOCATION, CATEGORIES, DAYS, SEX } from "../../data/addJobData";
import SubmitButton from "../../components/SubmitButton";
import ErrorText from "../../components/Authenticate/ErrorText";
import * as jobActions from "../../store/actions/jobs";

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

  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: "",
      description: "",
      category: null,
      location: null,
      address: "",
      salary: "",
      day: null,
      fromDate: new Date(),
      toDate: new Date(),
      sex: "any",
    },

    inputValidities: {
      title: false,
      description: false,
      category: false,
      location: false,
      day: false,
      sex: true,
    },

    formIsValid: false,
  });

  const inputChangeHandler = (inputIdentifier, text) => {
    let isValid = true;

    if (text.trim().length === 0) {
      isValid = false;
    }

    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      value: text,
      isValid,
      input: inputIdentifier,
    });
  };

  const dropDownChangeHandle = (inputIdentifier, item) => {
    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      value: item.value,
      isValid: true,
      input: inputIdentifier,
    });
  };

  const submitHandler = useCallback(() => {
    if (!formState.formIsValid) {
      Alert.alert("Wrong Inputs", "Please check the errors in the form", [
        { text: "Ok" },
      ]);
      return;
    }

    dispatch(
      jobActions.createPost(
        formState.inputValues.title,
        formState.inputValues.description,
        formState.inputValues.category,
        formState.inputValues.location,
        formState.inputValues.address,
        formState.inputValues.salary,
        formState.inputValues.day,
        formState.inputValues.sex
      )
    );
  });

  // console.log(formState);

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.title}>
          <JobInput
            label="Job Title"
            icon="pencil"
            placeholder="Enter Job title"
            autoCorrect={false}
            onChangeText={inputChangeHandler.bind(this, "title")}
            error={formState.inputValidities.title}
            errorMessage="Please enter a job title"
          />
        </View>

        <JobInput
          label="Job Description"
          placeholder="Enter Description"
          multiline
          textAlignVertical="top"
          style={styles.description}
          autoCapitalize="sentences"
          onChangeText={inputChangeHandler.bind(this, "description")}
          error={formState.inputValidities.description}
          errorMessage="Please enter the description"
        />

        <Dropdown
          title="Job Category"
          items={CATEGORIES}
          //multiple={true}
          //multipleText="%d categories have been selected."
          //min={0}
          //max={10}
          searchable
          placeholder="Select Categories"
          searchablePlaceholder="Search for a category"
          onChangeItem={dropDownChangeHandle.bind(this, "category")}
          error={formState.inputValidities.category}
          errorMessage="Please select a category"
        />

        <Dropdown
          title="Location"
          items={LOCATION}
          searchable
          placeholder="Select Location"
          searchablePlaceholder="Search for a Location"
          onChangeItem={dropDownChangeHandle.bind(this, "location")}
          error={formState.inputValidities.location}
          errorMessage="Please select a location"
        />

        <JobInput
          label="Address (Optional)"
          icon="pencil"
          placeholder="Enter Working address"
          autoCorrect={false}
          onChangeText={inputChangeHandler.bind(this, "address")}
          error={true}
        />

        <JobInput
          label="Salary (Optional)"
          icon="cash"
          keyboardType="decimal-pad"
          placeholder="Enter Salary"
          onChangeText={inputChangeHandler.bind(this, "salary")}
          error={true}
        />

        <Dropdown
          title="Working Day"
          items={DAYS}
          //multiple={true}
          //multipleText="Selected %d"
          placeholder="Select Day"
          onChangeItem={dropDownChangeHandle.bind(this, "day")}
          error={formState.inputValidities.day}
          errorMessage="Please select a day"
        />

        {/* <View style={styles.timeContainer}>s
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
        </View> */}

        <Radiobutton
          title="Applicant Sex"
          radio_props={SEX}
          onPress={(value) =>
            dispatchFormState({
              type: FORM_INPUT_UPDATE,
              value,
              isValid: true,
              input: "sex",
            })
          }
          initial={2}
          formHorizontal={true}
        />

        <SubmitButton style={styles.button} onClick={submitHandler} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
    zIndex: Platform.OS === "ios" ? 15 : null,
  },

  title: {
    marginTop: 20,
  },

  description: {
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
