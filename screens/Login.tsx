// imports
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDoc } from 'firebase/firestore';
import { doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

// Login 
const Login = () => {
    const navigation = useNavigation(); // Hook for navigation
    const [email, setEmail] = useState(''); // State for email input
    const [password, setPassword] = useState(''); // State for password input
    const [isFocusedInput, setIsFocusedInput] = useState(''); // State for input focus
    const [isLoading, setIsLoading] = useState(false); // State for loading indicator
    const [errorMessage, setErrorMessage] = useState(''); // State for error messages

    // Function to handle user sign-in
    const handleSignin = async () => {
        setIsLoading(true); // Start loading
        setErrorMessage(''); // Clear error messages

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password); // Authenticate user
            const user = userCredential.user;

            // Fetch user data from Firestore
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            const userData = userDoc.data();

            // Store user data (email and username) in AsyncStorage
            await AsyncStorage.setItem('user', JSON.stringify(userData));

            console.log('Sign in successful');
            navigation.navigate('Main'); // Navigate to Main tabs
        } catch (error) {
            handleLoginError(error); // Handle error
        } finally {
            setIsLoading(false); // Ensure loading is stopped
        }
    };

    // Function to handle login errors
    const handleLoginError = (error) => {
        if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
            setErrorMessage('The email or password you entered is incorrect.');
        } else {
            setErrorMessage('An unexpected error occurred. Please try again.');
        }
        console.log('Sign in Error:', error); // Log the error for debugging
    };

    return (
        <SafeAreaView style={styles.background}>
            {isLoading ? (
                <View style={styles.loadingContainer}>
                    <Text style={styles.loadingText}>Loading...</Text> {/* Show loading text */}
                </View>
            ) : (
                <>
                    <Text style={styles.text}>To Login, first enter your email and password.</Text> {/* Login instructions */}
                    <View style={styles.container}>
                        <TextInput
                            style={[styles.input, isFocusedInput === 'email' && styles.focusInput]}
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                            placeholderTextColor="gray"
                            keyboardType="email-address"
                            cursorColor={'#3493d6'}
                            onFocus={() => setIsFocusedInput('email')} // Set focus to email input
                            onBlur={() => setIsFocusedInput('')} // Remove focus from input
                        />
                        <TextInput
                            style={[styles.input, isFocusedInput === 'password' && styles.focusInput]}
                            placeholder="Password"
                            value={password}
                            onChangeText={setPassword}
                            placeholderTextColor="gray"
                            cursorColor={'#3493d6'}
                            secureTextEntry={true} // Enable secure input for passwords
                            onFocus={() => setIsFocusedInput('password')} // Set focus to password input
                            onBlur={() => setIsFocusedInput('')} // Remove focus from input
                        />
                        <Text style={styles.errorText}>{errorMessage}</Text> {/* Display error message */}
                        <Pressable style={styles.loginBtn} onPress={handleSignin}> {/* Login button */}
                            <Text style={styles.loginBtnText}>Log In</Text>
                        </Pressable>
                    </View>
                </>
            )}
        </SafeAreaView>
    );
};

export default Login;

const styles = StyleSheet.create({
    background: {
        backgroundColor: 'black',
        height: '100%',
    },
    container: {
        alignItems: 'center',
        marginTop: 140,
        position: 'relative',
        bottom: 100,
    },
    text: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        marginLeft: 20,
    },
    input: {
        fontSize: 18,
        padding: 18,
        borderWidth: 1,
        borderColor: 'white',
        paddingLeft: 20,
        width: '90%',
        borderRadius: 6,
        color: 'white',
        marginTop: 30,
    },
    focusInput: {
        borderWidth: 2,
        borderColor: '#3493d6',
    },
    errorText: {
        color: 'red',
        marginTop: 10,
        textAlign: 'center',
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
        fontWeight: 'bold',
    },
    loginBtn: {
        backgroundColor: 'white',
        borderRadius: 50,
        width: '22%',
        margin: 'auto',
        padding: 5,
        marginBottom: 10,
    },
    loginBtnText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
    },
    btn: {
        flex: 1,
        flexDirection: 'row',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    loadingText: {
        color: 'white',
        fontSize: 20,
    },
});