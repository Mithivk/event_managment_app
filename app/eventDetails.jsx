import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const EventDetails = () => {
  const { id, title, date, location, description, image } = useLocalSearchParams();
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: image }} style={styles.eventImage} />
      <View style={styles.content}>
        <Text style={styles.eventTitle}>{title}</Text>
        <Text style={styles.eventDetail}>📅 {date}</Text>
        <Text style={styles.eventDetail}>📍 {location}</Text>
        <Text style={styles.eventDescription}>{description}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.registerButton}>
            <Text style={styles.registerText}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  eventImage: { width: '100%', height: 250, resizeMode: 'cover' },
  content: { padding: 16 },
  eventTitle: { fontSize: 22, fontWeight: 'bold', color: '#333', marginBottom: 8 },
  eventDetail: { fontSize: 14, color: '#555', marginBottom: 4 },
  eventDescription: { fontSize: 15, color: '#444', marginBottom: 20 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  registerButton: { flex: 1, backgroundColor: '#007AFF', paddingVertical: 12, borderRadius: 8, alignItems: 'center', marginRight: 8 },
  registerText: { color: '#FFF', fontWeight: 'bold' },
  backButton: { flex: 1, backgroundColor: '#E5E7EB', paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
  backText: { color: '#333', fontWeight: 'bold' },
});

export default EventDetails;
