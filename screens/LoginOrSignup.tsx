import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import React from 'react';

const LoginOrSignup = () => {
    const navigation = useNavigation();

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
                <Pressable onPress={() => navigation.navigate('Signup')} style={styles.button} android_ripple={{ color: '#00000035', borderless: false, foreground: true }}>
                    <Text style={styles.btnText}>Create account</Text>
                </Pressable>

                <Pressable onPress={() => navigation.navigate('Login')} style={styles.button} android_ripple={{ color: '#00000035', borderless: false, foreground: true }}>
                    <Text style={styles.btnText}>Login</Text>
                </Pressable>

                <Text style={styles.or}>or</Text>

                <Pressable onPress={() => navigation.navigate('Anonymous')} style={styles.button} android_ripple={{ color: '#00000035', borderless: false, foreground: true }}>
                    <Text style={styles.btnText}>Be Anonymous</Text>
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
        marginTop: 100,

    },
    text: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'white',
        marginLeft: 30
    },

    xLogo: {
        height: 35,
        width: 35,
        margin: 'auto'
    },

    btn: {
        // flex: 1
        position: 'relative',
        bottom: 200
    },
    button: {
        backgroundColor: 'white',
        borderRadius: 50,
        width: '80%',
        margin: 'auto',
        padding: 10,
        marginTop: 20
    },

    btnText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
    },

    or: {
        color: 'grey',
        textAlign: 'center',
        fontSize: 18,
        marginTop: 20,
    }
})