import { Ionicons } from '@expo/vector-icons';
import { withObservables } from '@nozbe/watermelondb/react';
import { Directory, File, Paths } from 'expo-file-system';
import { useVideoPlayer, VideoView } from 'expo-video';
import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from 'react-native-reanimated';

import { RADIUS, SPACING, TYPOGRAPHY, useGlobalStyles } from '@/theme';
import AppCard from '../../../components/AppCard';
import Clip from '../../../services/databases/watermelondb/models/Clips';

// A tiny helper for relative time "time-ago" without external deps
const timeSince = (date: Date) => {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " mins ago";
  return "Just now";
};

interface ClipItemProps {
  clip: Clip;
}

const ClipItemComponent: React.FC<ClipItemProps> = ({ clip }) => {
  const { CARD, COLORS, SCREEN } = useGlobalStyles();
  const [modalVisible, setModalVisible] = useState(false);

  // 1. RECONSTRUCT THE LOCAL PATH
  const clipDir = new Directory(Paths.cache, 'clips', clip.clipId);
  const videoFile = new File(clipDir, 'clip.mp4');

  // 2. PASS THE LOCAL URI TO THE PLAYER
  const player = useVideoPlayer(videoFile.uri, player => {
    player.loop = true;
  });

  // Relative Time Memo
  const timeAgo = React.useMemo(() => {
    if (!clip.recordedAt) return 'Unknown Date';
    return timeSince(clip.recordedAt);
  }, [clip.recordedAt]);

  // Pulse animation for Processing state
  const pulseScale = useSharedValue(1);
  const pulseOpacity = useSharedValue(1);

  React.useEffect(() => {
    if (clip.recordingStatus === 'unprocessed') {
      pulseScale.value = withRepeat(
        withSequence(withTiming(1.05, { duration: 800, easing: Easing.inOut(Easing.ease) }), withTiming(1, { duration: 800, easing: Easing.inOut(Easing.ease) })),
        -1 // loop infinitely
      );
      pulseOpacity.value = withRepeat(
        withSequence(withTiming(0.6, { duration: 800 }), withTiming(1, { duration: 800 })),
        -1
      );
    } else {
      pulseScale.value = 1;
      pulseOpacity.value = 1;
    }
  }, [clip.recordingStatus]);

  const animatedPillStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: pulseScale.value }],
      opacity: pulseOpacity.value,
    };
  });

  // Determine pill styles and icon based on statuses
  let mainPillColor = COLORS.borderDark;
  let mainPillText = 'Unknown';
  let mainIcon = 'help-circle';
  let mainIconColor = COLORS.textSecondary;

  const isPendingSync = clip.recordingStatus === 'recorded' && clip.remoteSyncStatus === 'unsynced';

  if (clip.remoteSyncStatus === 'synced') {
    mainPillColor = COLORS.primaryLight;
    mainPillText = 'Synced';
    mainIcon = 'cloud-done';
    mainIconColor = COLORS.primary;
  } else if (clip.recordingStatus === 'unprocessed') {
    mainPillColor = 'rgba(16, 185, 129, 0.15)';
    mainPillText = 'AI Filtering';
    mainIcon = 'cog';
    mainIconColor = COLORS.warning;
  } else if (clip.recordingStatus === 'dismissed') {
    mainPillColor = COLORS.backgroundNeutral;
    mainPillText = 'Dismissed';
    mainIcon = 'trash-bin';
    mainIconColor = COLORS.textSecondary;
  } else if (isPendingSync) {
    mainPillColor = 'rgba(223, 151, 17, 0.15)';
    mainPillText = 'Ready to Upload';
    mainIcon = 'cloud-upload';
    mainIconColor = COLORS.secondary;
  }

  const isFiltered = clip.recordingStatus !== 'unprocessed';
  const isSyncedCompleted = clip.remoteSyncStatus === 'synced';

  return (
    <>
      <Pressable onPress={() => {
        // Automatically start playing when the modal opens
        setModalVisible(true);
        player.play();
      }}>
        <AppCard style={CARD.clip}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>

            {/* Placeholder Thumbnail */}
            <View style={[styles.thumbnailPlaceholder, { backgroundColor: COLORS.backgroundLight }]}>
              <Ionicons name="videocam-outline" size={24} color={COLORS.textSecondary} />
            </View>

            {/* Content Section */}
            <View style={styles.contentContainer}>
              <Text
                style={[TYPOGRAPHY.BodyM, { color: COLORS.textPrimary, fontWeight: '600' }]}
                numberOfLines={1}
                ellipsizeMode="middle"
              >
                {clip.clipId}
              </Text>
              <View style={styles.metaRow}>
                <Text style={[TYPOGRAPHY.Caption, { color: COLORS.textSecondary }]}>
                  {timeAgo}
                </Text>
                <View style={styles.metaDot} />
                <Text style={[TYPOGRAPHY.Caption, { color: COLORS.textSecondary }]}>
                  00:05
                </Text>
              </View>
            </View>

            {/* Status Badge */}
            <Animated.View style={[styles.pill, { backgroundColor: mainPillColor }, animatedPillStyle]}>
              <Ionicons name={mainIcon as any} size={14} color={mainIconColor} style={styles.pillIcon} />
              <Text style={[TYPOGRAPHY.Caption, { color: mainIconColor, fontWeight: '700', fontSize: 10 }]}>
                {mainPillText.toUpperCase()}
              </Text>
            </Animated.View>

          </View>
        </AppCard>
      </Pressable>

      <Modal
        visible={modalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => {
          player.pause();
          setModalVisible(false);
        }}
      >
        <View style={[styles.modalContainer, { backgroundColor: COLORS.backgroundLight }]}>
          <View style={styles.modalHeader}>
            <Text style={[TYPOGRAPHY.HeadlineM, { color: COLORS.textPrimary }]} numberOfLines={1}>
              {clip.clipId}
            </Text>
            <TouchableOpacity
              onPress={() => {
                player.pause();
                setModalVisible(false);
              }}
              style={styles.closeButton}
            >
              <Ionicons name="close" size={28} color={COLORS.textPrimary} />
            </TouchableOpacity>
          </View>

          <VideoView
            style={styles.videoPlayer}
            player={player}
            allowsFullscreen={true}
            allowsPictureInPicture={false}
            nativeControls={true}
          />

          {/* Modern Horizontal Lifecycle Stepper */}
          <View style={styles.modernTimelineContainer}>

            {/* Step 1: Record */}
            <View style={styles.modernStep}>
              <View style={[styles.modernIconWrap, { backgroundColor: COLORS.primary }]}>
                <Ionicons name="videocam" size={16} color="#FFF" />
              </View>
              <Text style={[TYPOGRAPHY.Caption, { color: COLORS.textPrimary, fontWeight: '700', marginTop: 8 }]}>Captured</Text>
            </View>

            {/* Line 1 -> 2 */}
            <View style={[styles.modernLine, { backgroundColor: isFiltered ? COLORS.primary : COLORS.borderDark }]} />

            {/* Step 2: AI Process */}
            <View style={styles.modernStep}>
              <View style={[styles.modernIconWrap, { backgroundColor: isFiltered ? (clip.recordingStatus === 'dismissed' ? COLORS.backgroundNeutral : COLORS.primary) : 'transparent', borderWidth: isFiltered ? 0 : 2, borderColor: COLORS.borderDark }]}>
                {clip.recordingStatus === 'unprocessed' ? (
                  <Animated.View style={animatedPillStyle}>
                    <Ionicons name="cog" size={16} color={COLORS.warning} />
                  </Animated.View>
                ) : clip.recordingStatus === 'dismissed' ? (
                  <Ionicons name="close" size={16} color={COLORS.textSecondary} />
                ) : (
                  <Ionicons name="medical" size={16} color="#FFF" />
                )}
              </View>
              <Text style={[TYPOGRAPHY.Caption, { color: isFiltered ? COLORS.textPrimary : COLORS.textSecondary, fontWeight: '700', marginTop: 8, textAlign: 'center' }]}>
                {clip.recordingStatus === 'dismissed' ? 'Ignored' : clip.recordingStatus === 'recorded' ? 'Analyzed' : 'Filtering'}
              </Text>
            </View>

            {/* Line 2 -> 3 (Only show if not dismissed) */}
            <View style={[styles.modernLine, { backgroundColor: isSyncedCompleted ? COLORS.primary : COLORS.borderDark, flex: clip.recordingStatus === 'dismissed' ? 0.2 : 1, opacity: clip.recordingStatus === 'dismissed' ? 0 : 1 }]} />

            {/* Step 3: Server Sync */}
            {clip.recordingStatus !== 'dismissed' && (
              <View style={styles.modernStep}>
                <View style={[styles.modernIconWrap, { backgroundColor: isSyncedCompleted ? COLORS.primary : 'transparent', borderWidth: isSyncedCompleted ? 0 : 2, borderColor: COLORS.borderDark }]}>
                  <Ionicons name="cloud-upload" size={16} color={isSyncedCompleted ? "#FFF" : COLORS.textSecondary} />
                </View>
                <Text style={[TYPOGRAPHY.Caption, { color: isSyncedCompleted ? COLORS.textPrimary : COLORS.textSecondary, fontWeight: '700', marginTop: 8 }]}>
                  {isSyncedCompleted ? 'Synced' : 'Pending'}
                </Text>
              </View>
            )}

          </View>

          {/* Context Note based on current state */}
          <View style={styles.stateContextBox}>
            <Text style={[TYPOGRAPHY.BodyM, { color: COLORS.textSecondary, textAlign: 'center' }]}>
              {clip.recordingStatus === 'unprocessed'
                ? "ExecuTorch is currently running top-k similarity checks."
                : clip.recordingStatus === 'dismissed'
                  ? "Clip was analyzed and determined to have no actionable semantic value. It was dismissed."
                  : isPendingSync
                    ? "Actionable trigger detected. Waiting for network connection to upload safely."
                    : "Available remotely on all connected devices."}
            </Text>
          </View>

        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  thumbnailPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: RADIUS.default,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.s12,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.s8,
    paddingVertical: SPACING.s4,
    borderRadius: RADIUS.full,
    marginLeft: SPACING.s8,
  },
  pillIcon: {
    marginRight: 4,
  },
  modalContainer: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.s16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  closeButton: {
    padding: SPACING.s8,
  },
  videoPlayer: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: '#000',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  metaDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#94A3B8', // slate400
    marginHorizontal: 6,
  },
  modernTimelineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.s32,
    paddingTop: SPACING.s40,
  },
  modernStep: {
    alignItems: 'center',
    width: 60,
  },
  modernIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modernLine: {
    flex: 1,
    height: 3,
    backgroundColor: '#1E293B',
    marginHorizontal: 8,
    borderRadius: 2,
    top: -12, // Align with the circles since text pushes the container down
  },
  stateContextBox: {
    paddingHorizontal: SPACING.s32,
    alignItems: 'center',
  }
});

// Reactively bind to this exact clip
export const ClipItem = withObservables(['clip'], ({ clip }: { clip: Clip }) => ({
  clip,
}))(ClipItemComponent);