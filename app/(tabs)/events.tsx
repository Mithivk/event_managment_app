import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../context/UserContext';

const events = [
  {
    id: '1',
    title: 'Tech Conference 2023',
    date: 'Nov 15-17, 2023',
    location: 'Virtual Event',
    description: 'Join us for three days of talks, workshops, and networking with the best in the tech industry.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=870',
    community: 'IT',
    attendees: 243,
  },
  {
    id: '2',
    title: 'Design Systems Workshop',
    date: 'Nov 22, 2023',
    location: 'San Francisco, CA',
    description: 'Learn how to create and implement scalable design systems for your products.',
    image: 'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?auto=format&fit=crop&q=80&w=870',
    community: 'Design',
    attendees: 57,
  },
  {
    id: '3',
    title: 'Cybersecurity Summit',
    date: 'Dec 5-6, 2023',
    location: 'New York, NY',
    description: 'The latest trends and strategies in cybersecurity for enterprise companies.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=870',
    community: 'Cybersecurity',
    attendees: 128,
  },
  {
    id: '4',
    title: 'Marketing Analytics Masterclass',
    date: 'Dec 12, 2023',
    location: 'Virtual Event',
    description: 'Deep dive into data-driven marketing strategies and analytics frameworks.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=870',
    community: 'Marketing',
    attendees: 84,
  },
];

const Events = () => {
  const { user } = useUser();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Upcoming Events</Text>
        <Text style={styles.subtitle}>Events from your communities</Text>
      </View>

      {/* Events List */}
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.eventCard}>
            <Image source={{ uri: item.image }} style={styles.eventImage} />
            <View style={styles.eventContent}>
              <View style={styles.eventHeader}>
                <Text style={styles.communityBadge}>{item.community}</Text>
                <Text style={styles.attendees}>{item.attendees} attending</Text>
              </View>
              <Text style={styles.eventTitle}>{item.title}</Text>
              <View style={styles.eventDetails}>
                <Text style={styles.eventDate}>📅 {item.date}</Text>
                <Text style={styles.separator}>•</Text>
                <Text style={styles.eventLocation}>📍 {item.location}</Text>
              </View>
              <Text style={styles.eventDescription}>{item.description}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.registerButton}>
                  <Text style={styles.registerText}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.detailsButton}>
                  <Text style={styles.detailsText}>Details</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF', // White background for the entire screen
    paddingTop: 16,
  },
  header: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#4D80B3',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  eventCard: {
    backgroundColor: '#FFF', // Each card has a white background
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  eventImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  eventContent: {
    padding: 16,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  communityBadge: {
    backgroundColor: '#007AFF33',
    color: '#007AFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    fontSize: 12,
    fontWeight: 'bold',
  },
  attendees: {
    fontSize: 12,
    color: '#4D80B3',
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  eventDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  eventDate: {
    fontSize: 13,
    color: '#4D80B3',
  },
  separator: {
    fontSize: 14,
    color: '#555',
    marginHorizontal: 6,
  },
  eventLocation: {
    fontSize: 13,
    color: '#4D80B3',
  },
  eventDescription: {
    fontSize: 13,
    color: '#4D80B3',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  registerButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 8,
  },
  registerText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  detailsButton: {
    flex: 1,
    backgroundColor: '#E5E7EB',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  detailsText: {
    color: '#333',
    fontWeight: 'bold',
  },
});

export default Events;
