import { useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import { Dimensions, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppButton from '../../components/AppButton';
import AppCarousel from '../../components/CarouselComponent';
import { COLORS } from '../../theme/colors';
import { RADIUS, SHADOW, SPACING, TYPOGRAPHY } from '../../theme/styles';
import { SlideContent } from './components/SlideContent';
import { onboardingData } from './constants';

const { width } = Dimensions.get('window');
const FIXED_BOTTOM_HEIGHT = 220;

const OnboardingScreen: React.FC = () => {
  const navigation = useNavigation();
  const flatListRef = useRef<FlatList<any>>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (offset: number) => {
    const newIndex = Math.round(offset / width);
    setCurrentIndex(newIndex);
  };

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1, animated: true });
    } else {
      navigation.navigate('Login' as never);
    }
  };

  const handleSkip = () => {
    navigation.navigate('Home' as never);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        {currentIndex < onboardingData.length - 1 && (
          <Pressable style={styles.skipButton} onPress={handleSkip}>
            <Text style={[TYPOGRAPHY.Caption, styles.skipText]}>Skip</Text>
          </Pressable>
        )}
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
          title={currentIndex === onboardingData.length - 1 ? 'Get Started' : 'Next'}
          onPress={handleNext}
          style={{ marginBottom: SPACING.s12 }}
        />
        <AppButton
          title="Sign Up"
          onPress={() => navigation.navigate('Signup' as never)}
          variant="secondary"
          style={{ marginBottom: SPACING.s20 }}
        />
        <Pressable onPress={handleSkip}>
          <Text style={[TYPOGRAPHY.Caption, styles.guestText]}>Continue as guest</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.carbonBlack,
  },
  header: {
    height: 48,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: SPACING.s24,
    zIndex: 1,
  },
  skipButton: {
    paddingVertical: SPACING.s8,
  },
  skipText: {
    color: COLORS.softGray,
    fontWeight: '600',
  },
  bottomContainer: {
    height: FIXED_BOTTOM_HEIGHT,
    paddingHorizontal: SPACING.s32,
    paddingTop: SPACING.s20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.carbonBlack,
    borderTopLeftRadius: RADIUS.large,
    borderTopRightRadius: RADIUS.large,
    ...SHADOW.default,
  },
  guestText: {
    color: COLORS.softGray,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});

export default OnboardingScreen;

