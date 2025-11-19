// components/VendorMenu.tsx
import React, { useState } from 'react';
import {
  Modal,
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

interface ViandItem {
  name: string;
  price: number;
  description: string;
}

const VendorMenu: React.FC<VendorMenuProps> = ({ onNavigate, onBack, vendor }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedViand, setSelectedViand] = useState<ViandItem | null>(null);
  const [quantity, setQuantity] = useState(1);

  // Sample viand data - you can customize this or fetch from your backend
  const viands: ViandItem[] = [
    { name: 'PAKBET', price: 50, description: 'Fresh mixed vegetables with shrimp paste' },
    { name: 'PAKBET', price: 50, description: 'Fresh mixed vegetables with shrimp paste' },
    { name: 'PAKBET', price: 50, description: 'Fresh mixed vegetables with shrimp paste' },
    { name: 'PAKBET', price: 50, description: 'Fresh mixed vegetables with shrimp paste' },
    { name: 'PAKBET', price: 50, description: 'Fresh mixed vegetables with shrimp paste' },
    { name: 'PAKBET', price: 50, description: 'Fresh mixed vegetables with shrimp paste' },
  ];

  const handleViandPress = (viand: ViandItem) => {
    setSelectedViand(viand);
    setQuantity(1);
    setModalVisible(true);
  };

  const handlePlaceOrder = () => {
    // Add your order logic here
    console.log(`Ordered ${quantity} x ${selectedViand?.name}`);
    alert(`Order Placed!\n${quantity} x ${selectedViand?.name}\nTotal: ₱${((selectedViand?.price || 0) * quantity).toFixed(2)}`);
    setModalVisible(false);
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
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
              <Text style={styles.viandName}>{viand.name}</Text>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Order Modal Popup */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Close Button */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>

            {/* Viand Image Placeholder */}
            <View style={styles.viandImageLarge} />

            {/* Viand Details */}
            <Text style={styles.modalTitle}>{selectedViand?.name}</Text>
            <Text style={styles.modalSubtitle}>Available Now</Text>

            {/* Price */}
            <Text style={styles.priceText}>₱{selectedViand?.price.toFixed(2)}</Text>

            {/* Description */}
            <Text style={styles.descriptionText}>
              {selectedViand?.description}
            </Text>

            {/* Quantity Selector */}
            <View style={styles.quantityContainer}>
              <Text style={styles.quantityLabel}>Quantity:</Text>
              <View style={styles.quantityControls}>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={decrementQuantity}
                >
                  <Text style={styles.quantityButtonText}>−</Text>
                </TouchableOpacity>
                <Text style={styles.quantityValue}>{quantity}</Text>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={incrementQuantity}
                >
                  <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Total */}
            <View style={styles.totalContainer}>
              <Text style={styles.totalLabel}>Total:</Text>
              <Text style={styles.totalValue}>
                ₱{((selectedViand?.price || 0) * quantity).toFixed(2)}
              </Text>
            </View>

            {/* Place Order Button */}
            <TouchableOpacity
              style={styles.placeOrderButton}
              onPress={handlePlaceOrder}
            >
              <Text style={styles.placeOrderText}>Place Order</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    width: '100%',
    maxWidth: 400,
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 1,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 24,
    color: '#666',
    fontWeight: 'bold',
  },
  viandImageLarge: {
    width: '100%',
    height: 180,
    backgroundColor: '#d1d5db',
    borderRadius: 15,
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#28a745',
    marginBottom: 15,
  },
  priceText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#7f1d1d',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 20,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingVertical: 10,
  },
  quantityLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 40,
    height: 40,
    backgroundColor: '#f3f4f6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  quantityValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 20,
    minWidth: 30,
    textAlign: 'center',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
  },
  totalValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#7f1d1d',
  },
  placeOrderButton: {
    backgroundColor: '#7f1d1d',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  placeOrderText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default VendorMenu;