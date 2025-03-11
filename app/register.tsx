import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet, Linking 
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Animated, { FadeIn } from 'react-native-reanimated';
import { router } from 'expo-router';

interface RegistrationFormProps {
  onComplete: () => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onComplete }) => {
  const [name, setName] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [errors, setErrors] = useState<{ name?: string; linkedinUrl?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: { name?: string; linkedinUrl?: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!linkedinUrl.trim()) {
      newErrors.linkedinUrl = 'LinkedIn URL is required';
    } else if (!linkedinUrl.includes('linkedin.com/')) {
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
      router.push('/communities')
    }, 800);
  };

  const handleLinkedInLogin = () => {
    // Open LinkedIn Auth (Placeholder)
    Linking.openURL('https://www.linkedin.com/login');
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
    justifyContent: 'center',
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
});

export default RegistrationForm;
