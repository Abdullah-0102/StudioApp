import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const SplashScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current; // Slightly smaller initial scale

  useEffect(() => {
    // Run fade-in and scale animations in parallel
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000, // Shorter duration for subtle animation
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1000, // Shorter duration for subtle animation
        useNativeDriver: true,
      })
    ]).start(() => {
      // Navigate to the next screen after a delay
      setTimeout(() => {
        navigation.replace('Login');
      }, 1000); // Show splash screen for 1 second after animations
    });
  }, [fadeAnim, scaleAnim, navigation]);

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <Animated.Image
          source={require('../images/logo.jpg')} // Replace with your logo path
          style={[
            styles.logo,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }]
            }
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'white', // Set background to white
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150, // Medium size for the logo
    height: 150, // Adjust the height to maintain the aspect ratio
  },
});

export default SplashScreen;
