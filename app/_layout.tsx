import { fontFamily } from '@/theme/fonts';
import * as Font from 'expo-font';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { useAuthStore } from '../services/databases/supabase/supabaseAuth';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  // 2. Get the initialize function and state
  const { initialize, initialized } = useAuthStore();

  const [fontsLoaded] = Font.useFonts({
    [fontFamily.regular]: require("../assets/fonts/Inter_18pt-Regular.ttf"),
    [fontFamily.medium]: require("../assets/fonts/Inter_18pt-Medium.ttf"),
    [fontFamily.semibold]: require("../assets/fonts/Inter_18pt-SemiBold.ttf"),
    [fontFamily.bold]: require("../assets/fonts/Inter_18pt-Bold.ttf"),
    [fontFamily.extrabold]: require("../assets/fonts/Inter_18pt-ExtraBold.ttf"),
  });

  // 3. Trigger Auth Check immediately when app mounts
  useEffect(() => {
    initialize();
  }, []);

  // 4. Hide Splash Screen only when BOTH Fonts and Auth are ready
  useEffect(() => {
    if (fontsLoaded && initialized) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, initialized]);

  // 5. Return null until we are ready (Splash screen handles the visuals)
  if (!fontsLoaded || !initialized) {
    return null;
  }

  return (
    <>
      <StatusBar style="dark" />
      <Slot />
    </>
  );
};

export default RootLayout;