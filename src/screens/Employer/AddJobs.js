import React, { useState, useReducer, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch } from "react-redux";

import JobInput from "../../components/Employer/JobInput";
import Dropdown from "../../components/Employer/Dropdown";
import Radiobutton from "../../components/Employer/Radiobutton";
import Time from "../../components/Employer/Time";
import { LOCATION, CATEGORIES, DAYS, SEX } from "../../data/addJobData";
import SubmitButton from "../../components/SubmitButton";
import ErrorText from "../../components/Authenticate/ErrorText";
import HeaderButton from "../../components/HeaderButton";
import Colors from "../../constants/Colors";

import * as jobActions from "../../store/actions/employer";

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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      Alert.alert("An error occured", error, [{ text: "Okay" }]);
    }
  }, [error]);

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

  const submitHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert("Wrong Inputs", "Please check the errors in the form", [
        { text: "Ok" },
      ]);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      await dispatch(
        jobActions.createJob(
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
      setIsLoading(false);
      navigation.navigate("Home");
    } catch (e) {
      setError(e.message);
      setIsLoading(false);
    }
  }, [dispatch, formState]);

  // console.log(formState);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <Text>Please wait</Text>
        <ActivityIndicator size="large" color={Colors.primaryOrange} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <View style={styles.title}>
          <JobInput
            label="Job Title"
            icon="pencil"
            placeholder="Enter Job title"
            autoCorrect={false}
            value={formState.inputValues.title}
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
          value={formState.inputValues.description}
          onChangeText={inputChangeHandler.bind(this, "description")}
          error={formState.inputValidities.description}
          errorMessage="Please enter the description"
        />

        <View
          style={{
            ...(Platform.OS !== "android" && {
              zIndex: 10,
            }),
          }}
        >
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
            defaultValue={formState.inputValues.category}
            zIndex={5000}
          />
        </View>

        <View
          style={{
            ...(Platform.OS !== "android" && {
              zIndex: 10,
            }),
          }}
        >
          <Dropdown
            title="Location"
            items={LOCATION}
            searchable
            placeholder="Select Location"
            searchablePlaceholder="Search for a Location"
            onChangeItem={dropDownChangeHandle.bind(this, "location")}
            error={formState.inputValidities.location}
            errorMessage="Please select a location"
            zIndex={4000}
            defaultValue={formState.inputValues.location}
          />
        </View>

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

        <View
          style={{
            ...(Platform.OS !== "android" && {
              zIndex: 10,
            }),
          }}
        >
          <Dropdown
            title="Working Day"
            items={DAYS}
            //multiple={true}
            //multipleText="Selected %d"
            placeholder="Select Day"
            onChangeItem={dropDownChangeHandle.bind(this, "day")}
            error={formState.inputValidities.day}
            errorMessage="Please select a day"
            zIndex={3000}
            defaultValue={formState.inputValues.day}
          />
        </View>

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

export const screenOptions = ({ navigation }) => {
  return {
    headerTitle: "Post a Job",

    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
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

  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AddJobs;
