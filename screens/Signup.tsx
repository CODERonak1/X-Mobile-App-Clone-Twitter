import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

const Signup = () => {
    const navigation = useNavigation();

    const [name, setName] = useState('');
    const [isFocusedInput, setIsFocusedInput] = useState('')
    const [isPhOrEmail, setIsPhOrEmail] = useState('')
    const [dob, setDob] = useState('');

    return (
        <SafeAreaView style={styles.background}>

            <Text style={styles.text}>Create your account</Text>

            <View style={styles.container}>
                <TextInput
                    style={[styles.input, isFocusedInput === 'name' && styles.focusInput]}
                    placeholder="Your name"
                    value={name}
                    onChangeText={newName => setName(newName)}
                    placeholderTextColor="gray"
                    maxLength={50}
                    cursorColor={'#3493d6'}
                    onFocus={() => setIsFocusedInput('name')}
                    onBlur={() => setIsFocusedInput('')}
                />

                <TextInput
                    style={[styles.input, isFocusedInput === 'ph' && styles.focusInput]}
                    placeholder="Phone number or email address"
                    value={isPhOrEmail}
                    onChangeText={newPhOrEmail => setIsPhOrEmail(newPhOrEmail)}
                    placeholderTextColor="gray"
                    cursorColor={'#3493d6'}
                    onFocus={() => setIsFocusedInput('ph')}
                    onBlur={() => setIsFocusedInput('')}
                />

                <TextInput
                    style={[styles.input, isFocusedInput === 'dob' && styles.focusInput]}
                    placeholder="Date of birth in DD/MM/YY"
                    value={dob}
                    onChangeText={newDob => setDob(newDob)}
                    placeholderTextColor="gray"
                    cursorColor={'#3493d6'}
                    onFocus={() => setIsFocusedInput('dob')}
                    onBlur={() => setIsFocusedInput('')}

                />
            </View>

            <View>
                <Pressable onPress={() => navigation.navigate('Login')} style={styles.nextBtn} android_ripple={{ color: '#00000035', borderless: false, foreground: true }}>
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
        marginTop: 40,
    },

    text: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        marginLeft: 30
    },

    input: {
        fontSize: 18,
        padding: 18,
        borderWidth: 1,
        borderColor: 'white',
        marginTop: 30,
        paddingLeft: 20,
        width: '80%',
        borderRadius: 6,
        color: 'white'
    },

    focusInput: {
        borderWidth: 2,
        borderColor: '#3493d6'
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
    }
})