import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Share,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

// Dummy Certificate Data
const certificates = [
  {
    id: '1',
    courseTitle: 'Python for Data Science',
    instructor: 'Dr. Alex Morgan',
    courseImage: 'https://media.geeksforgeeks.org/wp-content/cdn-uploads/20230318230239/Python-Data-Science-Tutorial.jpg',
    certificateId: 'CERT-001-2024',
    completedDate: '2024-01-20',
    issuedDate: '2024-01-25',
    totalDuration: '40 hours',
    finalGrade: 'A',
    category: 'Technology',
    skillsLearned: ['Python Programming', 'Data Analysis', 'Machine Learning Basics', 'Pandas & NumPy'],
    verificationUrl: 'https://certificates.example.com/verify/CERT-001-2024',
    certificateUrl: 'https://certificates.example.com/download/CERT-001-2024.pdf',
    credentialScore: 98,
    institution: 'TechEd Academy',
    accreditation: 'CPE Accredited',
  },
  {
    id: '2',
    courseTitle: 'Graphic Design Fundamentals',
    instructor: 'Anna Rodriguez',
    courseImage: 'https://img.freepik.com/free-vector/gradient-ui-ux-background_23-2149052117.jpg',
    certificateId: 'CERT-002-2024',
    completedDate: '2024-02-15',
    issuedDate: '2024-02-20',
    totalDuration: '25 hours',
    finalGrade: 'A-',
    category: 'Design',
    skillsLearned: ['Adobe Photoshop', 'Typography', 'Color Theory', 'Brand Design'],
    verificationUrl: 'https://certificates.example.com/verify/CERT-002-2024',
    certificateUrl: 'https://certificates.example.com/download/CERT-002-2024.pdf',
    credentialScore: 94,
    institution: 'Creative Institute',
    accreditation: 'Industry Recognized',
  },
  {
    id: '3',
    courseTitle: 'Business Strategy Fundamentals',
    instructor: 'Robert Kim',
    courseImage: 'https://media.geeksforgeeks.org/wp-content/uploads/20240223125319/Business-Strategy-copy.webp',
    certificateId: 'CERT-003-2024',
    completedDate: '2024-01-30',
    issuedDate: '2024-02-05',
    totalDuration: '22 hours',
    finalGrade: 'A+',
    category: 'Business',
    skillsLearned: ['Strategic Planning', 'Market Analysis', 'Competitive Analysis', 'Business Modeling'],
    verificationUrl: 'https://certificates.example.com/verify/CERT-003-2024',
    certificateUrl: 'https://certificates.example.com/download/CERT-003-2024.pdf',
    credentialScore: 96,
    institution: 'Business School Pro',
    accreditation: 'MBA Equivalent',
  },
  {
    id: '4',
    courseTitle: 'Advanced React Development',
    instructor: 'Sarah Johnson',
    courseImage: 'https://img-c.udemycdn.com/course/750x422/548278_b005_9.jpg',
    certificateId: 'CERT-004-2024',
    completedDate: '2024-03-10',
    issuedDate: '2024-03-15',
    totalDuration: '35 hours',
    finalGrade: 'A',
    category: 'Technology',
    skillsLearned: ['React.js', 'Redux', 'JavaScript ES6+', 'Component Architecture'],
    verificationUrl: 'https://certificates.example.com/verify/CERT-004-2024',
    certificateUrl: 'https://certificates.example.com/download/CERT-004-2024.pdf',
    credentialScore: 97,
    institution: 'Code Academy',
    accreditation: 'Industry Standard',
  },
];

const CertificateScreen = ({ navigation }) => {
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  const navigateTo = (route, params) => {
    navigation.navigate(route, params);
  };

  const handleShare = async (certificate) => {
    try {
      await Share.share({
        message: `🎓 I just earned a certificate in ${certificate.courseTitle}!\n\nCertificate ID: ${certificate.certificateId}\nGrade: ${certificate.finalGrade}\nVerify: ${certificate.verificationUrl}`,
        title: 'My Achievement Certificate',
      });
    } catch (error) {
      Alert.alert('Error', 'Unable to share certificate');
    }
  };

  const handleDownload = (certificate) => {
    Alert.alert(
      'Download Certificate',
      'This will download your certificate as a PDF file.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Download', onPress: () => {/* Handle download logic */} }
      ]
    );
  };

  const handleVerify = (certificate) => {
    Alert.alert(
      'Verify Certificate',
      `Certificate ID: ${certificate.certificateId}\n\nThis will open the verification page in your browser.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Verify', onPress: () => {/* Handle verification logic */} }
      ]
    );
  };

  const getGradeColor = (grade) => {
    switch (grade) {
      case 'A+': return '#4CAF50';
      case 'A': return '#4CAF50';
      case 'A-': return '#8BC34A';
      case 'B+': return '#FFC107';
      case 'B': return '#FF9800';
      default: return '#666';
    }
  };

  const getAccreditationColor = (accreditation) => {
    switch (accreditation) {
      case 'CPE Accredited': return '#2196F3';
      case 'MBA Equivalent': return '#9C27B0';
      case 'Industry Recognized': return '#FF5722';
      case 'Industry Standard': return '#607D8B';
      default: return '#666';
    }
  };

  const renderCertificate = ({ item }) => (
    <TouchableOpacity
      style={styles.certificateCard}
      onPress={() => setSelectedCertificate(selectedCertificate?.id === item.id ? null : item)}
    >
      <View style={styles.certificateHeader}>
        <Image source={{ uri: item.courseImage }} style={styles.courseImage} />
        <View style={styles.certificateBadge}>
          <Ionicons name="ribbon" size={24} color="#FFD700" />
        </View>
      </View>

      <View style={styles.certificateContent}>
        <View style={styles.courseHeaderInfo}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>
          <View style={[styles.gradeBadge, { backgroundColor: getGradeColor(item.finalGrade) + '20' }]}>
            <Text style={[styles.gradeText, { color: getGradeColor(item.finalGrade) }]}>
              Grade: {item.finalGrade}
            </Text>
          </View>
        </View>

        <Text style={styles.courseTitle}>{item.courseTitle}</Text>
        <Text style={styles.instructor}>by {item.instructor}</Text>
        
        <View style={styles.institutionContainer}>
          <Ionicons name="school" size={14} color="#666" />
          <Text style={styles.institutionText}>{item.institution}</Text>
        </View>

        <View style={styles.certificateDetails}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Certificate ID:</Text>
            <Text style={styles.detailValue}>{item.certificateId}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Issued:</Text>
            <Text style={styles.detailValue}>{item.issuedDate}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Duration:</Text>
            <Text style={styles.detailValue}>{item.totalDuration}</Text>
          </View>
        </View>

        <View style={styles.accreditationContainer}>
          <View style={[styles.accreditationBadge, { backgroundColor: getAccreditationColor(item.accreditation) + '20' }]}>
            <Ionicons name="checkmark-circle" size={12} color={getAccreditationColor(item.accreditation)} />
            <Text style={[styles.accreditationText, { color: getAccreditationColor(item.accreditation) }]}>
              {item.accreditation}
            </Text>
          </View>
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreLabel}>Score: </Text>
            <Text style={styles.scoreValue}>{item.credentialScore}%</Text>
          </View>
        </View>

        {selectedCertificate?.id === item.id && (
          <View style={styles.expandedContent}>
            <View style={styles.skillsSection}>
              <Text style={styles.skillsLabel}>Skills Certified:</Text>
              <View style={styles.skillsContainer}>
                {item.skillsLearned.map((skill, index) => (
                  <View key={index} style={styles.skillBadge}>
                    <Ionicons name="checkmark" size={10} color="#4CAF50" />
                    <Text style={styles.skillText}>{skill}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleDownload(item)}
              >
                <Ionicons name="download" size={16} color="#007AFF" />
                <Text style={styles.actionButtonText}>Download</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleShare(item)}
              >
                <Ionicons name="share-social" size={16} color="#007AFF" />
                <Text style={styles.actionButtonText}>Share</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleVerify(item)}
              >
                <Ionicons name="shield-checkmark" size={16} color="#007AFF" />
                <Text style={styles.actionButtonText}>Verify</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View style={styles.certificateFooter}>
          <TouchableOpacity
            style={styles.viewDetailsButton}
            onPress={() => setSelectedCertificate(selectedCertificate?.id === item.id ? null : item)}
          >
            <Text style={styles.viewDetailsText}>
              {selectedCertificate?.id === item.id ? 'Hide Details' : 'View Details'}
            </Text>
            <Ionicons
              name={selectedCertificate?.id === item.id ? "chevron-up" : "chevron-down"}
              size={16}
              color="#007AFF"
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Certificates</Text>
        <TouchableOpacity style={styles.headerIcon}>
          <Ionicons name="search" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Summary Stats */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryCard}>
          <View style={styles.summaryIconContainer}>
            <Ionicons name="ribbon" size={24} color="#FFD700" />
          </View>
          <View style={styles.summaryInfo}>
            <Text style={styles.summaryCount}>{certificates.length}</Text>
            <Text style={styles.summaryLabel}>Certificates Earned</Text>
          </View>
        </View>
        <View style={styles.summaryCard}>
          <View style={styles.summaryIconContainer}>
            <Ionicons name="trophy" size={24} color="#FF6B6B" />
          </View>
          <View style={styles.summaryInfo}>
            <Text style={styles.summaryCount}>
              {Math.round(certificates.reduce((sum, cert) => sum + cert.credentialScore, 0) / certificates.length)}%
            </Text>
            <Text style={styles.summaryLabel}>Avg Score</Text>
          </View>
        </View>
      </View>

      {/* Certificates List */}
      <View style={styles.content}>
        <FlatList
          data={certificates}
          renderItem={renderCertificate}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      </View>

      {/* Achievement Message */}
      <View style={styles.achievementContainer}>
        <Text style={styles.achievementText}>
          🎉 Great job! You've earned {certificates.length} professional certificates
        </Text>
      </View>
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
  summaryContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  summaryCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 12,
    marginHorizontal: 5,
  },
  summaryIconContainer: {
    marginRight: 12,
  },
  summaryInfo: {
    flex: 1,
  },
  summaryCount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  summaryLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  content: {
    flex: 1,
  },
  listContainer: {
    padding: 20,
  },
  certificateCard: {
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
  certificateHeader: {
    position: 'relative',
  },
  courseImage: {
    width: '100%',
    height: 120,
    backgroundColor: '#f0f0f0',
  },
  certificateBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 20,
    padding: 8,
  },
  certificateContent: {
    padding: 15,
  },
  courseHeaderInfo: {
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
  gradeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  gradeText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  instructor: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  institutionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  institutionText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 6,
    fontStyle: 'italic',
  },
  certificateDetails: {
    backgroundColor: '#f8f9fa',
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  detailLabel: {
    fontSize: 12,
    color: '#666',
  },
  detailValue: {
    fontSize: 12,
    color: '#333',
    fontWeight: '600',
  },
  accreditationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  accreditationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  accreditationText: {
    fontSize: 10,
    fontWeight: '600',
    marginLeft: 4,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreLabel: {
    fontSize: 12,
    color: '#666',
  },
  scoreValue: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  expandedContent: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 12,
    marginTop: 12,
  },
  skillsSection: {
    marginBottom: 15,
  },
  skillsLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
    fontWeight: '600',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 4,
  },
  skillText: {
    fontSize: 10,
    color: '#4CAF50',
    marginLeft: 4,
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  actionButtonText: {
    color: '#007AFF',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  certificateFooter: {
    alignItems: 'center',
  },
  viewDetailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  viewDetailsText: {
    color: '#007AFF',
    fontSize: 12,
    fontWeight: '600',
    marginRight: 4,
  },
  achievementContainer: {
    backgroundColor: '#E8F5E8',
    padding: 12,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 8,
  },
  achievementText: {
    fontSize: 12,
    color: '#4CAF50',
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default CertificateScreen;