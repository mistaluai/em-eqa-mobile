import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { COLORS } from '../../../theme/colors';
import { CARD, TYPOGRAPHY } from '../../../theme/styles';

interface LogoutItemProps {
  onPress: () => void;
}

/**
 * LogoutItem - Pure presentation component for logout card
 */
export const LogoutItem: React.FC<LogoutItemProps> = ({ onPress }) => {
  return (
    <Pressable
      style={CARD.navigationItem}
      onPress={onPress}
      android_ripple={{ color: COLORS.borderLight }}
    >
      <View style={CARD.navigationItemContent}>
        <View style={[CARD.navigationIconWrapper, { backgroundColor: COLORS.navLogoutBg }]}>
          <Text style={[CARD.navigationIcon, { color: COLORS.textSecondary }]}>🚪</Text>
        </View>
        <View style={CARD.navigationTextContainer}>
          <Text style={[TYPOGRAPHY.BodyL, CARD.navigationTitle]}>Log Out</Text>
          <Text style={[TYPOGRAPHY.Caption, CARD.navigationDescription]}>
            Securely sign out of your current account session.
          </Text>
        </View>
        <Text style={CARD.navigationChevron}>&gt;</Text>
      </View>
    </Pressable>
  );
};

