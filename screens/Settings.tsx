import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Settings = () => {
    return (
        <SafeAreaView style={styles.background}>
            <View style={styles.container}>
                <Text style={styles.text}>Settings</Text>
            </View>
        </SafeAreaView>
    );
};

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
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
    },
});

export default Settings;