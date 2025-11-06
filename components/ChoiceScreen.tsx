// components/ChoiceScreen.tsx
import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
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
import BackButton from './BackButton';

interface ChoiceScreenProps {
  onNavigate: (screen: string) => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const ChoiceScreen: React.FC<ChoiceScreenProps> = ({ onNavigate }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const fade = useSharedValue(0);
  const buttonScale1 = useSharedValue(1);
  const buttonScale2 = useSharedValue(1);

  useEffect(() => {
    fade.value = withTiming(1, { duration: 800, easing: Easing.out(Easing.exp) });
  }, []);

  const containerStyle = useAnimatedStyle(() => ({
    opacity: fade.value,
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

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / SCREEN_WIDTH);
    setActiveIndex(index);
  };

  const scrollToIndex = (index: number) => {
    scrollViewRef.current?.scrollTo({
      x: index * SCREEN_WIDTH,
      animated: true,
    });
  };

  return (
    <ImageBackground 
      source={require('@/assets/images/HM-BG2.png')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <View style={styles.container}>
        <BackButton onPress={() => onNavigate('get-started')} />

        <Animated.View style={[styles.content, containerStyle]}>
          <Animated.Text 
            entering={FadeInDown.delay(100).duration(800)}
            style={styles.headerTitle}
          >
            CHOOSE YOUR PATH!
          </Animated.Text>
          <Animated.Text 
            entering={FadeInDown.delay(200).duration(800)}
            style={styles.headerSubtitle}
          >
            Swipe to explore your options:
          </Animated.Text>

          <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Seller Card */}
            <Animated.View
              entering={FadeInDown.delay(300).duration(800)}
              style={styles.cardWrapper}
            >
              <View style={styles.choiceCard}>
                <View style={styles.iconContainer}>
                  <Text style={styles.iconEmoji}>🛒</Text>
                </View>
                <Text style={styles.choiceTitle}>
                  Naa ba kay{'\n'}IBALIGYA,{'\n'}higala?
                </Text>
                <Text style={styles.choiceDescription}>
                  Start selling your products and reach more customers.
                </Text>
                <Animated.View style={button1AnimatedStyle}>
                  <TouchableOpacity 
                    style={styles.getStartedButton}
                    onPress={() => onNavigate('seller-choice')}
                    onPressIn={handlePressIn1}
                    onPressOut={handlePressOut1}
                    activeOpacity={0.9}
                  >
                    <Text style={styles.getStartedText}>CONFIRM</Text>
                  </TouchableOpacity>
                </Animated.View>
              </View>
            </Animated.View>

            {/* Buyer Card */}
            <Animated.View 
              entering={FadeInDown.delay(300).duration(800)}
              style={styles.cardWrapper}
            >
              <View style={styles.choiceCard}>
                <View style={styles.iconContainer}>
                  <Text style={styles.iconEmoji}>🛍️</Text>
                </View>
                <Text style={styles.choiceTitle}>
                  Naa ba kay{'\n'}PALITON,{'\n'}higala?
                </Text>
                <Text style={styles.choiceDescription}>
                  Discover great deals and fresh products near you.
                </Text>
                <Animated.View style={button2AnimatedStyle}>
                  <TouchableOpacity 
                    style={styles.getStartedButton}
                    onPress={() => onNavigate('customer-choice')}
                    onPressIn={handlePressIn2}
                    onPressOut={handlePressOut2}
                    activeOpacity={0.9}
                  >
                    <Text style={styles.getStartedText}>CONFIRM</Text>
                  </TouchableOpacity>
                </Animated.View>
              </View>
            </Animated.View>
          </ScrollView>

          {/* Page Indicators */}
          <Animated.View 
            entering={FadeInDown.delay(400).duration(800)}
            style={styles.indicatorContainer}
          >
            {[0, 1].map((index) => (
              <TouchableOpacity
                key={index}
                onPress={() => scrollToIndex(index)}
                style={[
                  styles.indicator,
                  activeIndex === index && styles.indicatorActive,
                ]}
              />
            ))}
          </Animated.View>
        </Animated.View>
      </View>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 80,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 6,
    letterSpacing: 1.5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#f3f4f6',
    textAlign: 'center',
    marginBottom: 40,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  scrollView: {
    flexGrow: 0,
  },
  scrollContent: {
    alignItems: 'center',
  },
  cardWrapper: {
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  choiceCard: {
    backgroundColor: 'rgba(127, 29, 29, 0.7)',
    padding: 40,
    borderRadius: 30,
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 12,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconEmoji: {
    fontSize: 40,
  },
  choiceTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: '#ffffff',
    lineHeight: 36,
  },
  choiceDescription: {
    fontSize: 14,
    textAlign: 'center',
    color: '#f3f4f6',
    marginBottom: 30,
    lineHeight: 20,
    paddingHorizontal: 10,
  },
  getStartedButton: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  getStartedText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#7f1d1d',
    letterSpacing: 0.5,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    gap: 10,
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  indicatorActive: {
    width: 30,
    backgroundColor: '#fff',
  },
});

export default ChoiceScreen;