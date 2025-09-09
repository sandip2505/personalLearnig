import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';

type PaymentParamList = {
  Payment: { amount: number };
};

type PaymentRouteProp = RouteProp<PaymentParamList, 'Payment'>;

const PaymentScreen: React.FC = () => {
  const route = useRoute<PaymentRouteProp>();
  const { amount } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>💳 Payment</Text>
      <Text>Amount to Pay: ₹{amount}</Text>
      {/* Here you can add payment gateway integration later */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: '600', marginBottom: 10 },
});

export default PaymentScreen;
