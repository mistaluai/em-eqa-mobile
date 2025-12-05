//import { Font } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
//import { Font } from '../src/theme/fonts';
import * as Font from 'expo-font';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded] = Font.useFonts({
    'Inter-Regular': require('../src/theme/fonts/fonts/Inter_400Regular.ttf'),
    'Inter-Medium': require('../src/theme/fonts/Inter_500Medium.ttf'),
    'Inter-SemiBold': require('../src/theme/fonts/Inter_600SemiBold.ttf'),
    'Inter-Bold': require('../src/theme/fonts/Inter_700Bold.ttf'),
    'Inter-ExtraBold': require('../src/theme/fonts/Inter_800ExtraBold.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false, // Screens use their own AppHeader component
          contentStyle: { backgroundColor: '#1A1A1A' }, // carbonBlack
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="index" options={{ title: 'App Index' }} />
        <Stack.Screen name="OnboardingScreen" options={{ title: 'Onboarding' }} />
        <Stack.Screen name="LoginScreen" options={{ title: 'Login' }} />
        <Stack.Screen name="SignUpScreen" options={{ title: 'Sign Up' }} />
        <Stack.Screen name="HomeScreen" options={{ title: 'Home' }} />
        <Stack.Screen name="DeviceConnectionScreen" options={{ title: 'Device Connection' }} />
        <Stack.Screen name="TimelineEventsScreen" options={{ title: 'Timeline & Events' }} />
        <Stack.Screen name="EventDetailsScreen" options={{ title: 'Event Details' }} />
        <Stack.Screen name="PrivacyDataControlScreen" options={{ title: 'Privacy Control' }} />
        <Stack.Screen name="ClipUploadSyncScreen" options={{ title: 'Upload Sync' }} />
        <Stack.Screen name="ProfileRecordingSettingsScreen" options={{ title: 'Profile Settings' }} />
        <Stack.Screen name="SystemStatusScreen" options={{ title: 'System Status' }} />
      </Stack>
    </>
  );
};

export default RootLayout;