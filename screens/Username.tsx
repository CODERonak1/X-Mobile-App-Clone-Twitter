import { StyleSheet, Text, View, Image, TextInput, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { db, auth } from '../firebaseConfig'; // Import Firestore and Auth
import { doc, updateDoc } from 'firebase/firestore'; // Firestore methods
import { getAuth } from 'firebase/auth'; // For current user

const Username = () => {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [isFocusedInput, setIsFocusedInput] = useState('');

    // Function to handle storing the username in Firestore
    const handleNext = async () => {
        if (username.trim() === '') {
            Alert.alert("Username Required", "Please enter a username before proceeding.");
            return;
        }

        try {
            const user = auth.currentUser; // Get the current user
            if (user) {
                const userRef = doc(db, 'users', user.uid);  // Get the document reference by UID

                // Update the document with the username
                await updateDoc(userRef, {
                    username: username,
                });

                console.log('Username added successfully!');
                navigation.navigate('Main');  // Navigate to the main screen
            } else {
                console.error('No user is logged in');
            }
        } catch (error) {
            console.error("Error adding username: ", error);
            Alert.alert("Error", "There was an issue saving your username. Please try again.");
        }
    };

    return (
        <SafeAreaView style={styles.background}>
            <Image
                style={styles.xLogo}
                source={require('../assets/XWhite.png')}
            />

            <Text style={styles.text}>What should we call you?</Text>

            <View style={styles.container}>
                <TextInput
                    style={[styles.input, isFocusedInput === 'username' && styles.focusInput]}
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                    placeholderTextColor="gray"
                    cursorColor={'#3493d6'}
                    onFocus={() => setIsFocusedInput('username')}
                    onBlur={() => setIsFocusedInput('')}
                />

                <Text style={styles.text2}>Your @username is unique. You can change it later.</Text>
            </View>

            <View style={styles.Buttons}>
                <Pressable
                    onPress={() => navigation.navigate('Main')}
                    android_ripple={{ color: '#00000035', borderless: false, foreground: true }}
                    style={[styles.btn, styles.skipBtn]}>
                    <Text style={[styles.btnText, styles.skipText]}>Skip for now</Text>
                </Pressable>

                <Pressable
                    onPress={handleNext}
                    android_ripple={{ color: '#00000035', borderless: false, foreground: true }}
                    style={[styles.btn, styles.nextBtn]}>
                    <Text style={[styles.btnText, styles.nextText]}>Next</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

export default Username;

const styles = StyleSheet.create({
    background: {
        backgroundColor: 'black',
        height: '100%',
    },
    container: {
        flex: 1,
        alignItems: 'center',
    },
    xLogo: {
        height: 35,
        width: 35,
        margin: 'auto',
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
    text: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        marginLeft: 20,
    },
    text2: {
        color: 'grey',
        marginTop: 10,
        textAlign: 'center',
        fontSize: 12,
    },
    Buttons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn: {
        backgroundColor: 'white',
        borderRadius: 50,
        width: '22%',
        margin: 'auto',
        padding: 5,
        marginBottom: 10,
    },
    skipBtn: {
        backgroundColor: 'black',
        borderRadius: 50,
        width: 'auto',
        margin: 'auto',
        padding: 5,
        marginBottom: 10,
    },
    btnText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
    },
    skipText: {
        color: 'white',
    },
    nextText: {
        color: 'black',
    },
    nextBtn: {
        backgroundColor: 'white',
    },
});
