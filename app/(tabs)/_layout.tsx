import { Tabs } from 'expo-router';
import { Map, List, Navigation } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#2563eb',
        tabBarInactiveTintColor: '#6b7280',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#e5e7eb',
          paddingBottom: 8,
          paddingTop: 8,
          height: 80,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Locations',
          tabBarIcon: ({ size, color }) => (
            <Map size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="routes"
        options={{
          title: 'Routes',
          tabBarIcon: ({ size, color }) => (
            <List size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(navigator)"
        options={{
          title: 'Navigate',
          tabBarIcon: ({ size, color }) => (
            <Navigation size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}