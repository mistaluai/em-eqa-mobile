import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Session } from '@supabase/supabase-js'; // Import Session type

// 1. Import your Supabase client
import { supabase } from '@/src/services/databases/supabase/supabase_client';

import Loader from '../src/components/LoaderComponent';
import { COLORS } from '../src/theme/colors';

// Import Screens
import ClipUploadSyncScreen from '@/src/features/ClipUploadSyncScreen';
import DataPrivacyControlScreen from '@/src/features/DataPrivacyControlScreen';
import DeviceConnectionScreen from '@/src/features/DeviceConnectionScreen';
import EventDetailsScreen from '@/src/features/EventDetailsScreen';
import HomeScreen from '@/src/features/HomeScreen';
import LoginScreen from '@/src/features/LoginScreen';
import NavigationHubScreen from '@/src/features/NavigationHubScreen/NavigationHubScreen';
import OnboardingScreen from '@/src/features/OnboardingScreen';
import ProfileSettingsScreen from '@/src/features/ProfileSettingsScreen';
import SignUpScreen from '@/src/features/SignUpScreen';
import SystemStatusScreen from '@/src/features/SystemStatusScreen';
import TimelineEventsScreen from '@/src/features/TimelineEventsScreen';

const Stack = createNativeStackNavigator();

const Index = () => {
  // 2. Track the Session and Loading State
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Optional: Check if onboarding is done (e.g., from AsyncStorage)
  const [onboardingDone, setOnboardingDone] = useState(false);

  useEffect(() => {
    // A. Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoading(false);
    });

    // B. Listen for changes (Login, Logout, Auto-refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <Loader size="large" />
      </View>
    );
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: COLORS.backgroundLight },
        animation: 'fade',
        gestureEnabled: true,
      }}
    >
      {session ? (
        // ---------------------------------------------------------
        // APP STACK (Only visible if user IS logged in)
        // ---------------------------------------------------------
        // The user cannot go "back" to Login from here because Login isn't rendered.
        <Stack.Group>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="NavigationHubScreen" component={NavigationHubScreen} />
          <Stack.Screen name="DeviceConnection" component={DeviceConnectionScreen} />
          <Stack.Screen name="TimelineEvents" component={TimelineEventsScreen} />
          <Stack.Screen name="PrivacyDataControl" component={DataPrivacyControlScreen} />
          <Stack.Screen name="ClipUploadSync" component={ClipUploadSyncScreen} />
          <Stack.Screen name="SystemStatus" component={SystemStatusScreen} />

          {/* Modals */}
          <Stack.Group screenOptions={{ presentation: 'modal' }}>
            <Stack.Screen name="ProfileSettings" component={ProfileSettingsScreen} />
            <Stack.Screen name="EventDetails" component={EventDetailsScreen} />
          </Stack.Group>
        </Stack.Group>
      ) : (
        // ---------------------------------------------------------
        // AUTH STACK (Only visible if user is NOT logged in)
        // ---------------------------------------------------------
        <Stack.Group>
          {!onboardingDone && (
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          )}
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignUpScreen} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default Index;