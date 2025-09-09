import React from 'react';
import { View, Text, TouchableOpacity, useColorScheme, StyleSheet } from 'react-native';
import { colors } from '../../../constants/colors';

interface Course {
  id: string;
  title: string;
  description: string;
  progress: number;
  duration: string;
  level: string;
}

interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const isDarkMode = useColorScheme() === 'dark';

  const cardStyle = {
    backgroundColor: isDarkMode ? colors.cardBackgroundDark : colors.cardBackground,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  };

  const titleStyle = {
    fontSize: 18,
    fontWeight: '600' as const,
    color: isDarkMode ? colors.textPrimaryDark : colors.textPrimary,
    marginBottom: 8,
  };

  const descriptionStyle = {
    fontSize: 14,
    color: isDarkMode ? colors.textSecondaryDark : colors.textSecondary,
    marginBottom: 16,
    lineHeight: 20,
  };

  const metaContainerStyle = {
    flexDirection: 'row' as const,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  };

  const metaTextStyle = {
    fontSize: 12,
    color: isDarkMode ? colors.textSecondaryDark : colors.textSecondary,
  };

  const progressContainerStyle = {
    marginBottom: 16,
  };

  const progressLabelStyle = {
    fontSize: 12,
    color: isDarkMode ? colors.textSecondaryDark : colors.textSecondary,
    marginBottom: 8,
  };

  const progressBarStyle = {
    height: 4,
    backgroundColor: isDarkMode ? colors.borderDark : colors.border,
    borderRadius: 2,
    overflow: 'hidden' as const,
  };

  const progressFillStyle = {
    height: '100%',
    backgroundColor: colors.primary,
    width: `${course.progress}%`,
  };

  const buttonStyle = {
    backgroundColor: course.progress > 0 ? colors.primary : colors.secondary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center' as const,
  };

  const buttonTextStyle = {
    color: '#FFFFFF',
    fontWeight: '600' as const,
  };

  return (
    <TouchableOpacity style={cardStyle}>
      <Text style={titleStyle}>{course.title}</Text>
      <Text style={descriptionStyle}>{course.description}</Text>

      <View style={styles.metaContainer}>
        <Text style={styles.metaText}>⏱️ {course.duration}</Text>
        <Text style={styles.metaText}>📊 {course.level}</Text>
      </View>
      
      {course.progress > 0 && (
        <View style={styles.progressContainer}>
          <Text style={styles.progressLabel}>Progress: {course.progress}%</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${course.progress}%` }]} />
          </View>
        </View>
      )}
      
      <TouchableOpacity style={buttonStyle}>
        <Text style={buttonTextStyle}>
          {course.progress > 0 ? 'Continue' : 'Start Course'}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

// style 
const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    marginBottom: 16,
    lineHeight: 20,
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  metaText: {
    fontSize: 12,
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressLabel: {
    fontSize: 12,
    marginBottom: 8,
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});