import { Ionicons } from '@expo/vector-icons';
import { withObservables } from '@nozbe/watermelondb/react';
import React, { useMemo } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { RADIUS, SPACING, TYPOGRAPHY, useGlobalStyles } from '@/theme';
import { useThemeStyles } from '@/theme/useThemeStyles';
import AppHeader from '../../components/HeaderComponent';
import { localDatabase } from '../../services/databases/watermelondb/database';
import Clip from '../../services/databases/watermelondb/models/Clips';
import { ClipItem } from './components/ClipItem';

interface ClipDashboardProps {
  clips: Clip[];
}

const ClipDashboardComponent: React.FC<ClipDashboardProps> = ({ clips }) => {
  const styles = useThemeStyles(createStyles);
  const { SCREEN, COLORS, CARD } = useGlobalStyles();

  // Aggregate Metrics Calculations
  const metrics = useMemo(() => {
    let synced = 0;
    let pending = 0;
    let unprocessed = 0;
    let dismissed = 0;

    for (const c of clips) {
      if (c.remoteSyncStatus === 'synced') synced++;
      else if (c.recordingStatus === 'unprocessed') unprocessed++;
      else if (c.recordingStatus === 'dismissed') dismissed++;
      else if (c.recordingStatus === 'recorded' && c.remoteSyncStatus === 'unsynced') pending++;
    }

    return { total: clips.length, synced, pending, unprocessed, dismissed };
  }, [clips]);

  // Sort clips by newest first based on recordedAt
  const sortedClips = useMemo(() => {
    return [...clips].sort((a, b) => b.recordedAt.getTime() - a.recordedAt.getTime());
  }, [clips]);

  const renderMetricSquare = (label: string, count: number, icon: string, color: string, bgColor: string) => (
    <View style={[styles.metricSquare, { backgroundColor: bgColor, borderColor: COLORS.borderLight }]}>
      <View style={[styles.metricIconWrap, { backgroundColor: color + '20' }]}>
        <Ionicons name={icon as any} size={20} color={color} />
      </View>
      <Text style={[TYPOGRAPHY.HeadlineXL, { color: COLORS.textPrimary, marginTop: SPACING.s8 }]}>{count}</Text>
      <Text style={[TYPOGRAPHY.Caption, { color: COLORS.textSecondary, marginTop: 4 }]}>{label}</Text>
    </View>
  );

  return (
    <SafeAreaView style={SCREEN.safeArea}>
      <AppHeader title="Clips Upload & Sync" showBack={true} />

      <View style={SCREEN.container}>

        {/* Metrics Header Grid */}
        <View style={styles.metricsGrid}>
          <View style={styles.metricsRow}>
            {renderMetricSquare('Total', metrics.total, 'albums', COLORS.primary, COLORS.backgroundNeutral)}
            {renderMetricSquare('Pending Sync', metrics.pending, 'cloud-upload', COLORS.secondary, COLORS.backgroundNeutral)}
          </View>
          <View style={styles.metricsRow}>
            {renderMetricSquare('Synced', metrics.synced, 'cloud-done', COLORS.primaryLight, COLORS.backgroundNeutral)}
            {renderMetricSquare('Unprocessed', metrics.unprocessed, 'pulse', COLORS.warning, COLORS.backgroundNeutral)}
          </View>
        </View>

        {/* List Header */}
        <Text style={[TYPOGRAPHY.HeadlineM, { color: COLORS.textPrimary, marginVertical: SPACING.s16, marginLeft: SPACING.s4 }]}>
          Device Clips
        </Text>

        {/* Clips List */}
        <FlatList
          data={sortedClips}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ClipItem clip={item} />}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="videocam-off-outline" size={48} color={COLORS.textSecondary} />
              <Text style={[TYPOGRAPHY.BodyL, { color: COLORS.textSecondary, marginTop: SPACING.s16 }]}>
                No clips saved locally yet.
              </Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
};

const createStyles = (COLORS: any) => StyleSheet.create({
  metricsGrid: {
    marginVertical: SPACING.s12,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.s12,
  },
  metricSquare: {
    flex: 1,
    borderRadius: RADIUS.large,
    padding: SPACING.s16,
    marginHorizontal: SPACING.s8,
    borderWidth: 1,
  },
  metricIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingBottom: SPACING.s32,
  },
  emptyContainer: {
    padding: SPACING.s32,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.s32,
  }
});

// Reactively bind to the entire clips collection
const enhance = withObservables([], () => ({
  clips: localDatabase.collections.get<Clip>('clips').query().observe(),
}));

export default enhance(ClipDashboardComponent);