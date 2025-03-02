import { Tabs } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import { Chrome as Home, ChartBar as BarChart2, BookOpen, User } from 'lucide-react-native';
import { View, StyleSheet } from 'react-native';

export default function TabLayout() {
  const { theme, colors } = useTheme();
  
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopWidth: 2,
          borderTopColor: colors.border,
          height: 60,
          paddingBottom: 8,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text,
        tabBarLabelStyle: {
          fontWeight: '600',
          fontSize: 12,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <View style={styles.iconContainer}>
              <Home size={size} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: 'Progress',
          tabBarIcon: ({ color, size }) => (
            <View style={styles.iconContainer}>
              <BarChart2 size={size} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="resources"
        options={{
          title: 'Learn',
          tabBarIcon: ({ color, size }) => (
            <View style={styles.iconContainer}>
              <BookOpen size={size} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <View style={styles.iconContainer}>
              <User size={size} color={color} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    marginTop: 5,
  },
});