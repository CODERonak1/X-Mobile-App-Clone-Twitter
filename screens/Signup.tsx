import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isFocusedInput, setIsFocusedInput] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // Add this line for error message

    const navigation = useNavigation();

    const handleSignup = async () => {
        try {
            setErrorMessage(''); // Clear previous error messages
            await createUserWithEmailAndPassword(auth, email, password);
            console.log('Sign up successful');
            navigation.navigate('Demo');
        } catch (error) {
            console.error('Signup Error:', error);
            if (error.code === 'auth/email-already-in-use') {
                setErrorMessage('This email address is already in use, use other email address.'); 
            } else {
                setErrorMessage('Signup failed. Please try again.'); 
            }
        }
    };

    return (
        <SafeAreaView style={styles.background}>
            <Text style={styles.text}>Create your account</Text>

            <View style={styles.container}>
                <TextInput
                    style={[styles.input, isFocusedInput === 'email' && styles.focusInput]}
                    placeholder="Email address"
                    value={email}
                    onChangeText={setEmail}
                    placeholderTextColor="gray"
                    cursorColor={'#3493d6'}
                    keyboardType="email-address"
                    onFocus={() => setIsFocusedInput('email')}
                    onBlur={() => setIsFocusedInput('')}
                />
                {/* Render error message here */}
                {errorMessage ? (
                    <Text style={styles.errorMessage}>{errorMessage}</Text>
                ) : null}

                <TextInput
                    style={[styles.input, isFocusedInput === 'password' && styles.focusInput]}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    placeholderTextColor="gray"
                    cursorColor={'#3493d6'}
                    secureTextEntry={true}
                    onFocus={() => setIsFocusedInput('password')}
                    onBlur={() => setIsFocusedInput('')}
                />
            </View>

            <View>
                <Pressable
                    onPress={handleSignup}
                    style={styles.nextBtn}
                    android_ripple={{ color: '#00000035', borderless: false, foreground: true }}>
                    <Text style={styles.nextText}>Sign up</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

export default Signup;

const styles = StyleSheet.create({
    background: {
        backgroundColor: 'black',
        height: '100%',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 40,
    },
    text: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        marginLeft: 30,
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
        color: 'white',
    },
    focusInput: {
        borderWidth: 2,
        borderColor: '#3493d6',
    },
    nextBtn: {
        backgroundColor: 'white',
        borderRadius: 50,
        width: '22%',
        padding: 5,
        marginBottom: 10,
        margin: 'auto',
    },
    nextText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
    },
    errorMessage: { // Add styling for error message
        color: 'red',
        marginTop: 5,
        textAlign: 'center',
        fontSize: 16,
    },
});
