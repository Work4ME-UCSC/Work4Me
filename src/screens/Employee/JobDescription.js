import React, { useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  TouchableOpacity,
} from "react-native";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/HeaderButton";
import { useSelector, useDispatch } from "react-redux";

import Colors from "../../constants/Colors";
import { toggleFavourite } from "../../store/actions/employee";

const JobDescription = (props) => {
  const jobID = props.route.params.jobID;

  const isFav = useSelector((state) =>
    state.employee.favouriteJobs.some((job) => job.jobID === jobID)
  );

  const selectedJob = useSelector((state) =>
    state.employee.availableJobs.find((job) => job.jobID === jobID)
  );

  const dispatch = useDispatch();

  const { navigation } = props;

  const toggleFavouriteHandler = useCallback(() => {
    dispatch(toggleFavourite(jobID));
  }, [dispatch, jobID]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: props.route.params.jobTitle,
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Favourite"
            iconName={isFav ? "md-heart" : "md-heart-empty"}
            onPress={toggleFavouriteHandler}
          />
        </HeaderButtons>
      ),
    });
  }, [navigation, isFav, toggleFavouriteHandler]);

  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Describtion */}
        <View style={styles.DescribtionContainer}>
          <Text style={styles.DescribtionTitle}>Job Describtion</Text>
          <Text style={styles.DescribtionContent}>
            {selectedJob.jobDescribtion}
          </Text>
          <Text style={styles.DescribtionContent}>Date : 24 th July 2020</Text>
          <Text style={styles.DescribtionContent}>Time : 4pm - 6pm</Text>
          <Text style={styles.DescribtionContent}>
            Address: {selectedJob.jobAddress}
          </Text>
        </View>

        {/* Details */}
        <View style={styles.DescribtionContainer}>
          <Text style={styles.DescribtionTitle}>Details</Text>
          <Text style={styles.DescribtionContent}>
            Delivering things from our store to branches in particular time.
          </Text>
          <Text style={styles.DescribtionContent}>
            Salary : 300 LKR per hour
          </Text>
        </View>

        {/* expectations */}
        <View style={styles.DescribtionContainer}>
          <Text style={styles.DescribtionTitle}>Employee Expectations</Text>

          <Text style={styles.DescribtionContent}>
            {selectedJob.jobEmpExpectations}
          </Text>
        </View>

        <View style={styles.button}>
          <Button color={Colors.primaryOrange} title="Apply" />
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
    padding: 20,
  },
  titleContainer: {
    width: "75%",
    paddingHorizontal: 20,
  },
  favIconContainer: {},
  iconWrapper: {
    width: 50,
    borderRadius: 25,
    backgroundColor: "white",
    padding: 10,
    margin: 20,
  },
  title: {
    flexDirection: "row",
    justifyContent: "center",
    fontSize: 25,
    color: "white",
    fontWeight: "bold",
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
    marginVertical: 10,
    borderRadius: 10,
    paddingVertical: 10,
    //height: 180,
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
    marginVertical: 5,
  },

  button: {
    //backgroundColor: Colors.primaryOrange,
    margin: 15,
    borderRadius: 20,
    height: 50,
  },
});

export default JobDescription;
