import { Tabs } from "expo-router";
import { Image } from "react-native";

const iconSize = { width: 24, height: 24 };

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="diary"
        options={{
          tabBarIcon: () => (
            <Image
              source={require("../../assets/icons/diary.png")}
              style={iconSize}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          tabBarIcon: () => (
            <Image
              source={require("../../assets/icons/chat.png")}
              style={iconSize}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: () => (
            <Image
              source={require("../../assets/icons/home.png")}
              style={iconSize}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="hospital"
        options={{
          tabBarIcon: () => (
            <Image
              source={require("../../assets/icons/hospital.png")}
              style={iconSize}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarIcon: () => (
            <Image
              source={require("../../assets/icons/settings.png")}
              style={iconSize}
            />
          ),
        }}
      />
    </Tabs>
  );
}