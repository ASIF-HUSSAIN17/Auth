import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons"; // Importing Ionicons for potential icons
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated'; // Import FadeInDown animation
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {};

const WelcomeScreen = (props: Props) => {
    useEffect(() => {
        const checkLoginStatus = async () => {
          const storedToken = await AsyncStorage.getItem('userToken');
          if (storedToken) {
            // If a token exists, navigate directly to tabs screen
            router.push('/(tabs)');
          }
        };
    
        checkLoginStatus();
      }, []);

    const router = useRouter();
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ImageBackground
        source={require('../assets/images/smarticabg.png')}
        style={styles.imageBackground}
        resizeMode="cover"
      >
        <View style={styles.container}>
          <LinearGradient
            colors={['transparent', 'rgba(255,255,255,0.9)', 'rgba(255,255,255,1)']}
            style={styles.background}
          >
            <View style={styles.wrapper}>
              <Animated.Text style={styles.title} entering={FadeInRight.delay(500).duration(300).springify()}>
                Smartica
              </Animated.Text>
              <Animated.Text style={styles.description} entering={FadeInRight.delay(500).duration(300).springify()}>
                One Stop Solution for All Your Needs.
              </Animated.Text>
            </View>
            <View style={styles.buttonWrapper}>
              <Animated.View entering={FadeInDown.delay(700).duration(500).springify()}>
                <TouchableOpacity style={styles.getStartedButton} onPress={() => router.push('/SignUp')} >
                  <Ionicons name="rocket-outline" size={20} color="white" />
                  <Text style={styles.getStartedText}>Get Started</Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
            <Animated.View style={styles.signInWrapper} entering={FadeInRight.delay(500).duration(300).springify()}>
              <Text style={styles.signInText}>Already a member?</Text>
              <TouchableOpacity onPress={() => router.push('/SignIn')}>
                <Text style={styles.signInLink}>Sign In</Text>
              </TouchableOpacity>
            </Animated.View>
          </LinearGradient>
        </View>
      </ImageBackground>
    </>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1, // Ensures text stays on top of the image
  },
  imageBackground: {
    flex: 1, // Ensures background image covers the full screen
  },
  background: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'flex-end', // Ensures content is at the bottom
  },
  wrapper: {
    paddingBottom: 50,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28, // Larger title size for better visibility
    color: '#FF6347', // Use a bold color for title
    fontWeight: '700',
    letterSpacing: 2.4,
    marginBottom: 10, // Adjust spacing for title
  },
  description: {
    fontSize: 16, // Adjusted for a cleaner look
    color: '#A9A9A9', // Soft color for description
    letterSpacing: 1.2,
    lineHeight: 30,
    marginBottom: 30, // Added more space below the description
    textAlign: 'center', // Center the description text
  },
  buttonWrapper: {
    width: '100%', // Makes buttons take up full width
    paddingHorizontal: 20, // Adds margin to the sides
    marginBottom: 40, // Adds space above the buttons
    alignItems: 'center', // Centers the button horizontally
  },
  getStartedButton: {
    flexDirection: 'row',
    paddingVertical: 15, // Slightly larger padding for a bolder look
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 15,
    backgroundColor: '#FF6347', // Vibrant red background for the button
    shadowColor: '#000', // Shadow effect to make the button pop
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  getStartedText: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white', // White text on the button for contrast
  },
  signInWrapper: {
    flexDirection: 'row', // Aligns text and link in a row
    justifyContent: 'center', // Centers the content horizontally
    alignItems: 'center', // Vertically centers the content
    marginBottom: 30, // Adds margin at the bottom for spacing
  },
  signInText: {
    fontSize: 14,
    color: '#A9A9A9', // Soft color for the default text
  },
  signInLink: {
    fontSize: 14,
    color: '#FF6347', // Color matching the button to make it stand out
    fontWeight: '700', // Bold text for emphasis
    marginLeft: 5, // Adds a small space between the text and the link
  },
});
