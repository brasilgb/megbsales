import "@/styles/global.css";
import 'react-native-reanimated';
import { AuthProvider } from '@/contexts/AuthContext';
import { Stack } from 'expo-router';
import { View } from "react-native";
import { StatusBar } from 'expo-status-bar';


export default function RootLayout() {

  return (
    <AuthProvider>
      <View className="flex-1">
        <StatusBar style="light" />
        <Stack>
          <Stack.Screen name="(protected)" options={{ headerShown: false, animation: 'none' }} />
          <Stack.Screen name="login" options={{ headerShown: false, animation: 'none' }} />
        </Stack>
      </View>
    </AuthProvider>
  );
}
