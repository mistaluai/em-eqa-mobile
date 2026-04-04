import { useThemeStyles } from "@/theme/useThemeStyles";
import { useThemeColor } from "@/theme/useThemeColor";
import { RADIUS, SPACING, TYPOGRAPHY } from '@/theme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface EventMetadataProps {
  title: string;
  time: string;
  location: string;
}

export const EventMetadata: React.FC<EventMetadataProps> = ({ title, time, location }) => {
  const styles = useThemeStyles(createStyles);
  const COLORS = useThemeColor();

  return (
    <>
      <Text style={[TYPOGRAPHY.HeadlineL, styles.eventTitle]}>{title}</Text>
      <View style={styles.pillsContainer}>
        <View style={styles.pill}>
          <Ionicons name="time-outline" size={20} color={COLORS.primary} />
          <Text style={[TYPOGRAPHY.Caption, styles.pillText]}>{time}</Text>
        </View>
        <View style={styles.pill}>
          <Ionicons name="location-outline" size={20} color={COLORS.primary} />
          <Text style={[TYPOGRAPHY.Caption, styles.pillText]}>{location}</Text>
        </View>
      </View>
    </>
  );
};

const createStyles = (COLORS: any) => StyleSheet.create({
  eventTitle: {
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
    backgroundColor: `${COLORS.secondary}30`,
    paddingHorizontal: SPACING.s12,
    paddingVertical: SPACING.s8,
    borderRadius: RADIUS.large,
  },
  pillText: {
    color: COLORS.textSecondary,
    marginLeft: SPACING.s4,
    fontWeight: '700',
  },
});