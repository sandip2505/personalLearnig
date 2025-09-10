import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';
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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

// Dummy Data
const categories = [
  { id: '1', name: 'Design', icon: 'laptop', color: '#FF6B6B', courses: 120 },
  { id: '2', name: 'Business', icon: 'business', color: '#007AFF', courses: 85 },
  { id: '3', name: 'Technology', icon: 'laptop', color: '#45B7D1', courses: 200 },
  { id: '4', name: 'Marketing', icon: 'trending-up', color: '#96CEB4', courses: 95 },
  { id: '5', name: 'Photography', icon: 'camera', color: '#FECA57', courses: 75 },
  { id: '6', name: 'Music', icon: 'musical-notes', color: '#FF9FF3', courses: 60 },
];

const featuredCourses = [
  {
    id: '1',
    title: 'Complete Web Development Bootcamp',
    instructor: 'Sarah Johnson',
    rating: 4.8,
    students: 12500,
    price: '₹499',
    image: 'https://img-c.udemycdn.com/course/750x422/548278_b005_9.jpg',
    category: 'Technology'
  },
  {
    id: '2',
    title: 'UI/UX Design Masterclass',
    instructor: 'Mike Chen',
    rating: 4.9,
    students: 8900,
    price: '₹999',
    image: 'https://img.freepik.com/free-vector/gradient-ui-ux-background_23-2149052117.jpg',
    category: 'Design'
  },
  {
    id: '3',
    title: 'Digital Marketing Strategy',
    instructor: 'Emma Davis',
    rating: 4.7,
    students: 6700,
    price: '₹569',
    image: 'https://www.simplilearn.com/ice9/free_resources_article_thumb/What_is_digital_marketing.jpg',
    category: 'Marketing'
  },
];

const continueLearning = [
  {
    id: '1',
    title: 'React Native Development',
    progress: 0.75,
    totalLessons: 24,
    completedLessons: 18,
    nextLesson: 'State Management with Redux'
  },
  {
    id: '2',
    title: 'Graphic Design Fundamentals',
    progress: 0.45,
    totalLessons: 16,
    completedLessons: 7,
    nextLesson: 'Color Theory and Psychology'
  },
];

const recommendedCourses = [
  {
    id: '1',
    title: 'Python for Data Science',
    instructor: 'Dr. Alex Morgan',
    rating: 4.6,
    duration: '12 weeks',
    level: 'Intermediate',
    image: 'https://media.geeksforgeeks.org/wp-content/cdn-uploads/20230318230239/Python-Data-Science-Tutorial.jpg'
  },
  {
    id: '2',
    title: 'Advanced Photography',
    instructor: 'Lisa Parker',
    rating: 4.8,
    duration: '8 weeks',
    level: 'Advanced',
    image: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1440,h=756,fit=crop,f=jpeg/YleqW8eqJrFgg956/social-share-1920x1080-3-A85EG14X87iaEK49.jpg'
  },
  {
    id: '3',
    title: 'Business Strategy',
    instructor: 'Robert Kim',
    rating: 4.7,
    duration: '10 weeks',
    level: 'Beginner',
    image: 'https://media.geeksforgeeks.org/wp-content/uploads/20240223125319/Business-Strategy-copy.webp'
  },
];

const trendingCourses = [
  { id: '1', title: 'AI & Machine Learning', growth: '+245%', students: 15600 },
  { id: '2', title: 'Blockchain Development', growth: '+189%', students: 8900 },
  { id: '3', title: 'Mobile App Design', growth: '+156%', students: 12300 },
  { id: '4', title: 'Digital Art Creation', growth: '+134%', students: 7800 },
];

const upcomingClasses = [
  {
    id: '1',
    title: 'Live Q&A: Web Development',
    instructor: 'Sarah Johnson',
    time: '2:00 PM',
    date: 'Today',
    participants: 234
  },
  {
    id: '2',
    title: 'Design Workshop: Figma Basics',
    instructor: 'Mike Chen',
    time: '4:30 PM',
    date: 'Tomorrow',
    participants: 156
  },
];

const communityStats = {
  totalStudents: '250K+',
  activeCourses: '1.2K+',
  instructors: '500+',
  completionRate: '89%'
};

const ELearningHomePage = ({ navigation }) => {
  const navigateTo = (route, params) => {
    navigation.navigate(route, params);
  };

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity style={[styles.categoryCard, { backgroundColor: item.color + '20' }]} onPress={() => navigateTo('Category')}>
      <View style={[styles.categoryIcon, { backgroundColor: item.color }]}>
        <Ionicons name={item.icon} size={24} color="white" />
      </View>
      <Text style={styles.categoryName}>{item.name}</Text>
      <Text style={styles.categoryCount}>{item.courses} courses</Text>
    </TouchableOpacity>
  );

  const renderFeaturedCourse = ({ item }) => (
    <TouchableOpacity style={styles.featuredCard} onPress={() => navigateTo('Course', { id: item.id })}>
      <Image source={{ uri: item.image }} style={styles.featuredImage} />
      <View style={styles.featuredContent}>
        <View style={styles.featuredCategory}>
          <Text style={styles.categoryLabel}>{item.category}</Text>
        </View>
        <Text style={styles.featuredTitle}>{item.title}</Text>
        <Text style={styles.instructor}>by {item.instructor}</Text>
        <View style={styles.courseStats}>
          <View style={styles.rating}>
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
          <Text style={styles.students}>{item.students.toLocaleString()} students</Text>
        </View>
        <Text style={styles.price}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderContinueLearningItem = ({ item }) => (
    <TouchableOpacity style={styles.continueCard} onPress={() => navigateTo('CourseLessons')}>
      <View style={styles.continueHeader}>
        <Text style={styles.continueTitle}>{item.title}</Text>
        <Text style={styles.continueProgress}>
          {item.completedLessons}/{item.totalLessons} lessons
        </Text>
      </View>
      <View style={styles.progressContainer}>
        <View style={styles.progressBg}>
          <View style={[styles.progressFill, { width: `${item.progress * 100}%` }]} />
        </View>
        <Text style={styles.progressPercent}>{Math.round(item.progress * 100)}%</Text>
      </View>
      <Text style={styles.nextLesson}>Next: {item.nextLesson}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.logo}>EduLearn</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.headerIcon}>
              <Ionicons name="search" size={24} color="#333" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerIcon} onPress={() => navigateTo('Notification')}>
              <Ionicons name="notifications-outline" size={24} color="#333" />
              <View style={styles.notificationBadge} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Greeting Section */}
        <View style={styles.greetingSection}>
          <Text style={styles.greetingText}>Hello, John! 👋</Text>
          <Text style={styles.greetingSubtext}>What would you like to learn today?</Text>
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search courses, instructors..."
              placeholderTextColor="#999"
            />
          </View>
        </View>

        {/* Categories Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Browse Categories</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          />
        </View>

        {/* Featured Carousel */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Courses</Text>
            <TouchableOpacity onPress={() => navigateTo('Course')}>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={featuredCourses}
            renderItem={renderFeaturedCourse}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featuredList}
          />
        </View>

        {/* Continue Learning */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Continue Learning</Text>
          </View>
          <FlatList
            data={continueLearning}
            renderItem={renderContinueLearningItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </View>

        {/* Recommended Courses */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recommended for You</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>
          {recommendedCourses.map((course) => (
            <TouchableOpacity key={course.id} style={styles.recommendedCard}>
              <Image source={{ uri: course.image }} style={styles.recommendedImage} />
              <View style={styles.recommendedContent}>
                <Text style={styles.recommendedTitle}>{course.title}</Text>
                <Text style={styles.recommendedInstructor}>by {course.instructor}</Text>
                <View style={styles.recommendedStats}>
                  <View style={styles.rating}>
                    <Ionicons name="star" size={12} color="#FFD700" />
                    <Text style={styles.ratingTextSmall}>{course.rating}</Text>
                  </View>
                  <Text style={styles.duration}>{course.duration}</Text>
                  <View style={styles.levelBadge}>
                    <Text style={styles.levelText}>{course.level}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Trending Courses */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Trending Courses</Text>
          </View>
          {trendingCourses.map((course, index) => (
            <TouchableOpacity key={course.id} style={styles.trendingCard}>
              <View style={styles.trendingRank}>
                <Text style={styles.rankNumber}>{index + 1}</Text>
              </View>
              <View style={styles.trendingContent}>
                <Text style={styles.trendingTitle}>{course.title}</Text>
                <Text style={styles.trendingStats}>
                  {course.students.toLocaleString()} students
                </Text>
              </View>
              <View style={styles.growthBadge}>
                <Text style={styles.growthText}>{course.growth}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Upcoming Classes */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Live Classes</Text>
          </View>
          {upcomingClasses.map((classItem) => (
            <TouchableOpacity key={classItem.id} style={styles.upcomingCard}>
              <View style={styles.upcomingTime}>
                <Text style={styles.upcomingDate}>{classItem.date}</Text>
                <Text style={styles.upcomingTimeText}>{classItem.time}</Text>
              </View>
              <View style={styles.upcomingContent}>
                <Text style={styles.upcomingTitle}>{classItem.title}</Text>
                <Text style={styles.upcomingInstructor}>with {classItem.instructor}</Text>
                <Text style={styles.upcomingParticipants}>
                  {classItem.participants} registered
                </Text>
              </View>
              <TouchableOpacity style={styles.joinButton}>
                <Text style={styles.joinButtonText}>Join</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>

        {/* Community Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Our Community</Text>
          </View>
          <View style={styles.communityCard}>
            <Text style={styles.communityTitle}>Join thousands of learners worldwide</Text>
            <View style={styles.communityStats}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{communityStats.totalStudents}</Text>
                <Text style={styles.statLabel}>Students</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{communityStats.activeCourses}</Text>
                <Text style={styles.statLabel}>Courses</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{communityStats.instructors}</Text>
                <Text style={styles.statLabel}>Instructors</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{communityStats.completionRate}</Text>
                <Text style={styles.statLabel}>Completion Rate</Text>
              </View>
            </View>
          </View>
        </View>
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
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginLeft: 15,
    padding: 5,
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF6B6B',
  },
  greetingSection: {
    padding: 20,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  greetingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  greetingSubtext: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  section: {
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAll: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
  },
  categoriesList: {
    paddingHorizontal: 15,
  },
  categoryCard: {
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    marginHorizontal: 5,
    minWidth: 100,
  },
  categoryIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  categoryCount: {
    fontSize: 12,
    color: '#666',
  },
  featuredList: {
    paddingHorizontal: 15,
  },
  featuredCard: {
    width: width * 0.8,
    backgroundColor: 'white',
    borderRadius: 12,
    marginHorizontal: 5,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 10,
  },
  featuredImage: {
    width: '100%',
    height: 150,
    backgroundColor: '#f0f0f0',
  },
  featuredContent: {
    padding: 15,
  },
  featuredCategory: {
    marginBottom: 8,
  },
  categoryLabel: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  featuredTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  instructor: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  courseStats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  ratingText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 3,
    fontWeight: '600',
  },
  ratingTextSmall: {
    fontSize: 12,
    color: '#333',
    marginLeft: 3,
    fontWeight: '600',
  },
  students: {
    fontSize: 14,
    color: '#666',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  continueCard: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  continueHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  continueTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  continueProgress: {
    fontSize: 14,
    color: '#666',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressBg: {
    flex: 1,
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    marginRight: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 3,
  },
  progressPercent: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '600',
  },
  nextLesson: {
    fontSize: 14,
    color: '#666',
  },
  recommendedCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginHorizontal: 20,
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  recommendedImage: {
    width: 80,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  recommendedContent: {
    flex: 1,
    marginLeft: 12,
  },
  recommendedTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  recommendedInstructor: {
    fontSize: 13,
    color: '#666',
    marginBottom: 6,
  },
  recommendedStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  duration: {
    fontSize: 12,
    color: '#666',
    marginHorizontal: 10,
  },
  levelBadge: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  levelText: {
    fontSize: 11,
    color: '#666',
  },
  trendingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 12,
    marginBottom: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  trendingRank: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  rankNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  trendingContent: {
    flex: 1,
  },
  trendingTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 3,
  },
  trendingStats: {
    fontSize: 13,
    color: '#666',
  },
  growthBadge: {
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  growthText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '600',
  },
  upcomingCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  upcomingTime: {
    alignItems: 'center',
    marginRight: 12,
    minWidth: 60,
  },
  upcomingDate: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '600',
    marginBottom: 2,
  },
  upcomingTimeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  upcomingContent: {
    flex: 1,
  },
  upcomingTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 3,
  },
  upcomingInstructor: {
    fontSize: 13,
    color: '#666',
    marginBottom: 3,
  },
  upcomingParticipants: {
    fontSize: 12,
    color: '#999',
  },
  joinButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: 'center',
  },
  joinButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  communityCard: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  communityTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  communityStats: {
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
  },
});

export default ELearningHomePage;