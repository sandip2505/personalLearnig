import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../../navigation/RootNavigator';

type CourseDetailsScreenRouteProp = RouteProp<RootStackParamList, 'CourseDetails'>;

const CourseDetailsScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<CourseDetailsScreenRouteProp>();
  const { courseId } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📖 Course Details</Text>
      <Text>Showing details for Course ID: {courseId}</Text>
      <Button title="Go to Payment" onPress={() => navigation.navigate('Payment', { amount: 499 })} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: '600', marginBottom: 10 },
});

export default CourseDetailsScreen;
