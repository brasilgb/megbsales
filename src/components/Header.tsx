import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import Constants from 'expo-constants';
import { useAuth } from '@/contexts/AuthContext';
import { Bell, UserRound } from 'lucide-react-native';

export default function Header() {
  // const { user } = useAuth();
  const statusBarHeight = Constants.statusBarHeight + 10;
  // const statusBarHeight = StatusBar.currentHeight +;

  return (
    <View className='flex-row items-center justify-between px-4 bg-primary pb-2' style={{ paddingTop: statusBarHeight }}>
      <View className='flex-row items-center justify-center bg-gray-50/20 w-10 h-10 rounded-full'>
        <UserRound color="white" />
      </View>
      <View>
        <Bell color="white" />
      </View>
    </View>
  )
}
