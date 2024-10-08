// imports
import { StyleSheet, Text, View, TextInput, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { auth, db } from '../firebaseConfig';  // Import Firestore and Auth
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';  // Firestore methods
import AsyncStorage from '@react-native-async-storage/async-storage';

// Signup
const Signup = () => {
    const [email, setEmail] = useState(''); // State for email input
    const [password, setPassword] = useState(''); // State for password input
    const [username, setUsername] = useState(''); // State for username input
    const [isFocusedInput, setIsFocusedInput] = useState(''); // State for input focus management
    const [errorMessage, setErrorMessage] = useState(''); // State for handling email-related error messages
    const [passwordErrorMessage, setPasswordErrorMessage] = useState(''); // State for password error messages

    const navigation = useNavigation(); // Hook for navigation

    // Handle signup function when user presses sign-up button
    const handleSignup = async () => {
        // Clear any previous error messages
        setErrorMessage('');
        setPasswordErrorMessage('');

        // Check if password is at least 8 characters long
        if (password.length < 8) {
            setPasswordErrorMessage('Password must be at least 8 characters long.');
            return; // Prevent further execution if password is invalid
        }

        try {
            // Sign up the user with Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Add user information to Firestore with the user's UID
            const userData = {
                uid: user.uid,
                email: email,
                username: username, // Include username in user data
                createdAt: serverTimestamp(),
            };
            await setDoc(doc(db, 'users', user.uid), userData); // Store user data in Firestore

            // Save user data in AsyncStorage
            await AsyncStorage.setItem('user', JSON.stringify(userData));

            console.log('Sign up successful and user added to Firestore');
            navigation.navigate('Main'); // Navigate to main screen after successful sign-up
        } catch (error) {
            console.error('Signup Error:', error);
            // Handle Firebase-specific error messages
            if (error.code === 'auth/email-already-in-use') {
                setErrorMessage('This email address is already in use.');
            } else {
                setErrorMessage('Signup failed. Please try again.');
            }
        }
    };

    return (
        <SafeAreaView style={styles.background}>
            <Text style={styles.text}>Create your account</Text> {/* Header text for sign-up screen */}

            <View style={styles.container}>
                {/* Username input field */}
                <TextInput
                    style={[styles.input, isFocusedInput === 'username' && styles.focusInput]} 
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}  // Update username state
                    placeholderTextColor="gray"
                    cursorColor={'#3493d6'}
                    onFocus={() => setIsFocusedInput('username')} // Change focus state for input
                    onBlur={() => setIsFocusedInput('')} // Clear focus state when input loses focus
                />

                {/* Email input field */}
                <TextInput
                    style={[styles.input, isFocusedInput === 'email' && styles.focusInput]}
                    placeholder="Email address"
                    value={email}
                    onChangeText={setEmail} // Update email state
                    placeholderTextColor="gray"
                    cursorColor={'#3493d6'}
                    keyboardType="email-address" // Use email-specific keyboard
                    onFocus={() => setIsFocusedInput('email')} // Change focus state for input
                    onBlur={() => setIsFocusedInput('')} // Clear focus state when input loses focus
                />
                {errorMessage ? (
                    <Text style={styles.errorMessage}>{errorMessage}</Text> // Display error message for email
                ) : null}

                {/* Password input field */}
                <TextInput
                    style={[styles.input, isFocusedInput === 'password' && styles.focusInput]}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword} // Update password state
                    placeholderTextColor="gray"
                    cursorColor={'#3493d6'}
                    secureTextEntry={true} // Enable secure text for password input
                    onFocus={() => setIsFocusedInput('password')} // Change focus state for input
                    onBlur={() => setIsFocusedInput('')} // Clear focus state when input loses focus
                />
                {passwordErrorMessage ? (
                    <Text style={styles.errorMessage}>{passwordErrorMessage}</Text> // Display error message for password
                ) : null}
            </View>

            <View>
                {/* Sign-up button */}
                <Pressable
                    onPress={handleSignup}
                    style={styles.nextBtn}
                    android_ripple={{ color: '#00000035', borderless: false, foreground: true }}>
                    <Text style={styles.nextText}>Sign up</Text> {/* Button text */}
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
    errorMessage: {
        color: 'red',
        marginTop: 5,
        textAlign: 'center',
        fontSize: 16,
    },
});
