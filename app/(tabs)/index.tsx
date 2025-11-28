// app/(tabs)/index.tsx
import BackButton from '@/components/BackButton';
import ChoiceScreen from '@/components/ChoiceScreen';
import CustomerLocation from '@/components/CustomerLocation';
import CustomerMain from '@/components/CustomerMain';
import CustomerRegister from '@/components/CustomerRegister';
import GetStartedScreen from '@/components/GetStartedScreen';
import HelpDesk from '@/components/HelpDesk';
import LoginScreen from '@/components/LoginScreen';
import ProfilePage from '@/components/ProfilePage';
import SellerMain from '@/components/SellerMain';
import SellerRegister from '@/components/SellerRegister';
import SellerSetup from '@/components/SellerSetup';
import VendorMenu from '@/components/VendorMenu';
import React, { useState } from 'react';
import { View } from 'react-native';

type ScreenName =
  | 'get-started'
  | 'login'
  | 'choice'
  | 'seller-choice'
  | 'seller-setup'
  | 'seller-main'
  | 'customer-choice'
  | 'customer-location'
  | 'customer-main'
  | 'vendor-menu'
  | 'helpdesk'
  | 'profile';

interface UserData {
  userName?: string;
  userId?: string;
  email?: string;
  userType?: 'seller' | 'customer';
  selectedVendor?: any;
}

const App = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenName>('get-started');
  const [history, setHistory] = useState<ScreenName[]>([]);
  const [userData, setUserData] = useState<UserData>({});

  const handleNavigate = (screen: string, params?: any) => {
    setHistory((prev) => [...prev, currentScreen]);
    setCurrentScreen(screen as ScreenName);
    
    if (params) {
      setUserData((prev) => ({ ...prev, ...params }));
    }
  };

  const handleBack = () => {
    if (history.length > 0) {
      const prev = history[history.length - 1];
      setHistory((prev) => prev.slice(0, -1));
      setCurrentScreen(prev);
    }
  };

  const screens: Record<ScreenName, React.ReactElement> = {
    'get-started': <GetStartedScreen onNavigate={handleNavigate} />,
    'login': <LoginScreen onNavigate={handleNavigate} />,
    'choice': <ChoiceScreen onNavigate={handleNavigate} />,
    'seller-choice': <SellerRegister onNavigate={handleNavigate} />,
    'seller-setup': <SellerSetup userName={userData.userName} onBack={handleBack} />,
    'seller-main': <SellerMain onNavigate={handleNavigate} />,
    'customer-choice': <CustomerRegister onNavigate={handleNavigate} />,
    'customer-location': <CustomerLocation onNavigate={handleNavigate} />,
    'customer-main': <CustomerMain onNavigate={handleNavigate} />,
    'vendor-menu': <VendorMenu onNavigate={handleNavigate} onBack={handleBack} vendor={userData.selectedVendor} />,
    'helpdesk': <HelpDesk onNavigate={handleNavigate} />,
    'profile': <ProfilePage onNavigate={handleNavigate} />
  };

  const showBackButton = currentScreen !== 'get-started';

  return (
    <View style={{ flex: 1 }}>
      {showBackButton && <BackButton onPress={handleBack} />}
      {screens[currentScreen]}
    </View>
  );
};

export default App;