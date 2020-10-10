import React from 'react';
import { View, Text, Button, StyleSheet} from 'react-native';

import { SignupScreen } from "../Authenticate/SignupScreen"

const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [contactno, setContactno] = useState('');
const [usertype, setUsertype] = useState('');

const DeleteAccountScreen = () => {
    return(
        <View>
            <Text> Are you sure you want to delete your account ?</Text>
            <View style = {styles.button} >
                <Button 
                    title =  "Yes, Delete Account"
                    color = {Colors.red}
                    onPress = {SignupScreen}
                />
                 <Button 
                    title =  "No, Signout"
                    color = {Colors.primaryOrange}
                    onPress = {SigninScreen}
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

export default DeleteAccountScreen;