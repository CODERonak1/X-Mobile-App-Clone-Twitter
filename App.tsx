// imports
import { StyleSheet, View, Image, ActivityIndicator, Pressable, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { auth } from './firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

// icons from Expo
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

// screens (these are imported components for different screens in your app)
import LoginOrSignup from './screens/LoginOrSignup';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Demo from './screens/Demo';
import Anonymous from './screens/Anonymous';
import Feed from './screens/Feed';
import Messages from './screens/Messages';
import Notifications from './screens/Notifications';
import Search from './screens/Search';
import Profile from './screens/Profile';
import Settings from './screens/Settings';

// Initialize stack and tab navigators
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Tab navigation component for main app (Feed, Search, Notifications, Messages)
const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'white', // Active tab icon color
        tabBarInactiveTintColor: 'gray', // Inactive tab icon color
        tabBarStyle: { backgroundColor: 'black', borderTopWidth: 0 }, // Tab bar styling
        headerShown: false, // Hides header for tabs
      }}
    >
      {/* Tab for Feed */}
      <Tab.Screen
        name="Feed"
        component={Feed}
        options={{
          tabBarLabel: '', // No label under icon
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" size={size} color={color} /> // Home icon for Feed tab
          ),
        }}
      />
      {/* Tab for Search */}
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={color} /> // Search icon for Search tab
          ),
        }}
      />
      {/* Tab for Notifications */}
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="notifications" size={size} color={color} /> // Bell icon for Notifications tab
          ),
        }}
      />
      {/* Tab for Messages */}
      <Tab.Screen
        name="Messages"
        component={Messages}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="envelope-o" size={size} color={color} /> // Envelope icon for Messages tab
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// Main App component
const App = () => {
  const [user, setUser] = useState(null); // State to store user authentication info
  const [loading, setLoading] = useState(true); // Loading state for the app

  // Effect hook to handle user authentication state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user); // Set the logged-in user
        AsyncStorage.setItem('user', JSON.stringify(user)); // Save user data to AsyncStorage
      } else {
        setUser(null); // No user is logged in
        AsyncStorage.removeItem('user'); // Remove user data from AsyncStorage
      }
      setLoading(false); // Stop loading once authentication state is checked
    });

    return () => {
      unsubscribe(); // Clean up the listener when component unmounts
    };
  }, []);

  // If app is still loading, show an activity indicator
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="white" /> {/* Loading spinner */}
      </View>
    );
  }

  // App's main navigator (Stack Navigator)
  return (
    <NavigationContainer>
      {/* Stack navigator, initial route based on user state */}
      <Stack.Navigator initialRouteName={user ? 'Main' : 'LoginOrSignup'}>
        {user ? (
          <>
            {/* Main tabs for logged-in users */}
            <Stack.Screen
              name="Main"
              component={MainTabs}
              options={{ headerShown: false }} // Hides header in tab navigation
            />
            
            {/* Profile screen */}
            <Stack.Screen
              name="Profile"
              component={Profile}
              options={{
                headerTitleAlign: 'center', // Center align the title
                headerTitle: () => (
                  <Image
                    source={require('./assets/XWhite.png')} // Custom image for header
                    style={{ width: 35, height: 35 }}
                    resizeMode="contain"
                  />
                ),
                headerStyle: { backgroundColor: 'black' }, // Header background color
                headerTintColor: 'white', // Header text color
              }}
            />

            {/* Settings screen */}
            <Stack.Screen
              name="Settings"
              component={Settings}
              options={({ navigation }) => ({
                headerTitleAlign: 'center',
                headerTitle: () => (
                  <Image
                    source={require('./assets/XWhite.png')}
                    style={{ width: 35, height: 35 }}
                    resizeMode="contain"
                  />
                ),
                headerRight: () => (
                  <Pressable
                    onPress={async () => {
                      try {
                        await auth.signOut(); // Sign out user
                        AsyncStorage.removeItem('user'); // Clear user data from storage
                        navigation.navigate('LoginOrSignup'); // Navigate back to login/signup screen
                      } catch (error) {
                        Alert.alert('Error', error.message); // Show error alert if sign out fails
                      }
                    }}
                  >
                    <Ionicons name="log-out-outline" size={26} color="white" /> {/* Logout icon */}
                  </Pressable>
                ),
                headerStyle: { backgroundColor: 'black' },
                headerTintColor: 'white',
              })}
            />

            {/* Demo screen */}
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
                headerStyle: { backgroundColor: 'black' },
                headerTintColor: 'white',
              }}
            />

            {/* Anonymous screen */}
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
                headerStyle: { backgroundColor: 'black' },
                headerTintColor: 'white',
              }}
            />
          </>
        ) : (
          <>
            {/* Login or Signup screen for unauthenticated users */}
            <Stack.Screen
              name="LoginOrSignup"
              component={LoginOrSignup}
              options={{ headerShown: false }} // No header for login/signup screen
            />

            {/* Login screen */}
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
                headerStyle: { backgroundColor: 'black' },
                headerTintColor: 'white',
              }}
            />

            {/* Signup screen */}
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
                headerStyle: { backgroundColor: 'black' },
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

// Stylesheet
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: 'black', 
  },
});
