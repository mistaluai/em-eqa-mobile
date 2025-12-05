import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { COLORS } from '../theme/colors';

interface LoaderProps {
  size?: 'small' | 'large';
  color?: string;
}

const Loader: React.FC<LoaderProps> = ({ size = 'large', color = COLORS.ultraViolet }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loader;