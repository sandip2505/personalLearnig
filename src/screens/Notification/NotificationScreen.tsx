import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

// Dummy notification data
const notificationsData = [
  {
    id: '1',
    type: 'course_update',
    title: 'New Lesson Added',
    message: 'A new lesson "Advanced React Hooks" has been added to your React Native Development course.',
    course: 'React Native Development',
    time: '2 minutes ago',
    isRead: false,
    icon: 'play-circle',
    iconColor: '#007AFF',
    iconBg: '#E3F2FD',
  },
  {
    id: '2',
    type: 'assignment',
    title: 'Assignment Due Soon',
    message: 'Your assignment "Color Theory Project" for Graphic Design Fundamentals is due in 2 days.',
    course: 'Graphic Design Fundamentals',
    time: '1 hour ago',
    isRead: false,
    icon: 'document-text',
    iconColor: '#FF9500',
    iconBg: '#FFF3E0',
  },
  {
    id: '3',
    type: 'achievement',
    title: 'Congratulations! 🎉',
    message: 'You\'ve completed 75% of your Web Development Bootcamp. Keep up the great work!',
    course: 'Complete Web Development Bootcamp',
    time: '3 hours ago',
    isRead: false,
    icon: 'trophy',
    iconColor: '#FFD700',
    iconBg: '#FFFBF0',
  },
  {
    id: '4',
    type: 'live_class',
    title: 'Live Class Starting Soon',
    message: 'Your live Q&A session with Sarah Johnson starts in 30 minutes. Don\'t forget to join!',
    course: 'Web Development Q&A',
    time: '4 hours ago',
    isRead: true,
    icon: 'videocam',
    iconColor: '#34C759',
    iconBg: '#E8F5E8',
  },
  {
    id: '5',
    type: 'reminder',
    title: 'Study Reminder',
    message: 'Time for your daily learning! You have 2 pending lessons in your learning queue.',
    time: '1 day ago',
    isRead: true,
    icon: 'time',
    iconColor: '#007AFF',
    iconBg: '#E3F2FD',
  },
  {
    id: '6',
    type: 'course_complete',
    title: 'Course Completed! 🎊',
    message: 'Fantastic! You\'ve successfully completed "UI/UX Design Masterclass". Your certificate is ready.',
    course: 'UI/UX Design Masterclass',
    time: '2 days ago',
    isRead: true,
    icon: 'medal',
    iconColor: '#FF6B6B',
    iconBg: '#FFE8E8',
  },
  {
    id: '7',
    type: 'payment',
    title: 'Payment Successful',
    message: 'Your enrollment for "Python for Data Science" has been confirmed. Happy learning!',
    course: 'Python for Data Science',
    time: '3 days ago',
    isRead: true,
    icon: 'card',
    iconColor: '#4ECDC4',
    iconBg: '#E8F8F7',
  },
  {
    id: '8',
    type: 'social',
    title: 'New Comment on Discussion',
    message: 'Mike Chen replied to your question in the "React Best Practices" discussion forum.',
    course: 'React Native Development',
    time: '5 days ago',
    isRead: true,
    icon: 'chatbubble',
    iconColor: '#9C27B0',
    iconBg: '#F3E5F5',
  },
];

const NotificationScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState(notificationsData);
  const [filter, setFilter] = useState('all'); // all, unread, read

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread') return !notification.isRead;
    if (filter === 'read') return notification.isRead;
    return true;
  });

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const deleteNotification = (id) => {
    Alert.alert(
      'Delete Notification',
      'Are you sure you want to delete this notification?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setNotifications(prev => prev.filter(n => n.id !== id));
          }
        }
      ]
    );
  };

  const handleNotificationPress = (notification) => {
    if (!notification.isRead) {
      markAsRead(notification.id);
    }

    // Handle navigation based on notification type
    switch (notification.type) {
      case 'course_update':
      case 'live_class':
        navigation.navigate('Course', { id: notification.course });
        break;
      case 'assignment':
        navigation.navigate('Assignment', { id: notification.id });
        break;
      case 'achievement':
      case 'course_complete':
        navigation.navigate('Achievements');
        break;
      default:
        break;
    }
  };

  const clearAllNotifications = () => {
    Alert.alert(
      'Clear All Notifications',
      'Are you sure you want to delete all notifications? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: () => setNotifications([])
        }
      ]
    );
  };

  const renderFilterButton = (filterType, label) => (
    <TouchableOpacity
      style={[styles.filterButton, filter === filterType && styles.filterButtonActive]}
      onPress={() => setFilter(filterType)}
    >
      <Text style={[styles.filterText, filter === filterType && styles.filterTextActive]}>
        {label}
      </Text>
      {filterType === 'unread' && unreadCount > 0 && (
        <View style={styles.filterBadge}>
          <Text style={styles.filterBadgeText}>{unreadCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  const renderNotificationItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.notificationCard, !item.isRead && styles.unreadCard]}
      onPress={() => handleNotificationPress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.notificationContent}>
        <View style={[styles.iconContainer, { backgroundColor: item.iconBg }]}>
          <Ionicons name={item.icon} size={24} color={item.iconColor} />
        </View>

        <View style={styles.textContent}>
          <View style={styles.titleRow}>
            <Text style={[styles.notificationTitle, !item.isRead && styles.unreadTitle]}>
              {item.title}
            </Text>
            {!item.isRead && <View style={styles.unreadDot} />}
          </View>
          
          <Text style={styles.notificationMessage} numberOfLines={2}>
            {item.message}
          </Text>
          
          {item.course && (
            <Text style={styles.courseText}>{item.course}</Text>
          )}
          
          <Text style={styles.timeText}>{item.time}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteNotification(item.id)}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Ionicons name="close" size={18} color="#999" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIcon}>
        <Ionicons name="notifications-outline" size={64} color="#ccc" />
      </View>
      <Text style={styles.emptyTitle}>
        {filter === 'unread' ? 'No Unread Notifications' : 
         filter === 'read' ? 'No Read Notifications' : 
         'No Notifications'}
      </Text>
      <Text style={styles.emptyMessage}>
        {filter === 'unread' ? 
          'All caught up! You have no unread notifications.' :
          filter === 'read' ?
          'No read notifications to show.' :
          'We\'ll notify you when something important happens.'
        }
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Notifications</Text>
        </View>
        
        {notifications.length > 0 && (
          <View style={styles.headerRight}>
            {unreadCount > 0 && (
              <TouchableOpacity style={styles.headerAction} onPress={markAllAsRead}>
                <Text style={styles.headerActionText}>Mark all read</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.headerIcon} onPress={clearAllNotifications}>
              <Ionicons name="trash-outline" size={22} color="#666" />
            </TouchableOpacity>
          </View>
        )}
      </View>

      {notifications.length > 0 ? (
        <>
          {/* Filter Tabs */}
          <View style={styles.filterContainer}>
            {renderFilterButton('all', 'All')}
            {renderFilterButton('unread', 'Unread')}
            {renderFilterButton('read', 'Read')}
          </View>

          {/* Notifications List */}
          <FlatList
            data={filteredNotifications}
            renderItem={renderNotificationItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
            ListEmptyComponent={renderEmptyState}
          />
        </>
      ) : (
        renderEmptyState()
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'white',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    marginRight: 15,
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerAction: {
    marginRight: 15,
  },
  headerActionText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
  },
  headerIcon: {
    padding: 5,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    marginRight: 10,
  },
  filterButtonActive: {
    backgroundColor: '#007AFF',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  filterTextActive: {
    color: 'white',
  },
  filterBadge: {
    backgroundColor: '#FF6B6B',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6,
  },
  filterBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
  listContainer: {
    flexGrow: 1,
    paddingVertical: 10,
  },
  notificationCard: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginVertical: 5,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  unreadCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  notificationContent: {
    flexDirection: 'row',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  textContent: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  unreadTitle: {
    fontWeight: 'bold',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#007AFF',
    marginLeft: 8,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 8,
  },
  courseText: {
    fontSize: 13,
    color: '#007AFF',
    fontWeight: '600',
    marginBottom: 6,
  },
  timeText: {
    fontSize: 12,
    color: '#999',
  },
  deleteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 8,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  emptyIcon: {
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  emptyMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
});

export default NotificationScreen;