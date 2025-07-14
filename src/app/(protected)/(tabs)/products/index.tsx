import { useAuth } from '@/contexts/AuthContext';
import React from 'react';
import { View, Text, Button } from 'react-native';

export default function Products() {
  const { logOut } = useAuth();
  return (
    <View className=''>
      <Text>Products</Text>
    </View>
  );
}
