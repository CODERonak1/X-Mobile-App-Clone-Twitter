import { StyleSheet, Text, View, Pressable, Image } from 'react-native'; // Added Image import
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react'; // Import useEffect and useState
import { auth } from './firebaseConfig';

// screens
import LoginOrSignup from './screens/LoginOrSignup';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Demo from './screens/Demo';
import Anonymous from './screens/Anonymous';
import Feed from './screens/Feed';

const Stack = createNativeStackNavigator();
const App = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setIsLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginOrSignup">
        <Stack.Screen name="LoginOrSignup" component={LoginOrSignup} options={{ headerShown: false }} />

        <Stack.Screen name="Login" component={Login} options={{
          headerTitle: () => (
            <Image
              source={require('./assets/XWhite.png')}
              style={{ width:35, height:35 }}
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
              style={{ width:35, height:35 }}
              resizeMode="contain"
            />
          ),
          headerStyle: {
            backgroundColor: 'black'
          },
          headerTintColor: 'white'

        }} />

        <Stack.Screen name="Demo" component={Demo} options={{
          headerTitle: () => (
            <Image
              source={require('./assets/XWhite.png')}
              style={{ width:35, height:35 }}
              resizeMode="contain"
            />
          ),
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: 'black'
          },
          headerTintColor: 'white'
        }} />

        <Stack.Screen name="Anonymous" component={Anonymous} options={{
          headerTitle: () => (
            <Image
              source={require('./assets/XWhite.png')}
              style={{ width:35, height:35 }}
              resizeMode="contain"
            />
          ),
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: 'black'
          },
          headerTintColor: 'white'
        }} />

        <Stack.Screen name="Feed" component={Feed} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
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