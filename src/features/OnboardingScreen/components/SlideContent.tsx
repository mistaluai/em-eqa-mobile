import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../../theme/colors';
import { RADIUS, SHADOW, SPACING, TYPOGRAPHY } from '../../../theme/styles';

const { width, height } = Dimensions.get('window');
const FIXED_BOTTOM_HEIGHT = 220;

export interface OnboardingSlide {
  key: string;
  title: string;
  subtitle: string;
  description: string;
  type: 'logo' | 'illustration' | 'speech' | 'cards' | 'privacy' | 'reminder';
}

interface SlideContentProps {
  item: OnboardingSlide;
}

const Placeholder: React.FC<{ children: React.ReactNode; size: number }> = ({ children, size }) => (
  <View style={[styles.placeholderBase, { width: size, height: size }]}>
    <Text style={[TYPOGRAPHY.BodyL, { color: COLORS.gray700 }]}>{children}</Text>
  </View>
);

export const SlideContent: React.FC<SlideContentProps> = ({ item }) => {
  const renderContent = () => {
    switch (item.type) {
      case 'logo':
        return (
          <>
            <Placeholder size={width * 0.4}>
              <Ionicons name="sparkles" size={50} color={COLORS.gray700} />
            </Placeholder>
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
            <View style={[styles.mockCard, { height: 80 }]}><Text style={styles.mockCardText}>Event Card 2</Text></View>
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
        {item.type !== 'logo' && (
          <>
            <Text style={[TYPOGRAPHY.HeadlineL, styles.slideTitle]}>{item.title}</Text>
            <Text style={[TYPOGRAPHY.BodyL, styles.slideSubtitle]}>{item.subtitle}</Text>
            <Text style={[TYPOGRAPHY.BodyM, styles.slideDescription]}>{item.description}</Text>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    height: FIXED_BOTTOM_HEIGHT - 60,
    width: '100%',
    alignItems: 'center',
    marginBottom: SPACING.s32,
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
    flexDirection: 'row',
    gap: SPACING.s24,
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
});

