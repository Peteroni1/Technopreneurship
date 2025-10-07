// components/SellerRegister.tsx
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import BackButton from './BackButton';

interface SellerRegisterProps {
  onNavigate: (screen: string) => void;
}

const SellerRegister: React.FC<SellerRegisterProps> = ({ onNavigate }) => {
  const [agreed, setAgreed] = useState(false);
  const buttonScale = useSharedValue(1);
  const onPressIn = () => (buttonScale.value = withSpring(0.95));
  const onPressOut = () => (buttonScale.value = withSpring(1));
  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  return (
    <ScrollView style={styles.container}>
      <BackButton onPress={() => onNavigate('choice')} />

      <View style={styles.content}>
        <Animated.View entering={FadeInDown.duration(700)} style={styles.logo}>
          <Text style={styles.logoText}>LOGO</Text>
        </Animated.View>

        <Animated.Text
          entering={FadeInDown.delay(100).duration(700)}
          style={styles.title}
        >
          REGISTER NOW, HIGALA!
        </Animated.Text>

        <Animated.View entering={FadeInDown.delay(200).duration(700)} style={styles.form}>
          <Animated.View entering={FadeInDown.delay(250).duration(700)} style={styles.row}>
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="First Name"
              placeholderTextColor="#999"
            />
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="Last Name"
              placeholderTextColor="#999"
            />
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(300).duration(700)}>
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="#999"
            />
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(350).duration(700)}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#999"
              secureTextEntry
            />
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(400).duration(700)}>
            <View style={styles.input}>
              <Text style={styles.pickerText}>Position</Text>
            </View>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(450).duration(700)}>
            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => setAgreed(!agreed)}
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

          <Animated.View entering={FadeInDown.delay(500).duration(700)} style={buttonAnimatedStyle}>
            <TouchableOpacity
              onPressIn={onPressIn}
              onPressOut={onPressOut}
              style={styles.signupButton}
              onPress={() => onNavigate('seller-setup')}
            >
              <Text style={styles.signupButtonText}>SIGN UP</Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(550).duration(700)} style={styles.loginRow}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => onNavigate('login')}>
              <Text style={styles.loginLink}>Log In</Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      </View>
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
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#d1d5db',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
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
  row: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#f3f4f6',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  halfInput: {
    flex: 1,
  },
  pickerText: {
    color: '#999',
    fontSize: 16,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#9ca3af',
    marginRight: 8,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#dc2626',
    borderColor: '#dc2626',
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
  },
  signupButton: {
    backgroundColor: '#d1d5db',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  signupButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
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

export default SellerRegister;
