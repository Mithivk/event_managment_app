import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet, Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Animated, { FadeIn } from 'react-native-reanimated';
import { router } from 'expo-router';
import * as WebBrowser from "expo-web-browser";
// import { LINKEDIN_CLIENT_ID } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LINKEDIN_CLIENT_ID = "78psg7r0writst"

const API_URL = 'http://192.168.178.225:3000';

interface RegistrationFormProps {
  onComplete: () => void;
}

interface LinkedInUser {
  sub: string;
  email: string;
  name: string;
  picture?: string;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onComplete }) => {
  const [name, setName] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [errors, setErrors] = useState<{ name?: string; linkedinUrl?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState<LinkedInUser | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationId, setVerificationId] = useState<string | null>(null);
  const [otp, setOtp] = useState('');

  useEffect(() => {
    const checkUserLogin = async () => {
      try {
        const userData = await AsyncStorage.getItem('linkedInUser');
        if (userData) {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          setName(parsedUser.name || '');
        }
      } catch (error) {
        console.error('Error retrieving user data:', error);
      }
    };

    checkUserLogin();
  }, []);

  const validateForm = (): boolean => {
    const newErrors: { name?: string; linkedinUrl?: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!linkedinUrl.trim() && !user) {
      newErrors.linkedinUrl = 'LinkedIn URL is required';
    } else if (linkedinUrl && !linkedinUrl.includes('linkedin.com/')) {
      newErrors.linkedinUrl = 'Please enter a valid LinkedIn URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      // Call onComplete if provided
      if (onComplete) {
        onComplete();
      }
      router.push('/communities');
    }, 800);
  };

  const handleLinkedInLogin = async () => {
    try {
      const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${LINKEDIN_CLIENT_ID}&redirect_uri=${encodeURIComponent(`${API_URL}/api/linkedin/callback`)}&scope=openid%20email%20profile%20w_member_social`;

      const result = await WebBrowser.openAuthSessionAsync(
        authUrl,
        `${API_URL}/api/linkedin/callback`
      );

      if (result.type === 'success') {
        const url = result.url;

        const code = url.includes('code=')
          ? url.split('code=')[1].split('&')[0]
          : null;

        if (code) {
          const response = await fetch(`${API_URL}/api/linkedin/callback?code=${code}`);

          if (!response.ok) {
            throw new Error('Failed to authenticate with LinkedIn');
          }

          const data = await response.json();

          if (data.userData) {
            await AsyncStorage.setItem('linkedInUser', JSON.stringify(data.userData));
            setUser(data.userData);
            setName(data.userData.name || '');

            if (data.userData.sub) {
              setLinkedinUrl(`https://linkedin.com/in/${data.userData.sub}`);
            }
          }
        }
      }
    } catch (error) {
      console.error('LinkedIn authentication error:', error);
      Alert.alert('Authentication Error', 'Failed to authenticate with LinkedIn. Please try again.');
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('linkedInUser');
      setUser(null);
      setName('');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <Animated.View style={styles.container} entering={FadeIn.duration(500)}>
      {/* User Icon */}
      <View style={styles.iconContainer}>
        <Icon name="user" size={24} color="#2563EB" />
      </View>

      {/* Title & Subtitle */}
      <Text style={styles.title}>Create your profile</Text>
      <Text style={styles.subtitle}>Let's get to know you better</Text>

      {/* Form */}
      <View style={styles.formContainer}>
        {user ? (
          <View style={styles.linkedInProfile}>
            <Text style={styles.profileText}>
              Connected as: {user.name}
            </Text>
            <Text style={styles.profileEmail}>
              {user.email}
            </Text>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleLogout}
            >
              <Text style={styles.logoutText}>Disconnect</Text>
            </TouchableOpacity>
          </View>
        ) : null}

        <Text style={styles.label}>Your Name</Text>
        <TextInput
          style={[styles.input, errors.name && styles.inputError]}
          placeholder="Enter your full name"
          value={name}
          onChangeText={setName}
        />
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

        <Text style={styles.label}>LinkedIn URL</Text>
        <TextInput
          style={[styles.input, errors.linkedinUrl && styles.inputError]}
          placeholder="https://linkedin.com/in/your-profile"
          value={linkedinUrl}
          onChangeText={setLinkedinUrl}
        />
        {errors.linkedinUrl && <Text style={styles.errorText}>{errors.linkedinUrl}</Text>}

        {/* Submit Button */}
        <TouchableOpacity
          style={[styles.submitButton, isSubmitting && styles.disabledButton]}
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? <ActivityIndicator color="#FFF" /> : <Text style={styles.buttonText}>Continue</Text>}
        </TouchableOpacity>

        {/* Login with LinkedIn Button */}
        <TouchableOpacity style={styles.linkedinButton} onPress={handleLinkedInLogin}>
          <Icon name="linkedin" size={20} color="#FFF" />
          <Text style={styles.linkedinText}>Continue with LinkedIn</Text>
        </TouchableOpacity>
      </View>

      {/* Terms & Conditions + Login Link */}
      <Text style={styles.termsText}>
        By continuing, you agree to our <Text style={styles.link}>Terms of Service</Text> and <Text style={styles.link}>Privacy Policy</Text>.
      </Text>

      <Text style={styles.loginText}>
        Already have an account? <Text style={styles.loginLink}>Log in</Text>
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F9FAFB',
  },
  iconContainer: {
    backgroundColor: '#E5E7EB',
    padding: 10,
    borderRadius: 50,
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 20,
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
    maxWidth: 350,
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  linkedInProfile: {
    backgroundColor: '#E0F2FE',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  profileText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#0369A1',
  },
  profileEmail: {
    fontSize: 12,
    color: '#0369A1',
    marginTop: 2,
  },
  logoutButton: {
    marginTop: 8,
    alignSelf: 'flex-end',
  },
  logoutText: {
    color: '#DC2626',
    fontSize: 12,
    fontWeight: '500',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#F9FAFB',
  },
  inputError: {
    borderColor: '#DC2626',
  },
  errorText: {
    color: '#DC2626',
    fontSize: 12,
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: '#2563EB',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  disabledButton: {
    backgroundColor: '#9CA3AF',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkedinButton: {
    backgroundColor: '#0A66C2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  linkedinText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  termsText: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 15,
  },
  link: {
    color: '#2563EB',
    fontWeight: 'bold',
  },
  loginText: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 10,
  },
  loginLink: {
    color: '#2563EB',
    fontWeight: 'bold',
  },
  // container: {
  //   flex: 1,
  //   justifyContent: "center",
  //   alignItems: 'center',
  //   padding: 20,
  //   backgroundColor: '#F9FAFB',
  // },
  // title: {
  //   fontSize: 22,
  //   fontWeight: 'bold',
  //   color: '#1F2937',
  //   marginBottom: 20,
  // },
  // input: {
  //   width: '100%',
  //   padding: 12,
  //   borderWidth: 1,
  //   borderColor: '#D1D5DB',
  //   borderRadius: 8,
  //   marginBottom: 10,
  //   backgroundColor: '#F9FAFB',
  // },
  button: {
    backgroundColor: '#2563EB',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  // disabledButton: {
  //   backgroundColor: '#9CA3AF',
  // },
  // buttonText: {
  //   color: '#FFF',
  //   fontSize: 16,
  //   fontWeight: 'bold',
  // },
});

export default RegistrationForm;