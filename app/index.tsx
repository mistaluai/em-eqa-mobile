import Loader from '@/components/LoaderComponent';
import ClipUploadSyncScreen from '@/screens/ClipUploadSync';
import DataPrivacyControlScreen from '@/screens/DataPrivacyControl';
import DeviceConnectionScreen from '@/screens/DeviceConnection';
import EventDetailsScreen from '@/screens/EventDetails';
import HomeScreen from '@/screens/Home';
import LoginScreen from '@/screens/Login';
import NavigationHubScreen from '@/screens/NavigationHub';
import OnboardingScreen from '@/screens/Onboarding';
import ProfileSettingsScreen from '@/screens/ProfileSettings';
import SignUpScreen from '@/screens/Signup';
import SystemStatusScreen from '@/screens/SystemStatus';
import TimelineEventsScreen from '@/screens/TimelineEvents';
import { useAuthStore } from '@/services/auth/supabaseAuth';
import { supabase } from '@/services/databases/supabase/supabase_client';
import { useThemeColor } from "@/theme/useThemeColor";
import { useThemeStyles } from "@/theme/useThemeStyles";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Session } from '@supabase/supabase-js';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Button, SafeAreaView } from 'react-native';
import { useBLE } from '@/services/hardware/bluetooth/useBLE';

const Stack = createNativeStackNavigator();

const createStyles = (COLORS: any) => StyleSheet.create({
  loaderContainer: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  testOverlayContainer: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 9999,
  },
  testOverlayBox: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  testOverlayText: {
    color: '#fff',
    marginBottom: 5,
    fontSize: 12,
  }
});

const Index = () => {
  const styles = useThemeStyles(createStyles);
  const COLORS = useThemeColor();
  // 2. Track the Session and Loading State
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Optional: Check if onboarding is done (e.g., from AsyncStorage)
  const [onboardingDone, setOnboardingDone] = useState(false);

  useEffect(() => {
    // Run the database testing suite on application mount
    // runChatsDatabaseTests();

    // A. Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        useAuthStore.getState().loadUserProfile(session.user.id);
      }
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
    <View style={{ flex: 1 }}>
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
        (<Stack.Group>
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
        </Stack.Group>)
      ) : (
        // ---------------------------------------------------------
        // AUTH STACK (Only visible if user is NOT logged in)
        // ---------------------------------------------------------
        (<Stack.Group>
          {!onboardingDone && (
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          )}
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignUpScreen} />
        </Stack.Group>)
      )}
    </Stack.Navigator>
    <BLETestOverlay />
    </View>
  );
};

const BLETestOverlay = () => {
  const { requestPermissions, scanForDevices, connectToDevice, provisionWifi, piDevice, connectedDevice, provisioningStatus } = useBLE();
  const COLORS = useThemeColor();
  const styles = useThemeStyles(createStyles);

  useEffect(() => {
    if (piDevice) {
      connectToDevice(piDevice);
    }
  }, [piDevice]);

  useEffect(() => {
    if (connectedDevice) {
      provisionWifi('Test_SSID', 'Test_PASS').then((ip) => {
        console.log('Provisioning successful, got IP:', ip);
      });
    }
  }, [connectedDevice]);

  const startTest = async () => {
    const perm = await requestPermissions();
    if (perm) {
      scanForDevices();
    }
  };

  return (
    <SafeAreaView style={styles.testOverlayContainer} pointerEvents="box-none">
      <View style={styles.testOverlayBox}>
        <Text style={styles.testOverlayText}>{provisioningStatus || "Ready to Test"}</Text>
        <Button title="Start BLE Test" onPress={startTest} />
      </View>
    </SafeAreaView>
  );
};



export default Index;