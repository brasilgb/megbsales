import "@/styles/global.css";
import 'react-native-reanimated';
import { AuthProvider } from '@/contexts/AuthContext';
import { Stack } from 'expo-router';
import Constants from 'expo-constants';
import { View } from "react-native";

export default function RootLayout() {
  const statusBarHeight = Constants.statusBarHeight;
  return (
    <AuthProvider>
      <View className="flex-1" style={{ paddingTop: statusBarHeight }}>
        <Stack>
          <Stack.Screen name="(protected)" options={{ headerShown: false, animation: 'none' }} />
          <Stack.Screen name="login" options={{ headerShown: false, animation: 'none' }} />
        </Stack>
      </View>
    </AuthProvider>
  );
}
