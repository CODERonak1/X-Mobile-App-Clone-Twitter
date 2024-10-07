import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import Feather from '@expo/vector-icons/Feather';

const SettingsIcon = () => {
    const navigation = useNavigation();

    const openSettings = () => {
        navigation.navigate('Settings');
        console.log("Opened Settings");
    }
    return (
        <View style={styles.container}>

            <Pressable onPress={openSettings}>
                <Feather name="settings" size={25} color="white" style={styles.settingsIcon} />
            </Pressable>
        </View>
    )
}

export default SettingsIcon;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },

    settingsIcon: {
        borderRadius: 50,
        marginTop: 10,
        marginRight: 10,
    }

});