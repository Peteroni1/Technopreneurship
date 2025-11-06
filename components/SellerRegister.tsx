// components/SellerRegister.tsx
import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Animated, {
  FadeInDown,
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import BackButton from './BackButton';

interface SellerRegisterProps {
  onNavigate: (screen: string, params?: any) => void;
}

const SellerRegister: React.FC<SellerRegisterProps> = ({ onNavigate }) => {
  const [agreed, setAgreed] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const buttonScale = useSharedValue(1);
  const checkboxScale = useSharedValue(1);
  
  const onPressIn = () => (buttonScale.value = withSpring(0.95));
  const onPressOut = () => (buttonScale.value = withSpring(1));
  
  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  const checkboxAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: checkboxScale.value }],
  }));

  const handleCheckboxPress = () => {
    checkboxScale.value = withSequence(
      withTiming(0.8, { duration: 100 }),
      withSpring(1, { damping: 5, stiffness: 400 })
    );
    setAgreed(!agreed);
  };

  const handleSignUp = () => {
    if (!firstName || !lastName || !username || !password) {
      alert('Please fill in all fields');
      return;
    }

    if (!agreed) {
      alert('Please agree to the Terms and Conditions');
      return;
    }

    const fullName = `${firstName} ${lastName}`;
    onNavigate('seller-setup', { userName: fullName });
  };

  return (
    <ImageBackground
      source={require('../assets/images/HM-BG3.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView 
          style={styles.container}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <BackButton onPress={() => onNavigate('choice')} />

          <View style={styles.content}>
            <Animated.View 
              entering={FadeInUp.duration(800).springify()} 
              style={styles.logoContainer}
            >
              <View style={styles.logo}>
                <Image
                  source={require('../assets/images/nigga.png')}
                  style={styles.logoImage}
                  resizeMode="contain"
                />
              </View>
            </Animated.View>

            <Animated.Text
              entering={FadeInDown.delay(100).duration(800)}
              style={styles.title}
            >
              REGISTER NOW, HIGALA!
            </Animated.Text>

            <Animated.View 
              entering={FadeInDown.delay(200).duration(800)} 
              style={styles.formCard}
            >
              <Animated.View entering={FadeInDown.delay(300).duration(700)}>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="First Name"
                    placeholderTextColor="#999"
                    value={firstName}
                    onChangeText={setFirstName}
                  />
                </View>
              </Animated.View>

              <Animated.View entering={FadeInDown.delay(350).duration(700)}>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Last Name"
                    placeholderTextColor="#999"
                    value={lastName}
                    onChangeText={setLastName}
                  />
                </View>
              </Animated.View>

              <Animated.View entering={FadeInDown.delay(400).duration(700)}>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Store Name"
                    placeholderTextColor="#999"
                    value={username}
                    onChangeText={setUsername}
                  />
                </View>
              </Animated.View>

              <Animated.View entering={FadeInDown.delay(450).duration(700)}>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#999"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                  />
                </View>
              </Animated.View>

              <Animated.View 
                entering={FadeInDown.delay(500).duration(700)}
                style={checkboxAnimatedStyle}
              >
                <TouchableOpacity
                  style={styles.checkboxRow}
                  onPress={handleCheckboxPress}
                  activeOpacity={0.7}
                >
                  <View style={[styles.checkbox, agreed && styles.checkboxChecked]}>
                    {agreed && <Text style={styles.checkmark}>✓</Text>}
                  </View>
                  <Text style={styles.checkboxLabel}>
                    I agree to the Terms and Conditions.
                  </Text>
                </TouchableOpacity>
              </Animated.View>

              <Animated.View 
                entering={FadeInDown.delay(550).duration(700)} 
                style={buttonAnimatedStyle}
              >
                <TouchableOpacity
                  onPressIn={onPressIn}
                  onPressOut={onPressOut}
                  style={styles.signupButton}
                  onPress={handleSignUp}
                  activeOpacity={0.9}
                >
                  <Text style={styles.signupButtonText}>SIGN UP</Text>
                </TouchableOpacity>
              </Animated.View>

              <Animated.View 
                entering={FadeInDown.delay(600).duration(700)} 
                style={styles.loginRow}
              >
                <Text style={styles.loginText}>Already have an account? </Text>
                <TouchableOpacity onPress={() => onNavigate('login')}>
                  <Text style={styles.loginLink}>Log In</Text>
                </TouchableOpacity>
              </Animated.View>
            </Animated.View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  keyboardView: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  logoContainer: {
    marginTop: 40,
    marginBottom: 10,
  },
  logo: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  logoImage: {
    width: '75%',
    height: '75%',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    letterSpacing: 1,
    marginBottom: 30,
  },
  formCard: {
    width: '100%',
    maxWidth: 400,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#f9fafb',
    padding: 16,
    borderRadius: 12,
    fontSize: 16,
    borderWidth: 1.5,
    borderColor: '#e5e7eb',
    color: '#1f2937',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#9ca3af',
    marginRight: 12,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  checkmark: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#fff',
    flex: 1,
    lineHeight: 20,
  },
  signupButton: {
    backgroundColor: '#000',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  signupButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 1.5,
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 14,
    color: '#fff',
  },
  loginLink: {
    fontSize: 14,
    color: '#000',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default SellerRegister;