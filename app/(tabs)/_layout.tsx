import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';
import { Droplets, Map, Settings, Trophy, Type } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#0891b2',
        tabBarInactiveTintColor: '#64748b',
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Ocean',
          tabBarIcon: ({ color, size }) => (
            <Map size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="powers"
        options={{
          title: 'Powers',
          tabBarIcon: ({ color, size }) => (
            <Droplets size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="achievements"
        options={{
          title: 'Progress',
          tabBarIcon: ({ color, size }) => (
            <Trophy size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="font-demo"
        options={{
          title: 'Fonts',
          tabBarIcon: ({ color, size }) => (
            <Type size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Settings size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#0f172a',
    borderTopColor: '#1e293b',
    height: 60,
  },
  tabBarLabel: {
    fontFamily: 'PixelifySans-Medium',
    fontSize: 12,
  },
});