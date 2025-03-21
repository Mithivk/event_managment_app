import { useState } from 'react';
import { StyleSheet, TouchableOpacity, TextInput, View, Text } from 'react-native';
import { Tabs, useNavigation } from 'expo-router';
import { Chrome as Home, Calendar, Bell, User, MessageCircle, Search, X } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#999',
        tabBarLabelStyle: styles.tabBarLabel,
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
        headerRight: () => <HeaderIcons />,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          title: 'Events',
          tabBarIcon: ({ color, size }) => <Calendar size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="alerts"
        options={{
          title: 'Alerts',
          tabBarIcon: ({ color, size }) => <Bell size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}

// Header Right Icons Component
const HeaderIcons = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      {showSearch ? (
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
          />
          <TouchableOpacity onPress={() => { setShowSearch(false); setSearchQuery(''); }}>
            <X size={22} color="#007bff" style={styles.closeIcon} />
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity style={styles.iconContainer}>
          <Search size={22} color="#007bff" style={styles.icon} onPress={() => setShowSearch(true)} />
          <MessageCircle size={22} color="#007bff" style={styles.icon} onPress={() => navigation.navigate('messages')} />
        </TouchableOpacity>
      )}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  tabBarLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
  },
  header: {
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  iconContainer: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 15,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 4,
    paddingHorizontal: 8,
    fontSize: 16,
    color: '#333',
  },
  closeIcon: {
    marginLeft: 10,
  },
});
