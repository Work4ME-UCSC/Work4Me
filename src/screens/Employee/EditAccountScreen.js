import React, {useState} from "react";
import {View, Text, StyleSheet, Button} from "react-native";

import Colors from "../../constants/Colors";
import { AccountScreen } from "./AccountScreen"

const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [contactno, setContactno] = useState('');
const [usertype, setUsertype] = useState('');

const EditAccountScreen = () => {
    return(
        <View>
            <Text style = {styles.textStyle}>
                Edit Profile
            </Text>
            <View style = {styles.button} >
                <Button 
                    title =  "Update Details"
                    color = {Colors.primaryOrange}
                    onPress = {AccountScreen}
                />
            </View>
        </View>
    )
};

const styles = StyleSheet.create ({
    textStyle: {
        fontSize: 15,
        fontWeight: "bold",
        margin:10,
    },
    button: {
        justifyContent: "flex-end",
        margin: 10,
    }
});

export default EditAccountScreen;