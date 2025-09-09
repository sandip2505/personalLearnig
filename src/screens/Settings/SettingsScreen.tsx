import React, { useState } from 'react';
import {
    Alert,
    ScrollView,
    StatusBar,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SettingsScreen = ({ navigation }) => {

    const [pushNotifications, setPushNotifications] = useState(true);
    const [courseUpdates, setCourseUpdates] = useState(true);
    const [downloadOverWifi, setDownloadOverWifi] = useState(true);
    const [autoPlay, setAutoPlay] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    const handleLogout = () => {
        Alert.alert(
            "Logout",
            "Are you sure you want to logout?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Logout", style: "destructive", onPress: () => {
                        console.log("User logged out");
                    }
                }
            ]
        );
    };

    const SettingItem = ({ icon, title, subtitle, onPress, rightComponent, showArrow = true }) => (
        <TouchableOpacity style={styles.settingItem} onPress={onPress}>
            <View style={styles.settingLeft}>
                <View style={styles.iconContainer}>
                    <Ionicons name={icon} size={20} color="#007AFF" />
                </View>
                <View style={styles.settingText}>
                    <Text style={styles.settingTitle}>{title}</Text>
                    {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
                </View>
            </View>
            <View style={styles.settingRight}>
                {rightComponent}
                {showArrow && !rightComponent && (
                    <Ionicons name="chevron-forward" size={16} color="#C7C7CC" />
                )}
            </View>
        </TouchableOpacity>
    );

    const SectionHeader = ({ title }) => (
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{title}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons name="arrow-back" size={24} color="#333" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Settings</Text>
                </View>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>

                <SectionHeader title="ACCOUNT" />
                <View style={styles.section}>
                    <SettingItem
                        icon="person-outline"
                        title="Profile"
                        subtitle="Edit your personal information"
                        onPress={() => navigation.navigate('Profile')}
                    />
                    <SettingItem
                        icon="card-outline"
                        title="Payment & Billing"
                        subtitle="Manage payment methods and billing"
                        onPress={() => navigation.navigate('Payment')}
                    />
                    <SettingItem
                        icon="time-outline"
                        title="Purchase History"
                        subtitle="View your course purchases"
                        onPress={() => navigation.navigate('PurchaseHistory')}
                    />
                </View>

                <SectionHeader title="LEARNING PREFERENCES" />
                <View style={styles.section}>
                    <SettingItem
                        icon="play-circle-outline"
                        title="Auto-play Next Lesson"
                        subtitle="Automatically play the next lesson"
                        rightComponent={
                            <Switch
                                value={autoPlay}
                                onValueChange={setAutoPlay}
                                trackColor={{ false: '#E5E5EA', true: '#007AFF' }}
                                thumbColor="#fff"
                            />
                        }
                        showArrow={false}
                    />
                    <SettingItem
                        icon="download-outline"
                        title="Download Quality"
                        subtitle="720p"
                        onPress={() => {
                            Alert.alert("Download Quality", "Choose video quality for downloads", [
                                { text: "480p" },
                                { text: "720p" },
                                { text: "1080p" },
                                { text: "Cancel", style: "cancel" }
                            ]);
                        }}
                    />
                    <SettingItem
                        icon="wifi-outline"
                        title="Download over WiFi only"
                        subtitle="Save mobile data"
                        rightComponent={
                            <Switch
                                value={downloadOverWifi}
                                onValueChange={setDownloadOverWifi}
                                trackColor={{ false: '#E5E5EA', true: '#007AFF' }}
                                thumbColor="#fff"
                            />
                        }
                        showArrow={false}
                    />
                    <SettingItem
                        icon="bookmark-outline"
                        title="My Learning"
                        subtitle="View enrolled courses and progress"
                        onPress={() => navigation.navigate('MyLearning')}
                    />
                </View>

                <SectionHeader title="NOTIFICATIONS" />
                <View style={styles.section}>
                    <SettingItem
                        icon="notifications-outline"
                        title="Push Notifications"
                        subtitle="Get notified about course updates"
                        rightComponent={
                            <Switch
                                value={pushNotifications}
                                onValueChange={setPushNotifications}
                                trackColor={{ false: '#E5E5EA', true: '#007AFF' }}
                                thumbColor="#fff"
                            />
                        }
                        showArrow={false}
                    />
                    <SettingItem
                        icon="mail-outline"
                        title="Course Updates"
                        subtitle="Email notifications for enrolled courses"
                        rightComponent={
                            <Switch
                                value={courseUpdates}
                                onValueChange={setCourseUpdates}
                                trackColor={{ false: '#E5E5EA', true: '#007AFF' }}
                                thumbColor="#fff"
                            />
                        }
                        showArrow={false}
                    />
                    <SettingItem
                        icon="megaphone-outline"
                        title="Promotional Emails"
                        subtitle="Receive updates about new courses"
                        onPress={() => navigation.navigate('NotificationSettings')}
                    />
                </View>

                <SectionHeader title="APP SETTINGS" />
                <View style={styles.section}>
                    <SettingItem
                        icon="moon-outline"
                        title="Dark Mode"
                        subtitle="Use dark theme"
                        rightComponent={
                            <Switch
                                value={darkMode}
                                onValueChange={setDarkMode}
                                trackColor={{ false: '#E5E5EA', true: '#007AFF' }}
                                thumbColor="#fff"
                            />
                        }
                        showArrow={false}
                    />
                    <SettingItem
                        icon="language-outline"
                        title="Language"
                        subtitle="English"
                        onPress={() => {
                            Alert.alert("Language", "Choose your preferred language");
                        }}
                    />
                    <SettingItem
                        icon="trash-outline"
                        title="Clear Cache"
                        subtitle="Free up storage space"
                        onPress={() => {
                            Alert.alert(
                                "Clear Cache",
                                "This will remove temporary files to free up space. Continue?",
                                [
                                    { text: "Cancel", style: "cancel" },
                                    { text: "Clear", onPress: () => console.log("Cache cleared") }
                                ]
                            );
                        }}
                    />
                </View>

                <SectionHeader title="SUPPORT & LEGAL" />
                <View style={styles.section}>
                    <SettingItem
                        icon="help-circle-outline"
                        title="Help Center"
                        subtitle="FAQs and support articles"
                        onPress={() => navigation.navigate('Help')}
                    />
                    <SettingItem
                        icon="chatbubble-outline"
                        title="Contact Support"
                        subtitle="Get help from our team"
                        onPress={() => navigation.navigate('ContactSupport')}
                    />
                    <SettingItem
                        icon="star-outline"
                        title="Rate the App"
                        subtitle="Share your feedback"
                        onPress={() => {
                            Alert.alert("Rate App", "Would you like to rate our app on the store?");
                        }}
                    />
                    <SettingItem
                        icon="document-text-outline"
                        title="Terms of Service"
                        onPress={() => navigation.navigate('Terms')}
                    />
                    <SettingItem
                        icon="shield-outline"
                        title="Privacy Policy"
                        onPress={() => navigation.navigate('Privacy')}
                    />
                </View>

                <SectionHeader title="ACCOUNT ACTIONS" />
                <View style={styles.section}>
                    <SettingItem
                        icon="log-out-outline"
                        title="Logout"
                        subtitle="Sign out of your account"
                        onPress={handleLogout}
                    />
                    <TouchableOpacity style={[styles.settingItem, styles.dangerItem]}>
                        <View style={styles.settingLeft}>
                            <View style={[styles.iconContainer, styles.dangerIcon]}>
                                <Ionicons name="trash-outline" size={20} color="#FF3B30" />
                            </View>
                            <View style={styles.settingText}>
                                <Text style={[styles.settingTitle, styles.dangerText]}>Delete Account</Text>
                                <Text style={styles.settingSubtitle}>Permanently delete your account</Text>
                            </View>
                        </View>
                        <Ionicons name="chevron-forward" size={16} color="#C7C7CC" />
                    </TouchableOpacity>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Version 2.1.0</Text>
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
    content: {
        flex: 1,
    },
    sectionHeader: {
        paddingHorizontal: 20,
        paddingTop: 30,
        paddingBottom: 10,
    },
    sectionTitle: {
        fontSize: 13,
        fontWeight: '600',
        color: '#8E8E93',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    section: {
        backgroundColor: 'white',
        marginHorizontal: 0,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#E5E5EA',
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#E5E5EA',
        backgroundColor: 'white',
    },
    settingLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    iconContainer: {
        width: 32,
        height: 32,
        borderRadius: 6,
        backgroundColor: '#F2F2F7',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 15,
    },
    settingText: {
        flex: 1,
    },
    settingTitle: {
        fontSize: 17,
        color: '#333',
        fontWeight: '400',
    },
    settingSubtitle: {
        fontSize: 13,
        color: '#8E8E93',
        marginTop: 2,
    },
    settingRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dangerItem: {
        borderBottomWidth: 0,
    },
    dangerIcon: {
        backgroundColor: '#FFEBEE',
    },
    dangerText: {
        color: '#FF3B30',
    },
    footer: {
        alignItems: 'center',
        paddingVertical: 30,
        paddingHorizontal: 20,
    },
    footerText: {
        fontSize: 13,
        color: '#8E8E93',
    },
});

export default SettingsScreen;