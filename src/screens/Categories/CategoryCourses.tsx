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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

// Sample courses data for different categories
const coursesData = {
  'Design': [
    {
      id: '1',
      title: 'Complete UI/UX Design Course',
      instructor: 'Sarah Johnson',
      rating: 4.8,
      students: 2543,
      price: '$89',
      duration: '12 hours',
      level: 'Beginner',
      image: 'https://via.placeholder.com/300x200/FF6B6B/FFFFFF?text=UI/UX+Design',
      description: 'Master the fundamentals of UI/UX design with hands-on projects',
      bestseller: true,
    },
    {
      id: '2',
      title: 'Advanced Figma Masterclass',
      instructor: 'Mike Chen',
      rating: 4.9,
      students: 1876,
      price: '$129',
      duration: '8 hours',
      level: 'Advanced',
      image: 'https://via.placeholder.com/300x200/FF6B6B/FFFFFF?text=Figma',
      description: 'Professional Figma techniques for modern design workflows',
      bestseller: false,
    },
    {
      id: '3',
      title: 'Web Design with HTML & CSS',
      instructor: 'Emily Davis',
      rating: 4.7,
      students: 3421,
      price: '$59',
      duration: '15 hours',
      level: 'Beginner',
      image: 'https://via.placeholder.com/300x200/FF6B6B/FFFFFF?text=Web+Design',
      description: 'Build beautiful responsive websites from scratch',
      bestseller: true,
    },
    {
      id: '4',
      title: 'Logo Design & Branding',
      instructor: 'Alex Rivera',
      rating: 4.6,
      students: 1234,
      price: '$79',
      duration: '10 hours',
      level: 'Intermediate',
      image: 'https://via.placeholder.com/300x200/FF6B6B/FFFFFF?text=Logo+Design',
      description: 'Create memorable logos and brand identities',
      bestseller: false,
    },
  ],
  'Business': [
    {
      id: '5',
      title: 'Business Strategy Fundamentals',
      instructor: 'Robert Smith',
      rating: 4.7,
      students: 1987,
      price: '$99',
      duration: '14 hours',
      level: 'Intermediate',
      image: 'https://via.placeholder.com/300x200/007AFF/FFFFFF?text=Business+Strategy',
      description: 'Learn strategic thinking and business planning',
      bestseller: true,
    },
    {
      id: '6',
      title: 'Financial Management for Startups',
      instructor: 'Jennifer Lee',
      rating: 4.8,
      students: 1456,
      price: '$119',
      duration: '9 hours',
      level: 'Advanced',
      image: 'https://via.placeholder.com/300x200/007AFF/FFFFFF?text=Finance',
      description: 'Master startup financial planning and management',
      bestseller: false,
    },
  ],
  'Technology': [
    {
      id: '7',
      title: 'Full Stack JavaScript Development',
      instructor: 'David Wilson',
      rating: 4.9,
      students: 4567,
      price: '$149',
      duration: '25 hours',
      level: 'Intermediate',
      image: 'https://via.placeholder.com/300x200/45B7D1/FFFFFF?text=JavaScript',
      description: 'Complete web development with Node.js and React',
      bestseller: true,
    },
    {
      id: '8',
      title: 'Machine Learning with Python',
      instructor: 'Dr. Anna Kumar',
      rating: 4.8,
      students: 3245,
      price: '$179',
      duration: '20 hours',
      level: 'Advanced',
      image: 'https://via.placeholder.com/300x200/45B7D1/FFFFFF?text=ML+Python',
      description: 'Build intelligent applications with machine learning',
      bestseller: true,
    },
    {
      id: '9',
      title: 'Cybersecurity Essentials',
      instructor: 'Mark Thompson',
      rating: 4.6,
      students: 2134,
      price: '$129',
      duration: '16 hours',
      level: 'Beginner',
      image: 'https://via.placeholder.com/300x200/45B7D1/FFFFFF?text=Cybersecurity',
      description: 'Protect systems and data from cyber threats',
      bestseller: false,
    },
  ],
  'Marketing': [
    {
      id: '10',
      title: 'Digital Marketing Mastery',
      instructor: 'Lisa Anderson',
      rating: 4.7,
      students: 2876,
      price: '$89',
      duration: '12 hours',
      level: 'Beginner',
      image: 'https://via.placeholder.com/300x200/96CEB4/FFFFFF?text=Digital+Marketing',
      description: 'Complete guide to digital marketing strategies',
      bestseller: true,
    },
    {
      id: '11',
      title: 'Social Media Marketing Pro',
      instructor: 'Chris Garcia',
      rating: 4.8,
      students: 1987,
      price: '$79',
      duration: '8 hours',
      level: 'Intermediate',
      image: 'https://via.placeholder.com/300x200/96CEB4/FFFFFF?text=Social+Media',
      description: 'Grow your brand on social media platforms',
      bestseller: false,
    },
  ],
};

const CategoryCourses = ({ navigation, route }) => {
  const { category } = route.params;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSort, setSelectedSort] = useState('Popular');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'

  const sortOptions = ['Popular', 'Newest', 'Price: Low to High', 'Price: High to Low', 'Highest Rated'];
  const levelOptions = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const courses = coursesData[category.name] || [];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesLevel = selectedLevel === 'All' || course.level === selectedLevel;
    
    return matchesSearch && matchesLevel;
  });

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (selectedSort) {
      case 'Newest':
        return b.id - a.id; // Assuming higher ID means newer
      case 'Price: Low to High':
        return parseInt(a.price.replace('$', '')) - parseInt(b.price.replace('$', ''));
      case 'Price: High to Low':
        return parseInt(b.price.replace('$', '')) - parseInt(a.price.replace('$', ''));
      case 'Highest Rated':
        return b.rating - a.rating;
      default: // Popular
        return b.students - a.students;
    }
  });

  const goBack = () => {
    navigation.goBack();
  };

  const navigateToCourse = (course) => {
    navigation.navigate('CourseDetails', { course });
  };

  const renderCourseList = ({ item }) => (
    <TouchableOpacity 
      style={styles.courseCard}
      onPress={() => navigateToCourse(item)}
    >
      <Image source={{ uri: item.image }} style={styles.courseImage} />
      <View style={styles.courseContent}>
        <View style={styles.courseHeader}>
          <Text style={styles.courseTitle} numberOfLines={2}>{item.title}</Text>
          {item.bestseller && (
            <View style={styles.bestsellerBadge}>
              <Text style={styles.bestsellerText}>Bestseller</Text>
            </View>
          )}
        </View>
        <Text style={styles.instructor}>By {item.instructor}</Text>
        <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
        
        <View style={styles.courseStats}>
          <View style={styles.rating}>
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={styles.ratingText}>{item.rating}</Text>
            <Text style={styles.studentsText}>({item.students.toLocaleString()})</Text>
          </View>
          <View style={styles.courseInfo}>
            <Text style={styles.duration}>{item.duration}</Text>
            <Text style={styles.level}>{item.level}</Text>
          </View>
        </View>
        
        <View style={styles.courseFooter}>
          <Text style={styles.price}>{item.price}</Text>
          <TouchableOpacity style={styles.enrollButton}>
            <Text style={styles.enrollText}>Enroll Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderCourseGrid = ({ item }) => (
    <TouchableOpacity 
      style={styles.courseGridCard}
      onPress={() => navigateToCourse(item)}
    >
      <Image source={{ uri: item.image }} style={styles.courseGridImage} />
      {item.bestseller && (
        <View style={styles.bestsellerBadgeGrid}>
          <Text style={styles.bestsellerTextGrid}>Bestseller</Text>
        </View>
      )}
      <View style={styles.courseGridContent}>
        <Text style={styles.courseGridTitle} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.instructorGrid}>By {item.instructor}</Text>
        
        <View style={styles.ratingGrid}>
          <Ionicons name="star" size={12} color="#FFD700" />
          <Text style={styles.ratingTextGrid}>{item.rating}</Text>
          <Text style={styles.studentsTextGrid}>({item.students})</Text>
        </View>
        
        <View style={styles.courseGridFooter}>
          <Text style={styles.priceGrid}>{item.price}</Text>
          <Text style={styles.levelGrid}>{item.level}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>{category.name}</Text>
          <Text style={styles.headerSubtitle}>{sortedCourses.length} courses</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity 
            style={styles.viewModeButton}
            onPress={() => setViewMode(viewMode === 'list' ? 'grid' : 'list')}
          >
            <Ionicons 
              name={viewMode === 'list' ? 'grid' : 'list'} 
              size={20} 
              color="#007AFF" 
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Category Info Banner */}
      <View style={[styles.categoryBanner, { backgroundColor: category.color + '15' }]}>
        <View style={[styles.categoryIcon, { backgroundColor: category.color }]}>
          <Ionicons name={category.icon} size={24} color="white" />
        </View>
        <View style={styles.categoryInfo}>
          <Text style={styles.categoryDescription}>{category.description}</Text>
          <Text style={styles.totalCourses}>{category.courses} total courses available</Text>
        </View>
      </View>

      {/* Search and Filters */}
      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search courses..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#999" />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      {/* Filter Options */}
      <View style={styles.filtersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.filterRow}>
            {/* Sort Filter */}
            <TouchableOpacity style={styles.filterButton}>
              <Ionicons name="funnel" size={16} color="#007AFF" />
              <Text style={styles.filterButtonText}>Sort: {selectedSort}</Text>
            </TouchableOpacity>
            
            {/* Level Filter */}
            <TouchableOpacity style={styles.filterButton}>
              <Ionicons name="school" size={16} color="#007AFF" />
              <Text style={styles.filterButtonText}>Level: {selectedLevel}</Text>
            </TouchableOpacity>
            
            {/* Price Filter */}
            <TouchableOpacity style={styles.filterButton}>
              <Ionicons name="pricetag" size={16} color="#007AFF" />
              <Text style={styles.filterButtonText}>Price</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      {/* Courses List */}
      <FlatList
        data={sortedCourses}
        renderItem={viewMode === 'list' ? renderCourseList : renderCourseGrid}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.coursesList}
        numColumns={viewMode === 'grid' ? 2 : 1}
        key={viewMode} // Force re-render when view mode changes
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Ionicons name="book-outline" size={64} color="#ccc" />
            <Text style={styles.emptyTitle}>No courses found</Text>
            <Text style={styles.emptyText}>Try adjusting your search or filters</Text>
          </View>
        )}
      />
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
  headerContent: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewModeButton: {
    padding: 5,
  },
  categoryBanner: {
    flexDirection: 'row',
    padding: 20,
    margin: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  categoryIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryDescription: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
    marginBottom: 4,
  },
  totalCourses: {
    fontSize: 14,
    color: '#666',
  },
  searchSection: {
    paddingHorizontal: 20,
    marginBottom: 10,
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
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  filtersContainer: {
    marginBottom: 15,
  },
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
    marginLeft: 5,
  },
  coursesList: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  courseCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  courseImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  courseContent: {
    padding: 15,
  },
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    marginRight: 10,
  },
  bestsellerBadge: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  bestsellerText: {
    fontSize: 10,
    color: 'white',
    fontWeight: '600',
  },
  instructor: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 20,
  },
  courseStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginLeft: 4,
  },
  studentsText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  courseInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  duration: {
    fontSize: 12,
    color: '#666',
    marginRight: 10,
  },
  level: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '600',
    backgroundColor: '#f0f8ff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  courseFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  enrollButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  enrollText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  // Grid View Styles
  courseGridCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    margin: 5,
    flex: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
    position: 'relative',
  },
  courseGridImage: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
  },
  bestsellerBadgeGrid: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    zIndex: 1,
  },
  bestsellerTextGrid: {
    fontSize: 8,
    color: 'white',
    fontWeight: '600',
  },
  courseGridContent: {
    padding: 12,
  },
  courseGridTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
    minHeight: 36,
  },
  instructorGrid: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  ratingGrid: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingTextGrid: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    marginLeft: 2,
  },
  studentsTextGrid: {
    fontSize: 10,
    color: '#666',
    marginLeft: 2,
  },
  courseGridFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceGrid: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  levelGrid: {
    fontSize: 10,
    color: '#007AFF',
    fontWeight: '600',
    backgroundColor: '#f0f8ff',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});

export default CategoryCourses;