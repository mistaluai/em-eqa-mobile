import { fontFamily } from '@/src/theme/fonts';
import * as Font from 'expo-font';
import { Slot } from 'expo-router'; // UI CHANGE: Use Slot instead of Stack
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';

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
      <StatusBar style="dark" />
      { }
      <Slot />
    </>
  );
};

export default RootLayout;