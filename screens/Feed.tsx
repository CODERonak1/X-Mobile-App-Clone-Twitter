import { StyleSheet, Text, View, Image, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileImg from '../components/ProfileImg';
import { auth } from '../firebaseConfig'; // Ensure you import your Firebase configuration
import { signOut } from 'firebase/auth';

const Feed = ({ navigation }) => { 
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

    // Logout function
    const handleLogout = async () => {
        try {
            await auth.signOut(); // Sign out from Firebase
            await AsyncStorage.removeItem('user'); // Clear user data from AsyncStorage
            navigation.navigate('LoginOrSignup'); // Navigate back to the login/signup screen
            console.log('User signed out successfully');
        } catch (error) {
            console.error("Error signing out: ", error); // Handle any errors
        }
    };

    return (
        <SafeAreaView style={styles.background}>
            <View style={styles.img}>
                <ProfileImg />
                <Image
                    style={styles.xLogo}
                    source={require('../assets/XWhite.png')}
                />
            </View>

            <View style={styles.container}>
                <Text style={styles.text}>Feed</Text>
                <Text style={styles.userInfo}>Username: {user.username}</Text>
                <Text style={styles.userInfo}>Email: {user.email}</Text>
                <Button title="Logout" 
                onPress={handleLogout} 
                color="blue" />
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
        marginTop: 10,
    },
    img: {
        flexDirection: 'row',
        width: '55%',
    },
});