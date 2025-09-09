import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

// Dummy course data
const courseData = {
  id: '1',
  title: 'Complete Web Development Bootcamp',
  instructor: 'Sarah Johnson',
  image: 'https://img-c.udemycdn.com/course/750x422/548278_b005_9.jpg',
  category: 'Technology',
  rating: 4.8,
  students: 12500,
  duration: '42 hours',
  level: 'Intermediate',
  description: 'Learn web development from scratch with HTML, CSS, JavaScript, React, Node.js, and more.',
  progress: 0.75,
  totalLessons: 24,
  completedLessons: 18,
  enrolledDate: '2024-01-15',
};

// Dummy lessons data organized by sections
const lessonsData = [
  {
    id: 'section1',
    title: 'Getting Started with Web Development',
    lessons: [
      {
        id: '1',
        title: 'Introduction to Web Development',
        type: 'video',
        duration: '8:45',
        isCompleted: true,
        isLocked: false,
        description: 'Overview of web development and what you\'ll learn in this course.',
        resources: 2,
        quiz: false,
      },
      {
        id: '2',
        title: 'Setting Up Your Development Environment',
        type: 'video',
        duration: '12:30',
        isCompleted: true,
        isLocked: false,
        description: 'Install and configure all the tools you need for web development.',
        resources: 4,
        quiz: true,
      },
      {
        id: '3',
        title: 'Understanding How the Web Works',
        type: 'reading',
        duration: '15 min',
        isCompleted: true,
        isLocked: false,
        description: 'Learn about servers, browsers, and how web applications communicate.',
        resources: 1,
        quiz: false,
      },
    ],
  },
  {
    id: 'section2',
    title: 'HTML Fundamentals',
    lessons: [
      {
        id: '4',
        title: 'HTML Structure and Elements',
        type: 'video',
        duration: '18:20',
        isCompleted: true,
        isLocked: false,
        description: 'Learn the basic structure of HTML and common elements.',
        resources: 3,
        quiz: true,
      },
      {
        id: '5',
        title: 'Working with Forms and Input',
        type: 'video',
        duration: '25:15',
        isCompleted: true,
        isLocked: false,
        description: 'Create interactive forms and handle user input.',
        resources: 5,
        quiz: true,
      },
      {
        id: '6',
        title: 'Semantic HTML and Accessibility',
        type: 'video',
        duration: '16:40',
        isCompleted: true,
        isLocked: false,
        description: 'Write meaningful HTML that\'s accessible to all users.',
        resources: 2,
        quiz: false,
      },
      {
        id: '7',
        title: 'HTML Project: Build Your First Webpage',
        type: 'project',
        duration: '45 min',
        isCompleted: true,
        isLocked: false,
        description: 'Put your HTML knowledge into practice by building a complete webpage.',
        resources: 3,
        quiz: false,
      },
    ],
  },
  {
    id: 'section3',
    title: 'CSS Styling and Layout',
    lessons: [
      {
        id: '8',
        title: 'CSS Basics and Selectors',
        type: 'video',
        duration: '22:10',
        isCompleted: true,
        isLocked: false,
        description: 'Learn CSS syntax, selectors, and basic styling properties.',
        resources: 4,
        quiz: true,
      },
      {
        id: '9',
        title: 'CSS Box Model and Layout',
        type: 'video',
        duration: '28:30',
        isCompleted: true,
        isLocked: false,
        description: 'Understand the CSS box model and create layouts.',
        resources: 6,
        quiz: true,
      },
      {
        id: '10',
        title: 'Flexbox and Grid Systems',
        type: 'video',
        duration: '35:45',
        isCompleted: true,
        isLocked: false,
        description: 'Master modern CSS layout techniques with Flexbox and Grid.',
        resources: 8,
        quiz: true,
      },
      {
        id: '11',
        title: 'Responsive Design Principles',
        type: 'video',
        duration: '31:20',
        isCompleted: true,
        isLocked: false,
        description: 'Create websites that work on all devices and screen sizes.',
        resources: 5,
        quiz: false,
      },
      {
        id: '12',
        title: 'CSS Animations and Transitions',
        type: 'video',
        duration: '24:15',
        isCompleted: true,
        isLocked: false,
        description: 'Add smooth animations and transitions to your websites.',
        resources: 7,
        quiz: true,
      },
    ],
  },
  {
    id: 'section4',
    title: 'JavaScript Programming',
    lessons: [
      {
        id: '13',
        title: 'JavaScript Fundamentals',
        type: 'video',
        duration: '26:40',
        isCompleted: true,
        isLocked: false,
        description: 'Learn JavaScript basics: variables, functions, and control structures.',
        resources: 4,
        quiz: true,
      },
      {
        id: '14',
        title: 'DOM Manipulation',
        type: 'video',
        duration: '32:25',
        isCompleted: true,
        isLocked: false,
        description: 'Learn to interact with HTML elements using JavaScript.',
        resources: 6,
        quiz: true,
      },
      {
        id: '15',
        title: 'Event Handling and User Interaction',
        type: 'video',
        duration: '29:10',
        isCompleted: true,
        isLocked: false,
        description: 'Handle user events and create interactive web experiences.',
        resources: 5,
        quiz: true,
      },
      {
        id: '16',
        title: 'Asynchronous JavaScript and APIs',
        type: 'video',
        duration: '38:50',
        isCompleted: true,
        isLocked: false,
        description: 'Work with APIs and handle asynchronous operations.',
        resources: 8,
        quiz: true,
      },
      {
        id: '17',
        title: 'JavaScript ES6+ Features',
        type: 'video',
        duration: '33:15',
        isCompleted: true,
        isLocked: false,
        description: 'Modern JavaScript features and best practices.',
        resources: 6,
        quiz: false,
      },
      {
        id: '18',
        title: 'JavaScript Project: Interactive Todo App',
        type: 'project',
        duration: '60 min',
        isCompleted: true,
        isLocked: false,
        description: 'Build a fully functional todo application with JavaScript.',
        resources: 4,
        quiz: false,
      },
    ],
  },
  {
    id: 'section5',
    title: 'React Framework',
    lessons: [
      {
        id: '19',
        title: 'Introduction to React',
        type: 'video',
        duration: '20:30',
        isCompleted: false,
        isLocked: false,
        isCurrent: true,
        description: 'Learn what React is and why it\'s popular for building web apps.',
        resources: 3,
        quiz: true,
      },
      {
        id: '20',
        title: 'React Components and JSX',
        type: 'video',
        duration: '28:45',
        isCompleted: false,
        isLocked: false,
        description: 'Create reusable components using JSX syntax.',
        resources: 5,
        quiz: true,
      },
      {
        id: '21',
        title: 'State Management with Hooks',
        type: 'video',
        duration: '35:20',
        isCompleted: false,
        isLocked: false,
        description: 'Manage component state using React hooks.',
        resources: 7,
        quiz: true,
      },
      {
        id: '22',
        title: 'React Router and Navigation',
        type: 'video',
        duration: '24:15',
        isCompleted: false,
        isLocked: false,
        description: 'Add navigation to your React applications.',
        resources: 4,
        quiz: false,
      },
    ],
  },
  {
    id: 'section6',
    title: 'Backend Development',
    lessons: [
      {
        id: '23',
        title: 'Node.js and Express Setup',
        type: 'video',
        duration: '30:40',
        isCompleted: false,
        isLocked: true,
        description: 'Set up a backend server with Node.js and Express.',
        resources: 5,
        quiz: true,
      },
      {
        id: '24',
        title: 'Database Integration with MongoDB',
        type: 'video',
        duration: '42:10',
        isCompleted: false,
        isLocked: true,
        description: 'Connect your application to a MongoDB database.',
        resources: 6,
        quiz: true,
      },
    ],
  },
];

const CourseLessonsScreen = ({ navigation, route }) => {
  const [expandedSections, setExpandedSections] = useState(new Set(['section5']));
  const [showLessonModal, setShowLessonModal] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [downloadModal, setDownloadModal] = useState(false);

  const course = route?.params?.course || courseData;

  const toggleSection = (sectionId) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const handleLessonPress = (lesson, sectionId) => {
    if (lesson.isLocked) {
      Alert.alert('Lesson Locked', 'Complete previous lessons to unlock this one.');
      return;
    }
    setSelectedLesson({ ...lesson, sectionId });
    setShowLessonModal(true);
  };

  const startLesson = () => {
    setShowLessonModal(false);
    navigation.navigate('VideoPlayer', { lesson: selectedLesson, course });
  };

  const downloadLesson = (lesson) => {
    Alert.alert('Download Lesson', `"${lesson.title}" will be downloaded for offline viewing.`);
  };

  const downloadSection = (section) => {
    Alert.alert('Download Section', `All lessons in "${section.title}" will be downloaded.`);
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'video': return 'play-circle-outline';
      case 'reading': return 'document-text-outline';
      case 'project': return 'code-slash-outline';
      case 'quiz': return 'help-circle-outline';
      default: return 'play-circle-outline';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'video': return '#007AFF';
      case 'reading': return '#34C759';
      case 'project': return '#FF9500';
      case 'quiz': return '#FF6B6B';
      default: return '#007AFF';
    }
  };

  const renderCourseHeader = () => (
    <View style={styles.courseHeader}>
      <Image source={{ uri: course.image }} style={styles.courseHeaderImage} />
      <View style={styles.courseHeaderOverlay}>
        <Text style={styles.courseCategory}>{course.category}</Text>
        <Text style={styles.courseHeaderTitle}>{course.title}</Text>
        <Text style={styles.courseInstructor}>by {course.instructor}</Text>
        
        <View style={styles.courseStats}>
          <View style={styles.statItem}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.statText}>{course.rating}</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="people" size={16} color="white" />
            <Text style={styles.statText}>{course.students.toLocaleString()}</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="time" size={16} color="white" />
            <Text style={styles.statText}>{course.duration}</Text>
          </View>
        </View>

        <View style={styles.progressSection}>
          <View style={styles.progressInfo}>
            <Text style={styles.progressText}>
              {course.completedLessons}/{course.totalLessons} lessons completed
            </Text>
            <Text style={styles.progressPercent}>
              {Math.round(course.progress * 100)}%
            </Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${course.progress * 100}%` }]} />
          </View>
        </View>
      </View>
    </View>
  );

  const renderActionButtons = () => (
    <View style={styles.actionButtonsContainer}>
      <TouchableOpacity style={styles.primaryAction} onPress={() => {
        const currentLesson = lessonsData
          .flatMap(section => section.lessons)
          .find(lesson => lesson.isCurrent);
        if (currentLesson) {
          navigation.navigate('VideoPlayer', { lesson: currentLesson, course });
        }
      }}>
        <Ionicons name="play" size={20} color="white" />
        <Text style={styles.primaryActionText}>Continue Learning</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryAction} onPress={() => setDownloadModal(true)}>
        <Ionicons name="download-outline" size={20} color="#007AFF" />
        <Text style={styles.secondaryActionText}>Download</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryAction}>
        <Ionicons name="share-outline" size={20} color="#007AFF" />
        <Text style={styles.secondaryActionText}>Share</Text>
      </TouchableOpacity>
    </View>
  );

  const renderLessonItem = (lesson, sectionId) => (
    <TouchableOpacity
      key={lesson.id}
      style={[
        styles.lessonItem,
        lesson.isCompleted && styles.completedLesson,
        lesson.isCurrent && styles.currentLesson,
        lesson.isLocked && styles.lockedLesson,
      ]}
      onPress={() => handleLessonPress(lesson, sectionId)}
      disabled={lesson.isLocked}
    >
      <View style={styles.lessonLeft}>
        <View style={[styles.lessonTypeIcon, { backgroundColor: getTypeColor(lesson.type) }]}>
          {lesson.isCompleted ? (
            <Ionicons name="checkmark" size={16} color="white" />
          ) : lesson.isLocked ? (
            <Ionicons name="lock-closed" size={16} color="white" />
          ) : (
            <Ionicons name={getTypeIcon(lesson.type)} size={16} color="white" />
          )}
        </View>
        
        <View style={styles.lessonContent}>
          <Text style={[
            styles.lessonTitle,
            lesson.isCompleted && styles.completedLessonTitle,
            lesson.isLocked && styles.lockedLessonTitle,
          ]}>
            {lesson.title}
          </Text>
          <Text style={styles.lessonDescription} numberOfLines={2}>
            {lesson.description}
          </Text>
          <View style={styles.lessonMeta}>
            <View style={styles.metaItem}>
              <Ionicons name="time-outline" size={12} color="#666" />
              <Text style={styles.metaText}>{lesson.duration}</Text>
            </View>
            {lesson.resources > 0 && (
              <View style={styles.metaItem}>
                <Ionicons name="document-outline" size={12} color="#666" />
                <Text style={styles.metaText}>{lesson.resources} resources</Text>
              </View>
            )}
            {lesson.quiz && (
              <View style={styles.metaItem}>
                <Ionicons name="help-circle-outline" size={12} color="#666" />
                <Text style={styles.metaText}>Quiz</Text>
              </View>
            )}
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={styles.downloadButton}
        onPress={() => downloadLesson(lesson)}
      >
        <Ionicons name="download-outline" size={16} color="#007AFF" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderSection = ({ item: section }) => {
    const isExpanded = expandedSections.has(section.id);
    const completedCount = section.lessons.filter(l => l.isCompleted).length;
    const totalCount = section.lessons.length;

    return (
      <View style={styles.sectionContainer}>
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() => toggleSection(section.id)}
        >
          <View style={styles.sectionLeft}>
            <Ionicons
              name={isExpanded ? 'chevron-down' : 'chevron-forward'}
              size={20}
              color="#666"
            />
            <View style={styles.sectionInfo}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <Text style={styles.sectionProgress}>
                {completedCount}/{totalCount} lessons
              </Text>
            </View>
          </View>
          
          <TouchableOpacity
            style={styles.sectionDownload}
            onPress={() => downloadSection(section)}
          >
            <Ionicons name="download-outline" size={18} color="#007AFF" />
          </TouchableOpacity>
        </TouchableOpacity>

        {isExpanded && (
          <View style={styles.lessonsContainer}>
            {section.lessons.map(lesson => renderLessonItem(lesson, section.id))}
          </View>
        )}
      </View>
    );
  };

  const renderLessonModal = () => (
    <Modal
      visible={showLessonModal}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={() => setShowLessonModal(false)}>
            <Ionicons name="close" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Lesson Preview</Text>
          <View style={{ width: 24 }} />
        </View>

        {selectedLesson && (
          <ScrollView style={styles.modalContent}>
            <View style={[styles.lessonTypeIcon, { backgroundColor: getTypeColor(selectedLesson.type), alignSelf: 'center', marginBottom: 20 }]}>
              <Ionicons name={getTypeIcon(selectedLesson.type)} size={24} color="white" />
            </View>
            
            <Text style={styles.modalLessonTitle}>{selectedLesson.title}</Text>
            <Text style={styles.modalLessonDescription}>{selectedLesson.description}</Text>
            
            <View style={styles.modalMeta}>
              <View style={styles.modalMetaItem}>
                <Ionicons name="time-outline" size={16} color="#666" />
                <Text style={styles.modalMetaText}>Duration: {selectedLesson.duration}</Text>
              </View>
              {selectedLesson.resources > 0 && (
                <View style={styles.modalMetaItem}>
                  <Ionicons name="document-outline" size={16} color="#666" />
                  <Text style={styles.modalMetaText}>{selectedLesson.resources} downloadable resources</Text>
                </View>
              )}
              {selectedLesson.quiz && (
                <View style={styles.modalMetaItem}>
                  <Ionicons name="help-circle-outline" size={16} color="#666" />
                  <Text style={styles.modalMetaText}>Includes quiz</Text>
                </View>
              )}
            </View>

            <TouchableOpacity style={styles.startLessonButton} onPress={startLesson}>
              <Ionicons name="play" size={20} color="white" />
              <Text style={styles.startLessonText}>Start Lesson</Text>
            </TouchableOpacity>
          </ScrollView>
        )}
      </SafeAreaView>
    </Modal>
  );

  const renderDownloadModal = () => (
    <Modal
      visible={downloadModal}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={() => setDownloadModal(false)}>
            <Ionicons name="close" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Download Options</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.downloadOptions}>
          <TouchableOpacity style={styles.downloadOption}>
            <Ionicons name="download-outline" size={24} color="#007AFF" />
            <View style={styles.downloadOptionContent}>
              <Text style={styles.downloadOptionTitle}>Download All Lessons</Text>
              <Text style={styles.downloadOptionDesc}>Download entire course for offline viewing</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.downloadOption}>
            <Ionicons name="checkmark-circle-outline" size={24} color="#34C759" />
            <View style={styles.downloadOptionContent}>
              <Text style={styles.downloadOptionTitle}>Download Remaining Lessons</Text>
              <Text style={styles.downloadOptionDesc}>Download only incomplete lessons</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.downloadOption}>
            <Ionicons name="settings-outline" size={24} color="#666" />
            <View style={styles.downloadOptionContent}>
              <Text style={styles.downloadOptionTitle}>Download Settings</Text>
              <Text style={styles.downloadOptionDesc}>Configure download quality and storage</Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Course Content</Text>
        <TouchableOpacity style={styles.headerIcon}>
          <Ionicons name="bookmark-outline" size={22} color="#333" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={lessonsData}
        renderItem={renderSection}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View>
            {renderCourseHeader()}
            {renderActionButtons()}
          </View>
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />

      {renderLessonModal()}
      {renderDownloadModal()}
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  headerIcon: {
    padding: 5,
  },
  listContainer: {
    paddingBottom: 20,
  },
  courseHeader: {
    height: 220,
    position: 'relative',
  },
  courseHeaderImage: {
    width: '100%',
    height: '100%',
  },
  courseHeaderOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 20,
  },
  courseCategory: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: 5,
  },
  courseHeaderTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  courseInstructor: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 15,
  },
  courseStats: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  statText: {
    fontSize: 14,
    color: 'white',
    marginLeft: 5,
    fontWeight: '600',
  },
  progressSection: {
    marginTop: 10,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressText: {
    fontSize: 14,
    color: 'white',
  },
  progressPercent: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 2,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  primaryAction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
  },
  primaryActionText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 8,
  },
  secondaryAction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    marginLeft: 5,
  },
  secondaryActionText: {
    color: '#007AFF',
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 5,
  },
  sectionContainer: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginVertical: 8,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sectionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  sectionInfo: {
    marginLeft: 12,
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  sectionProgress: {
    fontSize: 12,
    color: '#666',
  },
  sectionDownload: {
    padding: 8,
  },
  lessonsContainer: {
    backgroundColor: '#fafafa',
  },
  lessonItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  completedLesson: {
    backgroundColor: '#f8fff8',
  },
  currentLesson: {
    backgroundColor: '#e3f2fd',
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  lockedLesson: {
    backgroundColor: '#f5f5f5',
    opacity: 0.6,
  },
  lessonLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  lessonTypeIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  lessonContent: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  completedLessonTitle: {
    color: '#666',
  },
  lockedLessonTitle: {
    color: '#999',
  },
  lessonDescription: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
    marginBottom: 8,
  },
  lessonMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
    marginBottom: 2,
  },
  metaText: {
    fontSize: 11,
    color: '#666',
    marginLeft: 3,
  },
  downloadButton: {
    padding: 8,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  modalLessonTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 15,
  },
  modalLessonDescription: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 30,
  },
  modalMeta: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
  },
  modalMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalMetaText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 10,
  },
  startLessonButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  startLessonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  downloadOptions: {
    padding: 20,
  },
  downloadOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  downloadOptionContent: {
    marginLeft: 15,
    flex: 1,
  },
  downloadOptionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  downloadOptionDesc: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

export default CourseLessonsScreen;