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
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: isDarkMode ? colors.textPrimaryDark : colors.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: isDarkMode ? colors.textSecondaryDark : colors.textSecondary,
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: isDarkMode ? colors.cardBackgroundDark : colors.cardBackground,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: isDarkMode ? colors.textSecondaryDark : colors.textSecondary,
  },
  messageCard: {
    backgroundColor: isDarkMode ? colors.cardBackgroundDark : colors.cardBackground,
    padding: 20,
    borderRadius: 16,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  messageTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: isDarkMode ? colors.textPrimaryDark : colors.textPrimary,
    marginBottom: 8,
  },
  messageText: {
    fontSize: 16,
    color: isDarkMode ? colors.textSecondaryDark : colors.textSecondary,
    lineHeight: 22,
  },
});