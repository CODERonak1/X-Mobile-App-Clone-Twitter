import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Feed = () => {
    const [user, setUser] = useState({ email: '', username: '' });

    // Fetch user data from AsyncStorage
    useEffect(() => {
        const fetchUserData = async () => {
            const storedUser = await AsyncStorage.getItem('user');
            if (storedUser) {
                setUser(JSON.parse(storedUser)); // Parse and set user data
            }
        };

        fetchUserData();
    }, []);

    return (
        <SafeAreaView style={styles.background}>
            <Image
                style={styles.xLogo}
                source={require('../assets/XWhite.png')}
            />

            <View style={styles.container}>
                <Text style={styles.text}>Feed</Text>
                <Text style={styles.userInfo}>Username: {user.username}</Text>
                <Text style={styles.userInfo}>Email: {user.email}</Text>
            </View>
        </SafeAreaView>
    );
};

export default Feed;

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
    userInfo: {
        color: 'grey',
        fontSize: 18,
        marginTop: 10,
    },
    xLogo: {
        height: 35,
        width: 35,
        margin: 'auto',
        marginTop: 10
    },
});
