import { StyleSheet, ViewStyle } from 'react-native';
import { COLORS } from '../../colors';
import { SHADOW } from '../../shadow';
import { SPACING } from '../../spacing';

export const ModalComponentStyles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  } as ViewStyle,
  modalContent: {
    backgroundColor: COLORS.backgroundLight,
    ...SHADOW.default,
    overflow: 'hidden',
  } as ViewStyle,
  modalBody: {
    padding: SPACING.s24,
  } as ViewStyle,
});

