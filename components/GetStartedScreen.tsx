// components/GetStartedScreen.tsx
import React, { useEffect } from 'react';
import {
  Image,
  ImageBackground,
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
  const titleScale = useSharedValue(0.8);
  const titleRotate = useSharedValue(-5);

  useEffect(() => {
    fade.value = withTiming(1, { duration: 800, easing: Easing.out(Easing.exp) });
    slide.value = withTiming(0, { duration: 800, easing: Easing.out(Easing.exp) });
    titleScale.value = withSpring(1, { damping: 8, stiffness: 100 });
    titleRotate.value = withSpring(0, { damping: 12, stiffness: 80 });
  }, []);

  const containerStyle = useAnimatedStyle(() => ({
    opacity: fade.value,
    transform: [{ translateY: slide.value }],
  }));

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  const titleAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: titleScale.value },
      { rotate: `${titleRotate.value}deg` },
    ],
  }));

  const handlePressIn = () => (buttonScale.value = withSpring(0.95));
  const handlePressOut = () => (buttonScale.value = withSpring(1));

  return (
    <ImageBackground 
      source={require('@/assets/images/HM-BG1.png')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <ScrollView style={styles.container}>
        <Animated.View style={[styles.content, containerStyle]}>
          {/* Logo with fade-in-down animation */}
          <Animated.View entering={FadeInDown.duration(800)} style={styles.logo}>
            <Image 
              source={require('@/assets/images/nigga.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </Animated.View>

          <Animated.Text
            entering={FadeInDown.delay(150).duration(800)}
            style={[styles.title, titleAnimatedStyle]}
          >
            WELCOME, HIGALA!
          </Animated.Text>

          <Animated.Text
            entering={FadeInDown.delay(250).duration(800)}
            style={styles.subtitle}
          >
            Because no good food should go to waste.
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
                activeOpacity={0.9}
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
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    alignItems: 'center',
    paddingTop: 60,
  },
  logo: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  logoImage: {
    width: '80%',
    height: '80%',
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#fff',
    marginBottom: 15,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 6,
    letterSpacing: 2.5,
    fontFamily: 'System',
    textTransform: 'uppercase',
  },
  subtitle: {
    fontSize: 16,
    color: '#f3f4f6',
    marginBottom: 50,
    textAlign: 'center',
    paddingHorizontal: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
    lineHeight: 24,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 400,
  },
  primaryButton: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    letterSpacing: 1,
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
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  loginLink: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});

export default GetStartedScreen;