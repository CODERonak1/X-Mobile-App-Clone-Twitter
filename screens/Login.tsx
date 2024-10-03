import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isFocusedInput, setIsFocusedInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSignin = async () => {
        setIsLoading(true);
        setErrorMessage('');

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log('Sign in successful');
            await AsyncStorage.setItem('user', JSON.stringify(user)); // Store user data
            navigation.navigate('Main'); // Navigate to Main tabs
        } catch (error) {
            handleLoginError(error); // Handle error
        } finally {
            setIsLoading(false); // Ensure loading is stopped
        }
    };

    const handleLoginError = (error) => {
        if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
            setErrorMessage('The email or password you entered is incorrect.');
        } else {
            setErrorMessage('An unexpected error occurred. Please try again.');
        }
        console.log('Sign in Error:', error);
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
                            style={[styles.input, isFocusedInput === 'email' && styles.focusInput]}
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                            placeholderTextColor="gray"
                            keyboardType="email-address"
                            cursorColor={'#3493d6'}
                            onFocus={() => setIsFocusedInput('email')}
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
                        <Text style={styles.errorText}>{errorMessage}</Text>
                        <Pressable style={styles.loginBtn} onPress={handleSignin}>
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