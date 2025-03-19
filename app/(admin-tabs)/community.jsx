import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator, StyleSheet } from 'react-native';
import { Users } from 'lucide-react-native';

// Mock data generator
const generateMockMembers = () => {
  const names = ['Alice Johnson', 'David Smith', 'Emma Brown', 'Michael Lee', 'Sophia Wilson', 'James Anderson', 'Olivia Martinez'];
  const roles = ['Admin', 'Moderator', 'Member', 'Member', 'Member', 'Member', 'Guest'];
  const avatars = [
    'https://i.pravatar.cc/150?img=1',
    'https://i.pravatar.cc/150?img=2',
    'https://i.pravatar.cc/150?img=3',
    'https://i.pravatar.cc/150?img=4',
    'https://i.pravatar.cc/150?img=5',
    'https://i.pravatar.cc/150?img=6',
    'https://i.pravatar.cc/150?img=7',
  ];

  return names.map((name, index) => ({
    id: `member-${index}`,
    name,
    role: roles[index % roles.length],
    avatar: avatars[index % avatars.length],
    joined: `${Math.floor(Math.random() * 12) + 1} months ago`,
  }));
};

const CommunityMembers = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setMembers(generateMockMembers());
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Community Members</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#007bff" style={styles.loader} />
      ) : (
        <FlatList
          data={members}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <MemberCard member={item} />}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

// Individual Member Card Component
const MemberCard = ({ member }: { member: any }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: member.avatar }} style={styles.avatar} />
      <View>
        <Text style={styles.name}>{member.name}</Text>
        <Text style={styles.role}>{member.role}</Text>
        <Text style={styles.joined}>Joined {member.joined}</Text>
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  loader: {
    marginTop: 50,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  role: {
    fontSize: 14,
    color: '#007bff',
  },
  joined: {
    fontSize: 12,
    color: '#666',
  },
});

export default CommunityMembers;
