import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../../theme/colors';
import { RADIUS, SHADOW, SPACING, TYPOGRAPHY } from '../../../theme/styles';
//import LOGO from '../../../../assets/images/em_logo.png';

const { width, height } = Dimensions.get('window');
// FIXED_BOTTOM_HEIGHT is no longer needed as content is unified and centrally justified.

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
  // Removed marginBottom from here to control spacing with the title's marginTop
  <View style={[styles.placeholderBase, { width: size, height: size}]}>
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
             source={require('../../../../assets/images/em_logo.png')} 
             //style={{ width: 250, height:   250, resizeMode: 'contain' }} 
                                             />
          </Placeholder>
        );
      case 'illustration':
        return <Placeholder size={width * 0.5}>
           <Image 
             source={require('../../../../assets/images/wearable_device.png')} 
             style={{ width: 200, height:   200, resizeMode: 'contain' , borderRadius: SPACING.s8}} 
                      />
          </Placeholder>;
      case 'speech':
        return (
          // Grouping speech elements
          <View style={styles.speechContainer}>
            <Placeholder size={width * 0.5}>
              <Image 
             source={require('../../../../assets/images/chat.png')} 
             style={{ width: 200, height:   200, resizeMode: 'contain' , borderRadius: SPACING.s8}} 
                   />
            </Placeholder>
          </View>
        );
      case 'cards':
        return (
        <View style={styles.speechContainer}>
            <Placeholder size={width * 0.5}>
              <Image 
             source={require('../../../../assets/images/timeline.png')} 
             style={{ width: 200, height:   200, resizeMode: 'contain' , borderRadius: SPACING.s8}} 
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
    // Unified container for all content, centered on the screen
    <View style={styles.slide}>
      {/* 1. Visual Content (Icon/Mockup) */}
      {renderContent()}

      {/* 2. Title */}
      <Text style={[TYPOGRAPHY.HeadlineL, styles.slideTitle ]}>{item.title}</Text>

      {/* 3. Subtitle */}
      <Text style={[TYPOGRAPHY.BodyL, styles.slideSubtitle]}>{item.subtitle}</Text>

      {/* 4. Description */}
      {/* <Text style={[TYPOGRAPHY.BodyM, styles.slideDescription]}>{item.description}</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  slide: {
    width: width,
    height: '100%',
    paddingHorizontal: SPACING.s32,
    alignItems: 'center',
    justifyContent: 'center', // Center content vertically
  },
  // Removed slideContentTop and slideContentBottom as the content is unified

  placeholderBase: {
    borderRadius: RADIUS.large,
    backgroundColor: COLORS.backgroundNeutral,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 0, // Removed this margin to control spacing exclusively through slideTitle's marginTop
  },
  
  speechContainer: {
    alignItems: 'center',
  },
  mockClip: {
    width: width * 0.35,
    height: 50,
    backgroundColor: COLORS.backgroundNeutral,
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
    flexDirection: 'row',
    gap: SPACING.s24,
  },
  mockCard: {
    width: width * 0.6,
    backgroundColor: COLORS.backgroundNeutral,
    borderRadius: RADIUS.default,
    padding: SPACING.s12,
    justifyContent: 'center',
    ...SHADOW.default,
  },
  mockCardText: {
    ...TYPOGRAPHY.BodyM,
    color: COLORS.textSecondary,
  },
  privacyList: {
    alignItems: 'flex-start',
    // Adjusted styling for better vertical centering
  },
  privacyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.s12,
  },
  slideTitle: {
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginTop: SPACING.s32, // Added significant margin to separate visual from title
    marginBottom: SPACING.s12,
    fontWeight: '800',
  },
  slideSubtitle: {
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.s24, // Space before the description
  },
  slideDescription: {
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
});