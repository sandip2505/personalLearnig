import React from 'react';
import { View, Text, TouchableOpacity, useColorScheme } from 'react-native';
import { colors } from '../../../constants/colors';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../../navigation/RootNavigator';
export const WelcomeCard: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const cardStyles = {
    backgroundColor: colors.primary,
    padding: 20,
    borderRadius: 16,
    marginVertical: 20,
  };

  const titleStyle = {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600' as const,
    marginBottom: 8,
  };

  const subtitleStyle = {
    color: '#FFFFFF',
    fontSize: 16,
    opacity: 0.9,
    marginBottom: 16,
  };

  const buttonStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    alignSelf: 'flex-start' as const,
  };

  const buttonTextStyle = {
    color: '#FFFFFF',
    fontWeight: '600' as const,
  };

  return (
    <View style={cardStyles}>
      <Text style={titleStyle}>Continue Learning</Text>
      <Text style={subtitleStyle}>
        You have 3 courses in progress. Pick up where you left off!
      </Text>
      <TouchableOpacity
        style={buttonStyle}
        onPress={() =>
          navigation.navigate('CourseDetails', { courseId: 'course123' })
        }
      >
        <Text style={buttonTextStyle}>View Courses</Text>
      </TouchableOpacity>
    </View>
  );
};
