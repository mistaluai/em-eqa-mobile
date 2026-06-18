import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThemeStyles } from '@/theme/useThemeStyles';
import { useThemeColor } from '@/theme/useThemeColor';
import { RADIUS, SHADOW, SPACING, TYPOGRAPHY } from '@/theme';
import AppHeader from '@/components/HeaderComponent';
import { PiNetworkService } from '@/services/hardware/http/piNetworkService';
import { Ionicons } from '@expo/vector-icons';

interface Segment {
  id: number;
  segment_name: string;
  file_path: string;
  session_dir: string;
  duration_ms: number;
  created_at: string;
  synced: boolean;
}

const PiStorageScreen: React.FC = () => {
  const styles = useThemeStyles(createStyles);
  const COLORS = useThemeColor();
  const [segments, setSegments] = useState<Segment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSegments();
  }, []);

  const fetchSegments = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await PiNetworkService.listSegments(0, 100);
      if (res.status === 'success' && res.data) {
        setSegments(res.data);
      } else {
        setError(res.message || 'Failed to fetch segments');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDuration = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const renderItem = ({ item }: { item: Segment }) => {
    return (
      <View style={styles.card}>
        <View style={styles.iconBox}>
          <Ionicons name="videocam-outline" size={24} color={COLORS.primary} />
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.segmentName}>{item.segment_name}</Text>
          <Text style={styles.metaText}>{formatDate(item.created_at)}</Text>
          <View style={styles.pillRow}>
            <View style={styles.pill}>
              <Ionicons name="time-outline" size={14} color={COLORS.textSecondary} />
              <Text style={styles.pillText}>{formatDuration(item.duration_ms)}</Text>
            </View>
            <View style={[styles.pill, item.synced ? styles.pillSynced : styles.pillUnsynced]}>
              <Ionicons name={item.synced ? "cloud-done" : "cloud-offline"} size={14} color={item.synced ? COLORS.components.navigation.status : COLORS.components.navigation.privacy} />
              <Text style={[styles.pillText, { color: item.synced ? COLORS.components.navigation.status : COLORS.components.navigation.privacy }]}>
                {item.synced ? 'Synced' : 'Local Only'}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader title="Pi Storage" showBack={true} />
      
      {isLoading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : error ? (
        <View style={styles.centerContainer}>
          <Ionicons name="alert-circle-outline" size={48} color={COLORS.components.navigation.privacy} />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <FlatList
          data={segments}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          renderItem={renderItem}
          ListHeaderComponent={() => (
            <Text style={[TYPOGRAPHY.HeadlineM, styles.listHeader]}>
              Total Stored: {segments.length} Videos
            </Text>
          )}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Ionicons name="videocam-off-outline" size={48} color={COLORS.textSecondary} />
              <Text style={styles.emptyText}>No videos stored on the Pi</Text>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

const createStyles = (COLORS: any) => StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: SPACING.s24,
    paddingBottom: SPACING.s64,
  },
  listHeader: {
    color: COLORS.textPrimary,
    marginBottom: SPACING.s16,
    fontWeight: '700',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.backgroundLight,
    borderRadius: RADIUS.large,
    padding: SPACING.s16,
    marginBottom: SPACING.s16,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    ...SHADOW.medium,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.05,
    alignItems: 'center',
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.large,
    backgroundColor: `${COLORS.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.s16,
  },
  infoBox: {
    flex: 1,
  },
  segmentName: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  metaText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: SPACING.s8,
  },
  pillRow: {
    flexDirection: 'row',
    gap: SPACING.s8,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundNeutral,
    paddingHorizontal: SPACING.s8,
    paddingVertical: SPACING.s4,
    borderRadius: RADIUS.full,
    gap: SPACING.s4,
  },
  pillSynced: {
    backgroundColor: `${COLORS.components.navigation.status}10`,
  },
  pillUnsynced: {
    backgroundColor: `${COLORS.components.navigation.privacy}10`,
  },
  pillText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  errorText: {
    marginTop: SPACING.s16,
    color: COLORS.textSecondary,
    fontSize: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: SPACING.s64,
  },
  emptyText: {
    marginTop: SPACING.s16,
    color: COLORS.textSecondary,
    fontSize: 16,
  }
});

export default PiStorageScreen;
