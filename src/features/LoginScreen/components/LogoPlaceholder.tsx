import React from 'react';
import { Text, View } from 'react-native';
import { COLORS } from '../../../theme/colors';
import { LogoPlaceholderStyles } from '../../../theme/styles/LoginScreen/LogoPlaceholderStyle';
import { TYPOGRAPHY } from '../../../theme';

interface LogoPlaceholderProps {
  size: number;
}

/**
 * LogoPlaceholder - Pure presentation component for logo
 */
export const LogoPlaceholder: React.FC<LogoPlaceholderProps> = ({ size }) => (
  <View
    style={[
      LogoPlaceholderStyles.container,
      {
        width: size,
        height: size,
      },
    ]}
  >
    <Text style={[TYPOGRAPHY.BodyL, LogoPlaceholderStyles.text]}>Logo</Text>
  </View>
);