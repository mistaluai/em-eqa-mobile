// DeletionConfirmationModal.tsx
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppButton from '../../../components/AppButton';
import AppModal from '../../../components/ModalComponent';
import { COLORS } from '../../../theme/colors';
import { SPACING, TYPOGRAPHY } from '../../../theme/styles';

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
    <View style={styles.container}>
      {/* Warning icon uses the accent/secondary color */}
      <Ionicons name="warning-outline" size={50} color={COLORS.warning} style={{ marginBottom: SPACING.s16 }} />
      {/* Headline text uses primary dark text */}
      <Text style={[TYPOGRAPHY.HeadlineM, { color: COLORS.textPrimary, marginBottom: SPACING.s8 }]}>
        Confirm Deletion
      </Text>
      {/* Body text uses secondary dark text */}
      <Text style={[TYPOGRAPHY.BodyM, { color: COLORS.textSecondary, textAlign: 'center', marginBottom: SPACING.s24 }]}>
        Are you sure you want to delete ALL your recorded data? This cannot be undone.
      </Text>
      <AppButton
        title="Delete Forever"
        onPress={onConfirm}
        // variant="danger" will use the internal secondary/danger color
        variant="primary"
        style={{ width: '100%', marginBottom: SPACING.s12 }}
      />
      <AppButton
        title="Cancel"
        onPress={onClose}
        variant="secondary"
        // Secondary button border uses a medium-dark neutral color
        style={{ width: '100%', borderColor: COLORS.primary }}
      />
    </View>
  </AppModal>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});