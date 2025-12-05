import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import { Dimensions, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppButton from '../components/AppButton';
import AppCarousel from '../components/CarouselComponent';
import { COLORS } from '../theme/colors';
import { RADIUS, SHADOW, SPACING, TYPOGRAPHY } from '../theme/styles';

const { width, height } = Dimensions.get('window');

const onboardingData = [
  {
    key: '1',
    title: "EM-EQA",
    subtitle: "Your AI-powered episodic memory",
    description: "The AI assistant that logs your day discreetly and makes your memories instantly searchable.",
    type: 'logo',
  },
  {
    key: '2',
    title: "Connect Your Wearable Camera",
    subtitle: "Seamlessly link your device.",
    description: "Stream audio and visual clips directly from your wearable device for contextual logging.",
    type: 'illustration',
  },
  {
    key: '3',
    title: "Just Ask About Your Day",
    subtitle: "Natural language retrieval.",
    description: "Simply ask a question like 'Where did I put my keys?' and get the exact moment.",
    type: 'speech',
  },
  {
    key: '4',
    title: "Browse Your Day",
    subtitle: "Review your timeline.",
    description: "Scroll through a chronological list of key events, summaries, and clips from your day.",
    type: 'cards',
  },
  {
    key: '5',
    title: "You Own Your Data",
    subtitle: "Complete privacy and control.",
    description: "Configure settings for audio recording, automatic deletion, and local storage.",
    type: 'privacy',
  },
  {
    key: '6',
    title: "Never Miss What Matters",
    subtitle: "Focus on the present.",
    description: "The assistant helps capture important events, like that critical medication reminder you set.",
    type: 'reminder',
  },
];

interface SlideContentProps {
  item: typeof onboardingData[0];
}

const SlideContent: React.FC<SlideContentProps> = ({ item }) => {
  const Placeholder = ({ children, size }: { children: React.ReactNode, size: number }) => (
    <View style={[styles.placeholderBase, { width: size, height: size }]}>
      <Text style={[TYPOGRAPHY.BodyL, { color: COLORS.gray700 }]}>{children}</Text>
    </View>
  );

  const renderContent = () => {
    switch (item.type) {
      case 'logo':
        return (
          <>
            <Placeholder size={width * 0.4}><Ionicons name="sparkles" size={50} color={COLORS.gray700} /></Placeholder>
            <Text style={[TYPOGRAPHY.HeadlineL, styles.slideTitle, { marginTop: SPACING.s32 }]}>{item.title}</Text>
          </>
        );
      case 'illustration':
        return <Placeholder size={width * 0.6}><Ionicons name="camera-outline" size={80} color={COLORS.gray700} /></Placeholder>;
      case 'speech':
        return (
          <>
            <Placeholder size={width * 0.5}><Text style={{ color: COLORS.gray700 }}>"Where did I put my keys?"</Text></Placeholder>
            <View style={styles.mockClip}><Text style={{ color: COLORS.gray700 }}>Short Clip Mock</Text></View>
          </>
        );
      case 'cards':
        return (
          <View style={styles.mockCardsContainer}>
            <View style={[styles.mockCard, { height: 100 }]}><Text style={styles.mockCardText}>Event Card 1</Text></View>
            <View style={[styles.mockCard, { height: 80, marginLeft: SPACING.s24 }]}><Text style={styles.mockCardText}>Event Card 2</Text></View>
          </View>
        );
      case 'privacy':
        return (
          <View style={styles.privacyList}>
            {['Audio Off', 'Auto-Delete', 'Local-Only'].map((text, i) => (
              <View key={i} style={styles.privacyItem}>
                <Ionicons name="checkmark-circle" size={24} color={COLORS.lightLavender} />
                <Text style={[TYPOGRAPHY.BodyM, { color: COLORS.white, marginLeft: SPACING.s8 }]}>{text}</Text>
              </View>
            ))}
          </View>
        );
      case 'reminder':
        return <Placeholder size={width * 0.6}><Ionicons name="medkit-outline" size={80} color={COLORS.gray700} /></Placeholder>;
      default:
        return null;
    }
  };

  return (
    <View style={styles.slide}>
      <View style={styles.slideContentTop}>
        {renderContent()}
      </View>
      <View style={styles.slideContentBottom}>
        <Text style={[TYPOGRAPHY.HeadlineL, styles.slideTitle]}>{item.title}</Text>
        <Text style={[TYPOGRAPHY.BodyL, styles.slideSubtitle]}>{item.subtitle}</Text>
        <Text style={[TYPOGRAPHY.BodyM, styles.slideDescription]}>{item.description}</Text>
      </View>
    </View>
  );
};

const FIXED_BOTTOM_HEIGHT = 220; // Height of the bottom button container

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
    navigation.navigate('Home' as never); // Navigate to Home for guest access
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
  slide: {
    width: width,
    height: '100%',
    paddingHorizontal: SPACING.s32,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  slideContentTop: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: height * 0.4,
  },
  slideContentBottom: {
    height: FIXED_BOTTOM_HEIGHT - 60, // Account for bottom padding
    width: '100%',
    alignItems: 'center',
    marginBottom: SPACING.s32, // Add margin to space from pagination dots
  },
  placeholderBase: {
    borderRadius: RADIUS.large,
    backgroundColor: COLORS.gray700,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.s24,
  },
  mockClip: {
    width: width * 0.35,
    height: 50,
    backgroundColor: COLORS.gray700,
    borderRadius: RADIUS.default,
    marginTop: SPACING.s8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mockCardsContainer: {
    width: '100%',
    height: 150,
    padding: SPACING.s12,
    alignItems: 'flex-start',
  },
  mockCard: {
    width: width * 0.6,
    backgroundColor: COLORS.gray700,
    borderRadius: RADIUS.default,
    padding: SPACING.s12,
    justifyContent: 'center',
    ...SHADOW.default,
  },
  mockCardText: {
    ...TYPOGRAPHY.BodyM,
    color: COLORS.softGray,
  },
  privacyList: {
    alignItems: 'flex-start',
    marginTop: SPACING.s24,
  },
  privacyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.s12,
  },
  slideTitle: {
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: SPACING.s12,
    fontWeight: '800',
  },
  slideSubtitle: {
    color: COLORS.softGray,
    textAlign: 'center',
    marginBottom: SPACING.s24,
  },
  slideDescription: {
    color: COLORS.softGray,
    textAlign: 'center',
    lineHeight: 22,
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
  }
});

export default OnboardingScreen;