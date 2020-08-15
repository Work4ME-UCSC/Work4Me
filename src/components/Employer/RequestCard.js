import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Avatar, Button, Card, Title} from 'react-native-paper';

const RequestCard = (props) => {

    return (
            <Card style={styles.container}>
                <Card.Content>
                    <Title>{props.name}</Title>
                    <Card.Actions>
                        <Avatar.Text size={30} label="XD" />
                        <Card.Title title="DhonicMS" />
                    </Card.Actions>
                    <Card.Actions>
                        <Button color="#F27523" mode="outlined" onPress={() => console.log('Pressed')} style={styles.button}>Accept</Button>
                        <Button color="#F27523" mode="contained" onPress={() => console.log('Pressed')}>Reject</Button>
                    </Card.Actions>
                </Card.Content>
            </Card>
    )
};

const styles = StyleSheet.create({
    container:{
        margin:5,
        padding: 2 ,
        borderRadius:5,
    },
    button:{
        marginRight:20,
    },
})


export default RequestCard;