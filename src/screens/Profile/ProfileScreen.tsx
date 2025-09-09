import React from 'react';
import { 
  Image, 
  SafeAreaView, 
  ScrollView, 
  StatusBar, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View,
  Alert
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

export const ProfileScreen: React.FC = () => {
  const navigation = useNavigation();

  const handleNavigation = (screenName: string) => {
    // Replace with your actual screen names
    switch (screenName) {
      case 'my-courses':
        navigation.navigate('MyCourses');
        break;
      case 'achievements':
        navigation.navigate('Achievements');
        break;
      case 'downloads':
        navigation.navigate('Login');
        break;
      case 'settings':
        navigation.navigate('Settings');
        break;
      case 'notifications':
        navigation.navigate('Notifications');
        break;
      case 'support':
        navigation.navigate('Support');
        break;
      case 'privacy':
        navigation.navigate('Privacy');
        break;
      case 'terms':
        navigation.navigate('Terms');
        break;
      default:
        Alert.alert('Navigation', `${screenName} screen coming soon!`);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: () => {
            // Handle logout logic here
            // navigation.navigate('Login');
            Alert.alert('Success', 'Logged out successfully!');
          }
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header with background */}
        <View style={styles.header}>
          <View style={styles.headerBackground} />
          <View style={styles.profileSection}>
            <Image
              source={{ uri: 'https://via.placeholder.com/120' }}
              style={styles.profileImage}
            />
            <Text style={styles.name}>John Doe</Text>
            <Text style={styles.email}>john.doe@example.com</Text>
            <TouchableOpacity 
              style={styles.editButton}
              onPress={() => Alert.alert('Edit Profile', 'Edit profile functionality coming soon!')}
            >
              <Ionicons name="pencil-outline" size={16} color="#fff" />
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats Card */}
        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Courses</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>85%</Text>
            <Text style={styles.statLabel}>Progress</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>24</Text>
            <Text style={styles.statLabel}>Certificates</Text>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          <Text style={styles.menuSectionTitle}>Account</Text>

          <TouchableOpacity 
            style={styles.menuItem} 
            onPress={() => handleNavigation('my-courses')}
          >
            <View style={[styles.menuIcon, { backgroundColor: '#E8F4FF' }]}>
              <Ionicons name="book-outline" size={20} color="#007AFF" />
            </View>
            <Text style={styles.menuText}>My Courses</Text>
            <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem} 
            onPress={() => handleNavigation('achievements')}
          >
            <View style={[styles.menuIcon, { backgroundColor: '#FFF2E8' }]}>
              <Ionicons name="trophy-outline" size={20} color="#FF9500" />
            </View>
            <Text style={styles.menuText}>Achievements</Text>
            <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem} 
            onPress={() => handleNavigation('downloads')}
          >
            <View style={[styles.menuIcon, { backgroundColor: '#E6F7EE' }]}>
              <Ionicons name="download-outline" size={20} color="#34C759" />
            </View>
            <Text style={styles.menuText}>Login</Text>
            <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
          </TouchableOpacity>

          <Text style={styles.menuSectionTitle}>Preferences</Text>

          <TouchableOpacity 
            style={styles.menuItem} 
            onPress={() => handleNavigation('settings')}
          >
            <View style={[styles.menuIcon, { backgroundColor: '#F4F4F8' }]}>
              <Ionicons name="settings-outline" size={20} color="#8E8E93" />
            </View>
            <Text style={styles.menuText}>Settings</Text>
            <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem} 
            onPress={() => handleNavigation('notifications')}
          >
            <View style={[styles.menuIcon, { backgroundColor: '#E8F4FF' }]}>
              <Ionicons name="notifications-outline" size={20} color="#007AFF" />
            </View>
            <Text style={styles.menuText}>Notifications</Text>
            <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
          </TouchableOpacity>

          <Text style={styles.menuSectionTitle}>Support</Text>

          <TouchableOpacity 
            style={styles.menuItem} 
            onPress={() => handleNavigation('support')}
          >
            <View style={[styles.menuIcon, { backgroundColor: '#FFF2E8' }]}>
              <Ionicons name="help-circle-outline" size={20} color="#FF9500" />
            </View>
            <Text style={styles.menuText}>Help & Support</Text>
            <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem} 
            onPress={() => handleNavigation('privacy')}
          >
            <View style={[styles.menuIcon, { backgroundColor: '#F4F4F8' }]}>
              <Ionicons name="shield-checkmark-outline" size={20} color="#8E8E93" />
            </View>
            <Text style={styles.menuText}>Privacy Policy</Text>
            <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem} 
            onPress={() => handleNavigation('terms')}
          >
            <View style={[styles.menuIcon, { backgroundColor: '#F4F4F8' }]}>
              <Ionicons name="document-text-outline" size={20} color="#8E8E93" />
            </View>
            <Text style={styles.menuText}>Terms of Service</Text>
            <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.menuItem, styles.logoutItem]}
            onPress={handleLogout}
          >
            <View style={[styles.menuIcon, { backgroundColor: '#FFECEB' }]}>
              <Ionicons name="log-out-outline" size={20} color="#FF3B30" />
            </View>
            <Text style={[styles.menuText, styles.logoutText]}>Logout</Text>
            <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
          </TouchableOpacity>
        </View>

        <Text style={styles.versionText}>App Version 2.4.1</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    position: 'relative',
    height: 200,
    marginBottom: 80,
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 140,
    backgroundColor: '#007AFF',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  profileSection: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 16,
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#fff',
    marginTop: -80,
    marginBottom: 15,
    backgroundColor: '#f0f0f0',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 18,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 5,
  },
  statsCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 24,
    borderRadius: 16,
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.22,
    elevation: 3,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#8E8E93',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#E5E5EA',
    height: '70%',
    alignSelf: 'center',
  },
  menuContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.22,
    elevation: 3,
  },
  menuSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8E8E93',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: '#F9F9F9',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  menuIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    marginLeft: 15,
  },
  logoutItem: {
    borderBottomWidth: 0,
  },
  logoutText: {
    color: '#FF3B30',
  },
  versionText: {
    textAlign: 'center',
    color: '#8E8E93',
    fontSize: 14,
    marginBottom: 20,
  },
});