import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppButton from '../components/AppButton';
import AppCard from '../components/AppCard';
import AppHeader from '../components/HeaderComponent';
import { COLORS } from '../theme/colors';
import { RADIUS, SHADOW, SPACING, TYPOGRAPHY } from '../theme/styles';

const { width } = Dimensions.get('window');

interface UploadStatus {
  completed: number;
  pending: number;
  failed: number;
}

interface Clip {
  name: string;
  progress: number; // 0 to 100
  status: 'completed' | 'uploading' | 'pending' | 'failed';
}

const mockClips: Clip[] = [
  { name: 'Meeting_20241205_1430', progress: 100, status: 'completed' },
  { name: 'Lunch_20241205_1300', progress: 75, status: 'uploading' },
  { name: 'Draft_Pitch_Deck_1015', progress: 0, status: 'pending' },
  { name: 'Morning_Checkin_0900', progress: 0, status: 'failed' },
];

const ProgressCard: React.FC<{ iconName: string, title: string, count: number, color: string }> = ({ iconName, title, count, color }) => (
  <View style={[styles.miniCard, { backgroundColor: `${COLORS.lightLavender}33` }]}>
    <Ionicons name={iconName as any} size={24} color={color} />
    <Text style={[TYPOGRAPHY.HeadlineM, { color: COLORS.white, marginTop: SPACING.s8 }]}>{count}</Text>
    <Text style={[TYPOGRAPHY.Caption, { color: COLORS.softGray }]}>{title}</Text>
  </View>
);

const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => (
  <View style={styles.progressBarTrack}>
    <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
  </View>
);

const ClipItem: React.FC<{ clip: Clip, onAction: () => void }> = ({ clip, onAction }) => (
  <AppCard style={styles.clipCard}>
    <View style={styles.clipRow}>
      <Text style={[TYPOGRAPHY.BodyM, { color: clip.status === 'failed' ? COLORS.desertSand : COLORS.white, flex: 1 }]} numberOfLines={1}>
        {clip.name}
      </Text>
      {clip.status === 'completed' && (
        <Text style={[TYPOGRAPHY.Caption, { color: COLORS.ultraViolet, fontWeight: '700' }]}>100%</Text>
      )}
      {clip.status === 'uploading' && (
        <Text style={[TYPOGRAPHY.Caption, { color: COLORS.ultraViolet, fontWeight: '700' }]}>{clip.progress}%</Text>
      )}
      {clip.status === 'pending' && (
        <Ionicons name="sync-circle-outline" size={24} color={COLORS.softGray} />
      )}
      {clip.status === 'failed' && (
        <Pressable onPress={onAction}>
          <Ionicons name="reload-circle-outline" size={24} color={COLORS.desertSand} />
        </Pressable>
      )}
    </View>
    {(clip.status === 'uploading' || clip.status === 'pending') && (
      <ProgressBar progress={clip.progress} />
    )}
    {clip.status === 'completed' && (
      <Pressable onPress={onAction}>
        <Text style={[TYPOGRAPHY.Caption, { color: COLORS.desertSand, marginTop: SPACING.s8, alignSelf: 'flex-end' }]}>
          Clear Completed
        </Text>
      </Pressable>
    )}
    {clip.status === 'failed' && (
        <Text style={[TYPOGRAPHY.Caption, { color: COLORS.desertSand, marginTop: SPACING.s4 }]}>Error: Connection Lost</Text>
    )}
  </AppCard>
);

const ClipUploadSyncScreen: React.FC = () => {
  const navigation = useNavigation();
  const [clips, setClips] = useState(mockClips);

  const status: UploadStatus = {
    completed: clips.filter(c => c.status === 'completed').length,
    pending: clips.filter(c => c.status === 'pending').length,
    failed: clips.filter(c => c.status === 'failed').length,
  };

  const completedClips = clips.filter(c => c.status === 'completed');
  const uploadingClips = clips.filter(c => c.status === 'uploading');
  const pendingClips = clips.filter(c => c.status === 'pending');
  const failedClips = clips.filter(c => c.status === 'failed');

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader
        title="Clip Upload & Sync"
        showBack={true}
        rightIconName="menu-outline"
        onRightIconPress={() => console.log('Open Menu')}
      />

      <ScrollView contentContainerStyle={styles.container}>
        {/* 1. Dashboard Row */}
        <View style={styles.dashboard}>
          <ProgressCard iconName="checkmark-circle-outline" title="Completed" count={status.completed} color={COLORS.ultraViolet} />
          <ProgressCard iconName="time-outline" title="Pending" count={status.pending} color={COLORS.softGray} />
          <ProgressCard iconName="close-circle-outline" title="Failed" count={status.failed} color={COLORS.desertSand} />
        </View>

        {/* 2. Upload Completed */}
        <Text style={[TYPOGRAPHY.HeadlineM, styles.sectionTitle]}>Upload Completed</Text>
        {completedClips.map((clip, index) => (
          <ClipItem key={index} clip={clip} onAction={() => setClips(clips.filter(c => c.name !== clip.name))} />
        ))}
        {completedClips.length > 0 && (
          <Pressable onPress={() => setClips(clips.filter(c => c.status !== 'completed'))}>
            <Text style={[TYPOGRAPHY.Caption, styles.retryAll]}>Clear All Completed</Text>
          </Pressable>
        )}

        {/* 3. Uploading Now */}
        <Text style={[TYPOGRAPHY.HeadlineM, styles.sectionTitle]}>Uploading Now</Text>
        {uploadingClips.map((clip, index) => (
          <ClipItem key={index} clip={clip} onAction={() => {}} />
        ))}
        {uploadingClips.length > 0 && (
          <AppButton
            title="Pause All Uploads"
            onPress={() => console.log('Pause')}
            variant="secondary"
            style={{ marginTop: SPACING.s12 }}
          />
        )}

        {/* 4. Pending Uploads */}
        <Text style={[TYPOGRAPHY.HeadlineM, styles.sectionTitle]}>Pending Uploads</Text>
        {pendingClips.map((clip, index) => (
          <ClipItem key={index} clip={clip} onAction={() => {}} />
        ))}

        {/* 5. Failed Uploads */}
        <Text style={[TYPOGRAPHY.HeadlineM, styles.sectionTitle, { color: COLORS.desertSand }]}>Failed Uploads</Text>
        {failedClips.map((clip, index) => (
          <ClipItem key={index} clip={clip} onAction={() => console.log('Retry clip')} />
        ))}
        {failedClips.length > 0 && (
          <Pressable onPress={() => console.log('Retry All')}>
            <Text style={[TYPOGRAPHY.Caption, styles.retryAll]}>Retry All Failed Uploads</Text>
          </Pressable>
        )}

        <View style={{ height: SPACING.s32 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.carbonBlack,
  },
  container: {
    padding: SPACING.s24,
  },
  dashboard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.s32,
    gap: SPACING.s16,
  },
  miniCard: {
    flex: 1,
    padding: SPACING.s16,
    borderRadius: RADIUS.default,
    alignItems: 'center',
    ...SHADOW.default,
  },
  sectionTitle: {
    color: COLORS.white,
    marginBottom: SPACING.s12,
    marginTop: SPACING.s16,
    fontWeight: '700',
  },
  clipCard: {
    backgroundColor: COLORS.gray700,
    marginBottom: SPACING.s12,
    padding: SPACING.s16,
    borderRadius: RADIUS.large,
  },
  clipRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressBarTrack: {
    height: SPACING.s8,
    backgroundColor: `${COLORS.lightLavender}30`,
    borderRadius: RADIUS.large,
    marginTop: SPACING.s8,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: COLORS.ultraViolet,
    borderRadius: RADIUS.large,
  },
  retryAll: {
    color: COLORS.desertSand,
    textDecorationLine: 'underline',
    textAlign: 'right',
    marginTop: SPACING.s8,
    fontWeight: '600',
  }
});

export default ClipUploadSyncScreen;