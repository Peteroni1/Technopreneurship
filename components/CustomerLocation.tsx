// components/CustomerLocation.tsx
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import BackButton from './BackButton';

interface CustomerLocationProps {
  onNavigate: (screen: string) => void;
}

const CustomerLocation: React.FC<CustomerLocationProps> = ({ onNavigate }) => {
  const [addPlace, setAddPlace] = useState('');
  const [currentLocation, setCurrentLocation] = useState('');

  const handleBrowse = () => {
    // Check if at least one field is filled
    if (!addPlace && !currentLocation) {
      alert('Please fill in at least one location field');
      return;
    }

    // Navigate to customer main
    onNavigate('customer-main');
  };

  return (
    <ScrollView style={styles.container}>
      <BackButton onPress={() => onNavigate('choice')} />
      
      <View style={styles.content}>
        <Text style={styles.title}>WHERE ARE YOU LOCATED?</Text>

        <View style={styles.form}>
          <View style={styles.inputRow}>
            <Text style={styles.icon}>+</Text>
            <TextInput
              style={styles.input}
              placeholder="Add Place"
              placeholderTextColor="#999"
              value={addPlace}
              onChangeText={setAddPlace}
            />
          </View>

          <View style={styles.inputRow}>
            <Text style={styles.icon}>📍</Text>
            <TextInput
              style={styles.input}
              placeholder="Current Location"
              placeholderTextColor="#999"
              value={currentLocation}
              onChangeText={setCurrentLocation}
            />
          </View>
          x
          <TouchableOpacity
            style={styles.browseButton}
            onPress={handleBrowse}
          >
            <Text style={styles.browseButtonText}>
              Browse for carinderias nearby.
            </Text>
          </TouchableOpacity>
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
  content: {
    padding: 20,
    alignItems: 'center',
    paddingTop: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
    textAlign: 'center',
  },
  form: {
    width: '100%',
    maxWidth: 400,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#374151',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  icon: {
    fontSize: 20,
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#e5e7eb',
  },
  browseButton: {
    backgroundColor: '#d1d5db',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  browseButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default CustomerLocation;