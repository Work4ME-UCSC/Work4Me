import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';

import Card from '../../components/Employer/Card';

import { JOBS } from '../../data/dummy-data';

export default function Home() {
    
    const renderCard = (itemData) => {
        return <Card
          name={itemData.item.jobTitle}
          img={itemData.item.jobImage}
          date={itemData.item.jobDate}
          location={itemData.item.jobLocation}
          time={itemData.item.jobTime}
        />;
    };

    return(
        <View style={styles.container}>

            <View style={styles.card}>
                <FlatList
                    keyExtractor={(item, index) => item.jobID}
                    data={JOBS}
                    renderItem={renderCard}
                />
            </View>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        padding: 10,
        backgroundColor: '#dcdcdc',
    },
    card: {
        flex: 1,
    },
});