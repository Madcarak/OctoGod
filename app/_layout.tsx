import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { SplashScreen } from 'expo-router';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    'PressStart2P': require('../assets/fonts/PressStart2P-Regular.ttf'),
    'PixelifySans-Regular': require('../assets/fonts/PixelifySans-Regular.ttf'),
    'PixelifySans-Medium': require('../assets/fonts/PixelifySans-Medium.ttf'),
    'PixelifySans-SemiBold': require('../assets/fonts/PixelifySans-SemiBold.ttf'),
    'PixelifySans-Bold': require('../assets/fonts/PixelifySans-Bold.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Return null to keep splash screen visible while fonts load
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
        <Stack.Screen name="auth" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}