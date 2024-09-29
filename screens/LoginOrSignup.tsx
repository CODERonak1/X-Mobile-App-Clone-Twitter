import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';

const LoginOrSignup = () => {
    return (
        <SafeAreaView style={styles.background}>

            <Image
                style={styles.xLogo}
                source={
                    require('../assets/XWhite.png')
                }
            />

            <View style={styles.container}>
                <Text style={styles.text}>See what's happening in the world right now.</Text>
                <Text> 
                    
                </Text>
            </View>

            <View style={styles.btn}>
                <Pressable style={styles.createAccBtn} android_ripple={{ color: '#00000035', borderless: false, foreground: true }}>
                    <Text style={styles.createAccText}>Create account</Text>
                </Pressable>

                <Pressable style={styles.loginBtn} android_ripple={{ color: '#00000035', borderless: false, foreground: true }}>
                    <Text style={styles.loginText}>Login</Text>
                </Pressable>

            </View>
        </SafeAreaView>
    )
}

export default LoginOrSignup;

const styles = StyleSheet.create({

    background: {
        backgroundColor: 'black',
        height: '100%',
    },

    container: {
        flex: 1,
        marginTop: 250,

    },
    text: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'white',
        marginLeft: 30
    },

    xLogo: {
        height: 45,
        width: 45,
        margin: 'auto'
    },

    btn: {
    },
    
    createAccBtn: {
        marginTop: -200,
        backgroundColor: 'white',
        borderRadius: 50,
        width: '80%',
        margin: 'auto',
        padding: 10
    },
    
    createAccText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
    },

    loginBtn: {
        marginTop: -70,
        backgroundColor: 'white',
        borderRadius: 50,
        width: '80%',
        margin: 'auto',
        padding: 10
    },
    
    loginText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
    }


})