import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Image, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import axios from 'axios';
import { Stack, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeIn } from 'react-native-reanimated'; // Added animation for fade-in effect

export default function SignUpScreen() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = () => {
    // Update with your machine's local IP address
    axios
      .post('http://192.168.1.10:5000/signup', { username, email, password })  // Replace with your IP address
      .then(response => {
        setMessage('User created successfully');
        router.push('/(tabs)');
      })
      .catch(error => {
        setMessage('Error: ' + error.response?.data?.error || error.message);
      });
  };

  return (
    <>
    <Stack.Screen options={{headerShown : false}} />
    <LinearGradient colors={['#f5f5f5', '#ffffff']} style={styles.container}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Animated.View style={styles.formWrapper} entering={FadeIn.delay(500).duration(500)}>
        <Image source={require('../assets/images/smartica.png')} style={styles.logo} /> 
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
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
          
          <TouchableOpacity style={styles.button} onPress={handleSignup}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>

          {message ? <Text style={styles.message}>{message}</Text> : null}

          <View style={styles.loginLinkWrapper}>
            <Text style={styles.loginLinkText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/SignIn')}>
              <Text style={styles.loginLink}>Login</Text>
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
    alignSelf : 'center'
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
  loginLinkWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginLinkText: {
    fontSize: 14,
    color: '#888',
  },
  loginLink: {
    fontSize: 14,
    color: '#FF6347',
    fontWeight: '600',
  },
});
