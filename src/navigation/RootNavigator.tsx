import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
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
  Certificate:undefined;
  Category:undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
      <Stack.Screen
        name="CourseDetails"
        component={CourseDetailsScreen}
        options={{ headerShown: false, title: 'Course Details' }}
      />
      <Stack.Screen
        name="Payment"
        component={PaymentScreen}
        options={{ headerShown: true, title: 'Payment' }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{ title: 'Reset Password' }}
      />
      <Stack.Screen
        name="Notifications"
        component={NotificationScreen}
        options={{ headerShown: false, title: 'Notifications' }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ headerShown: false, title: 'Settings' }}
      />
      <Stack.Screen
        name="HelpAndSupport"
        component={HelpAndSupportScreen}
        options={{ headerShown: false, title: 'HelpAndSupport' }}
      />
      <Stack.Screen
        name="MyCourses"
        component={MyCoursesScreen}
        options={{ headerShown: false, title: 'My Courses' }}
      />
      <Stack.Screen
        name="CourseLessons"
        component={CourseLessonsScreen}
        options={{ headerShown: true, title: 'Lessons' }}
      />
      <Stack.Screen
        name="Certificate"
        component={CertificateScreen}
        options={{ headerShown: true, title: 'Certificate' }}
      />
      <Stack.Screen
        name="Category"
        component={CategoryCourses}
        options={{ headerShown: true, title: 'Browse Categories' }}
      />

    </Stack.Navigator>
  );
};

export default RootNavigator;
