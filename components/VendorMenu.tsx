// components/VendorMenu.tsx
import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

interface VendorMenuProps {
  onNavigate: (screen: string, params?: any) => void;
  onBack: () => void;
  vendor?: any;
}

const VendorMenu: React.FC<VendorMenuProps> = ({ onNavigate, onBack, vendor }) => {
  const viands = Array(6).fill('PAKBET');

  const handleViandPress = (viand: string) => {
    console.log('Selected viand:', viand);
  };

  if (!vendor) {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={{ color: '#000' }}>No vendor selected</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={onBack}
        >
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        <View style={styles.menuHeader}>
          <Text style={styles.menuTitle}>{vendor.name}</Text>
          <Text style={styles.menuSubtitle}>{vendor.address}</Text>
        </View>

        <Text style={styles.sectionTitle}>Available Viand</Text>

        <ScrollView style={styles.viandList}>
          {viands.map((viand, index) => (
            <TouchableOpacity
              key={index}
              style={styles.viandCard}
              onPress={() => handleViandPress(viand)}
            >
              <Text style={styles.viandName}>{viand}</Text>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7f1d1d',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    flex: 1,
    maxWidth: 500,
    alignSelf: 'center',
    width: '100%',
  },
  backButton: {
    marginBottom: 15,
  },
  backText: {
    fontSize: 16,
    color: '#7f1d1d',
    fontWeight: '600',
  },
  menuHeader: {
    marginBottom: 20,
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  menuSubtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  viandList: {
    flex: 1,
  },
  viandCard: {
    backgroundColor: '#f3f4f6',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viandName: {
    fontSize: 16,
    fontWeight: '600',
  },
  chevron: {
    fontSize: 24,
    color: '#6b7280',
  },
});

export default VendorMenu;