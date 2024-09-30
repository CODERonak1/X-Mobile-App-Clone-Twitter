import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

const Signup = () => {
    const navigation = useNavigation();

    const [name, setName] = useState('');
    const [isFocusedInput, setIsFocusedInput] = useState('')

    return (
        <SafeAreaView style={styles.background}>

            <Text style={styles.text}>To get started, first enter your phone, email or @username </Text>

            <View style={styles.container}>
                <TextInput
                    style={[styles.input, isFocusedInput === 'name' && styles.focusInput]}
                    placeholder="Phone, email or username"
                    value={name}
                    onChangeText={newLogin => setName(newLogin)}
                    placeholderTextColor="gray"
                    maxLength={50}
                    cursorColor={'#3493d6'}
                    onFocus={() => setIsFocusedInput('name')}
                    onBlur={() => setIsFocusedInput('')}
                />


            </View>

            <View style={styles.btn}>
                <Pressable onPress={() => navigation.navigate('Login')} style={styles.forgotPassBtn} android_ripple={{ color: '#00000035', borderless: false, foreground: true }}>
                    <Text style={styles.forgotPassText}>Forgot password?</Text>
                </Pressable>

                <Pressable onPress={() => navigation.navigate('Login')} style={styles.nextBtn} android_ripple={{ color: '#fffff', borderless: false, foreground: true }}>
                    <Text style={styles.nextText}>Next</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

export default Signup;

const styles = StyleSheet.create({

    background: {
        backgroundColor: 'black',
        height: '100%',
    },

    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        marginTop: 140,
    },

    text: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        marginLeft: 20
    },

    input: {
        fontSize: 18,
        padding: 18,
        borderWidth: 1,
        borderColor: 'white',
        marginTop: -100,
        paddingLeft: 20,
        width: '90%',
        borderRadius: 6,
        color: 'white'
    },

    focusInput: {
        borderWidth: 2,
        borderColor: '#3493d6'
    },

    forgotPassBtn: {
        borderRadius: 50,
        width: '42%',
        padding: 5,
        borderWidth: 1,
        borderColor: 'white',
        margin: 'auto',
        marginBottom: 10,
    },

    forgotPassText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },

    nextBtn: {
        backgroundColor: 'white',
        borderRadius: 50,
        width: '22%',
        margin: 'auto',
        padding: 5,
        marginBottom: 10,
    },

    nextText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
    },

    btn: {
        flex: 1,
        flexDirection: 'row',
    }
})