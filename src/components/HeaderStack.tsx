import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import Constants from 'expo-constants';
import { ArrowLeft, Bell, LogOut, UserRound } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function HeaderStack() {
  // const { user } = useAuth();
  const statusBarHeight = Constants.statusBarHeight + 10;
  const router = useRouter();

  return (
    <View className='flex-row items-center justify-between px-4 bg-primary pb-2' style={{ paddingTop: statusBarHeight }}>
      <View className='flex-row items-center justify-center bg-gray-50/20 w-10 h-10 rounded-full'>
        <ArrowLeft color="white" onPress={() => router.back()} />
      </View>
      <View>
        <LogOut color="white" />
      </View>
    </View>
  )
}
