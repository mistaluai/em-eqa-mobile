import { Ionicons } from '@expo/vector-icons';
import { withObservables } from '@nozbe/watermelondb/react';
import React, { useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { RADIUS, SPACING, TYPOGRAPHY, useGlobalStyles } from '@/theme';
import { useThemeStyles } from '@/theme/useThemeStyles';
import AppHeader from '../../components/HeaderComponent';
import { localDatabase } from '../../services/databases/watermelondb/database';
import Clip from '../../services/databases/watermelondb/models/Clips';
import { ClipItem } from './components/ClipItem';
import { useClipUploadSyncLogic } from './hooks/useClipUploadSyncLogic'; // Adjust path

interface ClipDashboardProps {
  clips: Clip[];
}

const ClipDashboardComponent: React.FC<ClipDashboardProps> = ({ clips }) => {
  const styles = useThemeStyles(createStyles);
  const { SCREEN, COLORS, CARD } = useGlobalStyles();
  const [activeFilter, setActiveFilter] = useState<'All' | 'Ready to Upload' | 'AI Processing' | 'Synced' | 'Dismissed'>('All');
  const [filterDropdownVisible, setFilterDropdownVisible] = useState(false);

  // Integrate the Sync Logic
  const { isSyncing, syncedCount, pullFromPi } = useClipUploadSyncLogic();

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

  const displayClips = useMemo(() => {
    let filtered = clips;
    if (activeFilter === 'Ready to Upload') {
      filtered = clips.filter(c => c.recordingStatus === 'recorded' && c.remoteSyncStatus === 'unsynced');
    } else if (activeFilter === 'AI Processing') {
      filtered = clips.filter(c => c.recordingStatus === 'unprocessed');
    } else if (activeFilter === 'Synced') {
      filtered = clips.filter(c => c.remoteSyncStatus === 'synced');
    } else if (activeFilter === 'Dismissed') {
      filtered = clips.filter(c => c.recordingStatus === 'dismissed');
    }

    return [...filtered].sort((a, b) => b.recordedAt.getTime() - a.recordedAt.getTime());
  }, [clips, activeFilter]);


  const renderMetricSquare = (label: string, count: number, icon: string, color: string, bgColor: string) => (
    <View style={[styles.metricSquare, { backgroundColor: bgColor, borderColor: COLORS.borderLight }]}>
      <View style={[styles.metricIconWrap, { backgroundColor: color + '20' }]}>
        <Ionicons name={icon as any} size={20} color={color} />
      </View>
      <Text style={[TYPOGRAPHY.HeadlineXL, { color: COLORS.textPrimary, marginTop: SPACING.s8 }]}>{count}</Text>
      <Text style={[TYPOGRAPHY.Caption, { color: COLORS.textSecondary, marginTop: 4 }]}>{label}</Text>
    </View>
  );

  const filters = ['All', 'Ready to Upload', 'AI Processing', 'Synced', 'Dismissed'] as const;

  return (
    <SafeAreaView style={SCREEN.safeArea}>
      <AppHeader title="Clips Upload & Sync" showBack={true} />

      <View style={SCREEN.container}>

        {/* Actionable Insights PROSE Card */}
        <View style={[CARD.default, styles.proseCard]}>
          <View style={styles.proseRow}>
            <Ionicons name="cog" size={18} color={COLORS.warning} />
            <Text style={[TYPOGRAPHY.BodyM, { color: COLORS.textPrimary, marginLeft: 8 }]}>
              <Text style={{ fontWeight: '700', color: COLORS.warning }}>{metrics.unprocessed}</Text> clips left for the AI to filter.
            </Text>
          </View>
          <View style={styles.proseRow}>
            <Ionicons name="cloud-upload" size={18} color={COLORS.secondary} />
            <Text style={[TYPOGRAPHY.BodyM, { color: COLORS.textPrimary, marginLeft: 8 }]}>
              <Text style={{ fontWeight: '700', color: COLORS.secondary }}>{metrics.pending}</Text> filtered clips ready to be successfully uploaded.
            </Text>
          </View>
        </View>

        {/* Metrics Header Grid */}
        <View style={styles.metricsGrid}>
          <View style={styles.metricsRow}>
            {renderMetricSquare('Total', metrics.total, 'albums', COLORS.primary, COLORS.backgroundNeutral)}
            {renderMetricSquare('Synced', metrics.synced, 'cloud-done', COLORS.primaryLight, COLORS.backgroundNeutral)}
          </View>
        </View>

        {/* Device Clips Card */}
        <View style={[CARD.default, styles.listCard]}>

          {/* List Header and Dropdown */}
          <View style={styles.listHeaderRow}>
            <Text style={[TYPOGRAPHY.HeadlineM, { color: COLORS.textPrimary }]}>
              Device Clips
            </Text>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>

              {/* NEW SYNC BUTTON */}
              <TouchableOpacity
                activeOpacity={0.7}
                style={[styles.syncButton, { backgroundColor: isSyncing ? COLORS.backgroundNeutral : COLORS.primaryLight }]}
                onPress={pullFromPi}
                disabled={isSyncing}
              >
                {isSyncing ? (
                  <ActivityIndicator size="small" color={COLORS.primary} style={{ marginRight: 4 }} />
                ) : (
                  <Ionicons name="hardware-chip-outline" size={14} color={COLORS.primary} style={{ marginRight: 4 }} />
                )}
                <Text style={[TYPOGRAPHY.BodyM, { color: COLORS.primary, fontWeight: '700' }]}>
                  {isSyncing ? `Syncing` : 'Sync'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                style={[styles.dropdownButton, { borderColor: COLORS.borderDark }]}
                onPress={() => setFilterDropdownVisible(true)}
              >
                <Text style={[TYPOGRAPHY.BodyM, { color: COLORS.textPrimary, marginRight: 8, fontWeight: '600' }]}>
                  {activeFilter}
                </Text>
                <Ionicons name="chevron-down" size={16} color={COLORS.textSecondary} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Clips List */}
          <FlatList
            data={displayClips}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ClipItem clip={item} />}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Ionicons name="videocam-off-outline" size={48} color={COLORS.textSecondary} />
                <Text style={[TYPOGRAPHY.BodyL, { color: COLORS.textSecondary, marginTop: SPACING.s16 }]}>
                  No clips found.
                </Text>
              </View>
            }
          />
        </View>
      </View>

      {/* Filter Dropdown Action Sheet (Modal) */}
      <Modal
        visible={filterDropdownVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setFilterDropdownVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setFilterDropdownVisible(false)}
        >
          <View style={[styles.actionSheet, { backgroundColor: COLORS.backgroundNeutral }]}>
            <Text style={[TYPOGRAPHY.HeadlineM, { color: COLORS.textPrimary, marginBottom: SPACING.s16, textAlign: 'center' }]}>
              Filter Clips
            </Text>
            {filters.map(f => {
              const isActive = activeFilter === f;
              return (
                <TouchableOpacity
                  key={f}
                  style={[
                    styles.actionSheetItem,
                    { borderBottomColor: COLORS.borderDark },
                    isActive && { backgroundColor: COLORS.primaryLight }
                  ]}
                  onPress={() => {
                    setActiveFilter(f);
                    setFilterDropdownVisible(false);
                  }}
                >
                  <Text style={[TYPOGRAPHY.BodyL, { color: isActive ? COLORS.primary : COLORS.textPrimary, fontWeight: isActive ? '700' : '400' }]}>
                    {f}
                  </Text>
                  {isActive && <Ionicons name="checkmark" size={24} color={COLORS.primary} />}
                </TouchableOpacity>
              )
            })}
          </View>
        </Pressable>
      </Modal>

    </SafeAreaView>
  );
};

const createStyles = (COLORS: any) => StyleSheet.create({
  proseCard: {
    marginHorizontal: SPACING.s8,
    marginTop: SPACING.s12,
    marginBottom: SPACING.s4,
  },
  listCard: {
    flex: 1,
    marginHorizontal: SPACING.s8,
    paddingTop: SPACING.s16,
    paddingHorizontal: SPACING.s8,
    marginBottom: SPACING.s16,
  },
  proseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.s8,
  },
  metricsGrid: {
    marginVertical: SPACING.s8,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  listHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.s16,
    paddingHorizontal: SPACING.s4,
  },
  syncButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.s12,
    paddingVertical: SPACING.s8,
    borderRadius: RADIUS.full,
    marginRight: SPACING.s12,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.s12,
    paddingVertical: SPACING.s8,
    borderWidth: 1,
    borderRadius: RADIUS.default,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  actionSheet: {
    borderTopLeftRadius: RADIUS.large,
    borderTopRightRadius: RADIUS.large,
    padding: SPACING.s24,
    paddingBottom: SPACING.s40,
  },
  actionSheetItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.s16,
    paddingHorizontal: SPACING.s8,
    borderBottomWidth: 1,
    borderRadius: RADIUS.default,
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