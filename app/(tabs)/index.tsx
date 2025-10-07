// app/(tabs)/index.tsx
import BackButton from '@/components/BackButton';
import ChoiceScreen from '@/components/ChoiceScreen';
import CustomerLocation from '@/components/CustomerLocation';
import CustomerMain from '@/components/CustomerMain';
import CustomerRegister from '@/components/CustomerRegister';
import LoginScreen from '@/components/LoginScreen';
import SellerMain from '@/components/SellerMain';
import SellerRegister from '@/components/SellerRegister';
import SellerSetup from '@/components/SellerSetup';
import React, { useState } from 'react';
import { View } from 'react-native';

type ScreenName =
  | 'login'
  | 'choice'
  | 'seller-choice'
  | 'seller-setup'
  | 'seller-main'
  | 'customer-choice'
  | 'customer-location'
  | 'customer-main';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenName>('login');
  const [history, setHistory] = useState<ScreenName[]>([]);

  const handleNavigate = (screen: string) => {
    setHistory((prev) => [...prev, currentScreen]);
    setCurrentScreen(screen as ScreenName);
  };

  const handleBack = () => {
    if (history.length > 0) {
      const prev = history[history.length - 1];
      setHistory((prev) => prev.slice(0, -1));
      setCurrentScreen(prev);
    }
  };

  const screens: Record<ScreenName, React.ReactElement> = {
    'login': <LoginScreen onNavigate={handleNavigate} />,
    'choice': <ChoiceScreen onNavigate={handleNavigate} />,
    'seller-choice': <SellerRegister onNavigate={handleNavigate} />,
    'seller-setup': <SellerSetup onNavigate={handleNavigate} />,
    'seller-main': <SellerMain onNavigate={handleNavigate} />,
    'customer-choice': <CustomerRegister onNavigate={handleNavigate} />,
    'customer-location': <CustomerLocation onNavigate={handleNavigate} />,
    'customer-main': <CustomerMain />
  };

  const showBackButton = currentScreen !== 'login';

  return (
    <View style={{ flex: 1 }}>
      {showBackButton && <BackButton onPress={handleBack} />}
      {screens[currentScreen]}
    </View>
  );
};

export default App;
