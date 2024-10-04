import { StyleSheet, Text, View, TextInput, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { auth, db } from '../firebaseConfig';  // Import Firestore and Auth
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';  // Firestore methods
import AsyncStorage from '@react-native-async-storage/async-storage';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');  // Add username state
    const [isFocusedInput, setIsFocusedInput] = useState('');
    const [errorMessage, setErrorMessage] = useState('');  // Email error message
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');  // Password error message

    const navigation = useNavigation();

    // Inside handleSignup function in signup.tsx
    const handleSignup = async () => {
        // Clear previous error messages
        setErrorMessage('');
        setPasswordErrorMessage('');

        if (password.length < 8) {
            setPasswordErrorMessage('Password must be at least 8 characters long.');
            return;  // Stop further execution
        }

        try {
            // Sign up the user with Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Add user info to Firestore with 'uid' as the document ID
            const userData = {
                uid: user.uid,  
                email: email,  
                username: username,  // Include username in the userData
                createdAt: serverTimestamp(),  
            };
            await setDoc(doc(db, 'users', user.uid), userData);

            // Store user data in AsyncStorage
            await AsyncStorage.setItem('user', JSON.stringify(userData));

            console.log('Sign up successful and user added to Firestore');
            navigation.navigate('Main');  // Navigate to main screen
        } catch (error) {
            console.error('Signup Error:', error);
            if (error.code === 'auth/email-already-in-use') {
                setErrorMessage('This email address is already in use.');
            } else {
                setErrorMessage('Signup failed. Please try again.');
            }
        }
    };

    return (
        <SafeAreaView style={styles.background}>
            <Text style={styles.text}>Create your account</Text>

            <View style={styles.container}>
                {/* Username input field */}
                <TextInput
                    style={[styles.input, isFocusedInput === 'username' && styles.focusInput]}
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}  // Capture username input
                    placeholderTextColor="gray"
                    cursorColor={'#3493d6'}
                    onFocus={() => setIsFocusedInput('username')}
                    onBlur={() => setIsFocusedInput('')}
                />

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
    errorMessage: {
        color: 'red',
        marginTop: 5,
        textAlign: 'center',
        fontSize: 16,
    },
});
