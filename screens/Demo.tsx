import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';

const Demo = () => {

    const navigation = useNavigation();

    const handleLogout = async () => {
        try {
            // Firebase sign-out method
            await signOut(auth);
            console.log('User signed out successfully');
            // Redirect to Sign In screen or Landing page
            navigation.navigate('LoginOrSignup');
        } catch (error) {
            console.error('Logout Error:', error);
        }
    };
    return (
        <View style={styles.container}>
            {/* <Text style={styles.text}>demo</Text> */}
            <Button 
            onPress={handleLogout}
            title="Logout"
            />
        </View>
    )
}

export default Demo;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    // text: {
    //     color: 'white',
    //     fontWeight: 'bold',
    //     fontSize: 30,
    // }
})