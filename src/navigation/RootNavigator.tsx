import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ForgotPasswordScreen from '../screens/Auth/ForgotPasswordScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import CourseDetailsScreen from '../screens/Courses/CourseDetailsScreen';
import CourseLessonsScreen from '../screens/MyCourses/CourseLessonsScreen';
import MyCoursesScreen from '../screens/MyCourses/MyCoursesScreen';
import NotificationScreen from '../screens/Notification/NotificationScreen';
import PaymentScreen from '../screens/Payment/PaymentScreen';
import SettingsScreen from '../screens/Settings/SettingsScreen';
import CertificateScreen from '../screens/Certificate/CertificateScreen';
import CategoryCourses from '../screens/Categories/CategoryCourses';
import OnboardingScreen from '../screens/Onboarding/OnboardingScreen';

import BottomTabNavigator from './BottomTabNavigator';
import HelpAndSupportScreen from '../screens/HelpAndSupport/HelpAndSupportScreen';

export type RootStackParamList = {
  MainTabs: undefined;
  CourseDetails: { courseId: string };
  Payment: { amount: number };
  MyCourses: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  Notifications: undefined;
  Settings: undefined;
  HelpAndSupport: undefined;
  CourseLessons: { courseId: string };
  Certificate: undefined;
  Category: undefined;
  Onboarding: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState<boolean | null>(null);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const value = await AsyncStorage.getItem('hasSeenOnboarding');
        setHasSeenOnboarding(value === 'true');
      } catch (error) {
        console.error('Error reading onboarding status', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkOnboardingStatus();
  }, []);

  if (isLoading) {
    return null; // You can show a SplashScreen here if needed
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={hasSeenOnboarding ? 'MainTabs' : 'Onboarding'}>
      {!hasSeenOnboarding && (
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      )}
      <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
      <Stack.Screen name="CourseDetails" component={CourseDetailsScreen} options={{ headerShown: false, title: 'Course Details' }} />
      <Stack.Screen name="Payment" component={PaymentScreen} options={{ headerShown: true, title: 'Payment' }} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ title: 'Reset Password' }} />
      <Stack.Screen name="Notifications" component={NotificationScreen} options={{ headerShown: false, title: 'Notifications' }} />
      <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false, title: 'Settings' }} />
      <Stack.Screen name="HelpAndSupport" component={HelpAndSupportScreen} options={{ headerShown: false, title: 'HelpAndSupport' }} />
      <Stack.Screen name="MyCourses" component={MyCoursesScreen} options={{ headerShown: false, title: 'My Courses' }} />
      <Stack.Screen name="CourseLessons" component={CourseLessonsScreen} options={{ headerShown: true, title: 'Lessons' }} />
      <Stack.Screen name="Certificate" component={CertificateScreen} options={{ headerShown: true, title: 'Certificate' }} />
      <Stack.Screen name="Category" component={CategoryCourses} options={{ headerShown: true, title: 'Browse Categories' }} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
