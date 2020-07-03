import React, { useState, Component } from "react";
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
import { render } from "react-dom";
import axios from "axios";

class AddJobs extends Component {

  constructor() {
    super();
    this.state = {
      JobTitle: '',
      JobDescribtion: '',
      JobCategory: '',
      JobLocation: '',
      JobAddress: '',
      JobSalary: '',
      JobDay: '',
      Sex: ''
    }
  }

  // const [JobTitle, setJobTitle] = useState(null);
  // const [JobDescribtion, setJobDescribtion] = useState(null);
  // const [JobCategory, setJobCategory] = useState(null);
  // const [JobLocation, setJobLocation] = useState(null);
  // const [JobAddress, setJobAddress] = useState(null);
  // const [JobSalary, setJobSalary] = useState(null);
  // const [JobDay, setJobDay] = useState(null);
  // const [fromDate, setFromDate] = useState(new Date(2020, 0));
  // const [toDate, setToDate] = useState(new Date(2020, 0));
  // const [Sex, setSex] = useState("Any");

  //Need to check
  // React.useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerTitle: "Post a Job",
  //   });
  // }, [navigation]);


  handleSubmit = () => {
    // e.preventDefault();

    const obj = {
      JobTitle: this.state.JobTitle,
      JobDescribtion: this.state.JobDescribtion,
      JobCategory: this.state.JobCategory.value,
      JobLocation: this.state.JobLocation.value,
      JobAddress: this.state.JobAddress,
      JobSalary: this.state.JobSalary,
      JobDay: this.state.JobDay.value,
      Sex: this.state.Sex
    }

    console.log(obj)

    const headers = {
      'Content-Type': 'application/json'
    }
    

    // axios.post('http://localhost:4000/jobs/add', obj)
    // .then(res => { console.log(res.data) });

    axios
    .post('http://127.0.0.1:4000/jobs/add',obj)
    .then(function(response) {
      // handle success
      alert(JSON.stringify(response.data));
    })
    .catch(function(error) {
      // handle error
      alert(error);
    });

    //   fetch('http://localhost:4000/jobs/add',{
    //     method: "POST",
    //     body : obj,
    //     headers : {
    //       'Content-Type': 'application/json'
    //     },
    //   })
    //   .then((response) => response.json())
    //   //If response is in json then in success
    //   .then((responseJson) => {
    //     alert(JSON.stringify(responseJson));
    //     console.log(responseJson);
    // })
    // //If response is not in json then in error
    // .catch((error) => {
    //   alert(JSON.stringify(error));
    //   console.error(error);
    // });

  }


  render() {
    return (
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          <View style={styles.title}>
            <JobInput
              label="Job Title"
              icon="pencil"
              placeholder="Enter Job title"
              autoCorrect={false}
              onChangeText={(text) => {
                this.setState({ JobTitle: text });
              }}
            />
          </View>

          <JobInput
            label="Job Description"
            placeholder="Enter Description"
            multiline
            textAlignVertical="top"
            style={styles.description}
            autoCapitalize="sentences"
            onChangeText={(text) => {
              this.setState({ JobDescribtion: text });
            }}
          />

          <Dropdown
            title="Job Category"
            items={CATEGORIES}
            // multiple={true}
            // multipleText="%d items have been selected."
            // min={0}
            // max={10}
            searchable
            placeholder="Select Categories"
            searchablePlaceholder="Search for a category"
            // defaultValue={JobCategory}
            onChangeItem={(item) => {
              this.setState({ JobCategory: item });
            }}
          />

          <Dropdown
            title="Location"
            items={LOCATION}
            searchable
            placeholder="Select Location"
            searchablePlaceholder="Search for a Location"
            onChangeItem={(item) => {
              this.setState({ JobLocation: item });
            }}
          />

          <JobInput
            label="Address (Optional)"
            icon="pencil"
            placeholder="Enter Working address"
            autoCorrect={false}
            onChangeText={(text) => {
              this.setState({ JobAddress: text });
            }}
          />

          <JobInput
            label="Salary (Optional)"
            icon="cash"
            keyboardType="decimal-pad"
            placeholder="Enter Salary"
            onChangeText={(text) => {
              this.setState({ JobSalary: text });
            }}
          />

          <Dropdown
            title="Working Day"
            items={DAYS}
            // multiple={true}
            // multipleText="Selected %d"
            placeholder="Select Day"
            onChangeItem={(item) => {
              this.setState({ JobDay: item });
            }}
          />

          {/* <View style={styles.timeContainer}>
            <Time
              title="Time (Optional)"
              subTitle="From"
              mode="time"
              date={fromDate}
              setDate={setFromDate}
            />
  
            <Time 
            subTitle="To" 
            mode="time"
            date={toDate} 
            setDate={setToDate} />
          </View> */}

          <Radiobutton
            title="Applicant Sex"
            radio_props={SEX}
            initial={2}
            formHorizontal={true}
            onPress={(value) => {
              this.setState({ Sex: value })
            }}
          />

          <SubmitButton
            style={styles.button}
            onClick={() => { this.handleSubmit() }} />
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
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
