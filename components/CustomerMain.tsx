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

const CustomerMain: React.FC = () => {
  const [selectedVendor, setSelectedVendor] = useState(0);

  const vendors = Array(5).fill({
    name: 'Aling Vicky Eatery',
    distance: '100meters Away',
  });

  const viands = Array(6).fill('PAKBET');

  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentRow}>
        {/* Nearby List */}
        <View style={styles.card}>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.header}>
            <View>
              <Text style={styles.headerTitle}>NEARBY</Text>
              <Text style={styles.headerSubtitle}>
                Bangkal Av, Dugutun Rd
              </Text>
            </View>
            <Text style={styles.logoText}>LOGO</Text>
          </View>

          <ScrollView style={styles.vendorList}>
            {vendors.map((vendor, index) => (
              <TouchableOpacity
                key={index}
                style={styles.vendorCard}
                onPress={() => setSelectedVendor(index)}
              >
                <View style={styles.vendorImage} />
                <Text style={styles.vendorName}>{vendor.name}</Text>
                <Text style={styles.vendorDistance}>{vendor.distance}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Menu View */}
        <View style={styles.card}>
          <View style={styles.menuHeader}>
            <Text style={styles.menuTitle}>Aling Vicky Eatery</Text>
            <Text style={styles.menuSubtitle}>Bangkal Av, Dugutun Rd</Text>
          </View>

          <Text style={styles.sectionTitle}>Available Viand</Text>

          <ScrollView style={styles.viandList}>
            {viands.map((viand, index) => (
              <View key={index} style={styles.viandCard}>
                <Text style={styles.viandName}>{viand}</Text>
                <Text style={styles.chevron}>›</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7f1d1d',
  },
  contentRow: {
    flexDirection: 'row',
    padding: 20,
    gap: 20,
    flexWrap: 'wrap',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    flex: 1,
    minWidth: 300,
    maxHeight: 700,
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

export default CustomerMain;