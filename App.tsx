import { StyleSheet, Text, View, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

// screens
import LoginOrSignup from './screens/LoginOrSignup';

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginOrSignup">
        <Stack.Screen name="LoginOrSignup" component={LoginOrSignup} options={{
          headerShown: false
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;

const styles = StyleSheet.create({

})