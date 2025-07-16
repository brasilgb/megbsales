import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Tabs } from 'expo-router';
import { View } from 'react-native';
import Header from '@/components/Header';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
  size: number;
}) {
  return <FontAwesome style={{ marginBottom: -3 }} {...props} />;
}
function TabBarMaterialIcon(props: {
  name: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  color: string;
  size: number;
}) {
  return <MaterialCommunityIcons style={{ marginBottom: -3 }} {...props} />;
}

function TabBarIconHome(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
  size: number;
}) {
  return (
    <View className='w-20 h-20 rounded-full bg-white flex-row items-center justify-center border-8 border-gray-100'>
      <FontAwesome style={{ marginBottom: -3 }} {...props} />
    </View>
  )
}

export default function TabLayout() {

  return (
    <Tabs
      initialRouteName='index'
      screenOptions={{
        tabBarHideOnKeyboard: true,
        // headerShown: false,
        header: Header,
        tabBarStyle: {
          backgroundColor: 'white',
        },
        tabBarActiveTintColor: '#155DFC',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}>
      <Tabs.Screen
        name="orders/index"
        options={{
          title: 'Pedidos',
          tabBarIcon: ({ color }) => <TabBarIcon size={24} name="shopping-cart" color={color} />,
        }}
      />
      <Tabs.Screen
        name="customers/index"
        options={{
          title: 'Clientes',
          tabBarIcon: ({ color }) => <TabBarIcon size={24} name="users" color={color} />,
        }}
      />

      <Tabs.Screen
        name="index"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <TabBarIconHome size={40} name="home" color={color} />,
        }}
      />

      <Tabs.Screen
        name="products/index"
        options={{
          title: 'Produtos',
          tabBarIcon: ({ color }) => <TabBarIcon size={24} name="cubes" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings/index"
        options={{
          title: 'Relatórios',
          tabBarIcon: ({ color }) => <TabBarMaterialIcon size={24} name="toolbox" color={color} />,
        }}
      />
    </Tabs>
  );
}
