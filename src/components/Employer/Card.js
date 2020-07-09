import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

import { Entypo, Fontisto, Ionicons } from "@expo/vector-icons";

const Card = props => {
    return(
        <View style={styles.container}>

            <View style={styles.imgBlock}>
                <Image source={{uri:props.img}} style={styles.image} />
            </View>

            <View style={styles.description}>
                <Text style={styles.title}>{props.name}</Text>
                <View style={styles.textIcon}>
                    <Fontisto name="date" style={styles.icon} size={16} color="black" />
                    <Text style={styles.text}>{props.date}</Text>
                </View>
                <View style={styles.textIcon}>
                    <Entypo name="location-pin" style={styles.icon} size={16} color="black" />
                    <Text style={styles.text}>{props.location}</Text>
                </View>
                <View style={styles.textIcon}>
                    <Ionicons name="md-time" style={styles.icon} size={18} color="black" />
                    <Text style={styles.text}>{props.time}</Text>
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: 150,
        marginTop: 15,
        borderRadius: 5,
    },
    imgBlock: {
        width: '50%',
        height: '100%',
    },
    image:{
        flex: 1,
        borderRadius: 3,
    },
    description: {
        width: '50%',
        height: '100%',
        padding: 10,
        position: 'absolute',
        right: 0,
    },
    title: {
        fontWeight:'bold', 
        fontSize: 20,
        margin: 3,
        marginBottom: 10,
    },
    text: {
        margin: 3,
        fontSize: 12,
    },
    textIcon:{
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 5,
    },
    icon:{
        marginRight: 5,
    },
});

export default Card;