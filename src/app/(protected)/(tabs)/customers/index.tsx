import { useAuth } from '@/contexts/AuthContext';
import React from 'react';
import { View, Text, Button } from 'react-native';

export default function Customers() {
  const { logOut } = useAuth();
  return (
    <View className=''>
      <Text>Customers</Text>
    </View>
  );
}
