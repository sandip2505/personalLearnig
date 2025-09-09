import React, { useState } from 'react';
import {
    Alert,
    Linking,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HelpAndSupportScreen = ({ navigation }) => {
    const [expandedFAQ, setExpandedFAQ] = useState(null);

    const faqData = [
        {
            id: 1,
            question: "How do I purchase a course?",
            answer: "To purchase a course, browse our course catalog, select the course you want, and tap 'Buy Now'. You can pay using credit/debit cards, PayPal, or other available payment methods."
        },
        {
            id: 2,
            question: "Can I download courses for offline viewing?",
            answer: "Yes! You can download course videos for offline viewing. Go to your enrolled course, tap the download icon next to each lesson. Downloads are available for 30 days after your last login."
        },
        {
            id: 3,
            question: "How do I get a refund?",
            answer: "We offer a 30-day money-back guarantee. To request a refund, go to Settings > Purchase History, select the course, and tap 'Request Refund'. Refunds are processed within 5-7 business days."
        },
        {
            id: 4,
            question: "Can I access courses on multiple devices?",
            answer: "Yes, you can access your courses on up to 5 devices simultaneously. Simply log in with your account credentials on any supported device (phone, tablet, computer)."
        },
        {
            id: 5,
            question: "How long do I have access to a purchased course?",
            answer: "Once you purchase a course, you have lifetime access to it. You can watch the course content as many times as you want, at your own pace."
        },
        {
            id: 6,
            question: "What if I'm having technical issues?",
            answer: "For technical issues, try restarting the app first. If the problem persists, contact our support team through the 'Contact Support' option below with details about the issue."
        }
    ];

    const handleFAQPress = (id) => {
        setExpandedFAQ(expandedFAQ === id ? null : id);
    };

    const handleContactSupport = () => {
        Alert.alert(
            "Contact Support",
            "How would you like to contact us?",
            [
                {
                    text: "Email",
                    onPress: () => Linking.openURL('mailto:support@learningapp.com')
                },
                {
                    text: "Live Chat",
                    onPress: () => {
                        // Navigate to chat screen or open chat
                        Alert.alert("Live Chat", "Redirecting to live chat...");
                    }
                },
                {
                    text: "Cancel",
                    style: "cancel"
                }
            ]
        );
    };

    const handlePhoneSupport = () => {
        Alert.alert(
            "Phone Support",
            "Call our support team at +1 (555) 123-4567\n\nHours: Mon-Fri 9AM-6PM EST",
            [
                {
                    text: "Call Now",
                    onPress: () => Linking.openURL('tel:+15551234567')
                },
                {
                    text: "Cancel",
                    style: "cancel"
                }
            ]
        );
    };

    const HelpItem = ({ icon, title, subtitle, onPress, showArrow = true }) => (
        <TouchableOpacity style={styles.helpItem} onPress={onPress}>
            <View style={styles.helpLeft}>
                <View style={styles.iconContainer}>
                    <Ionicons name={icon} size={22} color="#007AFF" />
                </View>
                <View style={styles.helpText}>
                    <Text style={styles.helpTitle}>{title}</Text>
                    {subtitle && <Text style={styles.helpSubtitle}>{subtitle}</Text>}
                </View>
            </View>
            {showArrow && (
                <Ionicons name="chevron-forward" size={18} color="#C7C7CC" />
            )}
        </TouchableOpacity>
    );

    const FAQItem = ({ item }) => {
        const isExpanded = expandedFAQ === item.id;

        return (
            <View style={styles.faqItem}>
                <TouchableOpacity
                    style={styles.faqQuestion}
                    onPress={() => handleFAQPress(item.id)}
                >
                    <Text style={styles.faqQuestionText}>{item.question}</Text>
                    <Ionicons
                        name={isExpanded ? "chevron-up" : "chevron-down"}
                        size={20}
                        color="#666"
                    />
                </TouchableOpacity>
                {isExpanded && (
                    <View style={styles.faqAnswer}>
                        <Text style={styles.faqAnswerText}>{item.answer}</Text>
                    </View>
                )}
            </View>
        );
    };

    const SectionHeader = ({ title, subtitle }) => (
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{title}</Text>
            {subtitle && <Text style={styles.sectionSubtitle}>{subtitle}</Text>}
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons name="arrow-back" size={24} color="#333" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Help & Support</Text>
                    <View style={styles.headerRight} />
                </View>

                {/* Welcome Section */}
                <View style={styles.welcomeSection}>
                    <View style={styles.welcomeIcon}>
                        <Ionicons name="help-circle" size={60} color="#007AFF" />
                    </View>
                    <Text style={styles.welcomeTitle}>How can we help you?</Text>
                    <Text style={styles.welcomeSubtitle}>
                        Find answers to common questions or get in touch with our support team
                    </Text>
                </View>

                {/* Quick Actions */}
                <SectionHeader title="Get Help Quickly" />
                <View style={styles.section}>
                    <HelpItem
                        icon="chatbubbles-outline"
                        title="Contact Support"
                        subtitle="Email or live chat with our team"
                        onPress={handleContactSupport}
                    />
                    <HelpItem
                        icon="call-outline"
                        title="Phone Support"
                        subtitle="+1 (555) 123-4567 • Mon-Fri 9AM-6PM EST"
                        onPress={handlePhoneSupport}
                    />
                    <HelpItem
                        icon="document-text-outline"
                        title="Report a Problem"
                        subtitle="Tell us about technical issues"
                        onPress={() => navigation.navigate('ReportProblem')}
                    />
                    <HelpItem
                        icon="star-outline"
                        title="Feature Request"
                        subtitle="Suggest new features or improvements"
                        onPress={() => navigation.navigate('FeatureRequest')}
                    />
                </View>

                {/* Self-Help Options */}
                <SectionHeader title="Self-Help Resources" />
                <View style={styles.section}>
                    <HelpItem
                        icon="library-outline"
                        title="Knowledge Base"
                        subtitle="Browse helpful articles and guides"
                        onPress={() => navigation.navigate('KnowledgeBase')}
                    />
                    <HelpItem
                        icon="play-circle-outline"
                        title="Video Tutorials"
                        subtitle="Watch how-to videos"
                        onPress={() => navigation.navigate('VideoTutorials')}
                    />
                    <HelpItem
                        icon="people-outline"
                        title="Community Forum"
                        subtitle="Connect with other learners"
                        onPress={() => navigation.navigate('Community')}
                    />
                    <HelpItem
                        icon="newspaper-outline"
                        title="What's New"
                        subtitle="Latest updates and features"
                        onPress={() => navigation.navigate('Updates')}
                    />
                </View>

                {/* Account & Billing */}
                <SectionHeader title="Account & Billing" />
                <View style={styles.section}>
                    <HelpItem
                        icon="card-outline"
                        title="Billing & Payments"
                        subtitle="Manage your payment methods"
                        onPress={() => navigation.navigate('BillingHelp')}
                    />
                    <HelpItem
                        icon="receipt-outline"
                        title="Purchase History"
                        subtitle="View your course purchases"
                        onPress={() => navigation.navigate('PurchaseHistory')}
                    />
                    <HelpItem
                        icon="refresh-outline"
                        title="Refund Requests"
                        subtitle="Request refunds for courses"
                        onPress={() => navigation.navigate('RefundRequests')}
                    />
                    <HelpItem
                        icon="key-outline"
                        title="Account Security"
                        subtitle="Password and security settings"
                        onPress={() => navigation.navigate('AccountSecurity')}
                    />
                </View>

                {/* FAQ Section */}
                <SectionHeader
                    title="Frequently Asked Questions"
                    subtitle="Quick answers to common questions"
                />
                <View style={styles.faqSection}>
                    {faqData.map((item) => (
                        <FAQItem key={item.id} item={item} />
                    ))}
                </View>

                {/* Technical Support */}
                <SectionHeader title="Technical Support" />
                <View style={styles.section}>
                    <HelpItem
                        icon="construct-outline"
                        title="Troubleshooting"
                        subtitle="Fix common technical issues"
                        onPress={() => navigation.navigate('Troubleshooting')}
                    />
                    <HelpItem
                        icon="download-outline"
                        title="App Updates"
                        subtitle="Keep your app up to date"
                        onPress={() => {
                            Alert.alert(
                                "App Updates",
                                "Check your app store for the latest version of our app."
                            );
                        }}
                    />
                    <HelpItem
                        icon="wifi-outline"
                        title="Connection Issues"
                        subtitle="Resolve network and streaming problems"
                        onPress={() => navigation.navigate('ConnectionHelp')}
                    />
                    <HelpItem
                        icon="phone-portrait-outline"
                        title="Device Compatibility"
                        subtitle="Supported devices and requirements"
                        onPress={() => navigation.navigate('DeviceCompatibility')}
                    />
                </View>

                {/* Emergency Contact */}
                <View style={styles.emergencySection}>
                    <View style={styles.emergencyHeader}>
                        <Ionicons name="warning-outline" size={24} color="#FF6B35" />
                        <Text style={styles.emergencyTitle}>Need Urgent Help?</Text>
                    </View>
                    <Text style={styles.emergencyText}>
                        For urgent technical issues or account problems, contact our priority support:
                    </Text>
                    <TouchableOpacity
                        style={styles.emergencyButton}
                        onPress={() => Linking.openURL('mailto:urgent@learningapp.com')}
                    >
                        <Ionicons name="mail-outline" size={20} color="#fff" />
                        <Text style={styles.emergencyButtonText}>urgent@learningapp.com</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        paddingTop: StatusBar.currentHeight || 0,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#fff',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        zIndex: 1000,
    },
    backButton: {
        padding: 8,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        flex: 1,
    },
    headerRight: {
        width: 40,
    },
    content: {
        flex: 1,
    },
    welcomeSection: {
        alignItems: 'center',
        paddingVertical: 40,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
    },
    welcomeIcon: {
        marginBottom: 20,
    },
    welcomeTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
        textAlign: 'center',
    },
    welcomeSubtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        lineHeight: 22,
    },
    sectionHeader: {
        paddingHorizontal: 20,
        paddingTop: 30,
        paddingBottom: 12,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    sectionSubtitle: {
        fontSize: 14,
        color: '#666',
    },
    section: {
        backgroundColor: 'white',
        marginHorizontal: 0,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#E5E5EA',
    },
    helpItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#E5E5EA',
        backgroundColor: 'white',
    },
    helpLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    iconContainer: {
        width: 36,
        height: 36,
        borderRadius: 8,
        backgroundColor: '#F0F8FF',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    helpText: {
        flex: 1,
    },
    helpTitle: {
        fontSize: 17,
        color: '#333',
        fontWeight: '500',
        marginBottom: 2,
    },
    helpSubtitle: {
        fontSize: 14,
        color: '#666',
        lineHeight: 18,
    },
    faqSection: {
        backgroundColor: 'white',
        marginHorizontal: 0,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#E5E5EA',
    },
    faqItem: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#E5E5EA',
    },
    faqQuestion: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 18,
    },
    faqQuestionText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
        flex: 1,
        marginRight: 10,
    },
    faqAnswer: {
        paddingHorizontal: 20,
        paddingBottom: 18,
        backgroundColor: '#F8F9FA',
    },
    faqAnswerText: {
        fontSize: 15,
        color: '#555',
        lineHeight: 22,
    },
    emergencySection: {
        backgroundColor: '#FFF4F0',
        marginHorizontal: 20,
        marginTop: 30,
        borderRadius: 12,
        padding: 20,
        borderWidth: 1,
        borderColor: '#FFE4D6',
    },
    emergencyHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    emergencyTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FF6B35',
        marginLeft: 10,
    },
    emergencyText: {
        fontSize: 15,
        color: '#666',
        lineHeight: 20,
        marginBottom: 16,
    },
    emergencyButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FF6B35',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 8,
        alignSelf: 'flex-start',
    },
    emergencyButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 8,
    },

});

export default HelpAndSupportScreen;