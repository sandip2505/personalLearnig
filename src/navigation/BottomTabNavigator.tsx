import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Platform, useColorScheme } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../constants/colors';
import { CoursesScreen, ELearningHomePage, MyCoursesPage, ProfileScreen } from '../screens';

const Tab = createBottomTabNavigator();

const BottomTabNavigator: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const getTabBarIcon = (routeName: string, focused: boolean, color: string, size: number) => {
    let iconName: string;

    switch (routeName) {
      case 'Home':
        iconName = focused ? 'home' : 'home-outline';
        break;
      case 'Courses':
        iconName = focused ? 'library' : 'library-outline';
        break;
      case 'Progress':
        iconName = focused ? 'bar-chart' : 'bar-chart-outline';
        break;
      case 'Profile':
        iconName = focused ? 'person' : 'person-outline';
        break;
      default:
        iconName = 'home-outline';
    }

    return <Icon name={iconName} size={size} color={color} />;
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) =>
          getTabBarIcon(route.name, focused, color, size),
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: isDarkMode ? colors.textSecondaryDark : colors.textSecondary,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginTop: 4,
        },
        tabBarStyle: {
          backgroundColor: isDarkMode ? colors.backgroundDark : colors.background,
          borderTopColor: isDarkMode ? colors.borderDark : colors.border,
          borderTopWidth: 1,
          height: Platform.OS === 'ios' ? 90 : 70,
          paddingBottom: Platform.OS === 'ios' ? 25 : 10,
          padding: 10,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 3,
        },
        tabBarItemStyle: {
          paddingVertical: 5,
        },
        headerStyle: {
          backgroundColor: isDarkMode ? colors.backgroundDark : colors.background,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: isDarkMode ? colors.borderDark : colors.border,
        },
        headerTintColor: isDarkMode ? colors.textPrimaryDark : colors.textPrimary,
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 18,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={ELearningHomePage}
        options={{
          headerTitle: 'Home',
          headerShown: false
        }}
      />
      <Tab.Screen
        name="Courses"
        component={CoursesScreen}
        options={{
          headerTitle: 'My Courses',
          headerShown: false
        }}
      />
      <Tab.Screen
        name="Progress"
        component={MyCoursesPage}
        options={{
          headerTitle: 'Progress',
          headerShown: false
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerTitle: 'Profile',
          headerShown: false
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;