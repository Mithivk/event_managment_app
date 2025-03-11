import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { useUser } from '../context/UserContext';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';


// Mock data generation function
const generateMockPosts = () => {
  const communities = ['IT', 'Cybersecurity', 'Design', 'Marketing', 'Finance', 'Healthcare', 'Education'];
  const avatars = [
    'https://i.pravatar.cc/150?img=1',
    'https://i.pravatar.cc/150?img=2',
    'https://i.pravatar.cc/150?img=3',
    'https://i.pravatar.cc/150?img=4',
    'https://i.pravatar.cc/150?img=5',
    'https://i.pravatar.cc/150?img=6',
  ];
  const names = ['Alex Johnson', 'Sarah Miller', 'James Wilson', 'Emily Davis', 'Michael Brown', 'Jessica Smith'];
  const contents = [
    'Just published a new article on the latest cybersecurity threats. Check it out!',
    'Excited to announce our upcoming virtual AI conference on June 15th!',
    'Sharing my latest UI design project focused on minimalism.',
    'Looking for recommendations on the best project management tools for remote teams.',
    'Just completed a cloud computing certification. Happy to connect!',
    'How are you handling remote work challenges? Routine is key!',
  ];
  const images = [
    'https://images.unsplash.com/photo-1661956600684-97d3a4320e45?auto=format&fit=crop&q=80&w=870',
    'https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&q=80&w=874',
    'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?auto=format&fit=crop&q=80&w=870',
    null,
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=870',
    null,
  ];

  return Array.from({ length: 10 }, (_, i) => {
    const randomIndex = Math.floor(Math.random() * names.length);
    return {
      id: `post-${i}`,
      author: {
        name: names[randomIndex % names.length],
        avatar: avatars[randomIndex % avatars.length],
        community: communities[Math.floor(Math.random() * communities.length)],
      },
      content: contents[i % contents.length],
      image: i % 2 === 0 ? images[i % images.length] : undefined,
      likes: Math.floor(Math.random() * 100),
      comments: Math.floor(Math.random() * 20),
      timestamp: `${Math.floor(Math.random() * 24)}h ago`,
      isLiked: Math.random() > 0.7,
    };
  });
};

const Home = () => {
  const { user } = useUser();
  const navigation = useNavigation();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setPosts(generateMockPosts());
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Community Updates</Text>
        <Text style={styles.headerSubtitle}>Latest posts from your communities</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#007bff" style={styles.loader} />
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <PostCard post={item} />}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

// Post Card Component
const PostCard = ({ post }: { post: any }) => {
  return (
    <View style={styles.card}>
      {/* Post Header */}
      <View style={styles.cardHeader}>
        <Image source={{ uri: post.author.avatar }} style={styles.avatar} />
        <View>
          <View style={styles.nameRow}>
            <Text style={styles.authorName}>{post.author.name}</Text>
            <Text style={styles.timestamp}> • {post.timestamp}</Text>
          </View>
          <View style={styles.tagContainer}>
            <Text style={styles.community}>{post.author.community}</Text>
          </View>
        </View>
      </View>

      {/* Post Content */}
      <Text style={styles.content}>{post.content}</Text>
      {post.image && <Image source={{ uri: post.image }} style={styles.postImage} />}

      {/* Actions Row */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.action}>
        <Feather name="thumbs-up" size={18} color="#777" />
          <Text style={styles.actionText}>{post.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.action}>
        <Feather name="message-circle" size={18} color="#777" />
          <Text style={styles.actionText}>{post.comments}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.action}>
        <Feather name="share-2" size={18} color="#777" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#4D80B3',
  },
  loader: {
    marginTop: 50,
  },
  list: {
    padding: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  authorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  timestamp: {
    fontSize: 12,
    color: '#4D80B3',
  },
  tagContainer: {
    backgroundColor: '#cce5ff',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginTop: 3,
  },
  community: {
    fontSize: 12,
    color: '#007bff',
  },
  content: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default Home;
