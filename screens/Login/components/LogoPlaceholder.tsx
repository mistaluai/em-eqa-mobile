import { useThemeStyles } from "@/theme/useThemeStyles";
import { useThemeColor } from "@/theme/useThemeColor";
import { RADIUS, SHADOW, TYPOGRAPHY } from '@/theme';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface LogoPlaceholderProps {
  size: number;
}

/**
 * LogoPlaceholder - Pure presentation component for logo
 */
export const LogoPlaceholder: React.FC<LogoPlaceholderProps> = ({ size }) => {
  const styles = useThemeStyles(createStyles);
  const COLORS = useThemeColor();

  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
        },
      ]}
    >
      <Text style={[TYPOGRAPHY.BodyL, styles.text]}>Logo</Text>
    </View>
  );
};

const createStyles = (COLORS: any) => StyleSheet.create({
  container: {
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.backgroundNeutral,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOW.default,
  },
  text: {
    color: COLORS.textPrimary,
    fontWeight: '800',
  },
});