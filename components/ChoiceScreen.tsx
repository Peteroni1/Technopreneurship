// components/ChoiceScreen.tsx
import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import BackButton from './BackButton';

interface ChoiceScreenProps {
  onNavigate: (screen: string) => void;
}

const ChoiceScreen: React.FC<ChoiceScreenProps> = ({ onNavigate }) => {
  return (
    <View style={styles.container}>
      <BackButton onPress={() => onNavigate('login')} />
      
      <Text style={styles.orText}>OR</Text>
      
      <View style={styles.choiceButtons}>
        <TouchableOpacity
          style={styles.choiceCard}
          onPress={() => onNavigate('seller-choice')}
        >
          <Text style={styles.choiceTitle}>
            Naa ba kay{'\n'}IBALIGYA,{'\n'}higala?
          </Text>
          <TouchableOpacity style={styles.getStartedButton}>
            <Text style={styles.getStartedText}>Get Started!</Text>
          </TouchableOpacity>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.choiceCard}
          onPress={() => onNavigate('customer-choice')}
        >
          <Text style={styles.choiceTitle}>
            Naa ba kay{'\n'}PALITON,{'\n'}higala?
          </Text>
          <TouchableOpacity style={styles.getStartedButton}>
            <Text style={styles.getStartedText}>Get Started!</Text>
          </TouchableOpacity>
        </TouchableOpacity>
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