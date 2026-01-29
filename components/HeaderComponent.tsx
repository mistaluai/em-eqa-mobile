import { SPACING, TYPOGRAPHY } from '@/src/theme';
import { COLORS } from '@/src/theme/colors';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

interface AppHeaderProps {
  title: string;

  // Left Side Props
  showBack?: boolean;
  leftIconName?: keyof typeof Ionicons.glyphMap;
  onLeftIconPress?: () => void;

  // Right Side Props
  rightIconName?: keyof typeof Ionicons.glyphMap;
  onRightIconPress?: () => void;

  style?: StyleProp<ViewStyle>;
}

const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  showBack = false,
  leftIconName,
  onLeftIconPress,
  rightIconName,
  onRightIconPress,
}) => {
  const navigation = useNavigation();

  // Logic: 
  // 1. If explicit leftIconName is provided, use it.
  // 2. Else if showBack is true, use the chevron.
  const finalLeftIcon = leftIconName
    ? leftIconName
    : (showBack ? 'chevron-back-outline' : undefined);

  // Logic:
  // 1. If explicit handler is provided, use it.
  // 2. Else if showBack is true, use goBack().
  const handleLeftPress = onLeftIconPress
    ? onLeftIconPress
    : (showBack ? () => navigation.goBack() : undefined);

  return (
    <View style={styles.header}>
      {/* LEFT ICON AREA */}
      {finalLeftIcon && handleLeftPress ? (
        <Pressable
          onPress={handleLeftPress}
          style={styles.iconButton}
          hitSlop={8}
        >
          {/* Left Icon color is now dark (textPrimary) */}
          <Ionicons name={finalLeftIcon} size={32} color={COLORS.textPrimary} />
        </Pressable>
      ) : (
        <View style={styles.iconPlaceholder} />
      )}

      {/* CENTER TITLE */}
      {/* Title color is now dark (textPrimary) */}
      <Text style={[TYPOGRAPHY.HeadlineM, styles.title]} numberOfLines={1}>
        {title}
      </Text>

      {/* RIGHT ICON AREA */}
      {rightIconName && onRightIconPress ? (
        <Pressable
          onPress={onRightIconPress}
          style={styles.iconButton}
          hitSlop={8}
        >
          {/* Right Icon color is now dark (textPrimary) */}
          <Ionicons name={rightIconName} size={28} color={COLORS.textPrimary} />
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
    height: 60,
    paddingHorizontal: SPACING.s16,
    backgroundColor: COLORS.backgroundLight,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.borderLight,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    marginHorizontal: SPACING.s8,
    color: COLORS.textPrimary,
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