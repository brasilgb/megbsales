import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
  size: number;
}) {
  return <FontAwesome style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'white',
        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}>
      <Tabs.Screen
        name="index"
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
        name="products/index"
        options={{
          title: 'Produtos',
          tabBarIcon: ({ color }) => <TabBarIcon size={24} name="cubes" color={color} />,
        }}
      />
      <Tabs.Screen
        name="users/index"
        options={{
          title: 'Usuários',
          tabBarIcon: ({ color }) => <TabBarIcon size={24} name="user" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings/index"
        options={{
          title: 'Configurações',
          tabBarIcon: ({ color }) => <TabBarIcon size={24} name="cog" color={color} />,
        }}
      />
    </Tabs>
  );
}
