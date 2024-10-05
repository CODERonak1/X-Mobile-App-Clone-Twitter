import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native'; // Import ActivityIndicator
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { auth } from './firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

// icons
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

// screens
import LoginOrSignup from './screens/LoginOrSignup';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Demo from './screens/Demo';
import Anonymous from './screens/Anonymous';
import Feed from './screens/Feed';
import Messages from './screens/Messages';
import Notifications from './screens/Notifications';
import Search from './screens/Search';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { backgroundColor: 'black', borderTopWidth: 0 },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Feed"
        component={Feed}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="notifications" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Messages"
        component={Messages}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="envelope-o" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        AsyncStorage.setItem('user', JSON.stringify(user));
      } else {
        setUser(null);
        AsyncStorage.removeItem('user');
      }
      setLoading(false); // Set loading to false once authentication state is determined
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (loading) { // Show loading indicator while determining auth state
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="white" /> 
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? "Main" : "LoginOrSignup"}>
        {user ? (
          <>
            <Stack.Screen
              name="Main"
              component={MainTabs}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Demo"
              component={Demo}
              options={{
                headerTitle: () => (
                  <Image
                    source={require('./assets/XWhite.png')}
                    style={{ width: 35, height: 35 }}
                    resizeMode="contain"
                  />
                ),
                headerTitleAlign: 'center',
                headerStyle: {
                  backgroundColor: 'black',
                },
                headerTintColor: 'white',
              }}
            />
            <Stack.Screen
              name="Anonymous"
              component={Anonymous}
              options={{
                headerTitle: () => (
                  <Image
                    source={require('./assets/XWhite.png')}
                    style={{ width: 35, height: 35 }}
                    resizeMode="contain"
                  />
                ),
                headerTitleAlign: 'center',
                headerStyle: {
                  backgroundColor: 'black',
                },
                headerTintColor: 'white',
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="LoginOrSignup"
              component={LoginOrSignup}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerTitle: () => (
                  <Image
                    source={require('./assets/XWhite.png')}
                    style={{ width: 35, height: 35 }}
                    resizeMode="contain"
                  />
                ),
                headerTitleAlign: 'center',
                headerStyle: {
                  backgroundColor: 'black',
                },
                headerTintColor: 'white',
              }}
            />
            <Stack.Screen
              name="Signup"
              component={Signup}
              options={{
                headerTitleAlign: 'center',
                headerTitle: () => (
                  <Image
                    source={require('./assets/XWhite.png')}
                    style={{ width: 35, height: 35 }}
                    resizeMode="contain"
                  />
                ),
                headerStyle: {
                  backgroundColor: 'black',
                },
                headerTintColor: 'white',
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black', // Optional: set background color
  },
});
