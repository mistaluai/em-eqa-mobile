import { RADIUS, SPACING, TYPOGRAPHY } from '@/theme';
import { COLORS } from '@/theme/colors';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import AppButton from '../../../components/AppButton';
import AppCard from '../../../components/AppCard';
import AppModal from '../../../components/ModalComponent';

const { width } = Dimensions.get('window');

interface EvidenceModalProps {
  isVisible: boolean;
  onClose: () => void;
  onGoToEventDetails?: () => void;
}

export const EvidenceModal: React.FC<EvidenceModalProps> = ({ isVisible, onClose, onGoToEventDetails }) => (
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
      Evidence Clip
    </Text>

    <View style={styles.videoPlaceholder}>
      <Ionicons name="play-circle-outline" size={80} color={COLORS.textSecondary} />
    </View>

    <AppCard style={styles.cardSpacer}>
      <Text style={[TYPOGRAPHY.HeadlineM, styles.summaryTitle]}>Summary</Text>
      <Text style={[TYPOGRAPHY.BodyM, styles.summaryText]}>
        Clip timestamp: 14:32 - 14:45. Confirmed commitment to draft the pitch deck.
      </Text>
    </AppCard>

    <View style={styles.buttonSpacer} />
    <AppButton title="Go to Event Details" onPress={onGoToEventDetails || onClose} />
  </AppModal>
);

const styles = StyleSheet.create({
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