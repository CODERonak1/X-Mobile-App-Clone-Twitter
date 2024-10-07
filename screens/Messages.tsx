import { StyleSheet, Text, View, Image, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProfileImg from '../components/ProfileImg';
import SettingsIcon from '../components/SettingsIcon';

const Messages = () => {

    return (
        <SafeAreaView style={styles.background}>
            <View style={styles.img}>
                <ProfileImg />
                <Image
                    style={styles.xLogo}
                    source={require('../assets/XWhite.png')}
                />
                <SettingsIcon />
            </View>
            <View style={styles.container}>
                <Text style={styles.text}>Messages</Text>
            </View>
        </SafeAreaView>
    );
};

export default Messages;

const styles = StyleSheet.create({
    background: {
        backgroundColor: 'black',
        height: '100%',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
    },

    xLogo: {
        height: 35,
        width: 35,
        margin: 'auto',
        marginTop: 10,
    },
    img: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
});