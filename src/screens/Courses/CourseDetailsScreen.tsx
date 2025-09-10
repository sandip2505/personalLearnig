import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../../navigation/RootNavigator';

type CourseDetailsScreenRouteProp = RouteProp<RootStackParamList, 'CourseDetails'>;

const { width } = Dimensions.get('window');

// Dummy Course Data
const courseData = {
  '1': {
    id: '1',
    title: 'Complete Web Development Bootcamp',
    subtitle: 'Build 15 Real-World Projects with HTML, CSS, JavaScript, React, Node.js, and MongoDB',
    instructor: 'Sarah Johnson',
    instructorImage: 'https://randomuser.me/api/portraits/women/44.jpg',
    instructorBio: 'Senior Full-Stack Developer with 8+ years of experience at top tech companies. Has taught over 100k students worldwide.',
    image: 'https://img-c.udemycdn.com/course/750x422/548278_b005_9.jpg',
    rating: 4.8,
    reviewsCount: 12456,
    studentsCount: 45230,
    price: '₹1,999',
    originalPrice: '₹4,999',
    discount: '60%',
    duration: '45 hours',
    lessonsCount: 312,
    level: 'Beginner to Advanced',
    language: 'English',
    category: 'Technology',
    lastUpdated: 'February 2024',
    description: 'Learn Web Development by building 15 real-world projects. This comprehensive course covers everything from HTML/CSS basics to advanced React patterns and full-stack development with Node.js and MongoDB.',
    features: [
      '45 hours of on-demand video',
      '312 downloadable lessons',
      'Full lifetime access',
      'Access on mobile and TV',
      'Certificate of completion',
      '30-day money-back guarantee',
      'Direct instructor support'
    ],
    skillsLearned: [
      'HTML5 & CSS3',
      'JavaScript ES6+',
      'React.js',
      'Node.js',
      'MongoDB',
      'Express.js',
      'Git & GitHub',
      'Responsive Design',
      'REST APIs',
      'Authentication'
    ],
    requirements: [
      'No programming experience needed',
      'A computer with internet connection',
      'Willingness to learn and practice',
      'Basic computer skills'
    ],
    curriculum: [
      {
        section: 'Introduction to Web Development',
        lessonsCount: 12,
        duration: '2h 30m',
        lessons: [
          { title: 'Course Introduction', duration: '5m', type: 'video', isPreview: true },
          { title: 'What is Web Development?', duration: '8m', type: 'video', isPreview: true },
          { title: 'Setting Up Development Environment', duration: '15m', type: 'video', isPreview: false },
          { title: 'Your First HTML Page', duration: '12m', type: 'video', isPreview: false }
        ]
      },
      {
        section: 'HTML Fundamentals',
        lessonsCount: 25,
        duration: '4h 15m',
        lessons: [
          { title: 'HTML Structure and Syntax', duration: '10m', type: 'video', isPreview: false },
          { title: 'HTML Elements and Attributes', duration: '15m', type: 'video', isPreview: false },
          { title: 'Forms and Input Elements', duration: '20m', type: 'video', isPreview: false }
        ]
      },
      {
        section: 'CSS Styling',
        lessonsCount: 30,
        duration: '5h 20m',
        lessons: [
          { title: 'CSS Basics and Selectors', duration: '12m', type: 'video', isPreview: false },
          { title: 'Box Model and Layout', duration: '18m', type: 'video', isPreview: false },
          { title: 'Flexbox and Grid', duration: '25m', type: 'video', isPreview: false }
        ]
      }
    ]
  }
};

const reviews = [
  {
    id: '1',
    user: 'John Doe',
    userImage: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 5,
    date: '2 weeks ago',
    review: 'Excellent course! Sarah explains everything clearly and the projects are very practical. I landed my first web developer job after completing this course.'
  },
  {
    id: '2',
    user: 'Maria Garcia',
    userImage: 'https://randomuser.me/api/portraits/women/28.jpg',
    rating: 5,
    date: '1 month ago',
    review: 'Best investment I made for my career. The course is well-structured and covers everything you need to become a full-stack developer.'
  },
  {
    id: '3',
    user: 'David Kim',
    userImage: 'https://randomuser.me/api/portraits/men/45.jpg',
    rating: 4,
    date: '3 weeks ago',
    review: 'Great content and projects. Would love to see more advanced React patterns but overall very satisfied with the course.'
  }
];

const CourseDetailsScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<CourseDetailsScreenRouteProp>();
  const { courseId } = route.params;
  
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedSection, setExpandedSection] = useState<number | null>(null);
  const [isInWishlist, setIsInWishlist] = useState(false);

  const course = courseData[courseId as keyof typeof courseData];

  if (!course) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Course not found</Text>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const handleWishlistToggle = () => {
    setIsInWishlist(!isInWishlist);
    Alert.alert(
      isInWishlist ? 'Removed from Wishlist' : 'Added to Wishlist',
      isInWishlist ? 'Course removed from your wishlist' : 'Course added to your wishlist'
    );
  };

  const handleEnrollNow = () => {
    navigation.navigate('Payment', { amount: parseInt(course.price.replace(/[^0-9]/g, '')) });
  };

  const tabs = [
    { id: 'overview', name: 'Overview' },
    { id: 'curriculum', name: 'Curriculum' },
    { id: 'instructor', name: 'Instructor' },
    { id: 'reviews', name: 'Reviews' }
  ];

  const renderStars = (rating: number, size: number = 12) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Ionicons
        key={index}
        name="star"
        size={size}
        color={index < Math.floor(rating) ? "#FFD700" : "#ddd"}
      />
    ));
  };

  const renderOverview = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <Text style={styles.sectionTitle}>About This Course</Text>
      <Text style={styles.description}>{course.description}</Text>

      <Text style={styles.sectionTitle}>What You'll Learn</Text>
      <View style={styles.skillsGrid}>
        {course.skillsLearned.map((skill, index) => (
          <View key={index} style={styles.skillItem}>
            <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
            <Text style={styles.skillText}>{skill}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Course Features</Text>
      {course.features.map((feature, index) => (
        <View key={index} style={styles.featureItem}>
          <Ionicons name="checkmark" size={16} color="#007AFF" />
          <Text style={styles.featureText}>{feature}</Text>
        </View>
      ))}

      <Text style={styles.sectionTitle}>Requirements</Text>
      {course.requirements.map((requirement, index) => (
        <View key={index} style={styles.requirementItem}>
          <Ionicons name="ellipse" size={6} color="#666" />
          <Text style={styles.requirementText}>{requirement}</Text>
        </View>
      ))}
    </ScrollView>
  );

  const renderCurriculum = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <Text style={styles.sectionTitle}>Course Content</Text>
      <Text style={styles.curriculumSummary}>
        {course.curriculum.length} sections • {course.lessonsCount} lectures • {course.duration} total length
      </Text>
      
      {course.curriculum.map((section, sectionIndex) => (
        <View key={sectionIndex} style={styles.curriculumSection}>
          <TouchableOpacity
            style={styles.sectionHeader}
            onPress={() => setExpandedSection(expandedSection === sectionIndex ? null : sectionIndex)}
          >
            <View style={styles.sectionInfo}>
              <Text style={styles.sectionTitle}>{section.section}</Text>
              <Text style={styles.sectionMeta}>{section.lessonsCount} lectures • {section.duration}</Text>
            </View>
            <Ionicons
              name={expandedSection === sectionIndex ? "chevron-up" : "chevron-down"}
              size={20}
              color="#666"
            />
          </TouchableOpacity>
          
          {expandedSection === sectionIndex && (
            <View style={styles.sectionContent}>
              {section.lessons.map((lesson, lessonIndex) => (
                <View key={lessonIndex} style={styles.lessonItem}>
                  <Ionicons
                    name={lesson.type === 'video' ? "play-circle" : "document-text"}
                    size={16}
                    color="#666"
                  />
                  <Text style={styles.lessonTitle}>{lesson.title}</Text>
                  <Text style={styles.lessonDuration}>{lesson.duration}</Text>
                  {lesson.isPreview && (
                    <TouchableOpacity style={styles.previewButton}>
                      <Text style={styles.previewText}>Preview</Text>
                    </TouchableOpacity>
                  )}
                </View>
              ))}
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );

  const renderInstructor = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.instructorCard}>
        <Image source={{ uri: course.instructorImage }} style={styles.instructorImage} />
        <View style={styles.instructorInfo}>
          <Text style={styles.instructorName}>{course.instructor}</Text>
          <Text style={styles.instructorTitle}>Full-Stack Developer & Instructor</Text>
          <View style={styles.instructorStats}>
            <View style={styles.statItem}>
              <Ionicons name="star" size={14} color="#FFD700" />
              <Text style={styles.statText}>{course.rating} rating</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="people" size={14} color="#666" />
              <Text style={styles.statText}>{course.studentsCount.toLocaleString()} students</Text>
            </View>
          </View>
        </View>
      </View>
      
      <Text style={styles.sectionTitle}>About the Instructor</Text>
      <Text style={styles.instructorBio}>{course.instructorBio}</Text>
    </ScrollView>
  );

  const renderReviews = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.reviewsHeader}>
        <Text style={styles.sectionTitle}>Student Reviews</Text>
        <View style={styles.ratingOverview}>
          <Text style={styles.overallRating}>{course.rating}</Text>
          <View style={styles.starsContainer}>
            {renderStars(course.rating, 16)}
          </View>
          <Text style={styles.reviewsCount}>({course.reviewsCount.toLocaleString()} reviews)</Text>
        </View>
      </View>
      
      {reviews.map((review) => (
        <View key={review.id} style={styles.reviewItem}>
          <View style={styles.reviewHeader}>
            <Image source={{ uri: review.userImage }} style={styles.reviewerImage} />
            <View style={styles.reviewerInfo}>
              <Text style={styles.reviewerName}>{review.user}</Text>
              <View style={styles.reviewRating}>
                {renderStars(review.rating)}
                <Text style={styles.reviewDate}> • {review.date}</Text>
              </View>
            </View>
          </View>
          <Text style={styles.reviewText}>{review.review}</Text>
        </View>
      ))}
    </ScrollView>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverview();
      case 'curriculum': return renderCurriculum();
      case 'instructor': return renderInstructor();
      case 'reviews': return renderReviews();
      default: return renderOverview();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.wishlistButton} onPress={handleWishlistToggle}>
          <Ionicons 
            name={isInWishlist ? "heart" : "heart-outline"} 
            size={24} 
            color={isInWishlist ? "#FF6B6B" : "white"} 
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Course Image */}
        <Image source={{ uri: course.image }} style={styles.courseImage} />

        {/* Course Info */}
        <View style={styles.courseInfo}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{course.category}</Text>
          </View>
          
          <Text style={styles.courseTitle}>{course.title}</Text>
          <Text style={styles.courseSubtitle}>{course.subtitle}</Text>
          
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>{course.rating}</Text>
            <View style={styles.starsContainer}>
              {renderStars(course.rating)}
            </View>
            <Text style={styles.studentsText}>({course.reviewsCount.toLocaleString()} reviews)</Text>
          </View>

          <Text style={styles.studentsEnrolled}>{course.studentsCount.toLocaleString()} students enrolled</Text>

          <View style={styles.courseMetaContainer}>
            <View style={styles.metaItem}>
              <Ionicons name="time" size={16} color="#666" />
              <Text style={styles.metaText}>{course.duration}</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="play-circle" size={16} color="#666" />
              <Text style={styles.metaText}>{course.lessonsCount} lessons</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="bar-chart" size={16} color="#666" />
              <Text style={styles.metaText}>{course.level}</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="language" size={16} color="#666" />
              <Text style={styles.metaText}>{course.language}</Text>
            </View>
          </View>

          <View style={styles.priceContainer}>
            <Text style={styles.currentPrice}>{course.price}</Text>
            <Text style={styles.originalPrice}>{course.originalPrice}</Text>
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>{course.discount} OFF</Text>
            </View>
          </View>

          <Text style={styles.lastUpdated}>Last updated {course.lastUpdated}</Text>
        </View>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab.id}
                style={[styles.tab, activeTab === tab.id && styles.activeTab]}
                onPress={() => setActiveTab(tab.id)}
              >
                <Text style={[styles.tabText, activeTab === tab.id && styles.activeTabText]}>
                  {tab.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Tab Content */}
        {renderTabContent()}
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.enrollButton} onPress={handleEnrollNow}>
          <Text style={styles.enrollButtonText}>Enroll Now - {course.price}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    bottom:25
  },
  header: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    zIndex: 10,
  },
  backButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 8,
  },
  wishlistButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 8,
  },
  scrollContainer: {
    flex: 1,
  },
  courseImage: {
    width: '100%',
    height: 250,
    backgroundColor: '#f0f0f0',
  },
  courseInfo: {
    padding: 20,
  },
  categoryBadge: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  categoryText: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  courseTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  courseSubtitle: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
    marginBottom: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 8,
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 8,
  },
  studentsText: {
    fontSize: 14,
    color: '#666',
  },
  studentsEnrolled: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  courseMetaContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    marginBottom: 8,
  },
  metaText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  currentPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
    marginRight: 12,
  },
  originalPrice: {
    fontSize: 16,
    color: '#999',
    textDecorationLine: 'line-through',
    marginRight: 12,
  },
  discountBadge: {
    backgroundColor: '#FFE0E0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  discountText: {
    fontSize: 12,
    color: '#D50000',
    fontWeight: 'bold',
  },
  lastUpdated: {
    fontSize: 12,
    color: '#999',
  },
  tabContainer: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingVertical: 0,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#007AFF',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  activeTabText: {
    color: '#007AFF',
  },
  tabContent: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 24,
  },
  skillsGrid: {
    marginBottom: 24,
  },
  skillItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  skillText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 8,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 8,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  requirementText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 12,
  },
  curriculumSummary: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  curriculumSection: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    borderRadius: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  sectionInfo: {
    flex: 1,
  },
  sectionMeta: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  sectionContent: {
    padding: 16,
    paddingTop: 0,
  },
  lessonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  lessonTitle: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    marginLeft: 8,
  },
  lessonDuration: {
    fontSize: 12,
    color: '#666',
    marginRight: 8,
  },
  previewButton: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  previewText: {
    fontSize: 10,
    color: '#007AFF',
    fontWeight: '600',
  },
  instructorCard: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  instructorImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  instructorInfo: {
    flex: 1,
  },
  instructorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  instructorTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  instructorStats: {
    flexDirection: 'row',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  statText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  instructorBio: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  reviewsHeader: {
    marginBottom: 20,
  },
  ratingOverview: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  overallRating: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 8,
  },
  reviewsCount: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  reviewItem: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
  },
  reviewHeader: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  reviewerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  reviewerInfo: {
    flex: 1,
  },
  reviewerName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  reviewRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewDate: {
    fontSize: 12,
    color: '#666',
  },
  reviewText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  bottomBar: {
    backgroundColor: 'white',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  enrollButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  enrollButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  backButtonText: {
    color: '#007AFF',
    fontSize: 16,
  },
});

export default CourseDetailsScreen;