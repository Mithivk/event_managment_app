import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';

const COMMUNITIES = [
  { id: 1, name: 'IT', icon: '💻' },
  { id: 2, name: 'Cybersecurity', icon: '🔒' },
  { id: 3, name: 'Design', icon: '🎨' },
  { id: 4, name: 'Data Science', icon: '📊' },
  { id: 5, name: 'AI/ML', icon: '🤖' },
  { id: 6, name: 'Web Development', icon: '🌐' },
  { id: 7, name: 'Mobile Development', icon: '📱' },
  { id: 8, name: 'DevOps', icon: '⚙️' },
];

export default function CommunitiesScreen() {
  const [selected, setSelected] = useState<number[]>([]);

  const toggleCommunity = (id: number) => {
    setSelected(prev => 
      prev.includes(id) 
        ? prev.filter(x => x !== id)
        : [...prev, id]
    );
  };

  const handleContinue = () => {
    if (selected.length > 0) {
      router.replace('/(tabs)');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Your Communities</Text>
      <Text style={styles.subtitle}>Select the communities you're interested in</Text>
      
      <ScrollView style={styles.communitiesList} showsVerticalScrollIndicator={false}>
        <View style={styles.grid}>
          {COMMUNITIES.map(community => (
            <TouchableOpacity
              key={community.id}
              style={[
                styles.communityItem,
                selected.includes(community.id) && styles.selectedItem
              ]}
              onPress={() => toggleCommunity(community.id)}
            >
              <Text style={styles.communityIcon}>{community.icon}</Text>
              <Text style={styles.communityName}>{community.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity 
        style={[styles.button, selected.length === 0 && styles.buttonDisabled]}
        onPress={handleContinue}
        disabled={selected.length === 0}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    marginTop: 60,
    marginBottom: 12,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
  },
  communitiesList: {
    flex: 1,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    paddingBottom: 20,
  },
  communityItem: {
    width: '48%',
    padding: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 16,
    alignItems: 'center',
    gap: 12,
  },
  selectedItem: {
    backgroundColor: '#E3F2FD',
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  communityIcon: {
    fontSize: 32,
  },
  communityName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    fontFamily: 'Inter-SemiBold',
    color: '#fff',
    fontSize: 16,
  },
});