import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isFocusedInput, setIsFocusedInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSignin = async () => {
        setIsLoading(true);
        setErrorMessage(''); // Reset error message before sign-in attempt

        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log('Sign in successful');
            navigation.navigate('Main');
        } catch (error) {
            setIsLoading(false); // Hide loading indicator

            // Set the appropriate error message based on the error code
            if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
                setErrorMessage('The email or password you entered is incorrect.'); // Unified error message for incorrect credentials
             } else {
                setErrorMessage('An unexpected error occurred. Please try again.'); // Generic error message for unexpected errors
            }
            console.log('Sign in Error:', error);
        }

        setIsLoading(false); // Hide loading indicator after operation
    };

    return (
        <SafeAreaView style={styles.background}>
            {isLoading ? (
                <View style={styles.loadingContainer}>
                    <Text style={styles.loadingText}>Loading...</Text>
                </View>
            ) : (
                <>
                    <Text style={styles.text}>To Login, first enter your email and password.</Text>
                    <View style={styles.container}>
                        <TextInput
                            style={[styles.input, isFocusedInput === 'name' && styles.focusInput]}
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                            placeholderTextColor="gray"
                            keyboardType="email-address"
                            cursorColor={'#3493d6'}
                            onFocus={() => setIsFocusedInput('name')}
                            onBlur={() => setIsFocusedInput('')}
                        />
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
                        {/* Display error message if there's an error */}
                        {errorMessage ? (
                            <Text style={styles.errorText}>{errorMessage}</Text>
                        ) : null}
                    </View>
                    <View style={styles.btn}>
                        <Pressable 
                            onPress={() => navigation.navigate('Login')} 
                            style={styles.forgotPassBtn} 
                            android_ripple={{ color: '#00000035', borderless: false, foreground: true }}>
                            <Text style={styles.forgotPassText}>Forgot password?</Text>
                        </Pressable>
                        <Pressable 
                            onPress={handleSignin} 
                            style={styles.loginBtn} 
                            android_ripple={{ color: '#fffff', borderless: false, foreground: true }}>
                            <Text style={styles.loginText}>Login</Text>
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
    loginText: {
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
