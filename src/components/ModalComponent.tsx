import React from 'react';
import { Dimensions, Modal, Pressable, StyleSheet, View, ViewStyle } from 'react-native';
import { COLORS } from '../theme/colors';
import { RADIUS, SHADOW, SPACING } from '../theme/styles';

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
      borderRadius: 0, // Drawers usually don't have rounded corners on the spine
      borderTopRightRadius: RADIUS.large, // Optional styling for drawer
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
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    // Flex properties are now handled dynamically via 'alignmentStyle'
  },
  modalContent: {
    backgroundColor: COLORS.carbonBlack,
    ...SHADOW.default,
    overflow: 'hidden', // Ensures content doesn't spill out of rounded corners
  },
  modalBody: {
    padding: SPACING.s24,
  },
});

export default AppModal;