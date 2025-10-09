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

interface SellerMainProps {
  userName?: string;
  onBack?: () => void;
}

const SellerMain = ({ userName = 'Aling Vicky', onBack }: SellerMainProps) => {
  const [showAddFoodModal, setShowAddFoodModal] = useState(false);
  const [foodName, setFoodName] = useState('');
  const [price, setPrice] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);
  const [foods, setFoods] = useState<Food[]>([]);
  const [editingFood, setEditingFood] = useState<Food | null>(null);

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
        // Update existing food
        const updatedFood = {
          ...editingFood,
          name: foodName,
          price,
          photo: photo || undefined,
        };
        
        // TODO: Backend Integration - Update food in database
        // try {
        //   await fetch(`YOUR_API_URL/foods/${editingFood.id}`, {
        //     method: 'PUT',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(updatedFood)
        //   });
        // } catch (error) {
        //   console.error('Error updating food:', error);
        // }

        setFoods(foods.map(f => f.id === editingFood.id ? updatedFood : f));
      } else {
        // Add new food
        const newFood = { 
          name: foodName, 
          price, 
          photo: photo || undefined, 
          id: Date.now() 
        };
        
        // TODO: Backend Integration - Add food to database
        // try {
        //   const response = await fetch('YOUR_API_URL/foods', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(newFood)
        //   });
        //   const data = await response.json();
        //   setFoods([...foods, data]);
        // } catch (error) {
        //   console.error('Error adding food:', error);
        // }

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
          onPress={() => setShowAddFoodModal(true)}
        >
          <Text style={styles.addButtonText}>+ Add Food</Text>
        </TouchableOpacity>
      </View>

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