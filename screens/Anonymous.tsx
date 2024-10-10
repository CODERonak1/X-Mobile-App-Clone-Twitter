import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { auth } from '../firebaseConfig';
import { signInAnonymously } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

const LoginOrSignup = () => {
  const navigation = useNavigation();

  // Function to handle anonymous login
  const handleAnonymousLogin = async () => {
    try {
      const userCredential = await signInAnonymously(auth); 
      console.log('Anonymous User signed in!', userCredential.user);
      navigation.navigate('Main'); 
    } catch (error) {
      console.error('Anonymous login failed:', error);
    }
  };

  return (
    <View style={styles.container}>

      

      <Pressable onPress={handleAnonymousLogin} style={styles.anonymousButton} android_ripple={{ color: '#00000035', borderless: false, foreground: true }}>
        <Text style={styles.buttonText}>Continue as Anonymous</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  text: {
    color: 'white',
    marginBottom: 20,
  },
  anonymousButton: {
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 10,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
  },
});

export default LoginOrSignup;