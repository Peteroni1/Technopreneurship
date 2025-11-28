// components/ProfilePage.tsx
import React, { useState } from 'react';
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface ProfilePageProps {
  onNavigate: (screen: string, params?: any) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ onNavigate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('Username');
  const [email, setEmail] = useState('username@gmail.com');
  const [phone, setPhone] = useState('+63 912 345 6789');
  const [address, setAddress] = useState('Bangkal Av, Dugutun Rd, Davao City');

  // Modal states
  const [orderHistoryModal, setOrderHistoryModal] = useState(false);
  const [settingsModal, setSettingsModal] = useState(false);
  const [notificationsModal, setNotificationsModal] = useState(false);

  // Settings states
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    Alert.alert('Success', 'Profile updated successfully!');
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', onPress: () => onNavigate('login'), style: 'destructive' },
      ]
    );
  };

  // Mock order history data
  const orders = [
    { id: '001', date: '2025-11-15', status: 'Delivered', total: '₱1,250.00' },
    { id: '002', date: '2025-11-20', status: 'Delivered', total: '₱850.00' },
    { id: '003', date: '2025-11-25', status: 'Cancelled', total: '₱2,100.00' },
    { id: '004', date: '2025-11-30', status: 'In Transit', total: '₱500.00' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>MY PROFILE</Text>
          <Text style={styles.headerSubtitle}>Manage your account</Text>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Profile Picture */}
          <View style={styles.profilePictureContainer}>
            <View style={styles.profilePicture}>
              <Text style={styles.profileInitials}>UN</Text>
            </View>
            <TouchableOpacity style={styles.editPhotoButton}>
              <Text style={styles.editPhotoText}>Change Photo</Text>
            </TouchableOpacity>
          </View>

          {/* Profile Information */}
          <View style={styles.infoSection}>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Full Name</Text>
              {isEditing ? (
                <TextInput
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                  placeholder="Enter your name"
                />
              ) : (
                <Text style={styles.value}>{name}</Text>
              )}
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Email</Text>
              {isEditing ? (
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter your email"
                  keyboardType="email-address"
                />
              ) : (
                <Text style={styles.value}>{email}</Text>
              )}
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Phone</Text>
              {isEditing ? (
                <TextInput
                  style={styles.input}
                  value={phone}
                  onChangeText={setPhone}
                  placeholder="Enter your phone"
                  keyboardType="phone-pad"
                />
              ) : (
                <Text style={styles.value}>{phone}</Text>
              )}
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Address</Text>
              {isEditing ? (
                <TextInput
                  style={styles.input}
                  value={address}
                  onChangeText={setAddress}
                  placeholder="Enter your address"
                  multiline
                />
              ) : (
                <Text style={styles.value}>{address}</Text>
              )}
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            {isEditing ? (
              <>
                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                  <Text style={styles.saveButtonText}>Save Changes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setIsEditing(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => setIsEditing(true)}
              >
                <Text style={styles.editButtonText}>Edit Profile</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Other Options */}
          <View style={styles.optionsSection}>
            <TouchableOpacity 
              style={styles.optionCard}
              onPress={() => setOrderHistoryModal(true)}
            >
              <Text style={styles.optionIcon}>📦</Text>
              <Text style={styles.optionText}>Order History</Text>
              <Text style={styles.optionArrow}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.optionCard}
              onPress={() => setSettingsModal(true)}
            >
              <Text style={styles.optionIcon}>⚙️</Text>
              <Text style={styles.optionText}>Settings</Text>
              <Text style={styles.optionArrow}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.optionCard}
              onPress={() => setNotificationsModal(true)}
            >
              <Text style={styles.optionIcon}>🔔</Text>
              <Text style={styles.optionText}>Notifications</Text>
              <Text style={styles.optionArrow}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.logoutIcon}>🚪</Text>
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Navigation Bar */}
        <View style={styles.navBar}>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => onNavigate('customer-main')}
          >
            <Text style={styles.navIcon}>🏠</Text>
            <Text style={styles.navLabel}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navButton}
            onPress={() => onNavigate('helpdesk')}
          >
            <Text style={styles.navIcon}>💬</Text>
            <Text style={styles.navLabel}>Help</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navButton} onPress={() => onNavigate('profile')}>
            <Text style={styles.navIconActive}>👤</Text>
            <Text style={styles.navLabelActive}>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Order History Modal */}
      <Modal
        visible={orderHistoryModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setOrderHistoryModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>📦 Order History</Text>
              <TouchableOpacity onPress={() => setOrderHistoryModal(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalBody}>
              {orders.map((order) => (
                <View key={order.id} style={styles.orderCard}>
                  <View style={styles.orderHeader}>
                    <Text style={styles.orderId}>Order #{order.id}</Text>
                    <Text style={[
                      styles.orderStatus,
                      order.status === 'Delivered' && styles.statusDelivered,
                      order.status === 'In Transit' && styles.statusInTransit,
                      order.status === 'Cancelled' && styles.statusCancelled,
                    ]}>
                      {order.status}
                    </Text>
                  </View>
                  <Text style={styles.orderDate}>{order.date}</Text>
                  <Text style={styles.orderTotal}>Total: {order.total}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Settings Modal */}
      <Modal
        visible={settingsModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSettingsModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>⚙️ Settings</Text>
              <TouchableOpacity onPress={() => setSettingsModal(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalBody}>
              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingTitle}>Push Notifications</Text>
                  <Text style={styles.settingDescription}>
                    Receive push notifications for orders.
                  </Text>
                </View>
                <Switch
                  value={pushNotifications}
                  onValueChange={setPushNotifications}
                  trackColor={{ false: '#d1d5db', true: '#7f1d1d' }}
                  thumbColor="#fff"
                />
              </View>

              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingTitle}>Email Notifications</Text>
                  <Text style={styles.settingDescription}>
                    Receive updates via email.
                  </Text>
                </View>
                <Switch
                  value={emailNotifications}
                  onValueChange={setEmailNotifications}
                  trackColor={{ false: '#d1d5db', true: '#7f1d1d' }}
                  thumbColor="#fff"
                />
              </View>

              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingTitle}>Dark Mode</Text>
                  <Text style={styles.settingDescription}>
                    Use dark theme throughout the app.
                  </Text>
                </View>
                <Switch
                  value={darkMode}
                  onValueChange={setDarkMode}
                  trackColor={{ false: '#d1d5db', true: '#7f1d1d' }}
                  thumbColor="#fff"
                />
              </View>

              <TouchableOpacity style={styles.settingButton}>
                <Text style={styles.settingButtonText}>Change Password</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.settingButton}>
                <Text style={styles.settingButtonText}>Privacy Policy</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.settingButton}>
                <Text style={styles.settingButtonText}>Terms of Service</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Notifications Modal */}
      <Modal
        visible={notificationsModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setNotificationsModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>🔔 Notifications</Text>
              <TouchableOpacity onPress={() => setNotificationsModal(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalBody}>
              <View style={styles.notificationCard}>
                <Text style={styles.notificationIcon}>✅</Text>
                <View style={styles.notificationContent}>
                  <Text style={styles.notificationTitle}>Order Delivered</Text>
                  <Text style={styles.notificationText}>
                    Your order #001 has been delivered successfully.
                  </Text>
                  <Text style={styles.notificationTime}>15 days ago</Text>
                </View>
              </View>

              <View style={styles.notificationCard}>
                <Text style={styles.notificationIcon}>🚚</Text>
                <View style={styles.notificationContent}>
                  <Text style={styles.notificationTitle}>Order In Transit</Text>
                  <Text style={styles.notificationText}>
                    Your order #004 is on the way.
                  </Text>
                  <Text style={styles.notificationTime}>12 minutes ago</Text>
                </View>
              </View>

              <View style={styles.notificationCard}>
                <Text style={styles.notificationIcon}>💰</Text>
                <View style={styles.notificationContent}>
                  <Text style={styles.notificationTitle}>Payment Confirmed</Text>
                  <Text style={styles.notificationText}>
                    Payment for order #002 received.
                  </Text>
                  <Text style={styles.notificationTime}>10 days ago</Text>
                </View>
              </View>

              <View style={styles.notificationCard}>
                <Text style={styles.notificationIcon}>🎉</Text>
                <View style={styles.notificationContent}>
                  <Text style={styles.notificationTitle}>Special Offer</Text>
                  <Text style={styles.notificationText}>
                    Get 20% off on your next order!
                  </Text>
                  <Text style={styles.notificationTime}>3 days ago</Text>
                </View>
              </View>
            </ScrollView>
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
  header: {
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
  content: {
    flex: 1,
    marginBottom: 10,
  },
  profilePictureContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#7f1d1d',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileInitials: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
  },
  editPhotoButton: {
    paddingVertical: 6,
    paddingHorizontal: 15,
  },
  editPhotoText: {
    color: '#7f1d1d',
    fontSize: 14,
    fontWeight: '600',
  },
  infoSection: {
    marginBottom: 20,
  },
  infoRow: {
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  value: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#f3f4f6',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    color: '#000',
  },
  actionButtons: {
    marginBottom: 20,
  },
  editButton: {
    backgroundColor: '#7f1d1d',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: '#059669',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: '#f3f4f6',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#6b7280',
    fontSize: 16,
    fontWeight: '600',
  },
  optionsSection: {
    marginBottom: 20,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e5e5e5',
  },
  optionIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  optionText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: '#000',
  },
  optionArrow: {
    fontSize: 24,
    color: '#d1d5db',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fee2e2',
    borderRadius: 12,
    padding: 15,
    marginTop: 10,
  },
  logoutIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  logoutText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#dc2626',
  },
  navBar: {
    flexDirection: 'row',
    backgroundColor: '#7f1d1d',
    borderRadius: 15,
    padding: 10,
    justifyContent: 'space-around',
    marginTop: 10,
  },
  navButton: {
    alignItems: 'center',
    flex: 1,
  },
  navIcon: {
    fontSize: 24,
    marginBottom: 4,
    opacity: 0.6,
  },
  navIconActive: {
    fontSize: 24,
    marginBottom: 4,
    opacity: 1,
  },
  navLabel: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '500',
    opacity: 0.6,
  },
  navLabelActive: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
    opacity: 1,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  closeButton: {
    fontSize: 28,
    color: '#6b7280',
    fontWeight: '300',
  },
  modalBody: {
    padding: 20,
  },
  // Order History Styles
  orderCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e5e5',
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  orderId: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  orderStatus: {
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusDelivered: {
    backgroundColor: '#d1fae5',
    color: '#059669',
  },
  statusInTransit: {
    backgroundColor: '#dbeafe',
    color: '#2563eb',
  },
  statusCancelled: {
    backgroundColor: '#fee2e2',
    color: '#dc2626',
  },
  orderDate: {
    fontSize: 13,
    color: '#6b7280',
    marginBottom: 4,
  },
  orderTotal: {
    fontSize: 15,
    fontWeight: '600',
    color: '#7f1d1d',
  },
  // Settings Styles
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  settingInfo: {
    flex: 1,
    marginRight: 15,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 13,
    color: '#6b7280',
  },
  settingButton: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#e5e5e5',
  },
  settingButtonText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#000',
    textAlign: 'center',
  },
  // Notifications Styles
  notificationCard: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e5e5',
  },
  notificationIcon: {
    fontSize: 32,
    marginRight: 15,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  notificationText: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 6,
    lineHeight: 20,
  },
  notificationTime: {
    fontSize: 12,
    color: '#9ca3af',
  },
});

export default ProfilePage;