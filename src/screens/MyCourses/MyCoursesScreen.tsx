import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

// Dummy data for enrolled courses
const myCoursesData = [
  {
    id: '1',
    title: 'Complete Web Development Bootcamp',
    instructor: 'Sarah Johnson',
    image: 'https://img-c.udemycdn.com/course/750x422/548278_b005_9.jpg',
    category: 'Technology',
    progress: 0.75,
    totalLessons: 24,
    completedLessons: 18,
    duration: '42 hours',
    level: 'Intermediate',
    rating: 4.8,
    enrolledDate: '2024-01-15',
    lastAccessed: '2 hours ago',
    nextLesson: 'Advanced React Patterns',
    status: 'in_progress',
    downloadedLessons: 5,
    certificate: false,
  },
  {
    id: '2',
    title: 'UI/UX Design Masterclass',
    instructor: 'Mike Chen',
    image: 'https://img.freepik.com/free-vector/gradient-ui-ux-background_23-2149052117.jpg',
    category: 'Design',
    progress: 1.0,
    totalLessons: 16,
    completedLessons: 16,
    duration: '28 hours',
    level: 'Advanced',
    rating: 4.9,
    enrolledDate: '2023-12-10',
    lastAccessed: '1 week ago',
    nextLesson: null,
    status: 'completed',
    downloadedLessons: 8,
    certificate: true,
  },
  {
    id: '3',
    title: 'React Native Development',
    instructor: 'John Smith',
    image: 'https://miro.medium.com/v2/resize:fit:1200/1*y6C4nSvy2Woe0m7bWEn4BA.png',
    category: 'Technology',
    progress: 0.45,
    totalLessons: 32,
    completedLessons: 14,
    duration: '56 hours',
    level: 'Intermediate',
    rating: 4.7,
    enrolledDate: '2024-02-20',
    lastAccessed: '1 day ago',
    nextLesson: 'Navigation with React Navigation',
    status: 'in_progress',
    downloadedLessons: 3,
    certificate: false,
  },
  {
    id: '4',
    title: 'Digital Marketing Strategy',
    instructor: 'Emma Davis',
    image: 'https://www.simplilearn.com/ice9/free_resources_article_thumb/What_is_digital_marketing.jpg',
    category: 'Marketing',
    progress: 0.20,
    totalLessons: 20,
    completedLessons: 4,
    duration: '35 hours',
    level: 'Beginner',
    rating: 4.6,
    enrolledDate: '2024-03-01',
    lastAccessed: '3 days ago',
    nextLesson: 'Social Media Marketing Fundamentals',
    status: 'in_progress',
    downloadedLessons: 1,
    certificate: false,
  },
  {
    id: '5',
    title: 'Python for Data Science',
    instructor: 'Dr. Alex Morgan',
    image: 'https://media.geeksforgeeks.org/wp-content/cdn-uploads/20230318230239/Python-Data-Science-Tutorial.jpg',
    category: 'Technology',
    progress: 0.90,
    totalLessons: 28,
    completedLessons: 25,
    duration: '45 hours',
    level: 'Advanced',
    rating: 4.8,
    enrolledDate: '2023-11-05',
    lastAccessed: '5 hours ago',
    nextLesson: 'Machine Learning with Scikit-learn',
    status: 'in_progress',
    downloadedLessons: 12,
    certificate: false,
  },
  {
    id: '6',
    title: 'Graphic Design Fundamentals',
    instructor: 'Lisa Parker',
    image: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1440,h=756,fit=crop,f=jpeg/YleqW8eqJrFgg956/social-share-1920x1080-3-A85EG14X87iaEK49.jpg',
    category: 'Design',
    progress: 0.60,
    totalLessons: 18,
    completedLessons: 11,
    duration: '32 hours',
    level: 'Beginner',
    rating: 4.5,
    enrolledDate: '2024-01-28',
    lastAccessed: '2 weeks ago',
    nextLesson: 'Typography and Layout Design',
    status: 'in_progress',
    downloadedLessons: 2,
    certificate: false,
  },
];

const MyCoursesScreen = ({ navigation }) => {
  const [courses, setCourses] = useState(myCoursesData);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all'); // all, in_progress, completed
  const [sortBy, setSortBy] = useState('recent'); // recent, progress, alphabetical

  // Filter and search logic
  const getFilteredCourses = () => {
    let filtered = courses;

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply status filter
    if (filter !== 'all') {
      filtered = filtered.filter(course => course.status === filter);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'progress':
          return b.progress - a.progress;
        case 'alphabetical':
          return a.title.localeCompare(b.title);
        case 'recent':
        default:
          return new Date(b.enrolledDate) - new Date(a.enrolledDate);
      }
    });

    return filtered;
  };

  const filteredCourses = getFilteredCourses();

  // Statistics
  const stats = {
    total: courses.length,
    inProgress: courses.filter(c => c.status === 'in_progress').length,
    completed: courses.filter(c => c.status === 'completed').length,
    certificates: courses.filter(c => c.certificate).length,
    totalHours: courses.reduce((sum, course) => sum + parseInt(course.duration), 0),
  };

  const handleCoursePress = (course) => {
    navigation.navigate('CourseDetails', { courseId: course.id, course });
  };

  const handleContinueLearning = (course) => {
    navigation.navigate('CourseLessons', { courseId: course.id, course });
  };

  const handleDownloadCourse = (courseId) => {
    Alert.alert('Download Course', 'This feature will allow offline course access');
  };

  const handleRemoveCourse = (courseId) => {
    Alert.alert(
      'Remove Course',
      'Are you sure you want to remove this course from your library?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            setCourses(prev => prev.filter(c => c.id !== courseId));
          }
        }
      ]
    );
  };

  const renderFilterButton = (filterType, label, count) => (
    <TouchableOpacity
      style={[styles.filterButton, filter === filterType && styles.filterButtonActive]}
      onPress={() => setFilter(filterType)}
    >
      <Text style={[styles.filterText, filter === filterType && styles.filterTextActive]}>
        {label}
      </Text>
      {count !== undefined && (
        <View style={[styles.filterBadge, filter === filterType && styles.filterBadgeActive]}>
          <Text style={[styles.filterBadgeText, filter === filterType && styles.filterBadgeTextActive]}>
            {count}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );

  const renderCourseItem = ({ item }) => (
    <TouchableOpacity
      style={styles.courseCard}
      onPress={() => handleCoursePress(item)}
      activeOpacity={0.7}
    >
      <Image source={{ uri: item.image }} style={styles.courseImage} />
      
      {/* Course Status Badge */}
      <View style={[styles.statusBadge, item.status === 'completed' && styles.completedBadge]}>
        <Ionicons
          name={item.status === 'completed' ? 'checkmark-circle' : 'play-circle'}
          size={12}
          color="white"
        />
        <Text style={styles.statusText}>
          {item.status === 'completed' ? 'Completed' : 'In Progress'}
        </Text>
      </View>

      <View style={styles.courseContent}>
        <Text style={styles.categoryLabel}>{item.category}</Text>
        <Text style={styles.courseTitle} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.instructorText}>by {item.instructor}</Text>

        {/* Progress Section */}
        <View style={styles.progressSection}>
          <View style={styles.progressInfo}>
            <Text style={styles.progressText}>
              {item.completedLessons}/{item.totalLessons} lessons
            </Text>
            <Text style={styles.progressPercent}>
              {Math.round(item.progress * 100)}%
            </Text>
          </View>
          <View style={styles.progressBar}>
            <View
              style={[styles.progressFill, { width: `${item.progress * 100}%` }]}
            />
          </View>
        </View>

        {/* Course Info */}
        <View style={styles.courseInfo}>
          <View style={styles.infoItem}>
            <Ionicons name="time-outline" size={14} color="#666" />
            <Text style={styles.infoText}>{item.duration}</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="bar-chart-outline" size={14} color="#666" />
            <Text style={styles.infoText}>{item.level}</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={styles.infoText}>{item.rating}</Text>
          </View>
          {item.downloadedLessons > 0 && (
            <View style={styles.infoItem}>
              <Ionicons name="download" size={14} color="#007AFF" />
              <Text style={[styles.infoText, { color: '#007AFF' }]}>
                {item.downloadedLessons}
              </Text>
            </View>
          )}
        </View>

        {/* Next Lesson or Certificate */}
        {item.status === 'completed' ? (
          <View style={styles.certificateSection}>
            <Ionicons name="medal" size={16} color="#FFD700" />
            <Text style={styles.certificateText}>
              {item.certificate ? 'Certificate Available' : 'Certificate Pending'}
            </Text>
          </View>
        ) : (
          <Text style={styles.nextLesson} numberOfLines={1}>
            Next: {item.nextLesson}
          </Text>
        )}

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => handleContinueLearning(item)}
          >
            <Text style={styles.primaryButtonText}>
              {item.status === 'completed' ? 'Review' : 'Continue'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => handleDownloadCourse(item.id)}
          >
            <Ionicons name="download-outline" size={16} color="#007AFF" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => handleRemoveCourse(item.id)}
          >
            <Ionicons name="trash-outline" size={16} color="#FF6B6B" />
          </TouchableOpacity>
        </View>

        <Text style={styles.lastAccessed}>Last accessed: {item.lastAccessed}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderStatsCard = () => (
    <View style={styles.statsCard}>
      <Text style={styles.statsTitle}>Learning Progress</Text>
      <View style={styles.statsGrid}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{stats.total}</Text>
          <Text style={styles.statLabel}>Total Courses</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{stats.inProgress}</Text>
          <Text style={styles.statLabel}>In Progress</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{stats.completed}</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{stats.totalHours}h</Text>
          <Text style={styles.statLabel}>Learning Hours</Text>
        </View>
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIcon}>
        <Ionicons name="school-outline" size={64} color="#ccc" />
      </View>
      <Text style={styles.emptyTitle}>
        {searchQuery ? 'No courses found' : 'No enrolled courses'}
      </Text>
      <Text style={styles.emptyMessage}>
        {searchQuery
          ? `No courses match "${searchQuery}". Try a different search term.`
          : 'Start learning by enrolling in courses from our catalog.'
        }
      </Text>
      {!searchQuery && (
        <TouchableOpacity
          style={styles.browseButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.browseButtonText}>Browse Courses</Text>
        </TouchableOpacity>
      )}
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
          <Text style={styles.headerTitle}>My Courses</Text>
        </View>
        
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="search" size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerIcon}
            onPress={() => setSortBy(sortBy === 'recent' ? 'progress' : sortBy === 'progress' ? 'alphabetical' : 'recent')}
          >
            <Ionicons name="funnel-outline" size={22} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Stats Card */}
        {courses.length > 0 && renderStatsCard()}

        {/* Search Bar */}
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search your courses..."
              placeholderTextColor="#999"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close" size={20} color="#999" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Filter Tabs */}
        <View style={styles.filterContainer}>
          {renderFilterButton('all', 'All', stats.total)}
          {renderFilterButton('in_progress', 'In Progress', stats.inProgress)}
          {renderFilterButton('completed', 'Completed', stats.completed)}
        </View>

        {/* Sort Info */}
        <View style={styles.sortInfo}>
          <Text style={styles.sortText}>
            {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''} • 
            Sorted by {sortBy === 'recent' ? 'Recently Enrolled' : 
                      sortBy === 'progress' ? 'Progress' : 'Name'}
          </Text>
        </View>

        {/* Courses List */}
        {filteredCourses.length > 0 ? (
          <FlatList
            data={filteredCourses}
            renderItem={renderCourseItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            contentContainerStyle={styles.listContainer}
          />
        ) : (
          renderEmptyState()
        )}
      </ScrollView>
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
  headerIcon: {
    marginLeft: 15,
    padding: 5,
  },
  statsCard: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginTop: 15,
    padding: 20,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 3,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  searchSection: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
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
    backgroundColor: '#ddd',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6,
  },
  filterBadgeActive: {
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  filterBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666',
  },
  filterBadgeTextActive: {
    color: 'white',
  },
  sortInfo: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  sortText: {
    fontSize: 14,
    color: '#666',
  },
  listContainer: {
    paddingBottom: 20,
  },
  courseCard: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginVertical: 8,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  courseImage: {
    width: '100%',
    height: 150,
    backgroundColor: '#f0f0f0',
  },
  statusBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  completedBadge: {
    backgroundColor: '#34C759',
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    color: 'white',
    marginLeft: 3,
  },
  courseContent: {
    padding: 15,
  },
  categoryLabel: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: 5,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    lineHeight: 22,
  },
  instructorText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  progressSection: {
    marginBottom: 12,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
  },
  progressPercent: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 3,
  },
  courseInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  infoText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 3,
  },
  certificateSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  certificateText: {
    fontSize: 14,
    color: '#FFD700',
    fontWeight: '600',
    marginLeft: 6,
  },
  nextLesson: {
    fontSize: 14,
    color: '#007AFF',
    marginBottom: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  primaryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 10,
    flex: 1,
  },
  primaryButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'center',
  },
  secondaryButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  lastAccessed: {
    fontSize: 12,
    color: '#999',
    textAlign: 'right',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingVertical: 60,
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
    marginBottom: 30,
  },
  browseButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  browseButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default MyCoursesScreen;