import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Button, Avatar } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/HeaderButton";
import Colors from "../../constants/Colors";
import { toggleFavourite, applyForJob } from "../../store/actions/employee";

const JobDescription = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const { jobID, jobTitle } = props.route.params;

  const isApplied = useSelector((state) =>
    state.employee.appliedJobs.some((job) => job.jobID === jobID)
  );

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
      headerTitle: jobTitle,
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

  const onApplyHandler = async () => {
    setIsLoading(true);
    try {
      await dispatch(applyForJob(jobID, jobTitle));
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primaryOrange} />
        <Text>Applying for the job....</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Describtion */}
        <View style={styles.ownerContainer}>
          <Text style={styles.DescribtionTitle}>Posted by</Text>
          <View style={styles.owner}>
            <Avatar.Image
              source={
                selectedJob.employer.avatar
                  ? { uri: selectedJob.employer.avatar }
                  : require("../../../assets/profile.png")
              }
              size={70}
            />
            <View style={{ marginLeft: 10 }}>
              <Text>
                {selectedJob.employer.firstName +
                  " " +
                  selectedJob.employer.lastName}
              </Text>
              <Text>5.0</Text>
            </View>
          </View>
        </View>

        <View style={styles.DescribtionContainer}>
          <Text style={styles.DescribtionTitle}>Job Description</Text>
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
          <Button
            color={Colors.primaryOrange}
            mode="contained"
            onPress={onApplyHandler}
            disabled={isApplied}
          >
            {isApplied ? "Already applied" : "Apply"}
          </Button>
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
  ownerContainer: {
    marginHorizontal: 20,
    marginTop: 20,
    //padding: 5,
    borderRadius: 10,
    backgroundColor: Colors.lightGrey,
  },
  owner: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
  },
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

  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default JobDescription;
