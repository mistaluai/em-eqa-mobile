import { RADIUS, SPACING } from '@/src/theme';
import { COLORS } from '@/src/theme/colors';
import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

interface AppCardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const AppCard: React.FC<AppCardProps> = ({ children, style }) => {
  return (
    <View style={[styles.card, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.backgroundNeutral,
    borderRadius: RADIUS.default,
    padding: SPACING.s20,
  },
});

export default AppCard;