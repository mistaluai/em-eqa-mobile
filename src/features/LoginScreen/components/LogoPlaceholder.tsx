import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../../theme/colors';
import { RADIUS, SHADOW, TYPOGRAPHY } from '../../../theme/styles';

interface LogoPlaceholderProps {
  size: number;
}

export const LogoPlaceholder: React.FC<LogoPlaceholderProps> = ({ size }) => (
  <View style={[styles.logoPlaceholder, { width: size, height: size }]}>
    {/* UI CHANGE: Text color from white to textPrimary */}
    <Text style={[TYPOGRAPHY.BodyL, { color: COLORS.textPrimary, fontWeight: '800' }]}>Logo</Text>
  </View>
);

const styles = StyleSheet.create({
  logoPlaceholder: {
    borderRadius: RADIUS.full,
    // UI CHANGE: Background color from gray700 to backgroundNeutral
    backgroundColor: COLORS.backgroundNeutral,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOW.default,
  },
});