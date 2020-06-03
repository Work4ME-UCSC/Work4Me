import React from "react";
import { View, 
  Text,
   StyleSheet,
  ScrollView,
Button} from "react-native";

import { Feather, Entypo } from "@expo/vector-icons";

const JobDescription = () => {
  return (
    <View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Gardening</Text>
        <View style={styles.item}>
          <Entypo name="location-pin" style={styles.icon} color="white" />
          <Text style={styles.location}>Colombo 07</Text>
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
      <Button title="Apply"/>
    </View>

      </ScrollView>


    </View>







  );
};

const styles = StyleSheet.create({

  titleContainer: {
    flexDirection: "column",
    backgroundColor: "#FF4500",
    height: 130,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    marginTop: 25,
    alignItems: "center",
    padding: 20
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
    backgroundColor: "#D3D3D3",
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

  button:{
    backgroundColor: "#FF4500",
    margin: 15,
    borderRadius: 20,
    height: 50,
    

  }


});

export default JobDescription;
