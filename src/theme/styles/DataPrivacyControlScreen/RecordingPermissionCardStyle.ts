import { StyleSheet, ViewStyle } from 'react-native';
import { COLORS } from '../../colors';
import { SPACING } from '../../spacing';

export const RecordingPermissionCardStyles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.backgroundNeutral,
  } as ViewStyle,
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  } as ViewStyle,
  caption: {
    marginTop: SPACING.s4,
  } as ViewStyle,
});

