import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../../theme/colors';
import { RADIUS, SHADOW, TYPOGRAPHY } from '../../../theme/styles';

interface LogoPlaceholderProps {
  size: number;
}

export const LogoPlaceholder: React.FC<LogoPlaceholderProps> = ({ size }) => (
  <View style={[styles.logoPlaceholder, { width: size, height: size }]}>
    <Text style={[TYPOGRAPHY.BodyL, { color: COLORS.white, fontWeight: '800' }]}>Logo</Text>
  </View>
);

const styles = StyleSheet.create({
  logoPlaceholder: {
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.gray700,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOW.default,
  },
});

