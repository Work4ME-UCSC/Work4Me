import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

import SearchBar from '../../components/Employee/SearchBar';
import JobCard from '../../components/Employee/Jobcard';


const EmployeeHomeScreen = props => {
  return (
    <>
      <SearchBar
        feather="search"
        place_holder="search" />

      <ScrollView>
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
      </ScrollView>



    </>
  );
};

// const styles = StyleSheet.create({});

export default EmployeeHomeScreen;
