import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Alert,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get("window");

export const ProfileScreen: React.FC = () => {
  const navigation = useNavigation();

  const handleNavigation = (screenName: string) => {
    switch (screenName) {
      case 'my-courses':
        navigation.navigate('MyCourses');
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
        navigation.navigate('HelpAndSupport');
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
            Alert.alert('Success', 'Logged out successfully!');
          }
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#007AFF" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>

        {/* Header with Profile */}
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
              <Ionicons name="pencil-outline" size={18} color="#fff" />
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

          <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigation('my-courses')}>
            <View style={[styles.menuIcon, { backgroundColor: '#E8F4FF' }]}>
              <Ionicons name="book-outline" size={22} color="#007AFF" />
            </View>
            <Text style={styles.menuText}>My Courses</Text>
            <Ionicons name="chevron-forward" size={22} color="#C7C7CC" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigation('downloads')}>
            <View style={[styles.menuIcon, { backgroundColor: '#E6F7EE' }]}>
              <Ionicons name="download-outline" size={22} color="#34C759" />
            </View>
            <Text style={styles.menuText}>Login</Text>
            <Ionicons name="chevron-forward" size={22} color="#C7C7CC" />
          </TouchableOpacity>

          <Text style={styles.menuSectionTitle}>Preferences</Text>

          <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigation('settings')}>
            <View style={[styles.menuIcon, { backgroundColor: '#F4F4F8' }]}>
              <Ionicons name="settings-outline" size={22} color="#8E8E93" />
            </View>
            <Text style={styles.menuText}>Settings</Text>
            <Ionicons name="chevron-forward" size={22} color="#C7C7CC" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigation('notifications')}>
            <View style={[styles.menuIcon, { backgroundColor: '#E8F4FF' }]}>
              <Ionicons name="notifications-outline" size={22} color="#007AFF" />
            </View>
            <Text style={styles.menuText}>Notifications</Text>
            <Ionicons name="chevron-forward" size={22} color="#C7C7CC" />
          </TouchableOpacity>

          <Text style={styles.menuSectionTitle}>Support</Text>

          <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigation('support')}>
            <View style={[styles.menuIcon, { backgroundColor: '#FFF2E8' }]}>
              <Ionicons name="help-circle-outline" size={22} color="#FF9500" />
            </View>
            <Text style={styles.menuText}>Help & Support</Text>
            <Ionicons name="chevron-forward" size={22} color="#C7C7CC" />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuItem, styles.logoutItem]} onPress={handleLogout}>
            <View style={[styles.menuIcon, { backgroundColor: '#FFECEB' }]}>
              <Ionicons name="log-out-outline" size={22} color="#FF3B30" />
            </View>
            <Text style={[styles.menuText, styles.logoutText]}>Logout</Text>
            <Ionicons name="chevron-forward" size={22} color="#C7C7CC" />
          </TouchableOpacity>
        </View>
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
    height: 300,
    marginBottom: 70,
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: "65%",
    backgroundColor: '#007AFF',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  profileSection: {
    position: 'absolute',
    bottom: -40,
    left: 20,
    right: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 3,
  },
  profileImage: {
    width: width * 0.3,
    height: width * 0.3,
    borderRadius: width * 0.15,
    borderWidth: 4,
    borderColor: '#fff',
    marginTop: -60,
    marginBottom: 15,
    backgroundColor: '#f0f0f0',
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  email: {
    fontSize: 15,
    color: '#666',
    marginBottom: 15,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  statsCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 24,
    borderRadius: 16,
    paddingVertical: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 3,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#007AFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: '#8E8E93',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#E5E5EA',
    height: '65%',
    alignSelf: 'center',
  },
  menuContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 3,
  },
  menuSectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#8E8E93',
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 8,
    backgroundColor: '#FAFAFA',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  menuIcon: {
    width: 38,
    height: 38,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#1C1C1E',
    marginLeft: 15,
    fontWeight: '500',
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
    fontSize: 13,
    marginBottom: 25,
  },
});
