// components/CustomerLocation.tsx
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface CustomerLocationProps {
  onNavigate: (screen: string) => void;
}

const CustomerLocation: React.FC<CustomerLocationProps> = ({ onNavigate }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.imageBox}>
          <Text style={styles.imagePlaceholder}>✕</Text>
        </View>

        <Text style={styles.title}>WHERE ARE YOU LOCATED?</Text>

        <View style={styles.form}>
          <View style={styles.inputRow}>
            <Text style={styles.icon}>+</Text>
            <TextInput
              style={styles.input}
              placeholder="Add Place"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputRow}>
            <Text style={styles.icon}>📍</Text>
            <TextInput
              style={styles.input}
              placeholder="Current Location"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputRow}>
            <Text style={styles.icon}>🕐</Text>
            <TextInput
              style={styles.input}
              placeholder="Recent Location"
              placeholderTextColor="#999"
            />
          </View>

          <TouchableOpacity
            style={styles.browseButton}
            onPress={() => onNavigate('customer-main')}
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
  },
  imageBox: {
    width: '100%',
    maxWidth: 400,
    height: 200,
    backgroundColor: '#d1d5db',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  imagePlaceholder: {
    fontSize: 48,
    color: '#9ca3af',
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
    backgroundColor: '#f3f4f6',
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
    color: '#000',
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