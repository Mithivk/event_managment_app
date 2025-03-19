import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, FlatList, Image, TouchableOpacity } from 'react-native';
import { Search, ArrowLeft } from 'lucide-react-native';
import { useNavigation,useRouter } from 'expo-router';

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

export default function MessagesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation(); // Navigation Hook

  // Filter chats based on search input
  const filteredChats = CHATS.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const router = useRouter();

  const renderChat = ({ item }) => (
    <TouchableOpacity style={styles.chatItem} onPress={() => router.push(`/messages/${item.id}`)}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.chatInfo}>
        <View style={styles.chatHeader}>
          <Text style={styles.chatName}>{item.name}</Text>
          <Text style={styles.chatTime}>{item.time}</Text>
        </View>
        <View style={styles.chatFooter}>
          <Text style={styles.lastMessage} numberOfLines={1}>
            {item.lastMessage}
          </Text>
          {item.unread > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>{item.unread}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Back Button & Title */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("(tabs)")} style={styles.backButton}>
          <ArrowLeft size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Messages</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Search size={20} color="#666" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search messages..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Chat List */}
      <FlatList
        data={filteredChats}
        renderItem={renderChat}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.chatList}
        ListEmptyComponent={<Text style={styles.noResults}>No chats found</Text>}
      />
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    paddingTop: 60,
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
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  chatList: {
    gap: 16,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  chatInfo: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  chatName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
  chatTime: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#666',
  },
  chatFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
  },
  unreadBadge: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginLeft: 8,
  },
  unreadText: {
    fontFamily: 'Inter-Bold',
    color: '#fff',
    fontSize: 12,
  },
  noResults: {
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#666',
    marginTop: 20,
  },
});
