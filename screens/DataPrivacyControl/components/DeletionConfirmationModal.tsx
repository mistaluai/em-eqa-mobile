import { SPACING, TYPOGRAPHY } from '@/theme';
import { COLORS } from '@/theme/colors';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppButton from '../../../components/AppButton';
import AppModal from '../../../components/ModalComponent';

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
      <Ionicons
        name="warning-outline"
        size={50}
        color={COLORS.warning}
        style={styles.iconMargin}
      />
      <Text style={[TYPOGRAPHY.HeadlineM, styles.title]}>
        Confirm Deletion
      </Text>
      <Text style={[TYPOGRAPHY.BodyM, styles.bodyText]}>
        Are you sure you want to delete ALL your recorded data? This cannot be undone.
      </Text>
      <AppButton
        title="Delete Forever"
        onPress={onConfirm}
        variant="primary"
        style={styles.deleteButton}
      />
      <AppButton
        title="Cancel"
        onPress={onClose}
        variant="secondary"
        style={[styles.cancelButton, { borderColor: COLORS.primary }]}
      />
    </View>
  </AppModal>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  iconMargin: {
    marginBottom: SPACING.s16,
    // Note: In your Modal JSX, ensure the Icon color is set to COLORS.navPrivacy 
    // (Currently set to COLORS.warning in component)
  },
  title: {
    color: COLORS.navPrivacy, // Changed to Red to indicate Danger
    marginBottom: SPACING.s8,
    fontWeight: '700', // Added boldness for emphasis
  },
  bodyText: {
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.s24,
  },
  deleteButton: {
    width: '100%',
    marginBottom: SPACING.s12,
    backgroundColor: COLORS.navPrivacy, // Danger Red Background
    borderColor: COLORS.navPrivacy,
  },
  cancelButton: {
    width: '100%',
  },
});