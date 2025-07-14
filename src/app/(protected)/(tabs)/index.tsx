import { useAuth } from '@/contexts/AuthContext';
import React from 'react';
import { View, Text, Button } from 'react-native';

export default function Orders() {
  const { logOut } = useAuth();
  return (
    <View className='flex-1 items-center justify-start p-4'>
      <Text className='text-2xl font-bold'>Pedidos</Text>
      <Text className='text-sm text-gray-500'>
        Aqui você pode ver todos os pedidos realizados pelos clientes.
      </Text>
      <View className='flex-1 items-center justify-start p-4'>
        <Text className='text-2xl font-bold'>Pedidos</Text>
      </View>
    </View>
  );
}
