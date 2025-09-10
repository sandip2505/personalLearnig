import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Animated,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

const onboardingData = [
  {
    id: '1',
    title: 'Learn Anything, Anywhere',
    subtitle: 'Discover thousands of courses from expert instructors',
    description: 'Access high-quality courses on your schedule. Learn new skills from industry professionals and advance your career.',
    image: '📚',
    backgroundColor: '#667eea',
    backgroundGradient: ['#667eea', '#764ba2'],
    iconColor: '#FFFFFF',
    animation: 'bounce',
  },
  {
    id: '2',
    title: 'Interactive Learning',
    subtitle: 'Engage with hands-on projects and quizzes',
    description: 'Practice what you learn with interactive exercises, real-world projects, and instant feedback to master new concepts.',
    image: '🎯',
    backgroundColor: '#f093fb',
    backgroundGradient: ['#f093fb', '#f5576c'],
    iconColor: '#FFFFFF',
    animation: 'pulse',
  },
  {
    id: '3',
    title: 'Track Your Progress',
    subtitle: 'Monitor your learning journey and achievements',
    description: 'Stay motivated with detailed progress tracking, certificates, and badges as you complete courses and reach milestones.',
    image: '📈',
    backgroundColor: '#4facfe',
    backgroundGradient: ['#4facfe', '#00f2fe'],
    iconColor: '#FFFFFF',
    animation: 'rotate',
  },
  {
    id: '4',
    title: 'Join Our Community',
    subtitle: 'Connect with learners and experts worldwide',
    description: 'Be part of a global learning community. Share knowledge, get help, and network with professionals in your field.',
    image: '🌟',
    backgroundColor: '#43e97b',
    backgroundGradient: ['#43e97b', '#38f9d7'],
    iconColor: '#FFFFFF',
    animation: 'scale',
  },
];

const OnboardingScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  // Animation values for each screen element
  const titleAnim = useRef(new Animated.Value(0)).current;
  const subtitleAnim = useRef(new Animated.Value(0)).current;
  const descriptionAnim = useRef(new Animated.Value(0)).current;
  const buttonAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate elements when component mounts or index changes
    animateElements();
  }, [currentIndex]);

  const animateElements = () => {
    // Reset animations
    titleAnim.setValue(0);
    subtitleAnim.setValue(0);
    descriptionAnim.setValue(0);
    buttonAnim.setValue(0);

    // Staggered animation sequence
    Animated.sequence([
      Animated.timing(titleAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(subtitleAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(descriptionAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(buttonAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const goToNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      // Navigate to main app or login screen
      navigation.replace('Login'); // or 'MainApp'
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex - 1,
        animated: true,
      });
    }
  };

  const skip = () => {
    navigation.replace('Login'); // or 'MainApp'
  };

  const getStarted = () => {
    navigation.replace('Login'); // or 'MainApp'
  };

  const renderOnboardingItem = ({ item, index }) => {
    const inputRange = [
      (index - 1) * width,
      index * width,
      (index + 1) * width,
    ];

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8],
      extrapolate: 'clamp',
    });

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.5, 1, 0.5],
      extrapolate: 'clamp',
    });

    return (
      <View style={[styles.onboardingItem, { backgroundColor: item.backgroundColor }]}>
        {/* Animated Background */}
        <Animated.View
          style={[
            styles.animatedBackground,
            {
              transform: [{ scale }],
              opacity,
            },
          ]}
        />

        <View style={styles.content}>
          {/* Skip Button */}
          {index < onboardingData.length - 1 && (
            <TouchableOpacity style={styles.skipButton} onPress={skip}>
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
          )}

          {/* Emoji/Icon */}
          <Animated.View
            style={[
              styles.imageContainer,
              {
                transform: [{ scale }],
                opacity,
              },
            ]}
          >
            <Text style={styles.emoji}>{item.image}</Text>
          </Animated.View>

          {/* Text Content */}
          <View style={styles.textContainer}>
            <Animated.Text
              style={[
                styles.title,
                {
                  opacity: titleAnim,
                  transform: [
                    {
                      translateY: titleAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [30, 0],
                      }),
                    },
                  ],
                },
              ]}
            >
              {item.title}
            </Animated.Text>

            <Animated.Text
              style={[
                styles.subtitle,
                {
                  opacity: subtitleAnim,
                  transform: [
                    {
                      translateY: subtitleAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [20, 0],
                      }),
                    },
                  ],
                },
              ]}
            >
              {item.subtitle}
            </Animated.Text>

            <Animated.Text
              style={[
                styles.description,
                {
                  opacity: descriptionAnim,
                  transform: [
                    {
                      translateY: descriptionAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [20, 0],
                      }),
                    },
                  ],
                },
              ]}
            >
              {item.description}
            </Animated.Text>
          </View>

          {/* Navigation Buttons */}
          <Animated.View
            style={[
              styles.buttonContainer,
              {
                opacity: buttonAnim,
                transform: [
                  {
                    translateY: buttonAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [30, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            {index === onboardingData.length - 1 ? (
              <TouchableOpacity style={styles.getStartedButton} onPress={getStarted}>
                <Text style={styles.getStartedText}>Get Started</Text>
                <Ionicons name="arrow-forward" size={20} color="#FFFFFF" style={styles.buttonIcon} />
              </TouchableOpacity>
            ) : (
              <View style={styles.navigationButtons}>
                {index > 0 && (
                  <TouchableOpacity style={styles.backButton} onPress={goToPrevious}>
                    <Ionicons name="arrow-back" size={20} color="#FFFFFF" />
                  </TouchableOpacity>
                )}
                <TouchableOpacity style={styles.nextButton} onPress={goToNext}>
                  <Text style={styles.nextText}>Next</Text>
                  <Ionicons name="arrow-forward" size={16} color="#FFFFFF" style={styles.buttonIcon} />
                </TouchableOpacity>
              </View>
            )}
          </Animated.View>
        </View>
      </View>
    );
  };

  const renderPagination = () => {
    return (
      <View style={styles.paginationContainer}>
        {onboardingData.map((_, index) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];

          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [8, 20, 8],
            extrapolate: 'clamp',
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={index}
              style={[
                styles.paginationDot,
                {
                  width: dotWidth,
                  opacity,
                },
              ]}
            />
          );
        })}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={onboardingData}
        renderItem={renderOnboardingItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        scrollEventThrottle={16}
      />
      {renderPagination()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  onboardingItem: {
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animatedBackground: {
    position: 'absolute',
    width: width * 2,
    height: height * 2,
    borderRadius: width,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 50,
  },
  skipButton: {
    alignSelf: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
  },
  skipText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  emoji: {
    fontSize: 120,
    textAlign: 'center',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 40,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  description: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 40,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  backButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  nextText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 5,
  },
  getStartedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 40,
    paddingVertical: 18,
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  getStartedText: {
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  buttonIcon: {
    marginLeft: 5,
  },
  paginationContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 120,
    alignSelf: 'center',
  },
  paginationDot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    marginHorizontal: 4,
  },
});

export default OnboardingScreen;