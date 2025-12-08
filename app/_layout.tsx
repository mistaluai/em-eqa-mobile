//import { Font } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
//import { Font } from '../src/theme/fonts';
import { fontFamily } from '@/src/theme/fonts';
import * as Font from 'expo-font';
// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded] = Font.useFonts({
    [fontFamily.regular]: require("../src/theme/fonts/Inter_18pt-Regular.ttf"),
    [fontFamily.medium]: require("../src/theme/fonts/Inter_18pt-Medium.ttf"),
    [fontFamily.semibold]: require("../src/theme/fonts/Inter_18pt-SemiBold.ttf"),
    [fontFamily.bold]: require("../src/theme/fonts/Inter_18pt-Bold.ttf"),
    [fontFamily.extrabold]: require("../src/theme/fonts/Inter_18pt-ExtraBold.ttf"),
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
      </Stack>
    </>
  );
};

export default RootLayout;