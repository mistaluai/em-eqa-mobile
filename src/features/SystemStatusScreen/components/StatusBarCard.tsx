import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppCard from '../../../components/AppCard';
import { COLORS } from '../../../theme/colors';
import { RADIUS, SPACING, TYPOGRAPHY } from '../../../theme/styles';

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
    {/* UI CHANGE: Switch section title text color to primary dark text */}
    <Text style={[TYPOGRAPHY.HeadlineM, styles.sectionTitle]}>{title}</Text>
    <AppCard style={styles.statusCard}>
      <View style={styles.cardContent}>
        <Ionicons name={iconName as any} size={32} color={statusColor} style={{ marginRight: SPACING.s20 }} />
        <View style={styles.textBlock}>
          <Text style={[TYPOGRAPHY.BodyL, { color: statusColor, fontWeight: '700' }]}>{statusText}</Text>
          {/* UI CHANGE: Switch detail text color to secondary gray text for contrast */}
          <Text style={[TYPOGRAPHY.Caption, { color: COLORS.textSecondary }]}>{detailText}</Text>
        </View>
        {progress !== undefined && (
          <Text style={[TYPOGRAPHY.BodyL, { color: statusColor, fontWeight: '700', marginLeft: 'auto' }]}>
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
    // UI CHANGE: Switch section title text color to primary dark text
    color: COLORS.textPrimary, 
    marginBottom: SPACING.s12,
    fontWeight: '700',
  },
  statusCard: {
    // Card background is a transparent light color, which works well on white background.
    backgroundColor: `${COLORS.primaryLight}33`,
    padding: SPACING.s16,
    borderRadius: RADIUS.large,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 60,
  },
  textBlock: {
    flex: 1,
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