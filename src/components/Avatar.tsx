import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    ActivityIndicator,
    Image,
    Pressable,
    StyleProp,
    View,
    ViewStyle,
} from 'react-native';
import { COLORS } from '../theme/colors';
import { AvatarStyles } from '../theme/styles/components/AvatarStyle';

interface AvatarProps {
    /** The image source URI (e.g., local file or remote URL) */
    uri?: string | null;

    /** Diameter of the avatar in pixels. Default: 100 */
    size?: number;

    /** Function to call when avatar is pressed */
    onPress?: () => void;

    /** Shows a loading spinner instead of the image */
    isLoading?: boolean;

    /** Shows the small camera/edit badge in the corner. Default: false */
    showEditBadge?: boolean;

    /** Custom container style override */
    style?: StyleProp<ViewStyle>;
}

export const Avatar: React.FC<AvatarProps> = ({
    uri,
    size = 100,
    onPress,
    isLoading = false,
    showEditBadge = false,
    style,
}) => {
    // Dynamic styles based on size
    const containerStyle = {
        width: size,
        height: size,
        borderRadius: size / 2,
    };

    return (
        <View style={[AvatarStyles.container, containerStyle, style]}>
            <Pressable
                onPress={onPress}
                disabled={!onPress || isLoading}
                style={({ pressed }) => [
                    AvatarStyles.pressableArea,
                    // Optional: Add opacity effect on press
                    pressed && onPress ? { opacity: 0.8 } : {},
                ]}
            >
                {isLoading ? (
                    <View style={[AvatarStyles.placeholder, containerStyle]}>
                        <ActivityIndicator size="small" color={COLORS.primary} />
                    </View>
                ) : uri ? (
                    <Image
                        source={{ uri }}
                        accessibilityLabel="User Avatar"
                        style={[AvatarStyles.image, { borderRadius: size / 2 }]}
                        resizeMode="cover"
                    />
                ) : (
                    // Fallback Placeholder
                    <View style={[AvatarStyles.placeholder, containerStyle]}>
                        <Ionicons
                            name="person"
                            size={size * 0.5}
                            color={COLORS.textSecondary}
                        />
                    </View>
                )}

                {/* Edit Badge (Camera Icon) */}
                {showEditBadge && !isLoading && (
                    <View style={AvatarStyles.editBadge}>
                        <Ionicons name="camera" size={14} color={COLORS.backgroundLight} />
                    </View>
                )}
            </Pressable>
        </View>
    );
};