// components/HelpDesk.tsx
import React, { useState } from 'react';
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface HelpDeskProps {
  onNavigate: (screen: string, params?: any) => void;
}

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const HelpDesk: React.FC<HelpDeskProps> = ({ onNavigate }) => {
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [chatModal, setChatModal] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{text: string, sender: 'user' | 'bot'}>>([
    { text: 'Hi! How can I help you today?', sender: 'bot' }
  ]);
  const [chatInput, setChatInput] = useState('');

  const categories = ['All', 'Orders', 'Payment', 'Delivery', 'Account'];

  const faqData: FAQ[] = [
    {
      id: 1,
      question: 'How do I place an order?',
      answer: 'To place an order: 1) Browse available vendors on the home screen, 2) Select items you want to order, 3) Add them to your cart, 4) Review your order and proceed to checkout, 5) Choose your payment method and confirm delivery address, 6) Submit your order and track its status in real-time.',
      category: 'Orders',
    },
    {
      id: 2,
      question: 'What payment methods are accepted?',
      answer: 'We accept multiple payment methods including: Cash on Delivery (COD), GCash, PayMaya, Credit/Debit Cards (Visa, Mastercard), and Bank Transfer. All digital payments are processed securely through encrypted channels.',
      category: 'Payment',
    },
    {
      id: 3,
      question: 'How long does delivery take?',
      answer: 'Delivery time varies based on: Restaurant preparation time (15-30 mins), Distance from vendor to your location, Current traffic conditions, Weather conditions. Typically, orders arrive within 30-45 minutes. You can track your order in real-time through the app.',
      category: 'Delivery',
    },
    {
      id: 4,
      question: 'Can I cancel my order?',
      answer: 'Yes, you can cancel your order before the vendor confirms it. Once confirmed, cancellation may incur charges. To cancel: Go to Order History, Select the active order, Tap "Cancel Order", Confirm cancellation. Refunds for prepaid orders are processed within 3-5 business days.',
      category: 'Orders',
    },
    {
      id: 5,
      question: 'How do I track my order?',
      answer: 'Track your order by: 1) Opening the app and going to "Order History", 2) Selecting your active order, 3) Viewing real-time status updates, 4) Seeing the delivery driver\'s location on the map. You\'ll receive push notifications at each stage of delivery.',
      category: 'Delivery',
    },
    {
      id: 6,
      question: 'What if my order is incorrect or missing items?',
      answer: 'If there\'s an issue with your order: 1) Contact support immediately through the app, 2) Provide your order number and details of the issue, 3) Take photos if items are damaged or incorrect, 4) We\'ll process a refund or replacement within 24 hours.',
      category: 'Orders',
    },
    {
      id: 7,
      question: 'How do I update my payment information?',
      answer: 'To update payment details: Go to Profile → Settings → Payment Methods. You can add, remove, or set a default payment method. All payment information is encrypted and stored securely.',
      category: 'Payment',
    },
    {
      id: 8,
      question: 'Can I schedule an order for later?',
      answer: 'Yes! During checkout, you can select "Schedule Order" and choose your preferred date and time. Orders can be scheduled up to 7 days in advance. You\'ll receive a reminder 30 minutes before your scheduled delivery time.',
      category: 'Orders',
    },
    {
      id: 9,
      question: 'How do I change my delivery address?',
      answer: 'To change your delivery address: 1) Go to Profile section, 2) Edit your address or add a new one, 3) Set it as default or select it during checkout. You can save multiple addresses for different locations (home, work, etc.).',
      category: 'Account',
    },
    {
      id: 10,
      question: 'Are there any delivery fees?',
      answer: 'Delivery fees vary based on: Distance from the vendor, Order total amount, Time of day, Weather conditions. Minimum order amounts may apply. Premium users enjoy free delivery on orders above a certain amount. Check the app for current rates.',
      category: 'Delivery',
    },
  ];

  const handleSubmit = () => {
    if (!name.trim() || !email.trim() || !message.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    Alert.alert(
      'Success',
      'Your message has been sent! We will get back to you within 24 hours.',
      [{ text: 'OK' }]
    );
    setName('');
    setEmail('');
    setMessage('');
  };

  const toggleFAQ = (id: number) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  const filteredFAQs = selectedCategory === 'All' 
    ? faqData 
    : faqData.filter(faq => faq.category === selectedCategory);

  const handleSendChatMessage = () => {
    if (chatInput.trim()) {
      const userMessage = { text: chatInput, sender: 'user' as const };
      setChatMessages([...chatMessages, userMessage]);
      
      // Simulate bot response
      setTimeout(() => {
        const botResponse = generateBotResponse(chatInput);
        setChatMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
      }, 1000);
      
      setChatInput('');
    }
  };

  const generateBotResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('order') || lowerInput.includes('place')) {
      return 'To place an order, browse vendors on the home screen, select items, and proceed to checkout. Need more specific help?';
    } else if (lowerInput.includes('payment') || lowerInput.includes('pay')) {
      return 'We accept Cash on Delivery, GCash, PayMaya, and Credit/Debit Cards. Is there a specific payment method you\'d like to know about?';
    } else if (lowerInput.includes('delivery') || lowerInput.includes('track')) {
      return 'Delivery typically takes 30-45 minutes. You can track your order in real-time through Order History. Would you like to know more?';
    } else if (lowerInput.includes('cancel')) {
      return 'You can cancel orders before vendor confirmation through Order History. Already confirmed orders may incur charges. Need help canceling?';
    } else {
      return 'I\'m here to help! You can ask about orders, payments, delivery, or contact our support team for detailed assistance.';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>HELP DESK</Text>
          <Text style={styles.headerSubtitle}>We're here to help you 24/7!</Text>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Quick Actions */}
          <View style={styles.quickActions}>
            <TouchableOpacity 
              style={styles.quickActionButton}
              onPress={() => setChatModal(true)}
            >
              <Text style={styles.quickActionIcon}>💬</Text>
              <Text style={styles.quickActionText}>Live Chat</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.quickActionButton}
              onPress={() => Alert.alert('Call Support', '+63 912 345 6789')}
            >
              <Text style={styles.quickActionIcon}>📞</Text>
              <Text style={styles.quickActionText}>Call Us</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.quickActionButton}
              onPress={() => Alert.alert('Email', 'support@higalameals.com')}
            >
              <Text style={styles.quickActionIcon}>📧</Text>
              <Text style={styles.quickActionText}>Email</Text>
            </TouchableOpacity>
          </View>

          {/* FAQ Section */}
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>

          {/* Category Filter */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.categoryContainer}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryButton,
                  selectedCategory === category && styles.categoryButtonActive
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text style={[
                  styles.categoryText,
                  selectedCategory === category && styles.categoryTextActive
                ]}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* FAQ List */}
          {filteredFAQs.map((faq) => (
            <TouchableOpacity 
              key={faq.id} 
              style={styles.faqCard}
              onPress={() => toggleFAQ(faq.id)}
            >
              <View style={styles.faqHeader}>
                <Text style={styles.question}>{faq.question}</Text>
                <Text style={styles.expandIcon}>
                  {expandedFAQ === faq.id ? '−' : '+'}
                </Text>
              </View>
              {expandedFAQ === faq.id && (
                <Text style={styles.answer}>{faq.answer}</Text>
              )}
            </TouchableOpacity>
          ))}

          {/* Contact Form */}
          <Text style={styles.sectionTitle}>Send us a message</Text>
          <View style={styles.contactForm}>
            <TextInput
              style={styles.input}
              placeholder="Your Name"
              placeholderTextColor="#999"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Your Email"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.messageInput}
              placeholder="Describe your issue..."
              placeholderTextColor="#999"
              value={message}
              onChangeText={setMessage}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Send Message</Text>
            </TouchableOpacity>
          </View>

          {/* Contact Info */}
          <View style={styles.contactInfo}>
            <Text style={styles.contactTitle}>Other ways to reach us:</Text>
            <Text style={styles.contactItem}>📧 Email: support@higalameals.com</Text>
            <Text style={styles.contactItem}>📞 Phone: +63 912 345 6789</Text>
            <Text style={styles.contactItem}>⏰ Hours: 24/7 Support Available</Text>
            <Text style={styles.contactItem}>🌐 Website: www.higalameals.com</Text>
            <Text style={styles.contactItem}>📍 Address: Cagayan de Oro City, Philippines</Text>
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

          <TouchableOpacity style={styles.navButton} onPress={() => onNavigate('helpdesk')}>
            <Text style={styles.navIconActive}>💬</Text>
            <Text style={styles.navLabelActive}>Help</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navButton}
            onPress={() => onNavigate('profile')}
          >
            <Text style={styles.navIcon}>👤</Text>
            <Text style={styles.navLabel}>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Live Chat Modal */}
      <Modal
        visible={chatModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setChatModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.chatModalContent}>
            <View style={styles.chatHeader}>
              <View>
                <Text style={styles.chatTitle}>💬 Live Chat Support</Text>
                <Text style={styles.chatSubtitle}>Usually replies instantly</Text>
              </View>
              <TouchableOpacity onPress={() => setChatModal(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.chatMessages}>
              {chatMessages.map((msg, index) => (
                <View
                  key={index}
                  style={[
                    styles.chatBubble,
                    msg.sender === 'user' ? styles.userBubble : styles.botBubble
                  ]}
                >
                  <Text style={[
                    styles.chatText,
                    msg.sender === 'user' ? styles.userText : styles.botText
                  ]}>
                    {msg.text}
                  </Text>
                </View>
              ))}
            </ScrollView>

            <View style={styles.chatInputContainer}>
              <TextInput
                style={styles.chatInput}
                placeholder="Type your message..."
                placeholderTextColor="#999"
                value={chatInput}
                onChangeText={setChatInput}
                multiline
              />
              <TouchableOpacity 
                style={styles.sendButton}
                onPress={handleSendChatMessage}
              >
                <Text style={styles.sendButtonText}>Send</Text>
              </TouchableOpacity>
            </View>
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
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 10,
  },
  quickActionButton: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e5e5',
  },
  quickActionIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#000',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginTop: 10,
    marginBottom: 15,
  },
  categoryContainer: {
    marginBottom: 15,
    maxHeight: 40,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    marginRight: 8,
  },
  categoryButtonActive: {
    backgroundColor: '#7f1d1d',
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6b7280',
  },
  categoryTextActive: {
    color: '#fff',
  },
  faqCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e5e5',
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  question: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    flex: 1,
    marginRight: 10,
  },
  expandIcon: {
    fontSize: 20,
    fontWeight: '300',
    color: '#7f1d1d',
  },
  answer: {
    fontSize: 13,
    color: '#6b7280',
    lineHeight: 20,
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
  },
  contactForm: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#f3f4f6',
    padding: 12,
    borderRadius: 10,
    fontSize: 14,
    color: '#000',
    marginBottom: 12,
  },
  messageInput: {
    backgroundColor: '#f3f4f6',
    padding: 12,
    borderRadius: 10,
    fontSize: 14,
    color: '#000',
    minHeight: 100,
    marginBottom: 12,
  },
  submitButton: {
    backgroundColor: '#7f1d1d',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  contactInfo: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  contactTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 10,
  },
  contactItem: {
    fontSize: 13,
    color: '#6b7280',
    marginBottom: 8,
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
  // Chat Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  chatModalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '85%',
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
    backgroundColor: '#7f1d1d',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  chatTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  chatSubtitle: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.8,
    marginTop: 2,
  },
  closeButton: {
    fontSize: 28,
    color: '#fff',
    fontWeight: '300',
  },
  chatMessages: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f9f9f9',
  },
  chatBubble: {
    maxWidth: '75%',
    padding: 12,
    borderRadius: 15,
    marginBottom: 10,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#7f1d1d',
    borderBottomRightRadius: 5,
  },
  botBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e5e5',
    borderBottomLeftRadius: 5,
  },
  chatText: {
    fontSize: 14,
    lineHeight: 20,
  },
  userText: {
    color: '#fff',
  },
  botText: {
    color: '#000',
  },
  chatInputContainer: {
    flexDirection: 'row',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  chatInput: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    padding: 12,
    borderRadius: 20,
    fontSize: 14,
    color: '#000',
    maxHeight: 100,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#7f1d1d',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default HelpDesk;