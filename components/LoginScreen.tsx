// components/LoginScreen.tsx
import React, { useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
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

interface LoginScreenProps {
  onNavigate: (screen: string) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onNavigate }) => {
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
          <Text style={styles.logoText}>LOGO</Text>
        </Animated.View>

        <Animated.Text
          entering={FadeInDown.delay(150).duration(800)}
          style={styles.title}
        >
          WELCOME, HIGALA!
        </Animated.Text>

        {/* Login Form */}
        <Animated.View entering={FadeInDown.delay(300).duration(800)} style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#999"
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry
          />

          <View style={styles.rememberRow}>
            <View style={styles.checkboxRow}>
              <View style={styles.checkbox} />
              <Text style={styles.checkboxLabel}>Remember Me</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          {/* Animated login button */}
          <Animated.View style={buttonAnimatedStyle}>
            <TouchableOpacity
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              style={styles.loginButton}
              onPress={() => onNavigate('choice')}
            >
              <Text style={styles.loginButtonText}>LOG IN</Text>
            </TouchableOpacity>
          </Animated.View>

          <Text style={styles.orText}>OR CONTINUE WITH</Text>

          <View style={styles.socialButtons}>
            <TouchableOpacity style={styles.socialButton}>
              <Text style={styles.socialButtonText}>Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Text style={styles.socialButtonText}>Facebook</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.signupRow}>
            <Text style={styles.signupText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => onNavigate('choice')}>
              <Text style={styles.signupLink}>Sign Up</Text>
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
    backgroundColor: '#d1d5db',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6b7280',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
  },
  form: {
    width: '100%',
    maxWidth: 400,
  },
  input: {
    backgroundColor: '#f3f4f6',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  rememberRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#9ca3af',
    marginRight: 8,
    backgroundColor: '#fff',
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#fff',
  },
  forgotText: {
    fontSize: 14,
    color: '#fff',
  },
  loginButton: {
    backgroundColor: '#d1d5db',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  orText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 14,
    marginBottom: 15,
  },
  socialButtons: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  socialButton: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  signupRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 40,
  },
  signupText: {
    fontSize: 14,
    color: '#fff',
  },
  signupLink: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
