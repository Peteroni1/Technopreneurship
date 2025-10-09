// components/GetStartedScreen.tsx
import React, { useEffect } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  Easing,
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

interface GetStartedScreenProps {
  onNavigate: (screen: string) => void;
}

const GetStartedScreen: React.FC<GetStartedScreenProps> = ({ onNavigate }) => {
  const fade = useSharedValue(0);
  const slide = useSharedValue(50);
  const buttonScale = useSharedValue(1);

  useEffect(() => {
    fade.value = withTiming(1, { duration: 800, easing: Easing.out(Easing.exp) });
    slide.value = withTiming(0, { duration: 800, easing: Easing.out(Easing.exp) });
  }, []);

  const containerStyle = useAnimatedStyle(() => ({
    opacity: fade.value,
    transform: [{ translateY: slide.value }],
  }));

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  const handlePressIn = () => (buttonScale.value = withSpring(0.95));
  const handlePressOut = () => (buttonScale.value = withSpring(1));

  return (
    <ScrollView style={styles.container}>
      <Animated.View style={[styles.content, containerStyle]}>
        {/* Logo with fade-in-down animation */}
        <Animated.View entering={FadeInDown.duration(800)} style={styles.logo}>
          <Image 
            source={require('@/assets/images/nigga.png')} // Replace with your logo path
            style={styles.logoImage}
            resizeMode="contain"
            />
        </Animated.View>

        <Animated.Text
          entering={FadeInDown.delay(150).duration(800)}
          style={styles.title}
        >
          WELCOME, HIGALA!
        </Animated.Text>

        <Animated.Text
          entering={FadeInDown.delay(250).duration(800)}
          style={styles.subtitle}
        >
          Because no good food should go to waste!
        </Animated.Text>

        {/* Action Buttons */}
        <Animated.View entering={FadeInDown.delay(350).duration(800)} style={styles.buttonContainer}>
          {/* Get Started Button */}
          <Animated.View style={buttonAnimatedStyle}>
            <TouchableOpacity
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              style={styles.primaryButton}
              onPress={() => onNavigate('choice')}
            >
              <Text style={styles.primaryButtonText}>GET STARTED</Text>
            </TouchableOpacity>
          </Animated.View>

          <View style={styles.loginRow}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => onNavigate('login')}>
              <Text style={styles.loginLink}>Log In</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Animated.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7f1d1d',
  },
  content: {
    padding: 20,
    alignItems: 'center',
    paddingTop: 60,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoImage: {
    width: '80%',
    height: '80%',
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#f3f4f6',
    marginBottom: 40,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 400,
  },
  primaryButton: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 40,
  },
  loginText: {
    fontSize: 14,
    color: '#fff',
  },
  loginLink: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default GetStartedScreen;