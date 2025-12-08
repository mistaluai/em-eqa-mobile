// DeletionConfirmationModal.tsx
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import AppButton from '../../../components/AppButton';
import AppModal from '../../../components/ModalComponent';
import { COLORS } from '../../../theme/colors';
import { DeletionConfirmationModalStyles } from '../../../theme/styles/DataPrivacyControlScreen/DeletionConfirmationModalStyle';
import { TYPOGRAPHY } from '../../../theme';

interface DeletionConfirmationModalProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeletionConfirmationModal: React.FC<DeletionConfirmationModalProps> = ({
  isVisible,
  onClose,
  onConfirm,
}) => (
  <AppModal isVisible={isVisible} onClose={onClose} position='center'>
    <View style={DeletionConfirmationModalStyles.container}>
      <Ionicons name="warning-outline" size={50} color={COLORS.warning} style={DeletionConfirmationModalStyles.iconMargin} />
      <Text style={[TYPOGRAPHY.HeadlineM, DeletionConfirmationModalStyles.title]}>
        Confirm Deletion
      </Text>
      <Text style={[TYPOGRAPHY.BodyM, DeletionConfirmationModalStyles.bodyText]}>
        Are you sure you want to delete ALL your recorded data? This cannot be undone.
      </Text>
      <AppButton
        title="Delete Forever"
        onPress={onConfirm}
        variant="primary"
        style={DeletionConfirmationModalStyles.deleteButton}
      />
      <AppButton
        title="Cancel"
        onPress={onClose}
        variant="secondary"
        style={[DeletionConfirmationModalStyles.cancelButton, { borderColor: COLORS.primary }]}
      />
    </View>
  </AppModal>
);