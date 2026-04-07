import { COLORS } from '@/theme/colors';
import { useThemeStyles } from "@/theme/useThemeStyles";
import { useThemeColor } from "@/theme/useThemeColor";
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

interface LoaderProps {
  size?: 'small' | 'large';
  color?: string;
}

const Loader: React.FC<LoaderProps> = ({
  size = 'large',
  // Default color is now the semantic primary color
  color = COLORS.primary
}) => {
  const styles = useThemeStyles(createStyles);
  const COLORS = useThemeColor();
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

const createStyles = (COLORS: any) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loader;