import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import AppButton from '../../../components/AppButton';
import AppCard from '../../../components/AppCard';
import AppModal from '../../../components/ModalComponent';
import { COLORS } from '../../../theme/colors';
import { RADIUS, SPACING, TYPOGRAPHY } from '../../../theme/styles';

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
    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
      <Pressable onPress={onClose} hitSlop={10}>
        {/* UI CHANGE: Close icon color from softGray to textSecondary */}
        <Ionicons name="close-circle-outline" size={32} color={COLORS.textSecondary} />
      </Pressable>
    </View>

    {/* UI CHANGE: Headline color from white to textPrimary */}
    <Text style={[TYPOGRAPHY.HeadlineM, { color: COLORS.textPrimary, marginBottom: SPACING.s16, textAlign: 'center' }]}>
      Evidence Clip
    </Text>

    <View style={styles.videoPlaceholder}>
      {/* UI CHANGE: Video placeholder icon color from softGray to textSecondary */}
      <Ionicons name="play-circle-outline" size={80} color={COLORS.textSecondary} />
    </View>

    <AppCard style={{ marginTop: SPACING.s16 }}>
      {/* UI CHANGE: Summary Headline color from white to textPrimary */}
      <Text style={[TYPOGRAPHY.HeadlineM, { color: COLORS.textPrimary, marginBottom: SPACING.s8 }]}>Summary</Text>
      {/* UI CHANGE: Summary Body text color from softGray to textSecondary */}
      <Text style={[TYPOGRAPHY.BodyM, { color: COLORS.textSecondary }]}>
        Clip timestamp: 14:32 - 14:45. Confirmed commitment to draft the pitch deck.
      </Text>
    </AppCard>

    <View style={{ height: SPACING.s24 }} />
    <AppButton title="Go to Event Details" onPress={onGoToEventDetails || onClose} />
  </AppModal>
);

const styles = StyleSheet.create({
  videoPlaceholder: {
    // UI CHANGE: Placeholder background from gray700 to backgroundNeutral
    backgroundColor: COLORS.backgroundNeutral,
    borderRadius: RADIUS.default,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.s16,
  },
});