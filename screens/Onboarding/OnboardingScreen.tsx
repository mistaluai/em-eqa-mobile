import { RADIUS, SHADOW, SPACING } from '@/src/theme';
import { COLORS } from '@/src/theme/colors';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppButton from '../../components/AppButton';
import AppCarousel from '../../components/CarouselComponent';
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
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        {currentIndex < onboardingData.length - 1
          //&& (
          // <Pressable style={styles.skipButton} onPress={handleSkip}>
          //   <Text style={[TYPOGRAPHY.Caption, styles.skipText]}>Skip</Text>
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

      <View style={styles.bottomContainer}>
        <AppButton
          title="Login"
          onPress={handleLogin}
          variant="primary"
          style={styles.buttonSpacer}
        />
        <AppButton
          title="Sign Up"
          onPress={handleSignUp}
          variant="secondary"
          style={styles.buttonSpacer}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
  },
  header: {
    height: 48,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: SPACING.s24,
    zIndex: 1,
  },
  bottomContainer: {
    height: 220,
    paddingHorizontal: SPACING.s32,
    paddingTop: SPACING.s20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.backgroundLight,
    borderTopLeftRadius: RADIUS.large,
    borderTopRightRadius: RADIUS.large,
    ...SHADOW.default,
  },
  buttonSpacer: {
    marginBottom: SPACING.s20,
  },
  // Kept these just in case you uncomment the Skip button logic later
  skipButton: {
    paddingVertical: SPACING.s8,
  },
  skipText: {
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
});

export default OnboardingScreen;