import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="calendar"
        options={{
          title: '캘린더',
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: '채팅',
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: '홈',
        }}
      />
      <Tabs.Screen
        name="location"
        options={{
          title: '위치',
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: '설정',
        }}
      />
    </Tabs>
  );
}