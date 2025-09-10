import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

// Dummy Data
const ongoingCourses = [
  {
    id: '1',
    title: 'Complete Web Development Bootcamp',
    instructor: 'Sarah Johnson',
    image: 'https://img-c.udemycdn.com/course/750x422/548278_b005_9.jpg',
    progress: 0.65,
    totalLessons: 45,
    completedLessons: 29,
    nextLesson: 'React Router Implementation',
    nextLessonDuration: '12 min',
    enrolledDate: '2024-01-15',
    lastWatched: '2 hours ago',
    totalDuration: '45 hours',
    category: 'Technology',
    rating: 4.8,
    downloadedLessons: 8,
  },
  {
    id: '2',
    title: 'UI/UX Design Masterclass',
    instructor: 'Mike Chen',
    image: 'https://img.freepik.com/free-vector/gradient-ui-ux-background_23-2149052117.jpg',
    progress: 0.30,
    totalLessons: 28,
    completedLessons: 8,
    nextLesson: 'Color Theory and Psychology',
    nextLessonDuration: '18 min',
    enrolledDate: '2024-02-01',
    lastWatched: '1 day ago',
    totalDuration: '32 hours',
    category: 'Design',
    rating: 4.9,
    downloadedLessons: 3,
  },
  {
    id: '3',
    title: 'Digital Marketing Strategy',
    instructor: 'Emma Davis',
    image: 'https://www.simplilearn.com/ice9/free_resources_article_thumb/What_is_digital_marketing.jpg',
    progress: 0.85,
    totalLessons: 35,
    completedLessons: 30,
    nextLesson: 'Campaign Analysis and ROI',
    nextLessonDuration: '25 min',
    enrolledDate: '2024-01-08',
    lastWatched: '3 hours ago',
    totalDuration: '28 hours',
    category: 'Marketing',
    rating: 4.7,
    downloadedLessons: 12,
  },
];

const completedCourses = [
  {
    id: '1',
    title: 'Python for Data Science',
    instructor: 'Dr. Alex Morgan',
    image: 'https://media.geeksforgeeks.org/wp-content/cdn-uploads/20230318230239/Python-Data-Science-Tutorial.jpg',
    completedDate: '2024-01-20',
    totalDuration: '40 hours',
    category: 'Technology',
    rating: 4.6,
    userRating: 5,
    certificateId: 'CERT-001-2024',
    finalGrade: 'A',
    skillsLearned: ['Python Programming', 'Data Analysis', 'Machine Learning Basics', 'Pandas & NumPy'],
  },
  {
    id: '2',
    title: 'Graphic Design Fundamentals',
    instructor: 'Anna Rodriguez',
    image: 'https://img.freepik.com/free-vector/gradient-ui-ux-background_23-2149052117.jpg',
    completedDate: '2024-02-15',
    totalDuration: '25 hours',
    category: 'Design',
    rating: 4.5,
    userRating: 4,
    certificateId: 'CERT-002-2024',
    finalGrade: 'A-',
    skillsLearned: ['Adobe Photoshop', 'Typography', 'Color Theory', 'Brand Design'],
  },
  {
    id: '3',
    title: 'Business Strategy Fundamentals',
    instructor: 'Robert Kim',
    image: 'https://media.geeksforgeeks.org/wp-content/uploads/20240223125319/Business-Strategy-copy.webp',
    completedDate: '2024-01-30',
    totalDuration: '22 hours',
    category: 'Business',
    rating: 4.7,
    userRating: 5,
    certificateId: 'CERT-003-2024',
    finalGrade: 'A+',
    skillsLearned: ['Strategic Planning', 'Market Analysis', 'Competitive Analysis', 'Business Modeling'],
  },
];

const wishlistCourses = [
  {
    id: '1',
    title: 'Advanced React Native Development',
    instructor: 'David Wilson',
    image: 'https://img-c.udemycdn.com/course/750x422/548278_b005_9.jpg',
    price: '₹899',
    originalPrice: '₹1799',
    discount: '50%',
    rating: 4.8,
    students: 12400,
    duration: '55 hours',
    category: 'Technology',
    addedDate: '2024-02-10',
    bestseller: true,
    lastPriceCheck: '₹899',
    priceDropped: false,
  },
  {
    id: '2',
    title: 'Advanced Photography Techniques',
    instructor: 'Lisa Parker',
    image: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1440,h=756,fit=crop,f=jpeg/YleqW8eqJrFgg956/social-share-1920x1080-3-A85EG14X87iaEK49.jpg',
    price: '₹699',
    originalPrice: '₹1399',
    discount: '50%',
    rating: 4.9,
    students: 8900,
    duration: '35 hours',
    category: 'Photography',
    addedDate: '2024-02-05',
    bestseller: false,
    lastPriceCheck: '₹999',
    priceDropped: true,
  },
  {
    id: '3',
    title: 'Machine Learning with TensorFlow',
    instructor: 'Dr. James Wilson',
    image: 'https://media.geeksforgeeks.org/wp-content/cdn-uploads/20230318230239/Python-Data-Science-Tutorial.jpg',
    price: '₹1299',
    originalPrice: '₹2599',
    discount: '50%',
    rating: 4.7,
    students: 15600,
    duration: '65 hours',
    category: 'Technology',
    addedDate: '2024-01-28',
    bestseller: true,
    lastPriceCheck: '₹1299',
    priceDropped: false,
  },
];

const tabs = [
  { id: 'ongoing', name: 'Ongoing', count: ongoingCourses.length },
  { id: 'completed', name: 'Completed', count: completedCourses.length },
  { id: 'wishlist', name: 'Wishlist', count: wishlistCourses.length },
];

const MyCoursesPage = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('ongoing');

  const navigateTo = (route, params) => {
    navigation.navigate(route, params);
  };

  const renderOngoingCourse = ({ item }) => (
    <TouchableOpacity style={styles.courseCard} onPress={() => navigateTo('CourseLessons', { id: item.id })}>
      <Image source={{ uri: item.image }} style={styles.courseImage} />
      <View style={styles.courseContent}>
        <View style={styles.courseHeader}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={12} color="#FFD700" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
        
        <Text style={styles.courseTitle}>{item.title}</Text>
        <Text style={styles.courseInstructor}>by {item.instructor}</Text>
        
        <View style={styles.progressSection}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressText}>
              {item.completedLessons}/{item.totalLessons} lessons completed
            </Text>
            <Text style={styles.progressPercent}>{Math.round(item.progress * 100)}%</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${item.progress * 100}%` }]} />
          </View>
        </View>

        <View style={styles.nextLessonSection}>
          <Text style={styles.nextLessonLabel}>Next lesson:</Text>
          <Text style={styles.nextLessonTitle}>{item.nextLesson}</Text>
          <Text style={styles.nextLessonDuration}>{item.nextLessonDuration}</Text>
        </View>

        <View style={styles.courseFooter}>
          <View style={styles.courseInfo}>
            <Text style={styles.lastWatched}>Last watched: {item.lastWatched}</Text>
            <View style={styles.downloadInfo}>
              <Ionicons name="download" size={14} color="#666" />
              <Text style={styles.downloadText}>{item.downloadedLessons} downloaded</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.resumeButton} onPress={() => navigateTo('CourseLessons', { id: item.id })}>
            <Ionicons name="play" size={16} color="white" />
            <Text style={styles.resumeButtonText}>Resume</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderCompletedCourse = ({ item }) => (
    <TouchableOpacity style={styles.courseCard} onPress={() => navigateTo('Course', { id: item.id })}>
      <View style={styles.completedImageContainer}>
        <Image source={{ uri: item.image }} style={styles.courseImage} />
        <View style={styles.completedOverlay}>
          <Ionicons name="checkmark-circle" size={30} color="#4CAF50" />
        </View>
      </View>
      <View style={styles.courseContent}>
        <View style={styles.courseHeader}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>
          <View style={styles.gradeContainer}>
            <Text style={styles.gradeText}>Grade: {item.finalGrade}</Text>
          </View>
        </View>
        
        <Text style={styles.courseTitle}>{item.title}</Text>
        <Text style={styles.courseInstructor}>by {item.instructor}</Text>
        
        <View style={styles.completedInfo}>
          <Text style={styles.completedDate}>Completed on {item.completedDate}</Text>
          <Text style={styles.courseDuration}>{item.totalDuration}</Text>
        </View>

        <View style={styles.skillsSection}>
          <Text style={styles.skillsLabel}>Skills learned:</Text>
          <View style={styles.skillsContainer}>
            {item.skillsLearned.slice(0, 3).map((skill, index) => (
              <View key={index} style={styles.skillBadge}>
                <Text style={styles.skillText}>{skill}</Text>
              </View>
            ))}
            {item.skillsLearned.length > 3 && (
              <View style={styles.skillBadge}>
                <Text style={styles.skillText}>+{item.skillsLearned.length - 3}</Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.completedFooter}>
          <View style={styles.userRatingContainer}>
            <Text style={styles.userRatingLabel}>Your rating:</Text>
            <View style={styles.userRating}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Ionicons
                  key={star}
                  name="star"
                  size={14}
                  color={star <= item.userRating ? "#FFD700" : "#ddd"}
                />
              ))}
            </View>
          </View>
          <TouchableOpacity style={styles.certificateButton} onPress={() => navigateTo('Certificate', { id: item.id })}>
            <Ionicons name="ribbon" size={16} color="#007AFF" />
            <Text style={styles.certificateButtonText}>Certificate</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderWishlistCourse = ({ item }) => (
    <TouchableOpacity style={styles.courseCard} onPress={() => navigateTo('Course', { id: item.id })}>
      <View style={styles.wishlistImageContainer}>
        <Image source={{ uri: item.image }} style={styles.courseImage} />
        {item.bestseller && (
          <View style={styles.bestsellerBadge}>
            <Text style={styles.bestsellerText}>Bestseller</Text>
          </View>
        )}
        {item.priceDropped && (
          <View style={styles.priceDropBadge}>
            <Ionicons name="trending-down" size={12} color="white" />
            <Text style={styles.priceDropText}>Price Drop!</Text>
          </View>
        )}
        <TouchableOpacity
          style={styles.removeWishlistButton}
          onPress={() => {/* Handle remove from wishlist */}}
        >
          <Ionicons name="heart" size={20} color="#FF6B6B" />
        </TouchableOpacity>
      </View>
      <View style={styles.courseContent}>
        <View style={styles.courseHeader}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={12} color="#FFD700" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
        
        <Text style={styles.courseTitle}>{item.title}</Text>
        <Text style={styles.courseInstructor}>by {item.instructor}</Text>
        
        <View style={styles.wishlistInfo}>
          <Text style={styles.studentsCount}>{item.students.toLocaleString()} students</Text>
          <Text style={styles.courseDuration}>{item.duration}</Text>
          <Text style={styles.addedDate}>Added: {item.addedDate}</Text>
        </View>

        <View style={styles.priceSection}>
          <View style={styles.priceContainer}>
            <Text style={styles.currentPrice}>{item.price}</Text>
            <Text style={styles.originalPrice}>{item.originalPrice}</Text>
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>{item.discount} OFF</Text>
            </View>
          </View>
        </View>

        <View style={styles.wishlistFooter}>
          <TouchableOpacity style={styles.moveToCartButton} onPress={() => {/* Handle move to cart */}}>
            <Text style={styles.moveToCartText}>Move to Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buyNowButton} onPress={() => navigateTo('Checkout')}>
            <Text style={styles.buyNowText}>Buy Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'ongoing':
        return (
          <FlatList
            data={ongoingCourses}
            renderItem={renderOngoingCourse}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
          />
        );
      case 'completed':
        return (
          <FlatList
            data={completedCourses}
            renderItem={renderCompletedCourse}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
          />
        );
      case 'wishlist':
        return (
          <FlatList
            data={wishlistCourses}
            renderItem={renderWishlistCourse}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
          />
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Courses</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tab, activeTab === tab.id && styles.activeTab]}
            onPress={() => setActiveTab(tab.id)}
          >
            <Text style={[styles.tabText, activeTab === tab.id && styles.activeTabText]}>
              {tab.name}
            </Text>
            <View style={[styles.tabBadge, activeTab === tab.id && styles.activeTabBadge]}>
              <Text style={[styles.tabBadgeText, activeTab === tab.id && styles.activeTabBadgeText]}>
                {tab.count}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      <View style={styles.content}>
        {renderContent()}
      </View>

      {/* Summary Stats (Optional) */}
      {activeTab === 'ongoing' && (
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryText}>
            Keep learning! You have {ongoingCourses.length} courses in progress
          </Text>
        </View>
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
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  headerIcon: {
    padding: 5,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 25,
    marginHorizontal: 5,
  },
  activeTab: {
    backgroundColor: '#007AFF',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginRight: 6,
  },
  activeTabText: {
    color: 'white',
  },
  tabBadge: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    minWidth: 20,
    alignItems: 'center',
  },
  activeTabBadge: {
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  tabBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666',
  },
  activeTabBadgeText: {
    color: 'white',
  },
  content: {
    flex: 1,
  },
  listContainer: {
    padding: 20,
  },
  courseCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 20,
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
  completedImageContainer: {
    position: 'relative',
  },
  completedOverlay: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 20,
    padding: 5,
  },
  wishlistImageContainer: {
    position: 'relative',
  },
  bestsellerBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#FFD700',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  bestsellerText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#333',
  },
  priceDropBadge: {
    position: 'absolute',
    top: 10,
    right: 50,
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceDropText: {
    fontSize: 9,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 2,
  },
  removeWishlistButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 20,
    padding: 6,
  },
  courseContent: {
    padding: 15,
  },
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryBadge: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 10,
    color: '#007AFF',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    color: '#333',
    marginLeft: 3,
    fontWeight: '600',
  },
  gradeContainer: {
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  gradeText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  courseInstructor: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  progressSection: {
    marginBottom: 15,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
  },
  progressPercent: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: 'bold',
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
  nextLessonSection: {
    backgroundColor: '#f8f9fa',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  nextLessonLabel: {
    fontSize: 11,
    color: '#666',
    textTransform: 'uppercase',
    fontWeight: '600',
    marginBottom: 2,
  },
  nextLessonTitle: {
    fontSize: 13,
    color: '#333',
    fontWeight: '600',
    marginBottom: 2,
  },
  nextLessonDuration: {
    fontSize: 11,
    color: '#007AFF',
  },
  courseFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  courseInfo: {
    flex: 1,
  },
  lastWatched: {
    fontSize: 11,
    color: '#999',
    marginBottom: 3,
  },
  downloadInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  downloadText: {
    fontSize: 11,
    color: '#666',
    marginLeft: 4,
  },
  resumeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  resumeButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  completedInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  completedDate: {
    fontSize: 12,
    color: '#666',
  },
  courseDuration: {
    fontSize: 12,
    color: '#666',
  },
  skillsSection: {
    marginBottom: 15,
  },
  skillsLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillBadge: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 4,
  },
  skillText: {
    fontSize: 10,
    color: '#666',
  },
  completedFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userRatingLabel: {
    fontSize: 12,
    color: '#666',
    marginRight: 8,
  },
  userRating: {
    flexDirection: 'row',
  },
  certificateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  certificateButtonText: {
    color: '#007AFF',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  wishlistInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  studentsCount: {
    fontSize: 11,
    color: '#666',
  },
  addedDate: {
    fontSize: 11,
    color: '#999',
  },
  priceSection: {
    marginBottom: 15,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currentPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 14,
    color: '#999',
    textDecorationLine: 'line-through',
    marginRight: 8,
  },
  discountBadge: {
    backgroundColor: '#FFE0E0',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  discountText: {
    fontSize: 10,
    color: '#D50000',
  },
  wishlistFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  moveToCartButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  moveToCartText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  buyNowButton: {
    backgroundColor: '#D50000',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  buyNowText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  summaryContainer: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  summaryText: {
    fontSize: 12,
    color: '#666',
  },
});

export default MyCoursesPage;