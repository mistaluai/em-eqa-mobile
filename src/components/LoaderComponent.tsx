import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { COLORS } from '../theme/colors';
import { LoaderComponentStyles } from '../theme/styles/components/LoaderComponentStyle';

interface LoaderProps {
  size?: 'small' | 'large';
  color?: string;
}

const Loader: React.FC<LoaderProps> = ({ 
  size = 'large', 
  // Default color is now the semantic primary color
  color = COLORS.primary 
}) => {
  return (
    <View style={LoaderComponentStyles.container}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

export default Loader;