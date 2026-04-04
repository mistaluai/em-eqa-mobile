import { useThemeStyles } from "@/theme/useThemeStyles";
import { useThemeColor } from "@/theme/useThemeColor";
import { RADIUS, SPACING } from '@/theme';
import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

interface AppCardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const AppCard: React.FC<AppCardProps> = ({ children, style }) => {
  const styles = useThemeStyles(createStyles);
  const COLORS = useThemeColor();
  return (
    <View style={[styles.card, style]}>
      {children}
    </View>
  );
};

const createStyles = (COLORS: any) => StyleSheet.create({
  card: {
    backgroundColor: COLORS.backgroundNeutral,
    borderRadius: RADIUS.default,
    padding: SPACING.s20,
  },
});

export default AppCard;