import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { COLORS } from '../theme/colors';
import { SPACING, TYPOGRAPHY } from '../theme/styles';

interface AppHeaderProps {
  title: string;
  showBack?: boolean;
  rightIconName?: keyof typeof Ionicons.glyphMap;
  onRightIconPress?: () => void;
  // This prop is used by the AppNavigator, but we keep it generic here
  style?: StyleProp<ViewStyle>;
}

const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  showBack = true,
  rightIconName,
  onRightIconPress,
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      {showBack ? (
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.iconButton}
        >
          <Ionicons name="chevron-back-outline" size={28} color={COLORS.white} />
        </Pressable>
      ) : (
        <View style={styles.iconPlaceholder} />
      )}

      <Text style={[TYPOGRAPHY.HeadlineM, styles.title]} numberOfLines={1}>
        {title}
      </Text>

      {rightIconName && onRightIconPress ? (
        <Pressable onPress={onRightIconPress} style={styles.iconButton}>
          <Ionicons name={rightIconName} size={24} color={COLORS.white} />
        </Pressable>
      ) : (
        <View style={styles.iconPlaceholder} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
    paddingHorizontal: SPACING.s16,
    backgroundColor: COLORS.carbonBlack,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.gray700,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    marginHorizontal: SPACING.s12,
  },
  iconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconPlaceholder: {
    width: 40,
    height: 40,
  },
});

export default AppHeader;