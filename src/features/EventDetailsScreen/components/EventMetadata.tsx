import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../../theme/colors';
import { RADIUS, SPACING, TYPOGRAPHY } from '../../../theme/styles';

interface EventMetadataProps {
  title: string;
  time: string;
  location: string;
}

export const EventMetadata: React.FC<EventMetadataProps> = ({ title, time, location }) => (
  <>
    {/* UI Change: Event Title color switched from COLORS.white to COLORS.textPrimary */}
    <Text style={[TYPOGRAPHY.HeadlineL, styles.eventTitle]}>{title}</Text>
    <View style={styles.pillsContainer}>
      <View style={styles.pill}>
        {/* UI Change: Icon color switched from COLORS.desertSand to COLORS.secondary */}
        <Ionicons name="time-outline" size={20} color={COLORS.primary} />
        {/* UI Change: Pill text color switched from COLORS.desertSand to COLORS.secondary */}
        <Text style={[TYPOGRAPHY.Caption, styles.pillText]}>{time}</Text>
      </View>
      <View style={styles.pill}>
        {/* UI Change: Icon color switched from COLORS.desertSand to COLORS.secondary */}
        <Ionicons name="location-outline" size={20} color={COLORS.primary} />
        {/* UI Change: Pill text color switched from COLORS.desertSand to COLORS.secondary */}
        <Text style={[TYPOGRAPHY.Caption, styles.pillText]}>{location}</Text>
      </View>
    </View>
  </>
);

const styles = StyleSheet.create({
  eventTitle: {
    // UI Change: Event Title color switched from COLORS.white to COLORS.textPrimary
    color: COLORS.textPrimary,
    marginBottom: SPACING.s16,
    fontWeight: '800',
  },
  pillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: SPACING.s32,
    gap: SPACING.s12,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    // UI Change: Background color switched from COLORS.desertSand to COLORS.secondary (maintaining transparency)
    backgroundColor: `${COLORS.secondary}30`,
    paddingHorizontal: SPACING.s12,
    paddingVertical: SPACING.s8,
    borderRadius: RADIUS.large,
  },
  pillText: {
    // UI Change: Pill text color switched from COLORS.desertSand to COLORS.secondary
    color: COLORS.textSecondary,
    marginLeft: SPACING.s4,
    fontWeight: '700',
  },
});