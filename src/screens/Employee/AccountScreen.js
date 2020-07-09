import React from "react";
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity } from "react-native";

const AccountScreen = () => {
  const details = [
    { name : 'Name1', key : '0'},
    { address : 'Address1', key : '1'},
    { contactNumber : 'Contact Number1', key : '2'},
    { email : 'Email1',key : '3'},
    //can asign a key manualy for every item in the array
  ];
  return (
    //<View>
    //  <Text>Profile</Text>
    //</View>
   
    //create list 
    <FlatList     
        //horizontal     // ={true}  //can move horizontally with scroll bar
        //showsHorizontalScrollIndicator = {false}       //hide scroll bar in the bottom of screen
      //  keyExtractor = {detail => detail.name} // can asign a key auto for every item in the array
      data={details} 
        //take one item and display(render) it as list
        renderItem = {({item}) => {   
          //element === {item: {name: 'Name'}, index : 0}
          return (
            <View>
              <Text style={styles.textStyle}> Name:{item.name} 
                                              Address:{item.address} 
                                              Contact Number:{item.contactNumber} 
                                              Email:{item.email}              
              </Text>
              <Button      //create button element
                onPress={() => console.log('Button pressed')}  //pressable button //to detect the press event use onPress prop.  using error function
                title= "Edit details"    //display button name as Edit details
              />
              
              <TouchableOpacity onPress = {() => console.log('Help Pressed')}>      
              <Text>Help</Text>      
              </TouchableOpacity>
            </View>
            //<Text>{item.address}</Text>
            //<Text>{item.contactNumber}</Text>
            //<Text>{item.email}</Text>
            //onPress is not an element
            //the element(Help) inside the <Text></Text> tag are working as a touchable button
          );
        }}
    />
  );
};

const styles = StyleSheet.create({
    
});

export default AccountScreen;


/**************************************************************************
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const AccountScreen = () => {
  return (
    <View>
      <Text>AccountScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default AccountScreen;
***************************************************************************/