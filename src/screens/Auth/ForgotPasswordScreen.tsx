import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useState } from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSendResetLink = async () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setEmailSent(true);
      startResendTimer();
    }, 2000);
  };

  const startResendTimer = () => {
    setResendTimer(60);
    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleResendEmail = () => {
    if (resendTimer === 0) {
      handleSendResetLink();
    }
  };

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  const handleContactSupport = () => {
    Alert.alert(
      'Contact Support',
      'You can reach our support team at:\n\nsupport@edulearn.com\n\nOr call us at: +1 (555) 123-4567',
      [
        { text: 'Call Support', onPress: () => console.log('Call support') },
        { text: 'Send Email', onPress: () => console.log('Send email') },
        { text: 'OK', style: 'cancel' },
      ]
    );
  };

  if (emailSent) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.successSection}>
            <View style={styles.successIcon}>
              <Ionicons name="mail-outline" size={60} color="#007AFF" />
            </View>
            <Text style={styles.successTitle}>Check Your Email</Text>
            <Text style={styles.successMessage}>
              We've sent a password reset link to:
            </Text>
            <Text style={styles.emailText}>{email}</Text>
            <Text style={styles.instructionText}>
              Click the link in the email to reset your password. If you don't see it, check your spam folder.
            </Text>

            <TouchableOpacity
              style={[styles.resendButton, resendTimer > 0 && styles.resendButtonDisabled]}
              onPress={handleResendEmail}
              disabled={resendTimer > 0}
            >
              <Text style={[styles.resendButtonText, resendTimer > 0 && styles.resendButtonTextDisabled]}>
                {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend Email'}
              </Text>
            </TouchableOpacity>

            <View style={styles.helpSection}>
              <Text style={styles.helpText}>Didn't receive the email?</Text>
              <TouchableOpacity onPress={handleContactSupport}>
                <Text style={styles.helpLink}>Contact Support</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.backToLoginButton} onPress={navigateToLogin}>
            <Ionicons name="arrow-back" size={18} color="#007AFF" />
            <Text style={styles.backToLoginText}>Back to Sign In</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          {/* Main Content */}
          <View style={styles.mainSection}>
            {/* Icon */}
            <View style={styles.iconContainer}>
              <View style={styles.iconBackground}>
                <Ionicons name="lock-closed-outline" size={40} color="#007AFF" />
              </View>
            </View>

            {/* Title and Description */}
            <Text style={styles.title}>Forgot Password?</Text>
            <Text style={styles.subtitle}>
              No worries! Enter your email address and we'll send you a link to reset your password.
            </Text>

            {/* Email Input */}
            <View style={styles.formSection}>
              <Text style={styles.inputLabel}>Email Address</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="mail-outline" size={20} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  placeholderTextColor="#999"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoFocus={true}
                />
              </View>
            </View>

            {/* Send Reset Link Button */}
            <TouchableOpacity
              style={[styles.resetButton, isLoading && styles.resetButtonDisabled]}
              onPress={handleSendResetLink}
              disabled={isLoading}
            >
              {isLoading ? (
                <View style={styles.buttonContent}>
                  <Text style={styles.resetButtonText}>Sending...</Text>
                </View>
              ) : (
                <View style={styles.buttonContent}>
                  <Text style={styles.resetButtonText}>Send Reset Link</Text>
                  <Ionicons name="arrow-forward" size={18} color="white" style={styles.buttonIcon} />
                </View>
              )}
            </TouchableOpacity>

            {/* Alternative Options */}
            <View style={styles.alternativeSection}>
              <Text style={styles.alternativeTitle}>Try another way</Text>
              
              <TouchableOpacity style={styles.alternativeOption} onPress={handleContactSupport}>
                <View style={styles.alternativeIcon}>
                  <Ionicons name="headset-outline" size={20} color="#007AFF" />
                </View>
                <View style={styles.alternativeContent}>
                  <Text style={styles.alternativeText}>Contact Support</Text>
                  <Text style={styles.alternativeSubtext}>Get help from our team</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#ccc" />
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.alternativeOption}
                onPress={() => Alert.alert('SMS Reset', 'SMS password reset will be implemented')}
              >
                <View style={styles.alternativeIcon}>
                  <Ionicons name="chatbubble-outline" size={20} color="#007AFF" />
                </View>
                <View style={styles.alternativeContent}>
                  <Text style={styles.alternativeText}>Reset via SMS</Text>
                  <Text style={styles.alternativeSubtext}>Get reset code via text message</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#ccc" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Bottom Section */}
          <View style={styles.bottomSection}>
            <Text style={styles.rememberText}>Remember your password?</Text>
            <TouchableOpacity onPress={navigateToLogin}>
              <Text style={styles.loginLink}>Back to Sign In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  mainSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
    flex: 1,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  iconBackground: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E3F2FD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  formSection: {
    marginBottom: 30,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 55,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  resetButton: {
    backgroundColor: '#007AFF',
    height: 55,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
    elevation: 3,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  resetButtonDisabled: {
    backgroundColor: '#ccc',
    elevation: 1,
    shadowOpacity: 0.1,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resetButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  buttonIcon: {
    marginLeft: 8,
  },
  alternativeSection: {
    marginBottom: 40,
  },
  alternativeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  alternativeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  alternativeIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E3F2FD',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  alternativeContent: {
    flex: 1,
  },
  alternativeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  alternativeSubtext: {
    fontSize: 14,
    color: '#666',
  },
  bottomSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  rememberText: {
    fontSize: 16,
    color: '#666',
  },
  loginLink: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  // Success state styles
  successSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    flex: 1,
  },
  successIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#E3F2FD',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  successTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  successMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  emailText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  instructionText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  resendButton: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#007AFF',
    height: 50,
    paddingHorizontal: 30,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  resendButtonDisabled: {
    borderColor: '#ccc',
    backgroundColor: '#f5f5f5',
  },
  resendButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
  resendButtonTextDisabled: {
    color: '#ccc',
  },
  helpSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  helpText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  helpLink: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  backToLoginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
  },
  backToLoginText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default ForgotPasswordScreen;