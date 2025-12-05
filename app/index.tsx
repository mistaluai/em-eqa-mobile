import OnboardingScreen from '@/src/features/OnboardingScreen';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Loader from '../src/components/LoaderComponent';
import { COLORS } from '../src/theme/colors';

// Mock function to check if onboarding is done and user is logged in
const getInitialRoute = async () => {
  // In a real app, this would check AsyncStorage/SecureStore/Auth status
  const isLoggedIn = false;
  const onboardingDone = false; // Set to false to force Onboarding for first view

  if (!onboardingDone) {
    return '../src/features/OnboardingScreen.tsx';
  }
  if (isLoggedIn) {
    return '../src/features/HomeScreen';
  }
  return '../src/features/LoginScreen';
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

  // return <Redirect href='../src/features/OnboardingScreen.tsx' />;
  return <OnboardingScreen />
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