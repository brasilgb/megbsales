import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Separator } from '@/components/Separator';
import { Text } from '@/components/Text';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'expo-router';
import { Plus, User } from 'lucide-react-native';
import React from 'react';
import { View } from 'react-native';


export default function Home() {

  const { user } = useAuth();
  return (
    <View className='flex-1 items-center justify-start p-4'>
      <Text className='text-2xl font-bold'>Bem vindo de volta</Text>
      <Text className='text-xl text-gray-500'>
        {user?.user.name}
      </Text>

      {/* <Text className='text-lg font-bold border-b w-full mt-8'>Informações recentes</Text> */}
      <Separator className='my-8' />
      <View className='flex-row flex-wrap gap-4 items-center'>
        <Card className='flex-1 bg-primary items-center justify-center p-4'>
          <Text className='text-xl text-accent'>Pedidos</Text>
          <Text className='text-3xl font-bold text-accent'>12</Text>
        </Card>
        <Card className=' flex-1 bg-primary items-center justify-center p-4'>
          <Text className='text-xl text-accent'>Clientes</Text>
          <Text className='text-3xl font-bold text-accent'>12</Text>
        </Card>
        <Card className='flex-1 bg-primary items-center justify-center p-4'>
          <Text className='text-xl text-accent'>Produtos</Text>
          <Text className='text-3xl font-bold text-accent'>12</Text>
        </Card>
      </View>

      {/* <Text className='text-lg font-bold border-b w-full mt-8'>Atalhos úteis</Text> */}
      <Separator className='my-8' />
      <View className='items-center justify-center'>
        <View className='flex-row flex-wrap gap-4 items-center'>
          <Link href='/orders' asChild>
            <Button variant={'default'} className='flex-row items-center justify-center gap-1'>
              <Plus color="white" />
              <Text>Pedido</Text>
            </Button>
          </Link>
          <Link href='/orders'>
            <Button variant={'default'} className='flex-row items-center justify-center gap-1'>
              <Plus color="white" />
              <Text>Produto</Text>
            </Button>
          </Link>
          <Link href='/orders'>
            <Button variant={'default'} className='flex-row items-center justify-center gap-1'>
              <Plus color="white" />
              <Text>Cliente</Text>
            </Button>
          </Link>
        </View>
        <View className='flex-row flex-wrap gap-4 items-center mt-8'>
          <Link href='/orders' className='w-full' asChild>
            <Button variant={'outline'} className='flex-row text-3xl items-center justify-center gap-1 w-full'>
              <User color="gray" />
              <Text>Meus dados</Text>
            </Button>
          </Link>
        </View>
      </View>

    </View>
  );
}
