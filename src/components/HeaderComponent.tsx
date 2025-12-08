import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, StyleProp, Text, View, ViewStyle } from 'react-native';
import { COLORS } from '../theme/colors';
import { TYPOGRAPHY } from '../theme';
import { HeaderComponentStyles } from '../theme/styles/components/HeaderComponentStyle';

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
    <View style={HeaderComponentStyles.header}>
      {/* LEFT ICON AREA */}
      {finalLeftIcon && handleLeftPress ? (
        <Pressable
          onPress={handleLeftPress}
          style={HeaderComponentStyles.iconButton}
          hitSlop={8}
        >
          {/* Left Icon color is now dark (textPrimary) */}
          <Ionicons name={finalLeftIcon} size={32} color={COLORS.textPrimary} />
        </Pressable>
      ) : (
        <View style={HeaderComponentStyles.iconPlaceholder} />
      )}

      {/* CENTER TITLE */}
      {/* Title color is now dark (textPrimary) */}
      <Text style={[TYPOGRAPHY.HeadlineM, HeaderComponentStyles.title]} numberOfLines={1}>
        {title}
      </Text>

      {/* RIGHT ICON AREA */}
      {rightIconName && onRightIconPress ? (
        <Pressable
          onPress={onRightIconPress}
          style={HeaderComponentStyles.iconButton}
          hitSlop={8}
        >
          {/* Right Icon color is now dark (textPrimary) */}
          <Ionicons name={rightIconName} size={28} color={COLORS.textPrimary} />
        </Pressable>
      ) : (
        <View style={HeaderComponentStyles.iconPlaceholder} />
      )}
    </View>
  );
};

export default AppHeader;