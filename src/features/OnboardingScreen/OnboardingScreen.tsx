import React from 'react';
import { FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppButton from '../../components/AppButton';
import AppCarousel from '../../components/CarouselComponent';
import { ONBOARDING, SPACING } from '../../theme/styles';
import { SlideContent } from './components/SlideContent';
import { onboardingData } from './constants';
import { useOnboardingLogic } from './hooks/useOnboardingLogic';

/**
 * OnboardingScreen - Main screen component for user onboarding
 * Handles composition and rendering using hooks and components
 */
const OnboardingScreen: React.FC = () => {
  const {
    flatListRef,
    currentIndex,
    handleScroll,
    handleLogin,
    //handleSkip,
    handleSignUp,
  } = useOnboardingLogic();

  return (
    <SafeAreaView style={ONBOARDING.safeArea}>
      <View style={ONBOARDING.header}>
        {currentIndex < onboardingData.length - 1 
        //&& (
          // <Pressable style={ONBOARDING.skipButton} onPress={handleSkip}>
          //   <Text style={[TYPOGRAPHY.Caption, ONBOARDING.skipText]}>Skip</Text>
          // </Pressable>
        //)
        }
      </View>

      <AppCarousel
        data={onboardingData}
        renderItem={({ item }) => <SlideContent item={item} />}
        keyExtractor={(item) => item.key}
        onScroll={handleScroll}
        flatListRef={flatListRef as React.RefObject<FlatList<any>>}
      
      />

      <View style={ONBOARDING.bottomContainer}>
        <AppButton
          title="Login"
          onPress={handleLogin}
          variant="primary"
          style={{ marginBottom: SPACING.s20 }}
        />
        <AppButton
          title="Sign Up"
          onPress={handleSignUp}
          variant="secondary"
          style={{ marginBottom: SPACING.s20 }}
        />
        {/* <Pressable onPress={handleSkip}>
          <Text style={[TYPOGRAPHY.Caption, ONBOARDING.guestText]}>Continue as guest</Text>
        </Pressable> */}
      </View>
    </SafeAreaView>
  );
};

export default OnboardingScreen;