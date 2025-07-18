import HeaderStack from '@/components/HeaderStack';
import { useAuth } from '@/contexts/AuthContext';
import { Redirect, Stack } from 'expo-router';


export default function ProtectedLayout() {

  const { isLoggedIn, isReady } = useAuth();

  if (!isReady) {
    return null;
  }

  // if (!isLoggedIn) {
  //   return <Redirect href="/login" />;
  // }

  return (
    <Stack initialRouteName='addproduct/index' screenOptions={{ header: HeaderStack}}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      <Stack.Screen
        name="addcustomer/index"
        options={{ 
          headerShown: false, 
          animation: 'fade_from_bottom'
        }}
      />
      <Stack.Screen
        name="addproduct/index"
        options={{ 
          headerShown: false, 
          animation: 'fade_from_bottom'
        }}
      />

    </Stack>
  );
}
