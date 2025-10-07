// components/SellerMain.tsx
import React from 'react';
import {
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

const SellerMain: React.FC<SellerMainProps> = ({ onNavigate }) => {
  const addScale = useSharedValue(1);
  const confirmScale = useSharedValue(1);

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
      <View style={styles.contentRow}>
        {/* Gallery Section */}
        <Animated.View entering={FadeInDown.duration(700)} style={styles.card}>
          <Text style={styles.greeting}>Hello, Aling Vicky</Text>

          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>Nothing to see here :3</Text>

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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#7f1d1d' },
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
});

export default SellerMain;
