import { StyleSheet, ViewStyle } from 'react-native';
import { COLORS } from '../../colors';
import { RADIUS } from '../../radius';
import { SHADOW } from '../../shadow';
import { SPACING } from '../../spacing';

export const PhotoUploadPlaceholderStyles = StyleSheet.create({
  photoPlaceholder: {
    borderRadius: RADIUS.full,
    borderWidth: 2,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: COLORS.textSecondary,
    backgroundColor: COLORS.backgroundNeutral,
    ...SHADOW.default,
  } as ViewStyle,
  icon: {
    color: COLORS.textSecondary,
  } as ViewStyle,
  text: {
    color: COLORS.textSecondary,
    marginTop: SPACING.s4,
  } as ViewStyle,
});

