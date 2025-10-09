// components/CustomerMain.tsx
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface CustomerMainProps {
  onNavigate: (screen: string, params?: any) => void;  // ← CHANGED: was 'navigation: any'
}

const CustomerMain: React.FC<CustomerMainProps> = ({ onNavigate }) => {  // ← CHANGED: was '{ navigation }'
  const [searchQuery, setSearchQuery] = useState('');

  const vendors = Array(5).fill(null).map((_, i) => ({
    id: i,
    name: 'Aling Vicky Eatery',
    distance: '100meters Away',
    address: 'Bangkal Av, Dugutun Rd',
  }));

  const handleVendorPress = (vendor: any) => {
    onNavigate('vendor-menu', { selectedVendor: vendor });  // ← CHANGED: was 'navigation.navigate('vendor-menu', { vendor })'
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>NEARBY</Text>
            <Text style={styles.headerSubtitle}>Bangkal Av, Dugutun Rd</Text>
          </View>
          <Text style={styles.logoText}>LOGO</Text>
        </View>

        <ScrollView style={styles.vendorList}>
          {vendors.map((vendor, index) => (
            <TouchableOpacity
              key={index}
              style={styles.vendorCard}
              onPress={() => handleVendorPress(vendor)}
            >
              <View style={styles.vendorImage} />
              <Text style={styles.vendorName}>{vendor.name}</Text>
              <Text style={styles.vendorDistance}>{vendor.distance}</Text>
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
  searchContainer: {
    marginBottom: 15,
  },
  searchInput: {
    backgroundColor: '#f3f4f6',
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#6b7280',
  },
  logoText: {
    fontSize: 12,
    color: '#6b7280',
  },
  vendorList: {
    flex: 1,
  },
  vendorCard: {
    backgroundColor: '#f3f4f6',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  vendorImage: {
    width: '100%',
    height: 100,
    backgroundColor: '#d1d5db',
    borderRadius: 8,
    marginBottom: 10,
  },
  vendorName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  vendorDistance: {
    fontSize: 14,
    color: '#6b7280',
  },
});

export default CustomerMain;