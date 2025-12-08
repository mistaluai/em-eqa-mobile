import React from 'react';
import { Dimensions, Modal, Pressable, View, ViewStyle } from 'react-native';
import { RADIUS } from '../theme';
import { ModalComponentStyles } from '../theme/styles/components/ModalComponentStyle';

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
        style={[ModalComponentStyles.backdrop, alignmentStyle]}
        onPress={onClose}
      >
        <Pressable
          onPress={(e) => e.stopPropagation()}
          style={[
            ModalComponentStyles.modalContent,
            contentShapeStyle,
            { width: modalWidth }
          ]}
        >
          <View style={ModalComponentStyles.modalBody}>
            {children}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default AppModal;