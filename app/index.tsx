import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Loader from '../src/components/LoaderComponent';
import { COLORS } from '../src/theme/colors';

import ClipUploadSyncScreen from '@/src/features/ClipUploadSyncScreen';
import DataPrivacyControlScreen from '@/src/features/DataPrivacyControlScreen';
import DeviceConnectionScreen from '@/src/features/DeviceConnectionScreen';
import EventDetailsScreen from '@/src/features/EventDetailsScreen';
import HomeScreen from '@/src/features/HomeScreen';
import LoginScreen from '@/src/features/LoginScreen';
import OnboardingScreen from '@/src/features/OnboardingScreen';
import ProfileSettingsScreen from '@/src/features/ProfileSettingsScreen';
import SignUpScreen from '@/src/features/SignUpScreen';
import SystemStatusScreen from '@/src/features/SystemStatusScreen';
import TimelineEventsScreen from '@/src/features/TimelineEventsScreen';

const Stack = createNativeStackNavigator();

// Mock function to check if onboarding is done and user is logged in
const getInitialRoute = async () => {
  // In a real app, this would check AsyncStorage/SecureStore/Auth status
  const isLoggedIn = false;
  const onboardingDone = false; // Set to false to force Onboarding for first view

  if (!onboardingDone) {
    return 'Onboarding';
  }
  if (isLoggedIn) {
    return 'Home';
  }
  return 'Login';
};

const Index = () => {
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  useEffect(() => {
    getInitialRoute().then(setInitialRoute);
  }, []);

  if (!initialRoute) {
    return (
      <View style={styles.loaderContainer}>
        <Loader size="large" />
      </View>
    );
  }

  return (
    <Stack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{
        headerShown: false, 
        contentStyle: { backgroundColor: '#1A1A1A' },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignUpScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      
      <Stack.Screen name="DeviceConnection" component={DeviceConnectionScreen} />
      <Stack.Screen name="TimelineEvents" component={TimelineEventsScreen} />
      <Stack.Screen name="PrivacyDataControl" component={DataPrivacyControlScreen} />
      <Stack.Screen name="ClipUploadSync" component={ClipUploadSyncScreen} />
      <Stack.Screen name="ProfileSettings" component={ProfileSettingsScreen} />
      <Stack.Screen name="SystemStatus" component={SystemStatusScreen} />
      
      <Stack.Screen name="EventDetails" component={EventDetailsScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    backgroundColor: COLORS.carbonBlack,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default Index;