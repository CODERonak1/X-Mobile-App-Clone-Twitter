import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import ProfileImg from '../components/ProfileImg';

const Notifications = () => {
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
                <Text style={styles.text}>Notifications</Text>
            </View>
        </SafeAreaView>
    )
}   

export default Notifications;

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
        marginTop: 10
    },

    img: {
        flexDirection: 'row',
        // borderWidth: 2,
        // borderColor: 'white',
        width: '55%'
    },
})