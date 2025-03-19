
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';

const CHATS = [
  {
    id: '1',
    name: 'Design Community',
    type: 'group',
    avatar: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=200',
    lastMessage: 'Sarah: Just shared the new design system!',
    time: '2m ago',
    unread: 3,
  },
  {
    id: '2',
    name: 'Mike Johnson',
    type: 'direct',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
    lastMessage: 'Thanks for the security tips!',
    time: '1h ago',
    unread: 0,
  },
  {
    id: '3',
    name: 'Developers Hub',
    type: 'group',
    avatar: 'https://images.unsplash.com/photo-1604072363256-b766f3181b4a?w=200',
    lastMessage: 'John: Let’s review the new PRs.',
    time: '5h ago',
    unread: 2,
  },
];

export default function ChatScreen() {
  const { id } = useLocalSearchParams(); // Get the chat ID from the URL
  const navigation = useNavigation();
  const chat = CHATS.find(chat => chat.id === id);

  if (!chat) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Chat not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ArrowLeft size={24} color="#333" />
        </TouchableOpacity>
        <Image source={{ uri: chat.avatar }} style={styles.avatar} />
        <Text style={styles.chatName}>{chat.name}</Text>
      </View>

      {/* Chat Messages Placeholder */}
      <View style={styles.chatArea}>
        <Text style={styles.placeholderText}>Chat messages will be displayed here...</Text>
      </View>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
    padding: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  chatName: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
  },
  chatArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    fontSize: 16,
    color: '#666',
    fontFamily: 'Inter-Regular',
  },
  errorText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'red',
    fontFamily: 'Inter-Bold',
  },
});
