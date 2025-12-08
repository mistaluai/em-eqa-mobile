import { StyleSheet, ViewStyle } from 'react-native';
import { SPACING } from '../../spacing';

export const EventDetailsScreenStyles = StyleSheet.create({
  deleteButton: {
    marginTop: SPACING.s32,
    width: '80%',
    alignContent: 'center',
    alignSelf: 'center',
  } as ViewStyle,
  bottomSpacer: {
    height: SPACING.s32,
  } as ViewStyle,
});

