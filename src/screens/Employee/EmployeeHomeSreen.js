import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import SearchBar from "../../components/Employee/SearchBar";
import JobCard from "../../components/Employee/Jobcard";
import * as jobActions from "../../store/actions/employee";
import Colors from "../../constants/Colors";

const EmployeeHomeScreen = (props) => {
  const jobs = useSelector((state) => state.employee.availableJobs);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    dispatch(jobActions.fetchJobs()).then(() => {
      setIsLoading(false);
    });
  }, [dispatch]);

  const renderJobCard = ({ item }) => {
    return (
      <JobCard
        id={item.jobID}
        name={item.jobTitle}
        img={item.jobImage}
        date={item.jobDate}
        location={item.jobLocation}
        time={item.jobTime}
        onSelect={() => {
          props.navigation.navigate("JobDescription", {
            jobID: item.jobID,
            jobTitle: item.jobTitle,
          });
        }}
      />
    );
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <Text>Loading...</Text>
        <ActivityIndicator size="large" color={Colors.primaryOrange} />
      </View>
    );
  }

  return (
    <>
      <SearchBar feather="search" place_holder="search" />

      {jobs.length === 0 ? (
        <View style={styles.centered}>
          <Text>Currently no jobs available</Text>
        </View>
      ) : (
        <FlatList
          keyExtractor={(item) => item.jobID}
          data={jobs}
          renderItem={renderJobCard}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* <ScrollView>
        <JobCard
        name="Delivery Boy" 
        img="https://www.searchpng.com/wp-content/uploads/2019/01/Delivery-Boy-Clipart-Png.png"
         />
        <JobCard 
        name="Gardening" 
        img="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gardening-equipment-for-gardener-with-flowerpots-royalty-free-image-643182988-1555499917.jpg?crop=0.97213xw:1xh;center,top&resize=768:*" 
        onSelect = {() => { 
          console.log("Job Describtion")
          props.navigation.navigate("JobDescription"
            // params : {
            //     categoryId : itemData.item.id
            // }
        );
        } } />


        <JobCard name="Data Entry" img="http://www.effectivedigitaldesign.co.uk/wp-content/uploads/2017/01/data-entry-1200x675.png" />
        <JobCard name="Wash my car" img="https://www.carcility.com/blog/wp-content/uploads/2018/03/Car-Wash.jpg" />
        <JobCard name="Delivery Boy" img="https://www.searchpng.com/wp-content/uploads/2019/01/Delivery-Boy-Clipart-Png.png" />
      </ScrollView> */}
    </>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default EmployeeHomeScreen;
