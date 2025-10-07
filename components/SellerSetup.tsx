// components/SellerSetup.tsx
import React from 'react';
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

interface SellerSetupProps {
  onNavigate: (screen: string) => void;
}

const SellerSetup: React.FC<SellerSetupProps> = ({ onNavigate }) => {
  const scale = useSharedValue(1);
  const onPressIn = () => (scale.value = withSpring(0.95));
  const onPressOut = () => (scale.value = withSpring(1));
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Animated.View entering={FadeInDown.duration(700)} style={styles.imageBox}>
          <Text style={styles.imagePlaceholder}>✕</Text>
        </Animated.View>

        <Animated.Text
          entering={FadeInDown.delay(150).duration(700)}
          style={styles.title}
        >
          ABOUT YOUR CARINDERIA!
        </Animated.Text>

        <Animated.View entering={FadeInDown.delay(300).duration(700)} style={styles.form}>
          <View style={styles.inputRow}>
            <Text style={styles.icon}>🏪</Text>
            <TextInput
              style={styles.input}
              placeholder="Carinderia Name"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputRow}>
            <Text style={styles.icon}>📍</Text>
            <TextInput
              style={styles.input}
              placeholder="Address"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputRow}>
            <Text style={styles.icon}>⚙️</Text>
            <TextInput
              style={styles.input}
              placeholder="Business Hours"
              placeholderTextColor="#999"
            />
          </View>

          <Animated.View style={animatedStyle}>
            <TouchableOpacity
              onPressIn={onPressIn}
              onPressOut={onPressOut}
              style={styles.setupButton}
              onPress={() => onNavigate('seller-main')}
            >
              <Text style={styles.setupButtonText}>Set it up now.</Text>
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
  imageBox: {
    width: '100%',
    maxWidth: 400,
    height: 200,
    backgroundColor: '#d1d5db',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  imagePlaceholder: {
    fontSize: 48,
    color: '#9ca3af',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
    textAlign: 'center',
  },
  form: {
    width: '100%',
    maxWidth: 400,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  icon: {
    fontSize: 20,
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  setupButton: {
    backgroundColor: '#d1d5db',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  setupButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default SellerSetup;
