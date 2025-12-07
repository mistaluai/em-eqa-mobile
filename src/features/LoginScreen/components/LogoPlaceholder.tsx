import React from 'react';
import { Text, View } from 'react-native';
import { COLORS } from '../../../theme/colors';
import { RADIUS, SHADOW, TYPOGRAPHY } from '../../../theme/styles';

interface LogoPlaceholderProps {
  size: number;
}

/**
 * LogoPlaceholder - Pure presentation component for logo
 */
export const LogoPlaceholder: React.FC<LogoPlaceholderProps> = ({ size }) => (
  <View
    style={[
      {
        width: size,
        height: size,
        borderRadius: RADIUS.full ,
        backgroundColor: COLORS.backgroundNeutral,
        justifyContent: 'center',
        alignItems: 'center',
        //paddingBottom: 10, 
        ...SHADOW.default,
      },
    ]}
  >
    <Text style={[TYPOGRAPHY.BodyL, { color: COLORS.textPrimary, fontWeight: '800' }]}>Logo</Text>
  </View>
);