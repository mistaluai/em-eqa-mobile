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
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => navigation.navigate('EventDetails' as never)}
      style={styles.eventCardContainer}
    >
      <AppCard style={styles.eventCard}>
        <View style={styles.timeTitleRow}>
          {/* Accent color for time */}
          <Text style={[TYPOGRAPHY.BodyM, styles.eventTime]}>{event.time}</Text>
          {/* UI CHANGE: Primary dark text for event title */}
          <Text style={[TYPOGRAPHY.BodyL, styles.eventTitle]} numberOfLines={1}>{event.title}</Text>
        </View>
        <View style={styles.summaryRow}>
          <View style={styles.summaryBox}>
            {/* UI CHANGE: Secondary gray text for summary */}
            <Text style={[TYPOGRAPHY.Caption, { color: COLORS.textSecondary }]}>{event.summary}</Text>
          </View>
          {event.videoThumbnail && (
            <View style={styles.videoThumbnail}>
              {/* UI CHANGE: Icon color is now secondary gray text */}
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
    // UI CHANGE: Card background is now white (or light neutral)
    backgroundColor: COLORS.backgroundLight, 
  },
  timeTitleRow: {
    flexDirection: 'row',
    marginBottom: SPACING.s12,
    alignItems: 'center',
  },
  eventTime: {
    // UI CHANGE: Use the secondary alias (desertSand value)
    color: COLORS.secondary,
    fontWeight: '700',
    marginRight: SPACING.s16,
  },
  eventTitle: {
    // UI CHANGE: Primary dark text for the title
    color: COLORS.textPrimary,
    fontWeight: '700',
    flex: 1,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  summaryBox: {
    flex: 1,
    paddingRight: SPACING.s16,
  },
  videoThumbnail: {
    width: 80,
    height: 50,
    // UI CHANGE: Background is now borderLight (gray200 alias)
    backgroundColor: COLORS.borderLight,
    borderRadius: RADIUS.default / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});