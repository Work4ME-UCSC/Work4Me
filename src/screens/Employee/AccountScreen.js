/*********\\\\\\\\\*************************************************

//import libraries which want to create component
import React from "react";
import { 
  View,                  //import View to give same affect to a group
  Text,                  //import Text to return texts
  StyleSheet,            //import StyleSheet to add styles
  FlatList,              //import FlatList to insert list 
  Button,                //import Button to insert a very simple component for showing a button and detecting a press
  TouchableOpacity       //import TouchableOpacity to insert highly customizable component that can detect a press on just about any kind of element
} from "react-native";

//Create AccountScreen component
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

//create styles
const styles = StyleSheet.create({
    
});

//after export AccountScreen can access any place in this project
export default AccountScreen;
****************\\\\\\\\\\\\\\\\\*************************/
//
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

import React from 'react';
import {Text, View, Button, StyleSheet} from 'react-native';

import Colors from "../../constants/Colors";
import { EditAccountScreen } from "./EditAccountScreen";

const AccountScreen = () => {
  return (
    <View style = {styles.container} >
      <Text style={styles.textStyle}>Name: </Text>
      <Text style={styles.textStyle}>Email: </Text>
      <Text style={styles.textStyle}>Contact Number: </Text>
      <Text style={styles.textStyle}>User Type: </Text>
      <View>
        <Image
            source={{ uri: 'https://api.adorable.io/avatars/285/test@user.i.png' }}
            style={{
                marginLeft: 10, width: 100, height: 100, borderRadius: 50
            }}
        />
      <Icon name={'edit'} containerStyle={styles.icon} onPress={console.log('I was clicked')}/>
     </View>
      <View style = {styles.button} >
        <Button 
          title =  "Edit Details"
          color = {Colors.primaryOrange}
          onPress = {EditAccountScreen}
        />
      </View>
      <View style = {styles.button} >
        <Button 
          title =  "Delete Account"
          color = {Colors.red}
          onPress = {Delete1AccountScreen}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create ({
  textStyle: {
    fontSize: 15,
    fontWeight: "bold",
    margin:10
  }, 
  container: {
    flex: 1,
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 15,
    marginRight: 15,
    //backgroundColor: Colors.white
  },
  button: {
    //backgroundColor: Colors.primaryOrange,
    justifyContent: "flex-end",
    margin: 10,
    //borderRadius: 20,
    //height: 50
  },
  icon: {
    backgroundColor: '#ccc',
    position: 'absolute',
    right: 0,
    bottom: 0,
   },
});

export default AccountScreen;