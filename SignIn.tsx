import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform,Image } from 'react-native';
import axios from 'axios';
import { Stack, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeIn } from 'react-native-reanimated';

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [token, setToken] = useState('');

  // Check if token exists in AsyncStorage when the component is mounted
 

  const handleSignin = () => {
    axios
      .post('http://192.168.1.10:5000/signin', { email, password })
      .then(async (response) => {
        setMessage('Signin successful');
        setToken(response.data.token);
        console.log('Token:', response.data.token);

        // Store the token in AsyncStorage
        await AsyncStorage.setItem('userToken', response.data.token);

        // Navigate to tabs screen
        router.push('/(tabs)');
      })
      .catch((error) => {
        // Improved error handling
        if (error.response) {
          // If the server responded with an error
          setMessage('Error: ' + (error.response.data.error || 'Something went wrong'));
        } else if (error.request) {
          // If the request was made but no response was received
          setMessage('Error: No response from server');
        } else {
          // If something else caused the error
          setMessage('Error: ' + error.message);
        }
      });
  };

  return (
    <>
    <Stack.Screen options={{headerShown : false}} />
    <LinearGradient colors={['#f5f5f5', '#ffffff']} style={styles.container}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Animated.View style={styles.formWrapper} entering={FadeIn.delay(500).duration(500)}>
          <View style={styles.logoWrapper}>
            <Image source={require('../assets/images/smartica.png')} style={styles.logo} />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity style={styles.button} onPress={handleSignin}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>

          {message ? <Text style={styles.message}>{message}</Text> : null}

          <View style={styles.signupLinkWrapper}>
            <Text style={styles.signupLinkText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/SignUp')}>
              <Text style={styles.signupLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  logoWrapper: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  formWrapper: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 25,
    elevation: 5, // Adds shadow for iOS
    shadowColor: '#000', // Shadow for Android
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 15,
    borderRadius: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#FF6347',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  message: {
    textAlign: 'center',
    color: 'green',
    fontSize: 16,
    marginTop: 10,
  },
  signupLinkWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signupLinkText: {
    fontSize: 14,
    color: '#888',
  },
  signupLink: {
    fontSize: 14,
    color: '#FF6347',
    fontWeight: '600',
  },
});
