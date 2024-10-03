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
    const [errorMessage, setErrorMessage] = useState(''); // Email error message
    const [passwordErrorMessage, setPasswordErrorMessage] = useState(''); // Password error message

    const navigation = useNavigation();

    const handleSignup = async () => {
        // Clear previous error messages
        setErrorMessage('');
        setPasswordErrorMessage('');

        // Check password length
        if (password.length < 8) {
            setPasswordErrorMessage('Password must be at least 8 characters long.'); // Set password error message
            return; // Stop further execution
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            console.log('Sign up successful');
            navigation.navigate('Demo');
        } catch (error) {
            console.error('Signup Error:', error);
            if (error.code === 'auth/email-already-in-use') {
                setErrorMessage('This email address is already in use.'); // Set custom error message
            } else {
                setErrorMessage('Signup failed. Please try again.'); // Generic error message
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
                {/* Render email error message here */}
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
                {/* Render password error message here */}
                {passwordErrorMessage ? (
                    <Text style={styles.errorMessage}>{passwordErrorMessage}</Text>
                ) : null}
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
    errorMessage: { // Styling for error messages
        color: 'red',
        marginTop: 5,
        textAlign: 'center',
        fontSize: 16,
    },
});