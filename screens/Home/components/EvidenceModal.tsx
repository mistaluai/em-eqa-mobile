import { RADIUS, SPACING, TYPOGRAPHY } from '@/theme';
import { useThemeColor } from "@/theme/useThemeColor";
import { useThemeStyles } from "@/theme/useThemeStyles";
import { Ionicons } from '@expo/vector-icons';
import { useVideoPlayer, VideoView } from 'expo-video';
import React, { useEffect } from 'react';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import AppButton from '../../../components/AppButton';
import AppCard from '../../../components/AppCard';
import AppModal from '../../../components/ModalComponent';
import { EvidenceType } from '../../../shared/types/evidence';

const { width } = Dimensions.get('window');

interface EvidenceModalProps {
  isVisible: boolean;
  evidence: EvidenceType | null;
  onClose: () => void;
  onGoToEventDetails?: () => void;
}

export const EvidenceModal: React.FC<EvidenceModalProps> = ({ isVisible, evidence, onClose, onGoToEventDetails }) => {
  const styles = useThemeStyles(createStyles);
  const COLORS = useThemeColor();

  const player = useVideoPlayer(evidence?.video_url || null, (player) => {
    player.loop = true;
    player.muted = true;
    if (evidence) {
      player.play();
    }
  });

  // Manage playback state when modal visibility toggles
  useEffect(() => {
    if (isVisible && player && evidence) {
      player.play();
    } else if (!isVisible && player) {
      player.pause();
    }
  }, [isVisible, player, evidence]);

  // Don't render internal constraints if no evidence exists
  if (!evidence) {
    return (
      <AppModal isVisible={isVisible} onClose={onClose} modalWidth={width * 0.95} position="center">
        <View />
      </AppModal>
    );
  }

  return (
    <AppModal
      isVisible={isVisible}
      onClose={onClose}
      modalWidth={width * 0.95}
      position="center"
    >
      <View style={styles.headerContainer}>
        <Pressable onPress={onClose} hitSlop={10}>
          <Ionicons name="close-circle-outline" size={32} color={COLORS.textSecondary} />
        </Pressable>
      </View>
      <Text style={[TYPOGRAPHY.HeadlineM, styles.title]}>
        {evidence.title || 'Evidence Clip'}
      </Text>
      <View style={styles.videoPlaceholder}>
        <VideoView
          player={player}
          style={styles.absoluteVideo}
          allowsFullscreen
          allowsPictureInPicture
        />
      </View>
      <AppCard style={styles.cardSpacer}>
        <Text style={[TYPOGRAPHY.HeadlineM, styles.summaryTitle]}>Summary</Text>
        <Text style={[TYPOGRAPHY.BodyM, styles.summaryText]}>
          {evidence.summary}
        </Text>
      </AppCard>
      <View style={styles.buttonSpacer} />
      <AppButton title="Go to Event Details" onPress={onGoToEventDetails || onClose} />
    </AppModal>
  );
};

const createStyles = (COLORS: any) => StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  title: {
    color: COLORS.textPrimary,
    marginBottom: SPACING.s16,
    textAlign: 'center',
  },
  videoPlaceholder: {
    backgroundColor: COLORS.backgroundNeutral,
    borderRadius: RADIUS.default,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.s16,
    overflow: 'hidden',
  },
  absoluteVideo: {
    ...StyleSheet.absoluteFillObject,
  },
  summaryTitle: {
    color: COLORS.textPrimary,
    marginBottom: SPACING.s8,
  },
  summaryText: {
    color: COLORS.textSecondary,
  },
  cardSpacer: {
    marginTop: SPACING.s16,
  },
  buttonSpacer: {
    height: SPACING.s24,
  },
});