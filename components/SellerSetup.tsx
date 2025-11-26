import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

interface Food {
  id: number;
  name: string;
  price: string;
  photo?: string;
}

interface Order {
  id: number;
  customerName: string;
  items: { name: string; quantity: number; price: string }[];
  totalAmount: number;
  status: 'pending' | 'preparing' | 'ready' | 'completed';
  timestamp: Date;
}

interface SellerMainProps {
  userName?: string;
  onBack?: () => void;
}

const SellerMain = ({ userName = 'Aling Vicky', onBack }: SellerMainProps) => {
  const [showAddFoodModal, setShowAddFoodModal] = useState(false);
  const [foodName, setFoodName] = useState('');
  const [price, setPrice] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);
  const [foods, setFoods] = useState<Food[]>([
    {
      id: 1,
      name: 'Pakbet',
      price: '45',
      photo: undefined,
    },
    {
      id: 2,
      name: 'Humba',
      price: '50',
      photo: undefined,
    },
    {
      id: 3,
      name: 'Isda',
      price: '50',
      photo: undefined,
    },
    {
      id: 4,
      name: 'Ginataang Sawa',
      price: '55',
      photo: undefined,
    },
    {
      id: 5,
      name: 'Lechon',
      price: '120',
      photo: undefined,
    },
    {
      id: 6,
      name: 'Giniling',
      price: '40',
      photo: undefined,
    },
  ]);
  const [editingFood, setEditingFood] = useState<Food | null>(null);
  const [activeTab, setActiveTab] = useState<'menu' | 'orders'>('orders');
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 1,
      customerName: 'Juan Dela Cruz',
      items: [
        { name: 'Pakbet', quantity: 2, price: '45' },
        { name: 'Humba', quantity: 1, price: '50' },
      ],
      totalAmount: 140,
      status: 'pending',
      timestamp: new Date(Date.now() - 5 * 60000),
    },
    {
      id: 2,
      customerName: 'Maria Santos',
      items: [{ name: 'Lechon', quantity: 1, price: '120' }],
      totalAmount: 120,
      status: 'preparing',
      timestamp: new Date(Date.now() - 15 * 60000),
    },
    {
      id: 3,
      customerName: 'Pedro Garcia',
      items: [
        { name: 'Giniling', quantity: 3, price: '40' },
        { name: 'Isda', quantity: 2, price: '50' },
      ],
      totalAmount: 220,
      status: 'ready',
      timestamp: new Date(Date.now() - 30 * 60000),
    },
  ]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const handleEdit = (food: Food) => {
    setEditingFood(food);
    setFoodName(food.name);
    setPrice(food.price);
    setPhoto(food.photo || null);
    setShowAddFoodModal(true);
  };

  const handleConfirm = async () => {
    if (foodName && price) {
      if (editingFood) {
        const updatedFood = {
          ...editingFood,
          name: foodName,
          price,
          photo: photo || undefined,
        };
        setFoods(foods.map(f => f.id === editingFood.id ? updatedFood : f));
      } else {
        const newFood = { 
          name: foodName, 
          price, 
          photo: photo || undefined, 
          id: Date.now() 
        };
        setFoods([...foods, newFood]);
      }
      
      setFoodName('');
      setPrice('');
      setPhoto(null);
      setEditingFood(null);
      setShowAddFoodModal(false);
    }
  };

  const handleModalClose = () => {
    setShowAddFoodModal(false);
    setEditingFood(null);
    setFoodName('');
    setPrice('');
    setPhoto(null);
  };

  const updateOrderStatus = (orderId: number, newStatus: Order['status']) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return '#f59e0b';
      case 'preparing':
        return '#3b82f6';
      case 'ready':
        return '#10b981';
      case 'completed':
        return '#6b7280';
      default:
        return '#9ca3af';
    }
  };

  const getStatusLabel = (status: Order['status']) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const hours = Math.floor(diffMins / 60);
    return `${hours}h ago`;
  };

  const pendingOrdersCount = orders.filter(o => o.status === 'pending').length;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          {onBack && (
            <TouchableOpacity onPress={onBack} style={styles.backButton}>
              <Text style={styles.backButtonText}>← Back</Text>
            </TouchableOpacity>
          )}
          <Text style={styles.greeting}>Hello, {userName}</Text>
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            setActiveTab('menu');
            setShowAddFoodModal(true);
          }}
        >
          <Text style={styles.addButtonText}>+ Add Food</Text>
        </TouchableOpacity>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'orders' && styles.activeTab]}
          onPress={() => setActiveTab('orders')}
        >
          <Text style={[styles.tabText, activeTab === 'orders' && styles.activeTabText]}>
            📋 Orders {pendingOrdersCount > 0 && `(${pendingOrdersCount})`}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'menu' && styles.activeTab]}
          onPress={() => setActiveTab('menu')}
        >
          <Text style={[styles.tabText, activeTab === 'menu' && styles.activeTabText]}>
            🍽️ Menu
          </Text>
        </TouchableOpacity>
      </View>

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          {orders.length === 0 ? (
            <View style={styles.emptyState}>
              <View style={styles.uploadIconContainer}>
                <Text style={styles.uploadIcon}>📦</Text>
              </View>
              <Text style={styles.emptyText}>No orders yet</Text>
            </View>
          ) : (
            <View style={styles.ordersList}>
              {orders.map((order) => (
                <View key={order.id} style={styles.orderCard}>
                  {/* Order Header */}
                  <View style={styles.orderHeader}>
                    <View style={styles.orderHeaderLeft}>
                      <Text style={styles.customerName}>{order.customerName}</Text>
                      <Text style={styles.orderTime}>{formatTime(order.timestamp)}</Text>
                    </View>
                    <View
                      style={[
                        styles.statusBadge,
                        { backgroundColor: getStatusColor(order.status) },
                      ]}
                    >
                      <Text style={styles.statusText}>{getStatusLabel(order.status)}</Text>
                    </View>
                  </View>

                  {/* Order Items */}
                  <View style={styles.itemsContainer}>
                    {order.items.map((item, idx) => (
                      <View key={idx} style={styles.orderItem}>
                        <View style={styles.itemLeft}>
                          <Text style={styles.itemName}>{item.name}</Text>
                          <Text style={styles.itemQuantity}>x{item.quantity}</Text>
                        </View>
                        <Text style={styles.itemPrice}>₱{item.price}</Text>
                      </View>
                    ))}
                  </View>

                  {/* Order Total */}
                  <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>Total:</Text>
                    <Text style={styles.totalAmount}>₱{order.totalAmount.toFixed(2)}</Text>
                  </View>

                  {/* Action Buttons */}
                  <View style={styles.actionButtons}>
                    {order.status === 'pending' && (
                      <TouchableOpacity
                        style={[styles.actionButton, styles.preparingButton]}
                        onPress={() => updateOrderStatus(order.id, 'preparing')}
                      >
                        <Text style={styles.actionButtonText}>Start Preparing</Text>
                      </TouchableOpacity>
                    )}
                    {order.status === 'preparing' && (
                      <TouchableOpacity
                        style={[styles.actionButton, styles.readyButton]}
                        onPress={() => updateOrderStatus(order.id, 'ready')}
                      >
                        <Text style={styles.actionButtonText}>Mark Ready</Text>
                      </TouchableOpacity>
                    )}
                    {order.status === 'ready' && (
                      <TouchableOpacity
                        style={[styles.actionButton, styles.completeButton]}
                        onPress={() => updateOrderStatus(order.id, 'completed')}
                      >
                        <Text style={styles.actionButtonText}>Complete</Text>
                      </TouchableOpacity>
                    )}
                    {order.status === 'completed' && (
                      <View style={[styles.actionButton, styles.completedButton]}>
                        <Text style={styles.actionButtonText}>✓ Completed</Text>
                      </View>
                    )}
                  </View>
                </View>
              ))}
            </View>
          )}
        </ScrollView>
      )}

      {/* Menu Tab */}
      {activeTab === 'menu' && (
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          {foods.length === 0 ? (
            <View style={styles.emptyState}>
              <View style={styles.uploadIconContainer}>
                <Text style={styles.uploadIcon}>🍽️</Text>
              </View>
              <Text style={styles.emptyText}>
                No food items yet. Click "Add Food" to get started!
              </Text>
            </View>
          ) : (
            <View style={styles.foodList}>
              {foods.map((food) => (
                <View key={food.id} style={styles.foodItem}>
                  {food.photo ? (
                    <Image source={{ uri: food.photo }} style={styles.foodImage} />
                  ) : (
                    <View style={[styles.foodImage, styles.placeholderImage]}>
                      <Text style={styles.placeholderText}>📷</Text>
                    </View>
                  )}
                  <View style={styles.foodInfo}>
                    <Text style={styles.foodName}>{food.name}</Text>
                    <Text style={styles.foodPrice}>₱{food.price}</Text>
                  </View>
                  <TouchableOpacity 
                    style={styles.editButton}
                    onPress={() => handleEdit(food)}
                  >
                    <Text style={styles.editButtonText}>✏️ Edit</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </ScrollView>
      )}

      {/* Add/Edit Food Modal */}
      <Modal
        visible={showAddFoodModal}
        transparent={true}
        animationType="fade"
        onRequestClose={handleModalClose}
      >
        <View style={styles.modalOverlay}>
          <Animated.View entering={FadeIn} style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {editingFood ? 'Edit Food' : 'Add a Food'}
              </Text>
              <TouchableOpacity
                onPress={handleModalClose}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.form}>
              <TextInput
                style={styles.input}
                placeholder="Food Name"
                placeholderTextColor="#999"
                value={foodName}
                onChangeText={setFoodName}
              />

              <TextInput
                style={styles.input}
                placeholder="Price"
                placeholderTextColor="#999"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
              />

              <View style={styles.photoSection}>
                <Text style={styles.photoLabel}>Attach Photo</Text>
                <TouchableOpacity style={styles.photoButton} onPress={pickImage}>
                  <Text style={styles.photoButtonText}>
                    {photo ? '✓ Photo selected' : '📁 Choose file...'}
                  </Text>
                </TouchableOpacity>
                {photo && (
                  <Image source={{ uri: photo }} style={styles.previewImage} />
                )}
              </View>

              <TouchableOpacity
                style={styles.confirmButton}
                onPress={handleConfirm}
              >
                <Text style={styles.confirmButtonText}>Confirm</Text>
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
    backgroundColor: '#7f1d1d',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#7f1d1d',
  },
  headerLeft: {
    flex: 1,
    flexDirection: 'column',
    gap: 8,
  },
  backButton: {
    alignSelf: 'flex-start',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  greeting: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
  },
  addButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addButtonText: {
    color: '#7f1d1d',
    fontSize: 16,
    fontWeight: '600',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#8b2929',
    paddingHorizontal: 20,
    paddingBottom: 10,
    gap: 10,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  activeTab: {
    backgroundColor: '#fff',
  },
  tabText: {
    color: '#e5e7eb',
    fontSize: 14,
    fontWeight: '600',
  },
  activeTabText: {
    color: '#7f1d1d',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 10,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 100,
  },
  uploadIconContainer: {
    width: 120,
    height: 120,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderStyle: 'dashed',
  },
  uploadIcon: {
    fontSize: 48,
  },
  emptyText: {
    color: '#e5e7eb',
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  ordersList: {
    paddingBottom: 20,
  },
  orderCard: {
    backgroundColor: '#374151',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#f59e0b',
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderHeaderLeft: {
    flex: 1,
  },
  customerName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  orderTime: {
    color: '#9ca3af',
    fontSize: 12,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  itemsContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  itemLeft: {
    flex: 1,
  },
  itemName: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  itemQuantity: {
    color: '#d1d5db',
    fontSize: 12,
    marginTop: 2,
  },
  itemPrice: {
    color: '#10b981',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 10,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 12,
  },
  totalLabel: {
    color: '#e5e7eb',
    fontSize: 14,
    fontWeight: '600',
  },
  totalAmount: {
    color: '#10b981',
    fontSize: 18,
    fontWeight: '700',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  preparingButton: {
    backgroundColor: '#3b82f6',
  },
  readyButton: {
    backgroundColor: '#10b981',
  },
  completeButton: {
    backgroundColor: '#6b7280',
  },
  completedButton: {
    backgroundColor: '#4b5563',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  foodList: {
    paddingBottom: 20,
  },
  foodItem: {
    backgroundColor: '#374151',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  foodImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 15,
  },
  placeholderImage: {
    backgroundColor: '#4b5563',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    fontSize: 30,
  },
  foodInfo: {
    flex: 1,
  },
  foodName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  foodPrice: {
    color: '#10b981',
    fontSize: 16,
    fontWeight: '600',
  },
  editButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 10,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#1f2937',
    borderRadius: 15,
    padding: 25,
    width: '100%',
    maxWidth: 400,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  closeButton: {
    padding: 5,
  },
  closeButtonText: {
    fontSize: 24,
    color: '#9ca3af',
  },
  form: {
    gap: 20,
  },
  input: {
    backgroundColor: '#374151',
    color: '#fff',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 2,
    borderColor: '#4b5563',
  },
  photoSection: {
    marginTop: 5,
  },
  photoLabel: {
    color: '#e5e7eb',
    marginBottom: 10,
    fontSize: 14,
    fontWeight: '500',
  },
  photoButton: {
    backgroundColor: '#374151',
    padding: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#4b5563',
    alignItems: 'center',
  },
  photoButtonText: {
    color: '#e5e7eb',
    fontSize: 16,
  },
  confirmButton: {
    backgroundColor: '#10b981',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginTop: 15,
  },
});

export default SellerMain;