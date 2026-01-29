import { RADIUS, SHADOW, SPACING } from '@/src/theme';
import { COLORS } from '@/src/theme/colors';
import React from 'react';
import { Dimensions, Modal, Pressable, StyleSheet, View, ViewStyle } from 'react-native';

const { width } = Dimensions.get('window');

interface AppModalProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  modalWidth?: number;
  // New prop to switch between Center (Popup) and Left (Drawer)
  position?: 'center' | 'left';
}

const AppModal: React.FC<AppModalProps> = ({
  isVisible,
  onClose,
  children,
  modalWidth = width * 0.85,
  position = 'left', // Defaulting to 'left' so your Drawer keeps working
}: AppModalProps) => {

  // 1. Determine Alignment Styles
  const alignmentStyle: ViewStyle = position === 'center'
    ? { justifyContent: 'center', alignItems: 'center' }
    : { justifyContent: 'flex-start', alignItems: 'flex-start' };

  // 2. Determine Shape Styles (Drawer needs full height, Modal needs rounded corners)
  const contentShapeStyle: ViewStyle = position === 'center'
    ? {
      height: 'auto',
      borderRadius: RADIUS.large,
      maxHeight: '90%'
    }
    : {
      height: '100%',
      borderRadius: 0,
      borderTopRightRadius: RADIUS.large,
      borderBottomRightRadius: RADIUS.large
    };

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      // Use 'fade' for center popups, 'slide' feels better for side drawers (optional)
      animationType={position === 'center' ? 'fade' : 'fade'}
      onRequestClose={onClose}
    >
      <Pressable
        style={[styles.backdrop, alignmentStyle]}
        onPress={onClose}
      >
        <Pressable
          onPress={(e) => e.stopPropagation()}
          style={[
            styles.modalContent,
            contentShapeStyle,
            { width: modalWidth }
          ]}
        >
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: COLORS.backgroundLight,
    ...SHADOW.default,
    overflow: 'hidden',
  },
  modalBody: {
    padding: SPACING.s24,
  },
});

export default AppModal;