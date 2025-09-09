import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator';
import CourseDetailsScreen from '../screens/Courses/CourseDetailsScreen';
import PaymentScreen from '../screens/Payment/PaymentScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import ForgotPasswordScreen from '../screens/Auth/ForgotPasswordScreen';
import NotificationScreen from '../screens/Notification/NotificationScreen';
import MyCoursesScreen from '../screens/MyCourses/MyCoursesScreen';
import CourseLessonsScreen from '../screens/MyCourses/CourseLessonsScreen';

export type RootStackParamList = {
  MainTabs: undefined;
  CourseDetails: { courseId: string };
  Payment: { amount: number };
  MyCourses: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  Notifications: undefined;
  CourseLessons: { courseId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
      <Stack.Screen 
        name="CourseDetails" 
        component={CourseDetailsScreen} 
        options={{ headerShown: true, title: 'Course Details' }}
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
        name="MyCourses" 
        component={MyCoursesScreen}
        options={{ headerShown: false, title: 'My Courses' }}
      />
      <Stack.Screen 
        name="CourseLessons" 
        component={CourseLessonsScreen}
        options={{ headerShown: true, title: 'Lessons' }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
