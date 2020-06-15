import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  TouchableOpacity
} from "react-native";

import Colors from '../../constants/Colors';
import { JOBS } from '../../data/dummy-data';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/HeaderButton';

import { Feather, Entypo } from "@expo/vector-icons";

const JobDescription = props => {

  const jobID = props.route.params.jobID;

  const selectedJob = JOBS.find(job => job.jobID === jobID)

  return (
    <View>
      <View style={styles.headerContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{selectedJob.jobTitle}</Text>
          <View style={styles.item}>
            <Entypo name="location-pin" style={styles.icon} color={Colors.white} />
            <Text style={styles.location}>Colombo 07</Text>
          </View>
        </View>
        <View style={styles.favIconContainer} >
          <View style={styles.iconWrapper}>
            <TouchableOpacity>
              <Feather name="heart" size={30} color="orange" />
            </TouchableOpacity>
          </View>
          {/* <Item 
            title='favorite'
            iconName='ios-star'
            onPress={() =>{
              console.log('Mark as favorite !');
            } }/> */}
        </View>
      </View>
      <ScrollView>
        {/* Describtion */}
        <View style={styles.DescribtionContainer} >
          <Text style={styles.DescribtionTitle}>
            Job Describtion
        </Text>
          <Text style={styles.DescribtionContent}>
            Part time Delivery Boy needed to deliver some goods from
            our main store to branches.
        </Text>
          <Text style={styles.DescribtionContent}>
            Date :  24 th July 2020
        </Text>
          <Text style={styles.DescribtionContent}>
            Time : 4pm - 6pm
        </Text>
          <Text style={styles.DescribtionContent}>
            Adress: 34, Park road , Colombo 00700
        </Text>
        </View>

        {/* Details */}
        <View style={styles.DescribtionContainer} >
          <Text style={styles.DescribtionTitle}>
            Details
        </Text>
          <Text style={styles.DescribtionContent}>
            Delivering things from our store to branches in particular time.
        </Text>
          <Text style={styles.DescribtionContent}>
            Salary : 300 LKR per hour
        </Text>
        </View>

        {/* expectations */}
        <View style={styles.DescribtionContainer} >
          <Text style={styles.DescribtionTitle}>
            Employee Expectations
        </Text>
          <Text style={styles.DescribtionContent}>
            Should have good ratings and reviews in his profile
        </Text>
          <Text style={styles.DescribtionContent}>
            Should have a motor bike and private license
        </Text>
          <Text style={styles.DescribtionContent}>
            Flexible and friendly
        </Text>
        </View>

        <View style={styles.button}>
          <Button title="Apply" />
        </View>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({

  headerContainer: {
    flexDirection: "row",
    backgroundColor: Colors.primaryOrange,
    height: 130,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    marginTop: 25,
    padding: 20
  },
  titleContainer:{
    width: '75%',
    paddingHorizontal: 20
  },
  favIconContainer:{
  },
  iconWrapper:{
    width: 50 ,
    borderRadius: 25 ,
    backgroundColor :  'white',
    padding: 10,
    margin: 20
  },
  title: {
    flexDirection: "row",
    justifyContent: "center",
    fontSize: 25,
    color: "white",
    fontWeight: "bold"
  },
  icon: {
    fontSize: 20,
    marginHorizontal: 2,
  },
  location: {
    color: "white",
    fontSize: 15,
    marginTop: 5,
  },

  item: {
    flexDirection: "row",
    //justifyContent: "center",
    marginVertical: 20,
  },

  DescribtionContainer: {
    flexDirection: "column",
    backgroundColor: Colors.lightGrey,
    marginHorizontal: 15,
    marginTop: 10,
    borderRadius: 10,
    height: 180,
  },
  DescribtionTitle: {
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 5,
    fontSize: 20,
    fontWeight: "bold",
  },
  DescribtionContent: {
    marginHorizontal: 10,
    marginVertical: 5

  },

  button: {
    backgroundColor: Colors.primaryOrange,
    margin: 15,
    borderRadius: 20,
    height: 50,


  }


});

export default JobDescription;
