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
        <Ionicons name="close-circle-outline" size={32} color={COLORS.softGray} />
      </Pressable>
    </View>

    <Text style={[TYPOGRAPHY.HeadlineM, { color: COLORS.white, marginBottom: SPACING.s16, textAlign: 'center' }]}>
      Evidence Clip
    </Text>

    <View style={styles.videoPlaceholder}>
      <Ionicons name="play-circle-outline" size={80} color={COLORS.softGray} />
    </View>

    <AppCard style={{ marginTop: SPACING.s16 }}>
      <Text style={[TYPOGRAPHY.HeadlineM, { color: COLORS.white, marginBottom: SPACING.s8 }]}>Summary</Text>
      <Text style={[TYPOGRAPHY.BodyM, { color: COLORS.softGray }]}>
        Clip timestamp: 14:32 - 14:45. Confirmed commitment to draft the pitch deck.
      </Text>
    </AppCard>

    <View style={{ height: SPACING.s24 }} />
    <AppButton title="Go to Event Details" onPress={onGoToEventDetails || onClose} />
  </AppModal>
);

const styles = StyleSheet.create({
  videoPlaceholder: {
    backgroundColor: COLORS.gray700,
    borderRadius: RADIUS.default,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.s16,
  },
});

