import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  Alert 
} from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';

type PaymentParamList = {
  Payment: { amount: number };
};

type PaymentRouteProp = RouteProp<PaymentParamList, 'Payment'>;

const PaymentScreen: React.FC = () => {
  const route = useRoute<PaymentRouteProp>();
  const navigation = useNavigation();
  const { amount } = route.params;
  
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: '💳' },
    { id: 'upi', name: 'UPI', icon: '📱' },
    { id: 'netbanking', name: 'Net Banking', icon: '🏦' },
    { id: 'wallet', name: 'Digital Wallet', icon: '👝' },
  ];

  const handlePayment = () => {
    if (!selectedPaymentMethod) {
      Alert.alert('Error', 'Please select a payment method');
      return;
    }
    
    if (selectedPaymentMethod === 'card' && (!cardNumber || !expiryDate || !cvv || !cardHolderName)) {
      Alert.alert('Error', 'Please fill all card details');
      return;
    }

    Alert.alert(
      'Payment Confirmation',
      `Pay ₹${amount} using ${paymentMethods.find(m => m.id === selectedPaymentMethod)?.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Pay Now', 
          onPress: () => {
            // Payment processing logic here
            Alert.alert('Success', 'Payment completed successfully!', [
              { text: 'OK', onPress: () => navigation.goBack() }
            ]);
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Payment</Text>
        <Text style={styles.subtitle}>Secure & Fast Payment</Text>
      </View>

      {/* Amount Summary */}
      <View style={styles.amountCard}>
        <Text style={styles.amountLabel}>Amount to Pay</Text>
        <Text style={styles.amountValue}>₹{amount.toLocaleString()}</Text>
      </View>

      {/* Payment Methods */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Choose Payment Method</Text>
        {paymentMethods.map((method) => (
          <TouchableOpacity
            key={method.id}
            style={[
              styles.paymentMethodItem,
              selectedPaymentMethod === method.id && styles.selectedPaymentMethod
            ]}
            onPress={() => setSelectedPaymentMethod(method.id)}
          >
            <View style={styles.paymentMethodContent}>
              <Text style={styles.paymentMethodIcon}>{method.icon}</Text>
              <Text style={styles.paymentMethodName}>{method.name}</Text>
            </View>
            <View style={[
              styles.radioButton,
              selectedPaymentMethod === method.id && styles.radioButtonSelected
            ]} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Card Details (if card is selected) */}
      {selectedPaymentMethod === 'card' && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Card Details</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Card Holder Name"
            value={cardHolderName}
            onChangeText={setCardHolderName}
            placeholderTextColor="#999"
          />
          
          <TextInput
            style={styles.input}
            placeholder="Card Number"
            value={cardNumber}
            onChangeText={setCardNumber}
            keyboardType="numeric"
            maxLength={16}
            placeholderTextColor="#999"
          />
          
          <View style={styles.cardRow}>
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="MM/YY"
              value={expiryDate}
              onChangeText={setExpiryDate}
              maxLength={5}
              placeholderTextColor="#999"
            />
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="CVV"
              value={cvv}
              onChangeText={setCvv}
              keyboardType="numeric"
              maxLength={3}
              secureTextEntry
              placeholderTextColor="#999"
            />
          </View>
        </View>
      )}

      {/* Security Info */}
      <View style={styles.securityInfo}>
        <Text style={styles.securityIcon}>🔒</Text>
        <Text style={styles.securityText}>
          Your payment information is encrypted and secure
        </Text>
      </View>

      {/* Pay Button */}
      <TouchableOpacity 
        style={[
          styles.payButton,
          !selectedPaymentMethod && styles.payButtonDisabled
        ]}
        onPress={handlePayment}
        disabled={!selectedPaymentMethod}
      >
        <Text style={styles.payButtonText}>Pay ₹{amount.toLocaleString()}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a1a',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
  },
  amountCard: {
    backgroundColor: '#4a90e2',
    margin: 20,
    padding: 25,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#4a90e2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  amountLabel: {
    color: '#fff',
    fontSize: 16,
    opacity: 0.9,
  },
  amountValue: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '700',
    marginTop: 5,
  },
  section: {
    margin: 20,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 15,
  },
  paymentMethodItem: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: '#e1e5e9',
  },
  selectedPaymentMethod: {
    borderColor: '#4a90e2',
    backgroundColor: '#f0f7ff',
  },
  paymentMethodContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentMethodIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  paymentMethodName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1a1a1a',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  radioButtonSelected: {
    borderColor: '#4a90e2',
    backgroundColor: '#4a90e2',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e1e5e9',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    marginBottom: 15,
    color: '#1a1a1a',
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  securityInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  securityIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  securityText: {
    color: '#666',
    fontSize: 14,
  },
  payButton: {
    backgroundColor: '#4a90e2',
    margin: 20,
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#4a90e2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  payButtonDisabled: {
    backgroundColor: '#ccc',
    shadowOpacity: 0,
    elevation: 0,
  },
  payButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default PaymentScreen;
