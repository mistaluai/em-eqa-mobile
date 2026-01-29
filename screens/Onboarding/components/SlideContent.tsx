import { RADIUS, SPACING, TYPOGRAPHY } from '@/src/theme';
import { COLORS } from '@/src/theme/colors';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';

const { width } = Dimensions.get('window');

export interface OnboardingSlide {
  key: string;
  title: string;
  subtitle: string;
  //description: string;
  type: 'logo' | 'illustration' | 'speech' | 'cards' | 'privacy' | 'reminder';
}

interface SlideContentProps {
  item: OnboardingSlide;
}

// Placeholder component
const Placeholder: React.FC<{ children: React.ReactNode; size: number }> = ({ children, size }) => (
  <View style={[styles.placeholderBase, { width: size, height: size }]}>
    <Text style={[TYPOGRAPHY.BodyL, { color: COLORS.textSecondary }]}>{children}</Text>
  </View>
);

export const SlideContent: React.FC<SlideContentProps> = ({ item }) => {
  // This function now exclusively handles the rendering of the top visual content (Icon/Mockup)
  const renderContent = () => {
    switch (item.type) {
      case 'logo':
        return (
          <Placeholder size={width * 0.4}>
            <Image
              source={require('../../../assets/images/em_logo.png')}
            //style={{ width: 250, height:   250, resizeMode: 'contain' }} 
            />
          </Placeholder>
        );
      case 'illustration':
        return (
          <Placeholder size={width * 0.5}>
            <Image
              source={require('../../../assets/images/wearable_device.png')}
              style={styles.imageStyle}
            />
          </Placeholder>
        );
      case 'speech':
        return (
          <View style={styles.speechContainer}>
            <Placeholder size={width * 0.5}>
              <Image
                source={require('../../../assets/images/chat.png')}
                style={styles.imageStyle}
              />
            </Placeholder>
          </View>
        );
      case 'cards':
        return (
          <View style={styles.speechContainer}>
            <Placeholder size={width * 0.5}>
              <Image
                source={require('../../../assets/images/timeline.png')}
                style={styles.imageStyle}
              />
            </Placeholder>
          </View>
        );
      case 'privacy':
        return (
          <Ionicons name="lock-closed" size={160} color={COLORS.primaryLight} />
        );
      case 'reminder':
        return (
          <Ionicons name="gift" size={180} color={COLORS.primaryLight} />
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.slide}>
      {renderContent()}
      <Text style={[TYPOGRAPHY.HeadlineL, styles.slideTitle]}>{item.title}</Text>
      <Text style={[TYPOGRAPHY.BodyL, styles.slideSubtitle]}>{item.subtitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  slide: {
    width: width,
    height: '100%',
    paddingHorizontal: SPACING.s32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderBase: {
    borderRadius: RADIUS.large,
    backgroundColor: COLORS.backgroundNeutral,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 0,
  },
  speechContainer: {
    alignItems: 'center',
  },
  imageStyle: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    borderRadius: SPACING.s8,
  },
  slideTitle: {
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginTop: SPACING.s32,
    marginBottom: SPACING.s12,
    fontWeight: '800',
  },
  slideSubtitle: {
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.s24,
  },
  slideDescription: {
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
});