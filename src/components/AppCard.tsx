import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { AppCardStyles } from '../theme/styles/components/AppCardStyle';

interface AppCardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const AppCard: React.FC<AppCardProps> = ({ children, style }) => {
  return (
    <View style={[AppCardStyles.card, style]}>
      {children}
    </View>
  );
};

export default AppCard;