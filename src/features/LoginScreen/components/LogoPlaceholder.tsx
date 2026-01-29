import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TYPOGRAPHY } from '../../../theme';
import { COLORS } from '../../../theme/colors';
import { RADIUS } from '../../../theme/radius';
import { SHADOW } from '../../../theme/shadow';

interface LogoPlaceholderProps {
  size: number;
}

/**
 * LogoPlaceholder - Pure presentation component for logo
 */
export const LogoPlaceholder: React.FC<LogoPlaceholderProps> = ({ size }) => (
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

const styles = StyleSheet.create({
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