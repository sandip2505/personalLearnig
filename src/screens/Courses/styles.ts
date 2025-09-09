// src/screens/Courses/styles.ts
import { StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';

export const getStyles = (isDarkMode: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isDarkMode ? colors.backgroundDark : colors.background,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: isDarkMode ? colors.textPrimaryDark : colors.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: isDarkMode ? colors.textSecondaryDark : colors.textSecondary,
    marginBottom: 24,
  },
  coursesList: {
    marginBottom: 20,
  },
  messageCard: {
    backgroundColor: isDarkMode ? colors.cardBackgroundDark : colors.cardBackground,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  messageText: {
    fontSize: 16,
    color: isDarkMode ? colors.textSecondaryDark : colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
});
