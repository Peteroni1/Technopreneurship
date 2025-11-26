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

interface Vendor {
  id: number;
  name: string;
  distance: string;
  address: string;
  rating?: number;
  specialty?: string;
}

interface CustomerMainProps {
  onNavigate: (screen: string, params?: any) => void;
}

const CustomerMain: React.FC<CustomerMainProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const vendorData: Vendor[] = [
    {
      id: 1,
      name: "Mama Rosa's Kitchen",
      distance: '250m away',
      address: 'Bangkal Av, Dugutun Rd',
      rating: 4.8,
      specialty: 'Traditional Filipino',
    },
    {
      id: 2,
      name: 'The Lasa Grill',
      distance: '180m away',
      address: 'San Pedro St, Downtown',
      rating: 4.6,
      specialty: 'Grilled Specialties',
    },
    {
      id: 3,
      name: 'Sarap Express',
      distance: '320m away',
      address: 'Catalunan Grande Ave',
      rating: 4.7,
      specialty: 'Quick Bites',
    },
    {
      id: 4,
      name: 'Aling Mercy Catering',
      distance: '420m away',
      address: 'Matina Aplaya, Coastal Rd',
      rating: 4.9,
      specialty: 'Catering & Bulk Orders',
    },
    {
      id: 5,
      name: 'Lola Tings Lutuhan',
      distance: '150m away',
      address: 'Ponciano St, Barangay 23-C',
      rating: 4.5,
      specialty: 'Home Cooked Meals',
    },
    {
      id: 6,
      name: 'Kain & Tikman',
      distance: '280m away',
      address: 'JP Laurel Ave, Poblacion',
      rating: 4.7,
      specialty: 'Mixed Filipino Dishes',
    },
  ];

  // Filter vendors based on search query
  const filteredVendors = vendorData.filter((vendor) =>
    vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vendor.specialty?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleVendorPress = (vendor: Vendor) => {
    onNavigate('vendor-menu', { selectedVendor: vendor });
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Search Container */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search vendors or cuisine..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>NEARBY VENDORS</Text>
            <Text style={styles.headerSubtitle}>Bangkal Av, Dugutun Rd</Text>
          </View>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>🍽️</Text>
          </View>
        </View>

        {/* Vendor List */}
        {filteredVendors.length > 0 ? (
          <ScrollView style={styles.vendorList} showsVerticalScrollIndicator={false}>
            {filteredVendors.map((vendor) => (
              <TouchableOpacity
                key={vendor.id}
                style={styles.vendorCard}
                onPress={() => handleVendorPress(vendor)}
              >
                {/* Vendor Image Placeholder */}
                <View style={styles.vendorImage} />

                {/* Vendor Info */}
                <View style={styles.vendorInfo}>
                  <View style={styles.nameRatingRow}>
                    <Text style={styles.vendorName}>{vendor.name}</Text>
                    {vendor.rating && (
                      <View style={styles.ratingBadge}>
                        <Text style={styles.ratingText}>⭐ {vendor.rating}</Text>
                      </View>
                    )}
                  </View>

                  {vendor.specialty && (
                    <Text style={styles.specialty}>{vendor.specialty}</Text>
                  )}

                  <Text style={styles.vendorDistance}>📍 {vendor.distance}</Text>
                </View>

                {/* Arrow Icon */}
                <Text style={styles.arrowIcon}>›</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        ) : (
          <View style={styles.noResultsContainer}>
            <Text style={styles.noResultsText}>No vendors found</Text>
            <Text style={styles.noResultsSubtext}>
              Try searching for a different vendor or cuisine
            </Text>
          </View>
        )}

        {/* Results Count */}
        {filteredVendors.length > 0 && (
          <View style={styles.resultsFooter}>
            <Text style={styles.resultsText}>
              Showing {filteredVendors.length} vendor{filteredVendors.length !== 1 ? 's' : ''}
            </Text>
          </View>
        )}
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
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: '#f3f4f6',
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
    color: '#000',
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
    color: '#000',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#6b7280',
  },
  logoContainer: {
    width: 50,
    height: 50,
    backgroundColor: '#f3f4f6',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 28,
  },
  vendorList: {
    flex: 1,
    marginBottom: 10,
  },
  vendorCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 0,
    marginBottom: 15,
    overflow: 'hidden',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#e5e5e5',
  },
  vendorImage: {
    width: 100,
    height: 100,
    backgroundColor: '#d1d5db',
    borderRadius: 12,
    marginRight: 0,
  },
  vendorInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  nameRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  vendorName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    flex: 1,
  },
  ratingBadge: {
    backgroundColor: '#fff9e6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginLeft: 8,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#f59e0b',
  },
  specialty: {
    fontSize: 12,
    color: '#7f1d1d',
    fontWeight: '500',
    marginBottom: 6,
  },
  vendorDistance: {
    fontSize: 13,
    color: '#6b7280',
    fontWeight: '500',
  },
  arrowIcon: {
    fontSize: 24,
    color: '#d1d5db',
    paddingHorizontal: 12,
    alignSelf: 'center',
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  noResultsText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  noResultsSubtext: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  resultsFooter: {
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
  },
  resultsText: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
});

export default CustomerMain;