import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Settings, CreditCard as Edit2 } from 'lucide-react-native';

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.settingsButton}>
          <Settings size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={styles.profile}>
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200' }}
            style={styles.avatar}
          />
          <TouchableOpacity style={styles.editButton}>
            <Edit2 size={16} color="#fff" />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.name}>Mike Johnson</Text>
        <Text style={styles.bio}>Cybersecurity Expert | Tech Enthusiast</Text>
        
        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Communities</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>28</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>142</Text>
            <Text style={styles.statLabel}>Connections</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>My Communities</Text>
        <View style={styles.communities}>
          <TouchableOpacity style={styles.communityItem}>
            <Text style={styles.communityIcon}>🔒</Text>
            <Text style={styles.communityName}>Cybersecurity</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.communityItem}>
            <Text style={styles.communityIcon}>💻</Text>
            <Text style={styles.communityName}>IT</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.communityItem}>
            <Text style={styles.communityIcon}>⚙️</Text>
            <Text style={styles.communityName}>DevOps</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <View style={styles.activity}>
          <View style={styles.activityItem}>
            <Text style={styles.activityText}>Posted a security update in Cybersecurity</Text>
            <Text style={styles.activityTime}>2h ago</Text>
          </View>
          <View style={styles.activityItem}>
            <Text style={styles.activityText}>Joined DevOps community</Text>
            <Text style={styles.activityTime}>1d ago</Text>
          </View>
          <View style={styles.activityItem}>
            <Text style={styles.activityText}>Commented on "Best practices for network security"</Text>
            <Text style={styles.activityTime}>2d ago</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    paddingTop: 60,
    alignItems: 'flex-end',
  },
  settingsButton: {
    padding: 8,
  },
  profile: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  editButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#007AFF',
    padding: 8,
    borderRadius: 20,
  },
  name: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    marginBottom: 4,
  },
  bio: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  statItem: {
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#f0f0f0',
    marginHorizontal: 24,
  },
  statNumber: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    marginBottom: 16,
  },
  communities: {
    flexDirection: 'row',
    gap: 12,
  },
  communityItem: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  communityIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  communityName: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    textAlign: 'center',
  },
  activity: {
    gap: 16,
  },
  activityItem: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 12,
  },
  activityText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginBottom: 4,
  },
  activityTime: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#666',
  },
});