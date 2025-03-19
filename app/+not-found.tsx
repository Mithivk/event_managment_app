import { StyleSheet } from 'react-native';
import { Link, Stack, usePathname } from 'expo-router';
import { View, Text } from 'react-native';

export default function NotFoundScreen() {
  const pathname = usePathname(); // Get current route

  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={styles.container}>
        <Text style={styles.routeText}>Current Route: {pathname}</Text>
        <Link href="/" style={styles.link}>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 16,
  },
  routeText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    marginBottom: 10,
    color: 'black',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    color: '#007AFF',
    fontFamily: 'Inter-Regular',
  },
});
