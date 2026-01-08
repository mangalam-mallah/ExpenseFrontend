import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '@/global.css';
import { Stack } from 'expo-router';
import 'react-native-reanimated';
import Toast from 'react-native-toast-message';


export default function RootLayout() {

  return (
      
    <GluestackUIProvider mode="dark">
      <Stack initialRouteName='auth/Login'>
        <Stack.Screen name='auth/Login' options={{ headerShown: false }}/>
        <Stack.Screen name='auth/Signup' options={{ headerShown: false }}/>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
        <Toast/>
    </GluestackUIProvider>
  
  );
}
