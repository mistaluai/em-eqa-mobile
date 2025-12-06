import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { COLORS } from '../theme/colors';
import { RADIUS, SPACING } from '../theme/styles';

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
    // Card Background uses the neutral surface color
    backgroundColor: COLORS.backgroundNeutral,
    borderRadius: RADIUS.default,
    padding: SPACING.s20,
    // Note: If you uncomment the line below, ensure SHADOW is imported from styles
    //...SHADOW.default, 
  },
});

export default AppCard;