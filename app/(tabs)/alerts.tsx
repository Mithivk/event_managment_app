import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const alerts = [
  { id: '1', title: 'New reply to your post', message: 'Sarah Miller replied to your post in the Design community.', time: '10 minutes ago', read: false, type: 'message' },
  { id: '2', title: 'Event reminder: Tech Conference', message: "The Tech Conference 2023 is starting tomorrow. Don't forget to join!", time: '1 hour ago', read: false, type: 'event' },
  { id: '3', title: 'New member in Cybersecurity', message: 'John Smith just joined the Cybersecurity community.', time: '3 hours ago', read: true, type: 'user' },
  { id: '4', title: 'Your post is trending', message: 'Your post "Latest cybersecurity trends" is getting a lot of attention!', time: '5 hours ago', read: true, type: 'trending' },
  { id: '5', title: 'Community update', message: 'The IT community has updated its guidelines. Please review them.', time: '1 day ago', read: true, type: 'update' },
];

const getIconForType = (type) => {
  switch (type) {
    case 'message': return <Icon name="message-text" size={24} color="#4A90E2" />;
    case 'event': return <Icon name="calendar" size={24} color="#4A90E2" />;
    case 'user': return <Icon name="account" size={24} color="#4A90E2" />;
    case 'trending': return <Icon name="chart-line" size={24} color="#4A90E2" />;
    default: return <Icon name="bell" size={24} color="#4A90E2" />;
  }
};

const Alerts = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Notifications</Text>
          <Text style={styles.subtitle}>Stay updated with community activities.</Text>
        </View>
        <TouchableOpacity>
          <Icon name="dots-horizontal" size={24} color="#6B7280" />
        </TouchableOpacity>
      </View>

      {/* Alert List */}
      <FlatList
        data={alerts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.alertCard, item.read ? styles.readAlert : styles.unreadAlert]}>
            <View style={styles.iconContainer}>{getIconForType(item.type)}</View>
            <View style={styles.alertContent}>
              <Text style={[styles.alertTitle, item.read ? styles.readText : styles.unreadText]}>{item.title}</Text>
              <Text style={styles.alertMessage}>{item.message}</Text>
              <Text style={styles.alertTime}>{item.time}</Text>
            </View>
            {!item.read && <View style={styles.unreadDot} />}
          </View>
        )}
      />
    </View>
  );
};

export default Alerts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  subtitle: {
    fontSize: 14,
    color: '#4D80B3',
    marginTop: 4,
  },
  alertCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
    elevation: 1,
  },
  unreadAlert: {
    backgroundColor: '#E5F6FD',
  },
  readAlert: {
    backgroundColor: '#FFFFFF',
  },
  iconContainer: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#E0F2FE',
    marginRight: 12,
  },
  alertContent: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  unreadText: {
    color: '#1E40AF',
  },
  readText: {
    color: '#374151',
  },
  alertMessage: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  alertTime: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4A90E2',
  },
});
