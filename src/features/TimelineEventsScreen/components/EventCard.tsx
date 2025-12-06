import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import AppCard from '../../../components/AppCard';
import { Event } from '../../../shared/types';
import { COLORS } from '../../../theme/colors';
import { RADIUS, SPACING, TYPOGRAPHY } from '../../../theme/styles';

interface EventCardProps {
  event: Event;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const navigation = useNavigation<any>();

  return (
    <Pressable
      onPress={() => navigation.navigate('EventDetails' as never)}
      style={styles.eventCardContainer}
    >
      <AppCard style={styles.eventCard}>
        {/* Title + Time (stacked, left-aligned) */}
        <View style={styles.headerSection}>
          <Text style={styles.eventTitle} numberOfLines={2}>
            {event.title}
          </Text>
          <Text style={styles.eventTime}>{event.time}</Text>
        </View>

        {/* Summary + Optional Video Icon */}
        <View style={styles.footerRow}>
          <Text style={styles.eventSummary} numberOfLines={3}>
            {event.summary}
          </Text>

          {event.videoThumbnail && (
            <View style={styles.videoIconContainer}>
              <Ionicons name="videocam" size={24} color={COLORS.textSecondary} />
            </View>
          )}
        </View>
      </AppCard>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  eventCardContainer: {
    marginBottom: SPACING.s16,
  },
  eventCard: {
    padding: SPACING.s16,
    backgroundColor: COLORS.backgroundNeutral,
    borderRadius: RADIUS.large,
    borderWidth: 1,
    borderColor: COLORS.backgroundNeutral,
  },

  // NEW: Title and time stacked vertically
  headerSection: {
    marginBottom: SPACING.s12,
  },
  eventTitle: {
    ...TYPOGRAPHY.BodyL,
    color: COLORS.textPrimary,
    fontWeight: '700',
    lineHeight: 22,
  },
  eventTime: {
    ...TYPOGRAPHY.BodyM,
    color: COLORS.primary,        // Your blue/accent color
    fontWeight: '600',
    marginTop: SPACING.s4,
  },

  // Footer: summary + optional video icon on the right
  footerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  eventSummary: {
    ...TYPOGRAPHY.Caption,
    color: COLORS.textSecondary,
    flex: 1,
    paddingRight: SPACING.s16,
    lineHeight: 18,
  },
  videoIconContainer: {
    width: 48,
    height: 48,
    backgroundColor: COLORS.borderLight,
    borderRadius: RADIUS.default,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: SPACING.s8,
  },
});