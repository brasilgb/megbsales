import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Input } from '@/components/Input';
import { Text } from '@/components/Text';
import { useAuth } from '@/contexts/AuthContext';
import React from 'react';
import { View } from 'react-native';
import { FlashList } from "@shopify/flash-list";
import { Edit, Plus, Trash } from 'lucide-react-native';
import { Link } from 'expo-router';

const DATA = [
  {
    title: "First Item",
  },
  {
    title: "Second Item",
  },
  {
    title: "First Item",
  },
  {
    title: "Second Item",
  },
  {
    title: "First Item",
  },
  {
    title: "Second Item",
  },
  {
    title: "First Item",
  },
  {
    title: "Second Item",
  },
  {
    title: "First Item",
  },
  {
    title: "Second Item",
  },
  {
    title: "First Item",
  },
  {
    title: "Second Item",
  },
  {
    title: "First Item",
  },
  {
    title: "Second Item",
  },
  {
    title: "First Item",
  },
  {
    title: "Second Item",
  },
  {
    title: "First Item",
  },
  {
    title: "Second Item",
  },
  {
    title: "First Item",
  },
  {
    title: "Second Item",
  },
  {
    title: "First Item",
  },
  {
    title: "Second Item",
  },
  {
    title: "First Item",
  },
  {
    title: "Second Item",
  },
  {
    title: "First Item",
  },
  {
    title: "Second Item",
  },
  {
    title: "First Item",
  },
  {
    title: "Second Item",
  },
  {
    title: "First Item",
  },
  {
    title: "Second Item",
  },
  {
    title: "First Item",
  },
  {
    title: "Second Item",
  },
  {
    title: "First Item",
  },
  {
    title: "Second Item",
  },
  {
    title: "First Item",
  },
  {
    title: "Second Item",
  },
  {
    title: "First Item",
  },
  {
    title: "Second Item",
  },
  {
    title: "First Item",
  },
  {
    title: "Second Item",
  },
  {
    title: "First Item",
  },
  {
    title: "Second Item",
  },
  {
    title: "First Item",
  },
  {
    title: "Second Item",
  },
  {
    title: "First Item",
  },
  {
    title: "Second Item",
  },
  {
    title: "First Item",
  },
  {
    title: "Second Item",
  },
  {
    title: "First Item",
  },
  {
    title: "Second Item",
  },
  {
    title: "First Item",
  },
  {
    title: "Second Item",
  },
  {
    title: "First Item",
  },
  {
    title: "Second Item",
  },
  {
    title: "First Item",
  },
  {
    title: "Second Item",
  },
  {
    title: "First Item",
  },
  {
    title: "Second Item",
  },
  {
    title: "First Item",
  },
  {
    title: "Second Item",
  },
];

export default function Products() {
  const { logOut } = useAuth();

  const renderItem = ({ item }: { item: any }) => {
    return (
      <View className='flex-row items-center justify-between border-b border-b-gray-200 p-2'>
        <View className='flex-row items-center justify-start gap-2'>
          <View className=''>
            <Text className=''>{1}</Text>
          </View>
          <View className=' flex justify-start'>
            <Text className=''>{item.title}</Text>
          </View>
        </View>
        <View className='flex-row items-center gap-2'>
          <Button variant='secondary' size='icon' className='bg-orange-500'>
            <Edit size={16} color={'white'} />
          </Button>
          <Button variant='destructive' size='icon'>
            <Trash size={16} color={'white'} />
          </Button>
        </View>
      </View>
    )
  }

  return (
    <View className='flex-1 flex-col gap-2 p-2'>
      <View className='flex-row items-center justify-between gap-2'>
        <Input placeholder='Search' className='flex-1' />
        <Button>
          <Link href='/(protected)/products/addproduct'>
            <Plus size={16} color={'white'} />
          </Link>
        </Button>
      </View>
      <Card className='flex-1'>
        <FlashList
          data={DATA}
          renderItem={renderItem}
        />
      </Card>
    </View>
  );
}
