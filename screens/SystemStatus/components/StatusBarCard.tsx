import { RADIUS, SPACING, TYPOGRAPHY } from '@/theme';
import { COLORS } from '@/theme/colors';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppCard from '../../../components/AppCard';

interface StatusBarCardProps {
  title: string;
  iconName: string;
  statusText: string;
  detailText: string;
  statusColor: string;
  progress?: number;
}

export const StatusBarCard: React.FC<StatusBarCardProps> = ({
  title,
  iconName,
  statusText,
  detailText,
  statusColor,
  progress,
}) => (
  <View>
    <Text style={[TYPOGRAPHY.HeadlineM, styles.sectionTitle]}>{title}</Text>
    <AppCard style={styles.statusCard}>
      <View style={styles.cardContent}>
        <Ionicons name={iconName as any} size={32} color={statusColor} style={styles.iconMargin} />
        <View style={styles.textBlock}>
          <Text style={[TYPOGRAPHY.BodyL, { color: statusColor, fontWeight: '700' }]}>{statusText}</Text>
          <Text style={[TYPOGRAPHY.Caption, { color: COLORS.textSecondary }]}>{detailText}</Text>
        </View>
        {progress !== undefined && (
          <Text style={[TYPOGRAPHY.BodyL, { color: statusColor, fontWeight: '700' }, styles.progressText]}>
            {progress}%
          </Text>
        )}
      </View>
      {progress !== undefined && (
        <View style={styles.progressBarTrack}>
          <View style={[styles.progressBarFill, { width: `${progress}%`, backgroundColor: statusColor }]} />
        </View>
      )}
    </AppCard>
  </View>
);

const styles = StyleSheet.create({
  sectionTitle: {
    color: COLORS.textPrimary,
    marginBottom: SPACING.s8, // Space between the small title and the card
    fontWeight: '700',
    fontSize: 14,
    marginLeft: SPACING.s4,
  },
  statusCard: {
    // Ensure background matches your HUD theme (Neutral or Light)
    backgroundColor: COLORS.backgroundNeutral,
    padding: SPACING.s16,
    borderRadius: RADIUS.large,
    // FIX: This adds the space between this card and the next item in the list
    marginBottom: SPACING.s16,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 60,
  },
  textBlock: {
    flex: 1,
  },
  iconMargin: {
    marginRight: SPACING.s20,
  },
  progressText: {
    marginLeft: 'auto',
  },
  progressBarTrack: {
    height: SPACING.s4,
    backgroundColor: `${COLORS.primaryLight}30`,
    borderRadius: RADIUS.full,
    marginTop: SPACING.s12,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: RADIUS.full,
  },
});