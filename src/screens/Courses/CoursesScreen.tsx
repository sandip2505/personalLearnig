import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';


const { width } = Dimensions.get('window');

// Dummy Data
const categories = [
  { id: 'all', name: 'All', courses: 1200 },
  { id: '1', name: 'Design', courses: 120 },
  { id: '2', name: 'Business', courses: 85 },
  { id: '3', name: 'Technology', courses: 200 },
  { id: '4', name: 'Marketing', courses: 95 },
  { id: '5', name: 'Photography', courses: 75 },
  { id: '6', name: 'Music', courses: 60 },
  { id: '7', name: 'Health', courses: 45 },
  { id: '8', name: 'Language', courses: 80 },
];

const allCourses = [
  {
    id: '1',
    title: 'Complete Web Development Bootcamp',
    instructor: 'Sarah Johnson',
    rating: 4.8,
    students: 12500,
    price: '₹499',
    originalPrice: '₹999',
    image: 'https://img-c.udemycdn.com/course/750x422/548278_b005_9.jpg',
    category: 'Technology',
    level: 'Beginner',
    duration: '45 hours',
    bestseller: true,
    updated: '2024',
  },
  {
    id: '2',
    title: 'UI/UX Design Masterclass',
    instructor: 'Mike Chen',
    rating: 4.9,
    students: 8900,
    price: '₹999',
    originalPrice: '₹1999',
    image: 'https://img.freepik.com/free-vector/gradient-ui-ux-background_23-2149052117.jpg?semt=ais_hybrid&w=740&q=80',
    category: 'Design',
    level: 'Intermediate',
    duration: '32 hours',
    bestseller: false,
    updated: '2024',
  },
  {
    id: '3',
    title: 'Digital Marketing Strategy',
    instructor: 'Emma Davis',
    rating: 4.7,
    students: 6700,
    price: '₹569',
    originalPrice: '₹1299',
    image: 'https://www.simplilearn.com/ice9/free_resources_article_thumb/What_is_digital_marketing.jpg',
    category: 'Marketing',
    level: 'Beginner',
    duration: '28 hours',
    bestseller: true,
    updated: '2024',
  },
  {
    id: '4',
    title: 'Python for Data Science',
    instructor: 'Dr. Alex Morgan',
    rating: 4.6,
    students: 15600,
    price: '₹799',
    originalPrice: '₹1599',
    image: 'https://media.geeksforgeeks.org/wp-content/cdn-uploads/20230318230239/Python-Data-Science-Tutorial.jpg',
    category: 'Technology',
    level: 'Intermediate',
    duration: '40 hours',
    bestseller: false,
    updated: '2024',
  },
  {
    id: '5',
    title: 'Advanced Photography',
    instructor: 'Lisa Parker',
    rating: 4.8,
    students: 3400,
    price: '₹699',
    originalPrice: '₹1399',
    image: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1440,h=756,fit=crop,f=jpeg/YleqW8eqJrFgg956/social-share-1920x1080-3-A85EG14X87iaEK49.jpg',
    category: 'Photography',
    level: 'Advanced',
    duration: '25 hours',
    bestseller: false,
    updated: '2024',
  },
  {
    id: '6',
    title: 'Business Strategy Fundamentals',
    instructor: 'Robert Kim',
    rating: 4.7,
    students: 5600,
    price: '₹449',
    originalPrice: '₹899',
    image: 'https://media.geeksforgeeks.org/wp-content/uploads/20240223125319/Business-Strategy-copy.webp',
    category: 'Business',
    level: 'Beginner',
    duration: '22 hours',
    bestseller: true,
    updated: '2024',
  },
  {
    id: '7',
    title: 'Mobile App Development with React Native',
    instructor: 'David Wilson',
    rating: 4.5,
    students: 7800,
    price: '₹899',
    originalPrice: '₹1799',
    image: 'https://img-c.udemycdn.com/course/750x422/548278_b005_9.jpg',
    category: 'Technology',
    level: 'Intermediate',
    duration: '50 hours',
    bestseller: false,
    updated: '2024',
  },
  {
    id: '8',
    title: 'Graphic Design for Beginners',
    instructor: 'Anna Rodriguez',
    rating: 4.6,
    students: 4200,
    price: '₹399',
    originalPrice: '₹799',
    image: 'https://img.freepik.com/free-vector/gradient-ui-ux-background_23-2149052117.jpg?semt=ais_hybrid&w=740&q=80',
    category: 'Design',
    level: 'Beginner',
    duration: '18 hours',
    bestseller: true,
    updated: '2024',
  },
];

const recommendedCourses = [
  {
    id: '1',
    title: 'JavaScript ES6+ Complete Course',
    instructor: 'John Smith',
    rating: 4.9,
    students: 23400,
    price: '₹699',
    image: 'https://img-c.udemycdn.com/course/750x422/548278_b005_9.jpg',
    category: 'Technology'
  },
  {
    id: '2',
    title: 'Brand Identity Design',
    instructor: 'Maria Garcia',
    rating: 4.7,
    students: 8900,
    price: '₹549',
    image: 'https://img.freepik.com/free-vector/gradient-ui-ux-background_23-2149052117.jpg?semt=ais_hybrid&w=740&q=80',
    category: 'Design'
  },
  {
    id: '3',
    title: 'Content Marketing Mastery',
    instructor: 'Tom Anderson',
    rating: 4.8,
    students: 12100,
    price: '₹649',
    image: 'https://www.simplilearn.com/ice9/free_resources_article_thumb/What_is_digital_marketing.jpg',
    category: 'Marketing'
  },
];

const filterOptions = {
  level: ['All', 'Beginner', 'Intermediate', 'Advanced'],
  price: ['All', 'Free', 'Paid', 'Under ₹500', '₹500-₹1000', 'Above ₹1000'],
  rating: ['All', '4.5+', '4.0+', '3.5+'],
  duration: ['All', 'Under 10 hours', '10-30 hours', '30+ hours'],
};

export const CoursesScreen: React.FC = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    level: 'All',
    price: 'All',
    rating: 'All',
    duration: 'All',
  });

  const coursesPerPage = 6;
  const totalPages = Math.ceil(allCourses.length / coursesPerPage);

  const handleCoursePress = (courseId: string) => {
    navigation.navigate('CourseDetails', { courseId });
  };

  // Filter courses based on search, category, and filters
  const filteredCourses = allCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesLevel = filters.level === 'All' || course.level === filters.level;
    const matchesRating = filters.rating === 'All' || course.rating >= parseFloat(filters.rating.replace('+', ''));
    
    return matchesSearch && matchesCategory && matchesLevel && matchesRating;
  });

  // Paginate filtered courses
  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * coursesPerPage,
    currentPage * coursesPerPage
  );

  const renderCategoryChip = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[
        styles.categoryChip,
        selectedCategory === item.id && styles.categoryChipActive
      ]}
      onPress={() => {
        setSelectedCategory(item.id);
        setCurrentPage(1);
      }}
    >
      <Text style={[
        styles.categoryChipText,
        selectedCategory === item.id && styles.categoryChipTextActive
      ]}>
        {item.name} ({item.courses})
      </Text>
    </TouchableOpacity>
  );

  const renderCourseCard = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.courseCard} onPress={() => handleCoursePress(item.id)}>
      <Image source={{ uri: item.image }} style={styles.courseImage} />
      <View style={styles.courseContent}>
        <View style={styles.courseHeader}>
          {item.bestseller && (
            <View style={styles.bestsellerBadge}>
              <Text style={styles.bestsellerText}>Bestseller</Text>
            </View>
          )}
          <Text style={styles.categoryLabel}>{item.category}</Text>
        </View>
        <Text style={styles.courseTitle}>{item.title}</Text>
        <Text style={styles.courseInstructor}>by {item.instructor}</Text>
        
        <View style={styles.courseStats}>
          <View style={styles.rating}>
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
          <Text style={styles.students}>({item.students.toLocaleString()})</Text>
          <Text style={styles.duration}>{item.duration}</Text>
          <View style={styles.levelBadge}>
            <Text style={styles.levelText}>{item.level}</Text>
          </View>
        </View>

        <View style={styles.priceContainer}>
          <Text style={styles.price}>{item.price}</Text>
          {item.originalPrice && (
            <Text style={styles.originalPrice}>{item.originalPrice}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderRecommendedCourse = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.recommendedCard} onPress={() => handleCoursePress(item.id)}>
      <Image source={{ uri: item.image }} style={styles.recommendedImage} />
      <View style={styles.recommendedContent}>
        <Text style={styles.recommendedTitle}>{item.title}</Text>
        <Text style={styles.recommendedInstructor}>by {item.instructor}</Text>
        <View style={styles.recommendedStats}>
          <View style={styles.rating}>
            <Ionicons name="star" size={12} color="#FFD700" />
            <Text style={styles.ratingTextSmall}>{item.rating}</Text>
          </View>
          <Text style={styles.recommendedStudents}>{item.students.toLocaleString()} students</Text>
        </View>
        <Text style={styles.recommendedPrice}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderPagination = () => (
    <View style={styles.paginationContainer}>
      <TouchableOpacity
        style={[styles.pageButton, currentPage === 1 && styles.pageButtonDisabled]}
        disabled={currentPage === 1}
        onPress={() => setCurrentPage(currentPage - 1)}
      >
        <Ionicons name="chevron-back" size={20} color={currentPage === 1 ? '#ccc' : '#007AFF'} />
      </TouchableOpacity>
      
      {[...Array(Math.min(totalPages, 5))].map((_, index) => {
        const pageNumber = index + 1;
        return (
          <TouchableOpacity
            key={pageNumber}
            style={[
              styles.pageButton,
              currentPage === pageNumber && styles.pageButtonActive
            ]}
            onPress={() => setCurrentPage(pageNumber)}
          >
            <Text style={[
              styles.pageButtonText,
              currentPage === pageNumber && styles.pageButtonTextActive
            ]}>
              {pageNumber}
            </Text>
          </TouchableOpacity>
        );
      })}
      
      <TouchableOpacity
        style={[styles.pageButton, currentPage === totalPages && styles.pageButtonDisabled]}
        disabled={currentPage === totalPages}
        onPress={() => setCurrentPage(currentPage + 1)}
      >
        <Ionicons name="chevron-forward" size={20} color={currentPage === totalPages ? '#ccc' : '#007AFF'} />
      </TouchableOpacity>
    </View>
  );

  const FilterModal = () => (
    <Modal
      visible={showFilters}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShowFilters(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Filters</Text>
            <TouchableOpacity onPress={() => setShowFilters(false)}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.filterContent}>
            {Object.entries(filterOptions).map(([key, options]) => (
              <View key={key} style={styles.filterSection}>
                <Text style={styles.filterTitle}>{key.charAt(0).toUpperCase() + key.slice(1)}</Text>
                <View style={styles.filterOptions}>
                  {options.map((option) => (
                    <TouchableOpacity
                      key={option}
                      style={[
                        styles.filterOption,
                        filters[key as keyof typeof filters] === option && styles.filterOptionActive
                      ]}
                      onPress={() => setFilters(prev => ({ ...prev, [key]: option }))}
                    >
                      <Text style={[
                        styles.filterOptionText,
                        filters[key as keyof typeof filters] === option && styles.filterOptionTextActive
                      ]}>
                        {option}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ))}
          </ScrollView>

          <View style={styles.modalFooter}>
            <TouchableOpacity
              style={styles.clearButton}
              onPress={() => setFilters({ level: 'All', price: 'All', rating: 'All', duration: 'All' })}
            >
              <Text style={styles.clearButtonText}>Clear All</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.applyButton}
              onPress={() => {
                setShowFilters(false);
                setCurrentPage(1);
              }}
            >
              <Text style={styles.applyButtonText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Browse Courses</Text>
      </View>

      {/* Search and Filter Bar */}
      <View style={styles.searchFilterContainer}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search courses..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.filterButton} onPress={() => setShowFilters(true)}>
          <Ionicons name="options-outline" size={20} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Categories */}
        <View style={styles.section}>
          <FlatList
            data={categories}
            renderItem={renderCategoryChip}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
          />
        </View>

        {/* Results Info */}
        <View style={styles.resultsInfo}>
          <Text style={styles.resultsText}>
            {filteredCourses.length} courses found
          </Text>
        </View>

        {/* Course Cards */}
        <View style={styles.coursesContainer}>
          <FlatList
            data={paginatedCourses}
            renderItem={renderCourseCard}
            keyExtractor={(item) => item.id}
            numColumns={1}
            scrollEnabled={false}
          />
        </View>

        {/* Pagination */}
        {totalPages > 1 && renderPagination()}

        {/* Recommended Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recommended for You</Text>
          </View>
          <FlatList
            data={recommendedCourses}
            renderItem={renderRecommendedCourse}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.recommendedList}
          />
        </View>
      </ScrollView>

      <FilterModal />
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
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  searchFilterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 45,
    marginRight: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  filterButton: {
    width: 45,
    height: 45,
    borderRadius: 12,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: {
    marginBottom: 20,
  },
  categoriesContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    marginHorizontal: 5,
  },
  categoryChipActive: {
    backgroundColor: '#007AFF',
  },
  categoryChipText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  categoryChipTextActive: {
    color: 'white',
  },
  resultsInfo: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  resultsText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  coursesContainer: {
    paddingHorizontal: 20,
  },
  courseCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  courseImage: {
    width: 120,
    height: 120,
    backgroundColor: '#f0f0f0',
  },
  courseContent: {
    flex: 1,
    padding: 15,
  },
  courseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  bestsellerBadge: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginRight: 8,
  },
  bestsellerText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#333',
  },
  categoryLabel: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '600',
    textTransform: 'uppercase',
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
    marginBottom: 8,
  },
  courseStats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  ratingText: {
    fontSize: 12,
    color: '#333',
    marginLeft: 3,
    fontWeight: '600',
  },
  ratingTextSmall: {
    fontSize: 11,
    color: '#333',
    marginLeft: 2,
    fontWeight: '600',
  },
  students: {
    fontSize: 12,
    color: '#666',
    marginRight: 10,
  },
  duration: {
    fontSize: 12,
    color: '#666',
    marginRight: 10,
  },
  levelBadge: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  levelText: {
    fontSize: 10,
    color: '#666',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 14,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  pageButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    backgroundColor: 'white',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  pageButtonActive: {
    backgroundColor: '#007AFF',
  },
  pageButtonDisabled: {
    backgroundColor: '#f5f5f5',
  },
  pageButtonText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  pageButtonTextActive: {
    color: 'white',
  },
  sectionHeader: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  recommendedList: {
    paddingHorizontal: 15,
  },
  recommendedCard: {
    width: width * 0.7,
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
  recommendedImage: {
    width: '100%',
    height: 120,
    backgroundColor: '#f0f0f0',
  },
  recommendedContent: {
    padding: 12,
  },
  recommendedTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  recommendedInstructor: {
    fontSize: 12,
    color: '#666',
    marginBottom: 6,
  },
  recommendedStats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  recommendedStudents: {
    fontSize: 11,
    color: '#666',
    marginLeft: 8,
  },
  recommendedPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  filterContent: {
    padding: 20,
  },
  filterSection: {
    marginBottom: 25,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  filterOption: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    marginRight: 10,
    marginBottom: 10,
  },
  filterOptionActive: {
    backgroundColor: '#007AFF',
  },
  filterOptionText: {
    fontSize: 14,
    color: '#666',
  },
  filterOptionTextActive: {
    color: 'white',
  },
  modalFooter: {
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  clearButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    marginRight: 10,
  },
  clearButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  applyButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#007AFF',
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
  },
});