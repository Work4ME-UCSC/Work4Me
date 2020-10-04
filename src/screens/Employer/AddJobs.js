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
import DatePicker from "react-native-datepicker";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-native-paper";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

import JobInput from "../../components/Employer/JobInput";
import Dropdown from "../../components/Employer/Dropdown";
import Radiobutton from "../../components/Employer/Radiobutton";
import { LOCATION, CATEGORIES, SEX } from "../../data/addJobData";
import SubmitButton from "../../components/SubmitButton";
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
  const [date, setDate] = useState("");
  const [minDate, setMinDate] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState();
  const dispatch = useDispatch();

  const isVerifiedUser = useSelector((state) => state.auth.isEmailVerified);

  useEffect(() => {
    if (error) {
      Alert.alert("An error occured", error, [{ text: "Okay" }]);
    }
  }, [error]);

  useEffect(() => {
    const today = new Date();
    const month =
      today.getMonth() + 1 < 10
        ? `0${today.getMonth() + 1}`
        : today.getMonth() + 1;
    const date = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();
    setMinDate(`${today.getFullYear()}-${month}-${date}`);
    console.log(minDate);
  }, []);

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: "",
      description: "",
      category: null,
      location: null,
      address: "",
      salary: "",
      sex: "any",
    },

    inputValidities: {
      title: false,
      description: false,
      category: false,
      location: false,
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
        base64: true,
      });
      if (result.cancelled) {
        //Toast.show("Cancelled Image Pick");
      } else {
        setImage(`data:image/jpeg;base64,${result.base64}`);
      }
    } catch (e) {
      setError(e.message);
    }
    setIsLoading(false);
  };

  const submitHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert("Wrong Inputs", "Please check the errors in the form", [
        { text: "Ok" },
      ]);
      return;
    }

    if (!isVerifiedUser) {
      setError("Please verify your account before adding a job");
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
          date,
          formState.inputValues.sex,
          image
        )
      );
      setIsLoading(false);
      navigation.navigate("Home");
    } catch (e) {
      console.log(e);
      setError(e.message);
      setIsLoading(false);
    }
  }, [dispatch, formState, image, date]);

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
        {!isVerifiedUser && (
          <Text style={{ color: "red", fontWeight: "bold", marginTop: 10 }}>
            Please verify your account before adding a job
          </Text>
        )}
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
          icon="pencil"
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
              zIndex: 20,
            }),
          }}
        >
          <Dropdown
            title="Job Category"
            items={CATEGORIES}
            searchable
            placeholder="Select Categories"
            searchablePlaceholder="Search for a category"
            onChangeItem={dropDownChangeHandle.bind(this, "category")}
            error={formState.inputValidities.category}
            errorMessage="Please select a category"
            defaultValue={formState.inputValues.category}
            // zIndex={6000}
            // style={{zIndex: Platform.OS === "ios" ? 15 : null}}
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
            // zIndex={400}
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

        <View style={{ marginVertical: 15 }}>
          <DatePicker
            style={{ width: 200 }}
            // date={time}
            // mode="time"
            placeholder={date ? date : "Select date"}
            format="YYYY-MM-DD"
            minDate={minDate}
            maxDate="2020-12-30"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: "absolute",
                left: 0,
                top: 4,
                marginLeft: 0,
                marginRight: 20,
              },
              dateInput: {
                marginLeft: 36,
                width: 600,
                color: "red",
              },
              // ... You can check the source to find the other keys.
            }}
            onDateChange={(date) => setDate(date)}
          />
        </View>

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

        <View style={{ marginTop: 15 }}>
          <Text style={{ fontSize: 16, marginBottom: 10 }}>
            Job Image (Optional)
          </Text>
          <Button
            width="80%"
            onPress={chooseFromGallery}
            mode="contained"
            color={Colors.darkGrey}
          >
            {image ? "Image Selected" : "Upload a job image"}
          </Button>
        </View>

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
    padding: 10,
    height: 40,
    borderRadius: 10,
    marginVertical: 30,
  },

  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AddJobs;
