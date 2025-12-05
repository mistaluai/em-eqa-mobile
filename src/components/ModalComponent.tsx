import React from 'react';
import { Dimensions, Modal, Pressable, StyleSheet, View } from 'react-native';
import { COLORS } from '../theme/colors';
import { RADIUS, SHADOW, SPACING } from '../theme/styles';

const { width } = Dimensions.get('window');

interface AppModalProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  modalWidth?: number;
}

const AppModal: React.FC<AppModalProps> = ({
  isVisible,
  onClose,
  children,
  modalWidth = width * 0.85,
}: AppModalProps) => {
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable onPress={(e) => e.stopPropagation()} style={[styles.modalContent, { width: modalWidth }]}>
          <View style={styles.modalBody}>
            {children}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Blur backdrop effect
    // justifyContent: 'center',
    // alignItems: 'center',
    justifyContent: 'flex-start',   // ← align to top
    alignItems: 'flex-start',
  },
  modalContent: {
    backgroundColor: COLORS.carbonBlack,
    borderRadius: RADIUS.large,
    ...SHADOW.default,
    maxHeight: '90%',
  },
  modalBody: {
    padding: SPACING.s24,
  },
});

export default AppModal;