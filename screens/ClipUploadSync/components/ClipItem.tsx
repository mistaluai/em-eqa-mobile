import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Modal, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { withObservables } from '@nozbe/watermelondb/react';
import { useVideoPlayer, VideoView } from 'expo-video';
import AppCard from '../../../components/AppCard';
import Clip from '../../../services/databases/watermelondb/models/Clips';
import { useGlobalStyles, SPACING, TYPOGRAPHY, RADIUS } from '@/theme';

const PLACEHOLDER_VIDEO_URL = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

interface ClipItemProps {
  clip: Clip;
}

const ClipItemComponent: React.FC<ClipItemProps> = ({ clip }) => {
  const { CARD, COLORS, SCREEN } = useGlobalStyles();
  const [modalVisible, setModalVisible] = useState(false);

  // Initialize placeholder video player
  const player = useVideoPlayer(PLACEHOLDER_VIDEO_URL, player => {
    player.loop = true;
  });

  // Helper to format date
  const formattedDate = React.useMemo(() => {
    if (!clip.recordedAt) return 'Unknown Date';
    return new Intl.DateTimeFormat('default', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(clip.recordedAt);
  }, [clip.recordedAt]);

  // Determine pill styles and icon based on statuses
  let mainPillColor = COLORS.borderDark;
  let mainPillText = 'Unknown';
  let mainIcon = 'help-circle';
  let mainIconColor = COLORS.textSecondary;

  /*
   * State Mapping:
   * 1. Unprocessed: clip is new and hasn't had inferences run yet
   * 2. Dismissed: clip inference finished but determined not to be relevant
   * 3. Pending Sync: clip is recorded but hasn't synced yet
   * 4. Synced: clip is recorded AND synced to Supabase
   */

  if (clip.remoteSyncStatus === 'synced') {
    mainPillColor = COLORS.primaryLight;
    mainPillText = 'Synced';
    mainIcon = 'cloud-done';
    mainIconColor = COLORS.primary;
  } else if (clip.recordingStatus === 'unprocessed') {
    mainPillColor = 'rgba(239, 68, 68, 0.15)'; // Using warning/red with opacity 
    mainPillText = 'Unprocessed';
    mainIcon = 'pulse';
    mainIconColor = COLORS.warning;
  } else if (clip.recordingStatus === 'dismissed') {
    mainPillColor = COLORS.backgroundNeutral;
    mainPillText = 'Dismissed';
    mainIcon = 'trash-bin';
    mainIconColor = COLORS.textSecondary;
  } else if (clip.recordingStatus === 'recorded' && clip.remoteSyncStatus === 'unsynced') {
    mainPillColor = 'rgba(223, 151, 17, 0.15)'; // Using secondary (desertSand) with opacity
    mainPillText = 'Pending Sync';
    mainIcon = 'cloud-upload';
    mainIconColor = COLORS.secondary;
  }

  return (
    <>
      <Pressable onPress={() => setModalVisible(true)}>
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
              <Text style={[TYPOGRAPHY.Caption, { color: COLORS.textSecondary, marginTop: 2 }]}>
                {formattedDate}
              </Text>
            </View>

            {/* Status Badge */}
            <View style={[styles.pill, { backgroundColor: mainPillColor }]}>
              <Ionicons name={mainIcon as any} size={14} color={mainIconColor} style={styles.pillIcon} />
              <Text style={[TYPOGRAPHY.Caption, { color: mainIconColor, fontWeight: '700', fontSize: 10 }]}>
                {mainPillText.toUpperCase()}
              </Text>
            </View>

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
  }
});

// Reactively bind to this exact clip
export const ClipItem = withObservables(['clip'], ({ clip }: { clip: Clip }) => ({
  clip,
}))(ClipItemComponent);