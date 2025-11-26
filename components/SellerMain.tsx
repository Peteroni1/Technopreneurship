// components/SellerMain.tsx
import React, { useState } from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

interface SellerMainProps {
  onNavigate: (screen: string) => void;
}

interface PendingOrder {
  id: string;
  customerName: string;
  food: string;
  quantity: number;
  price: number;
  time: string;
}

const SellerMain: React.FC<SellerMainProps> = ({ onNavigate }) => {
  const addScale = useSharedValue(1);
  const confirmScale = useSharedValue(1);
  const [showPendingOrders, setShowPendingOrders] = useState(false);

  // Sample pending orders data
  const [pendingOrders] = useState<PendingOrder[]>([
    { id: '1', customerName: 'Maria Santos', food: 'Adobo', quantity: 2, price: 250, time: '2:30 PM' },
    { id: '2', customerName: 'Juan Dela Cruz', food: 'Sinigang', quantity: 1, price: 200, time: '2:45 PM' },
    { id: '3', customerName: 'Rosa Garcia', food: 'Lumpia', quantity: 5, price: 150, time: '3:00 PM' },
  ]);

  const makeBounce = (scale: any) => ({
    onPressIn: () => (scale.value = withSpring(0.9)),
    onPressOut: () => (scale.value = withSpring(1)),
    style: useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
    })),
  });

  const addButton = makeBounce(addScale);
  const confirmButton = makeBounce(confirmScale);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topBar}>
        <Animated.View style={addButton.style}>
          <TouchableOpacity
            onPressIn={addButton.onPressIn}
            onPressOut={addButton.onPressOut}
            style={styles.pendingOrdersButton}
            onPress={() => setShowPendingOrders(true)}
          >
            <Text style={styles.pendingOrdersButtonText}>📋 Pending Orders</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={confirmButton.style}>
          <TouchableOpacity
            onPressIn={confirmButton.onPressIn}
            onPressOut={confirmButton.onPressOut}
            style={styles.addFoodButton}
          >
            <Text style={styles.addFoodButtonText}>+ Add Food</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>

      <View style={styles.contentRow}>
        {/* Gallery Section */}
        <Animated.View entering={FadeInDown.duration(700)} style={styles.card}>
          <Text style={styles.greeting}>Hello, Aling Vicky</Text>

          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>Nothing to see here</Text>

            <Animated.View style={addButton.style}>
              <TouchableOpacity
                onPressIn={addButton.onPressIn}
                onPressOut={addButton.onPressOut}
                style={styles.addButton}
              >
                <Text style={styles.addButtonText}>+</Text>
              </TouchableOpacity>
            </Animated.View>

            <Text style={styles.emptySubtext}>
              Add photo available in your Eatery
            </Text>
          </View>
        </Animated.View>

        {/* Add Food Section */}
        <Animated.View entering={FadeInDown.delay(200).duration(700)} style={styles.card}>
          <Text style={styles.cardTitle}>Add a Food</Text>

          <View style={styles.form}>
            <TextInput
              style={[styles.input, styles.inputHighlight]}
              placeholder="Food Name"
              placeholderTextColor="#999"
            />

            <TextInput
              style={styles.input}
              placeholder="Price"
              placeholderTextColor="#999"
              keyboardType="numeric"
            />

            <View style={styles.input}>
              <Text style={styles.pickerText}>Attach Photo</Text>
            </View>

            <Animated.View style={confirmButton.style}>
              <TouchableOpacity
                onPressIn={confirmButton.onPressIn}
                onPressOut={confirmButton.onPressOut}
                style={styles.confirmButton}
              >
                <Text style={styles.confirmButtonText}>Confirm</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </Animated.View>
      </View>

      {/* Pending Orders Modal */}
      <Modal
        visible={showPendingOrders}
        transparent
        animationType="slide"
        onRequestClose={() => setShowPendingOrders(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Pending Orders</Text>
              <TouchableOpacity onPress={() => setShowPendingOrders(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.ordersList}>
              {pendingOrders.map((order) => (
                <View key={order.id} style={styles.orderCard}>
                  <View style={styles.orderHeader}>
                    <Text style={styles.customerName}>{order.customerName}</Text>
                    <Text style={styles.orderTime}>{order.time}</Text>
                  </View>

                  <View style={styles.orderDetails}>
                    <Text style={styles.foodName}>{order.food}</Text>
                    <Text style={styles.quantity}>Qty: {order.quantity}</Text>
                  </View>

                  <View style={styles.orderFooter}>
                    <Text style={styles.price}>₱{order.price}</Text>
                    <View style={styles.actionButtons}>
                      <TouchableOpacity style={styles.rejectButton}>
                        <Text style={styles.buttonText}>Reject</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.acceptButton}>
                        <Text style={styles.buttonText}>Accept</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#7f1d1d' },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    gap: 10,
  },
  pendingOrdersButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pendingOrdersButtonText: { fontSize: 14, fontWeight: 'bold', color: '#7f1d1d' },
  addFoodButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addFoodButtonText: { fontSize: 14, fontWeight: 'bold', color: '#7f1d1d' },
  contentRow: {
    flexDirection: 'row',
    padding: 20,
    gap: 20,
    flexWrap: 'wrap',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    flex: 1,
    minWidth: 300,
  },
  greeting: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  cardTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 30 },
  emptyState: { alignItems: 'center', marginTop: 60 },
  emptyText: { fontSize: 16, color: '#6b7280', marginBottom: 20 },
  addButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#d1d5db',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: { fontSize: 40, color: '#6b7280' },
  emptySubtext: { fontSize: 14, color: '#6b7280', textAlign: 'center' },
  form: { width: '100%' },
  input: {
    backgroundColor: '#f3f4f6',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  inputHighlight: { borderWidth: 2, borderColor: '#60a5fa' },
  pickerText: { color: '#999', fontSize: 16 },
  confirmButton: {
    backgroundColor: '#d1d5db',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  confirmButtonText: { fontSize: 16, fontWeight: 'bold', color: '#000' },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingBottom: 15,
  },
  modalTitle: { fontSize: 22, fontWeight: 'bold', color: '#000' },
  closeButton: { fontSize: 24, color: '#6b7280' },
  ordersList: { maxHeight: '80%' },
  orderCard: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#7f1d1d',
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  customerName: { fontSize: 16, fontWeight: 'bold', color: '#000' },
  orderTime: { fontSize: 12, color: '#9ca3af' },
  orderDetails: { marginBottom: 10 },
  foodName: { fontSize: 14, color: '#374151', marginBottom: 5 },
  quantity: { fontSize: 12, color: '#6b7280' },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: { fontSize: 16, fontWeight: 'bold', color: '#7f1d1d' },
  actionButtons: { flexDirection: 'row', gap: 10 },
  rejectButton: {
    backgroundColor: '#fee2e2',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 6,
  },
  acceptButton: {
    backgroundColor: '#dcfce7',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 6,
  },
  buttonText: { fontSize: 12, fontWeight: 'bold', color: '#000' },
});

export default SellerMain;