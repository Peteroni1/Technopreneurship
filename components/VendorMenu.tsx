// components/VendorMenu.tsx
import React, { useEffect, useState } from 'react';
import {
  Animated,
  Image,
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
  originalPrice?: number;
  discount?: number;
  description: string;
  expiresIn?: number;
  availability?: string;
  image: any;
}

const VendorMenu: React.FC<VendorMenuProps> = ({ onNavigate, onBack, vendor }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [selectedViand, setSelectedViand] = useState<ViandItem | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [timeLeft, setTimeLeft] = useState<string>('');
  const [paymentMode, setPaymentMode] = useState<string>('Cash');
  const [deliveryMode, setDeliveryMode] = useState<string>('Pickup');
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [scaleAnim] = useState(new Animated.Value(0));

  const viands: ViandItem[] = [
    {
      name: 'PAKBET',
      price: 45,
      originalPrice: 50,
      discount: 10,
      description: 'Fresh mixed vegetables with shrimp paste',
      expiresIn: 1.5,
      availability: 'Only 3 left!',
      image: require('../assets/images/V1.png'),
    },
    {
      name: 'Humba',
      price: 45,
      originalPrice: 50,
      discount: 10,
      description: 'Tender pork stewed in soy sauce',
      expiresIn: 2,
      availability: 'Only 5 left!',
      image: require('../assets/images/V2.jpg'),
    },
    {
      name: 'Isda',
      price: 50,
      originalPrice: 60,
      discount: 17,
      description: 'Fresh grilled fish',
      expiresIn: 1.2,
      availability: 'Limited stocks',
      image: require('../assets/images/V3.jpg'),
    },
    {
      name: 'Ginataang Sawa',
      price: 55,
      originalPrice: 65,
      discount: 15,
      description: 'Snake in coconut milk',
      expiresIn: 2.5,
      image: require('../assets/images/V4.jpg'),
    },
    {
      name: 'Lechon',
      price: 120,
      originalPrice: 150,
      discount: 20,
      description: 'Roasted whole pig',
      expiresIn: 3,
      availability: 'Only 1 left!',
      image: require('../assets/images/V5.jpg'),
    },
    {
      name: 'Giniling',
      price: 40,
      originalPrice: 50,
      discount: 20,
      description: 'Ground meat with vegetables',
      expiresIn: 1.8,
      image: require('../assets/images/V6.jpg'),
    },
  ];

  const paymentModes = ['Cash', 'GCash', 'Credit Card', 'Debit Card'];
  const deliveryModes = ['Pickup', 'Delivery'];

  useEffect(() => {
    if (selectedViand && modalVisible) {
      const hours = selectedViand.expiresIn || 0;
      setTimeLeft(`Expires in ${Math.floor(hours)}h ${Math.floor((hours % 1) * 60)}m`);

      const interval = setInterval(() => {
        setTimeLeft(`Expires in ${Math.floor(hours)}h ${Math.floor((hours % 1) * 60)}m`);
      }, 60000);

      return () => clearInterval(interval);
    }
  }, [selectedViand, modalVisible]);

  useEffect(() => {
    if (confirmationVisible) {
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }).start();
    } else {
      scaleAnim.setValue(0);
    }
  }, [confirmationVisible]);

  const handleViandPress = (viand: ViandItem) => {
    setSelectedViand(viand);
    setQuantity(1);
    setPaymentMode('Cash');
    setDeliveryMode('Pickup');
    setModalVisible(true);
  };

  const handlePlaceOrder = () => {
    const total = ((selectedViand?.price || 0) * quantity).toFixed(2);
    const details = {
      viandName: selectedViand?.name,
      quantity: quantity,
      total: total,
      payment: paymentMode,
      delivery: deliveryMode,
      vendor: vendor.name,
      image: selectedViand?.image,
    };
    
    setOrderDetails(details);
    setModalVisible(false);
    
    // Small delay for smooth transition
    setTimeout(() => {
      setConfirmationVisible(true);
    }, 300);
  };

  const handleConfirmationClose = () => {
    setConfirmationVisible(false);
    setOrderDetails(null);
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
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        <View style={styles.menuHeader}>
          <Text style={styles.menuTitle}>{vendor.name}</Text>
          <Text style={styles.menuSubtitle}>{vendor.address}</Text>
        </View>

        <Text style={styles.sectionTitle}>Available Viands</Text>

        <ScrollView style={styles.viandList}>
          {viands.map((viand, index) => (
            <TouchableOpacity
              key={index}
              style={styles.viandCard}
              onPress={() => handleViandPress(viand)}
            >
              {viand.expiresIn && (
                <View style={styles.expirationBadge}>
                  <Text style={styles.expirationText}>
                    ⏱ Expires in {Math.floor(viand.expiresIn)}h
                  </Text>
                </View>
              )}

              <Image 
                source={viand.image} 
                style={styles.viandImage}
                resizeMode="cover"
              />

              <View style={styles.viandContent}>
                <Text style={styles.viandName}>{viand.name}</Text>
                <Text style={styles.viandLocation}>Aling Vicky Eatery · 100m away</Text>

                <View style={styles.priceSection}>
                  <Text style={styles.currentPrice}>₱{viand.price.toFixed(2)}</Text>
                  {viand.originalPrice && (
                    <>
                      <Text style={styles.originalPrice}>₱{viand.originalPrice.toFixed(2)}</Text>
                      <View style={styles.discountBadge}>
                        <Text style={styles.discountText}>{viand.discount}% OFF</Text>
                      </View>
                    </>
                  )}
                </View>

                {viand.availability && (
                  <Text style={styles.availability}>{viand.availability}</Text>
                )}

                <View style={styles.dotsContainer}>
                  {[0, 1, 2, 3, 4].map((dot) => (
                    <View
                      key={dot}
                      style={[
                        styles.dot,
                        dot < 2 ? styles.dotActive : styles.dotInactive,
                      ]}
                    />
                  ))}
                </View>
              </View>

              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Order Details Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <ScrollView 
              contentContainerStyle={styles.modalScrollContent}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.modalContent}>
                {selectedViand?.expiresIn && (
                  <View style={styles.modalExpirationBadge}>
                    <Text style={styles.modalExpirationText}>
                      ⏱ Expires in {Math.floor(selectedViand.expiresIn)}h
                    </Text>
                  </View>
                )}

                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.closeButtonText}>✕</Text>
                </TouchableOpacity>

                {selectedViand?.image && (
                  <Image 
                    source={selectedViand.image} 
                    style={styles.viandImageLarge}
                    resizeMode="cover"
                  />
                )}

                <Text style={styles.modalTitle}>{selectedViand?.name}</Text>
                <Text style={styles.modalLocation}>
                  Aling Vicky Eatery · 100m away
                </Text>

                <View style={styles.modalPriceSection}>
                  <Text style={styles.modalCurrentPrice}>
                    ₱{selectedViand?.price.toFixed(2)}
                  </Text>
                  {selectedViand?.originalPrice && (
                    <>
                      <Text style={styles.modalOriginalPrice}>
                        ₱{selectedViand.originalPrice.toFixed(2)}
                      </Text>
                      <View style={styles.modalDiscountBadge}>
                        <Text style={styles.modalDiscountText}>
                          {selectedViand.discount}% OFF
                        </Text>
                      </View>
                    </>
                  )}
                </View>

                <Text style={styles.descriptionText}>
                  {selectedViand?.description}
                </Text>

                {selectedViand?.availability && (
                  <Text style={styles.availabilityWarning}>
                    🔴 {selectedViand.availability}
                  </Text>
                )}

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

                <View style={styles.modeContainer}>
                  <Text style={styles.modeLabel}>Mode of Payment:</Text>
                  <View style={styles.modeOptions}>
                    {paymentModes.map((mode) => (
                      <TouchableOpacity
                        key={mode}
                        style={[
                          styles.modeButton,
                          paymentMode === mode && styles.modeButtonActive,
                        ]}
                        onPress={() => setPaymentMode(mode)}
                      >
                        <Text
                          style={[
                            styles.modeButtonText,
                            paymentMode === mode && styles.modeButtonTextActive,
                          ]}
                        >
                          {mode}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <View style={styles.modeContainer}>
                  <Text style={styles.modeLabel}>Mode of Delivery:</Text>
                  <View style={styles.modeOptions}>
                    {deliveryModes.map((mode) => (
                      <TouchableOpacity
                        key={mode}
                        style={[
                          styles.modeButton,
                          deliveryMode === mode && styles.modeButtonActive,
                        ]}
                        onPress={() => setDeliveryMode(mode)}
                      >
                        <Text
                          style={[
                            styles.modeButtonText,
                            deliveryMode === mode && styles.modeButtonTextActive,
                          ]}
                        >
                          {mode}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <View style={styles.totalContainer}>
                  <Text style={styles.totalLabel}>Total:</Text>
                  <Text style={styles.totalValue}>
                    ₱{((selectedViand?.price || 0) * quantity).toFixed(2)}
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.quickOrderButton}
                  onPress={handlePlaceOrder}
                >
                  <Text style={styles.quickOrderText}>Quick Order Now</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Order Confirmation Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={confirmationVisible}
        onRequestClose={handleConfirmationClose}
      >
        <View style={styles.confirmationOverlay}>
          <Animated.View 
            style={[
              styles.confirmationContainer,
              {
                transform: [{ scale: scaleAnim }],
              },
            ]}
          >
            {/* Success Icon */}
            <View style={styles.successIconContainer}>
              <View style={styles.successIcon}>
                <Text style={styles.successCheckmark}>✓</Text>
              </View>
            </View>

            {/* Order Success Title */}
            <Text style={styles.confirmationTitle}>Order Placed Successfully!</Text>
            <Text style={styles.confirmationSubtitle}>
              Your order has been confirmed.
            </Text>

            {/* Order Summary Card */}
            <View style={styles.summaryCard}>
              {orderDetails?.image && (
                <Image 
                  source={orderDetails.image} 
                  style={styles.confirmationImage}
                  resizeMode="cover"
                />
              )}
              
              <View style={styles.summaryDetails}>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Item:</Text>
                  <Text style={styles.summaryValue}>{orderDetails?.viandName}</Text>
                </View>

                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Quantity:</Text>
                  <Text style={styles.summaryValue}>{orderDetails?.quantity}x</Text>
                </View>

                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Vendor:</Text>
                  <Text style={styles.summaryValue}>{orderDetails?.vendor}</Text>
                </View>

                <View style={styles.summaryDivider} />

                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Payment:</Text>
                  <Text style={styles.summaryValue}>{orderDetails?.payment}</Text>
                </View>

                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Delivery:</Text>
                  <Text style={styles.summaryValue}>{orderDetails?.delivery}</Text>
                </View>

                <View style={styles.summaryDivider} />

                <View style={styles.summaryRow}>
                  <Text style={styles.totalLabelConfirmation}>Total Amount:</Text>
                  <Text style={styles.totalValueConfirmation}>₱{orderDetails?.total}</Text>
                </View>
              </View>
            </View>

            {/* Estimated Time */}
            <View style={styles.estimatedTimeContainer}>
              <Text style={styles.estimatedTimeIcon}>🕐</Text>
              <View>
                <Text style={styles.estimatedTimeLabel}>Estimated Preparation Time</Text>
                <Text style={styles.estimatedTimeValue}>15-20 minutes</Text>
              </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.confirmationButtons}>
              <TouchableOpacity
                style={styles.trackOrderButton}
                onPress={() => {
                  handleConfirmationClose();
                  // Add navigation to track order screen if you have one
                }}
              >
                <Text style={styles.trackOrderText}>Track Order</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.doneButton}
                onPress={handleConfirmationClose}
              >
                <Text style={styles.doneButtonText}>Done</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
    color: '#c41e3a',
    fontWeight: '600',
  },
  menuHeader: {
    marginBottom: 20,
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000',
  },
  menuSubtitle: {
    fontSize: 14,
    color: '#999',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#000',
  },
  viandList: {
    flex: 1,
  },
  viandCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    position: 'relative',
  },
  expirationBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#c41e3a',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    zIndex: 10,
  },
  expirationText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  viandImage: {
    width: '100%',
    height: 140,
  },
  viandContent: {
    padding: 15,
  },
  viandName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: 4,
  },
  viandLocation: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
  },
  priceSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  currentPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00b050',
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 14,
    color: '#999',
    textDecorationLine: 'line-through',
    marginRight: 8,
  },
  discountBadge: {
    backgroundColor: '#00b050',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  discountText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
  },
  availability: {
    fontSize: 12,
    color: '#c41e3a',
    fontWeight: '600',
    marginBottom: 8,
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 5,
  },
  dotActive: {
    backgroundColor: '#c41e3a',
  },
  dotInactive: {
    backgroundColor: '#d8d8d8',
  },
  chevron: {
    position: 'absolute',
    right: 15,
    top: '50%',
    marginTop: -12,
    fontSize: 24,
    color: '#ccc',
  },

  // Order Details Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
    width: '100%',
  },
  modalScrollContent: {
    padding: 20,
  },
  modalContent: {
    width: '100%',
    position: 'relative',
  },
  modalExpirationBadge: {
    position: 'absolute',
    top: 15,
    left: 15,
    backgroundColor: '#c41e3a',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    zIndex: 10,
  },
  modalExpirationText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
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
    height: 200,
    borderRadius: 15,
    marginBottom: 20,
    marginTop: 10,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000',
  },
  modalLocation: {
    fontSize: 13,
    color: '#666',
    marginBottom: 12,
  },
  modalPriceSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalCurrentPrice: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00b050',
    marginRight: 8,
  },
  modalOriginalPrice: {
    fontSize: 16,
    color: '#999',
    textDecorationLine: 'line-through',
    marginRight: 8,
  },
  modalDiscountBadge: {
    backgroundColor: '#00b050',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
  },
  modalDiscountText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  descriptionText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  availabilityWarning: {
    fontSize: 12,
    color: '#c41e3a',
    fontWeight: '600',
    marginBottom: 15,
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
    color: '#000',
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
    color: '#000',
  },
  modeContainer: {
    marginBottom: 20,
  },
  modeLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 10,
  },
  modeOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  modeButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  modeButtonActive: {
    borderColor: '#c41e3a',
    backgroundColor: '#c41e3a',
  },
  modeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  modeButtonTextActive: {
    color: '#fff',
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
    color: '#000',
  },
  totalValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00b050',
  },
  quickOrderButton: {
    backgroundColor: '#c41e3a',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  quickOrderText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  // Order Confirmation Modal Styles
  confirmationOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  confirmationContainer: {
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 30,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  successIconContainer: {
    marginBottom: 20,
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#00b050',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#00b050',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  successCheckmark: {
    fontSize: 48,
    color: '#fff',
    fontWeight: 'bold',
  },
  confirmationTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
    textAlign: 'center',
  },
  confirmationSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 25,
    textAlign: 'center',
  },
  summaryCard: {
    width: '100%',
    backgroundColor: '#f9f9f9',
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 20,
  },
  confirmationImage: {
    width: '100%',
    height: 120,
  },
  summaryDetails: {
    padding: 15,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: 14,
    color: '#000',
    fontWeight: '600',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 8,
  },
  totalLabelConfirmation: {
    fontSize: 16,
    color: '#000',
    fontWeight: '700',
  },
  totalValueConfirmation: {
    fontSize: 20,
    color: '#00b050',
    fontWeight: 'bold',
  },
  estimatedTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff3cd',
    padding: 15,
    borderRadius: 12,
    width: '100%',
    marginBottom: 20,
  },
  estimatedTimeIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  estimatedTimeLabel: {
    fontSize: 12,
    color: '#856404',
    fontWeight: '500',
  },
  estimatedTimeValue: {
    fontSize: 16,
    color: '#856404',
    fontWeight: 'bold',
  },
  confirmationButtons: {
    width: '100%',
    gap: 12,
  },
  trackOrderButton: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#c41e3a',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
  },
  trackOrderText: {
    color: '#c41e3a',
    fontSize: 16,
    fontWeight: 'bold',
  },
  doneButton: {
    backgroundColor: '#c41e3a',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
  },
  doneButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default VendorMenu;