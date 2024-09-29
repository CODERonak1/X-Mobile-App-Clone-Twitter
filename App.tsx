import { StyleSheet, Text, View, Pressable, Image } from 'react-native'; // Added Image import
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

// screens
import LoginOrSignup from './screens/LoginOrSignup';
import Login from './screens/Login';
import Signup from './screens/Signup';

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginOrSignup">
        <Stack.Screen name="LoginOrSignup" component={LoginOrSignup} options={{ headerShown: false }} />

        <Stack.Screen name="Login" component={Login} options={{
          headerTitle: () => (
            <Image
              source={require('./assets/XWhite.png')}
              style={{ width: 45, height: 45 }}
              resizeMode="contain"
            />
          ),
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: 'black'
          },
          headerTintColor: 'white'
        }} />

        <Stack.Screen name="Signup" component={Signup} options={{
          headerTitleAlign: 'center',
          headerTitle: () => (
            <Image
              source={require('./assets/XWhite.png')}
              style={{ width: 45, height: 45 }}
              resizeMode="contain"
            />
          ),
          headerStyle: {
            backgroundColor: 'black'
          },
          headerTintColor: 'white'

        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({});