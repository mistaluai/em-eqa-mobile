import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Dimensions, Pressable, Text, View } from 'react-native';
import AppButton from '../../../components/AppButton';
import AppCard from '../../../components/AppCard';
import AppModal from '../../../components/ModalComponent';
import { COLORS } from '../../../theme/colors';
import { EvidenceModalStyles } from '../../../theme/styles/HomeScreen/EvidenceModalStyle';
import { TYPOGRAPHY } from '../../../theme';

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
    <View style={EvidenceModalStyles.headerContainer}>
      <Pressable onPress={onClose} hitSlop={10}>
        <Ionicons name="close-circle-outline" size={32} color={COLORS.textSecondary} />
      </Pressable>
    </View>

    <Text style={[TYPOGRAPHY.HeadlineM, EvidenceModalStyles.title]}>
      Evidence Clip
    </Text>

    <View style={EvidenceModalStyles.videoPlaceholder}>
      <Ionicons name="play-circle-outline" size={80} color={COLORS.textSecondary} />
    </View>

    <AppCard style={EvidenceModalStyles.cardSpacer}>
      <Text style={[TYPOGRAPHY.HeadlineM, EvidenceModalStyles.summaryTitle]}>Summary</Text>
      <Text style={[TYPOGRAPHY.BodyM, EvidenceModalStyles.summaryText]}>
        Clip timestamp: 14:32 - 14:45. Confirmed commitment to draft the pitch deck.
      </Text>
    </AppCard>

    <View style={EvidenceModalStyles.buttonSpacer} />
    <AppButton title="Go to Event Details" onPress={onGoToEventDetails || onClose} />
  </AppModal>
);