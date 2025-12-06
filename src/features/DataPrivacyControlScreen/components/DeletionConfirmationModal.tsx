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
      <Ionicons name="warning-outline" size={50} color={COLORS.desertSand} style={{ marginBottom: SPACING.s16 }} />
      <Text style={[TYPOGRAPHY.HeadlineM, { color: COLORS.white, marginBottom: SPACING.s8 }]}>
        Confirm Deletion
      </Text>
      <Text style={[TYPOGRAPHY.BodyM, { color: COLORS.softGray, textAlign: 'center', marginBottom: SPACING.s24 }]}>
        Are you sure you want to delete ALL your recorded data? This cannot be undone.
      </Text>
      <AppButton
        title="Delete Forever"
        onPress={onConfirm}
        variant="danger"
        style={{ width: '100%', marginBottom: SPACING.s12 }}
      />
      <AppButton
        title="Cancel"
        onPress={onClose}
        variant="secondary"
        style={{ width: '100%', borderColor: COLORS.gray700 }}
      />
    </View>
  </AppModal>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});

