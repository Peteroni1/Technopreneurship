// components/ChoiceScreen.tsx
import React, { useEffect } from 'react';
import {
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
import BackButton from './BackButton';

interface ChoiceScreenProps {
  onNavigate: (screen: string) => void;
}

const ChoiceScreen: React.FC<ChoiceScreenProps> = ({ onNavigate }) => {
  const fade = useSharedValue(0);
  const slide = useSharedValue(50);
  const buttonScale1 = useSharedValue(1);
  const buttonScale2 = useSharedValue(1);

  useEffect(() => {
    fade.value = withTiming(1, { duration: 800, easing: Easing.out(Easing.exp) });
    slide.value = withTiming(0, { duration: 800, easing: Easing.out(Easing.exp) });
  }, []);

  const containerStyle = useAnimatedStyle(() => ({
    opacity: fade.value,
    transform: [{ translateY: slide.value }],
  }));

  const button1AnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale1.value }],
  }));

  const button2AnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale2.value }],
  }));

  const handlePressIn1 = () => (buttonScale1.value = withSpring(0.95));
  const handlePressOut1 = () => (buttonScale1.value = withSpring(1));

  const handlePressIn2 = () => (buttonScale2.value = withSpring(0.95));
  const handlePressOut2 = () => (buttonScale2.value = withSpring(1));

  return (
    <View style={styles.container}>
      <BackButton onPress={() => onNavigate('get-started')} />

      <View style={styles.choiceButtons}>
        <Animated.View
          entering={FadeInDown.delay(200).duration(800)}
            style={styles.choiceCard}
          >
            <Text style={styles.choiceTitle}>
              Naa ba kay{'\n'}IBALIGYA,{'\n'}higala?
            </Text>
            <Animated.View style={button1AnimatedStyle}>
              <TouchableOpacity 
                style={styles.getStartedButton}
                onPress={() => onNavigate('seller-choice')}
                onPressIn={handlePressIn1}
                onPressOut={handlePressOut1}
              >
                <Text style={styles.getStartedText}>Get Started!</Text>
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>

          <Animated.View 
            entering={FadeInDown.delay(200).duration(800)}
            style={styles.choiceCard}
          >
            <Text style={styles.choiceTitle}>
              Naa ba kay{'\n'}PALITON,{'\n'}higala?
            </Text>
            <Animated.View style={button2AnimatedStyle}>
              <TouchableOpacity 
                style={styles.getStartedButton}
                onPress={() => onNavigate('customer-choice')}
                onPressIn={handlePressIn2}
                onPressOut={handlePressOut2}
              >
                <Text style={styles.getStartedText}>Get Started!</Text>
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7f1d1d',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  orText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 40,
  },
  choiceButtons: {
    flexDirection: 'row',
    gap: 20,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  choiceCard: {
    backgroundColor: '#fff',
    padding: 40,
    borderRadius: 20,
    alignItems: 'center',
    minWidth: 250,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  choiceTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#000',
    lineHeight: 32,
  },
  getStartedButton: {
    backgroundColor: '#d1d5db',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 10,
  },
  getStartedText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default ChoiceScreen;