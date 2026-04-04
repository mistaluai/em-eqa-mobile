import { RADIUS, SHADOW } from '@/theme';
import { COLORS } from '@/theme/colors';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    ActivityIndicator,
    Image,
    ImageStyle,
    Pressable,
    StyleProp,
    StyleSheet,
    View,
    ViewStyle
} from 'react-native';

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
        <View style={[styles.container, containerStyle, style]}>
            <Pressable
                onPress={onPress}
                disabled={!onPress || isLoading}
                style={({ pressed }) => [
                    styles.pressableArea,
                    // Optional: Add opacity effect on press
                    pressed && onPress ? { opacity: 0.8 } : {},
                ]}
            >
                {isLoading ? (
                    <View style={[styles.placeholder, containerStyle]}>
                        <ActivityIndicator size="small" color={COLORS.primary} />
                    </View>
                ) : uri ? (
                    <Image
                        source={{ uri }}
                        accessibilityLabel="User Avatar"
                        style={[styles.image, { borderRadius: size / 2 }]}
                        resizeMode="cover"
                    />
                ) : (
                    // Fallback Placeholder
                    <View style={[styles.placeholder, containerStyle]}>
                        <Ionicons
                            name="person"
                            size={size * 0.5}
                            color={COLORS.textSecondary}
                        />
                    </View>
                )}

                {/* Edit Badge (Camera Icon) */}
                {showEditBadge && !isLoading && (
                    <View style={styles.editBadge}>
                        <Ionicons name="camera" size={14} color={COLORS.backgroundLight} />
                    </View>
                )}
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // Ensures the badge aligns relative to this container
        position: 'relative',
        ...SHADOW.default, // Optional: gives depth
    },
    pressableArea: {
        width: '100%',
        height: '100%',
    },
    image: {
        width: '100%',
        height: '100%',
        backgroundColor: COLORS.backgroundNeutral,
    } as ImageStyle,
    placeholder: {
        width: '100%',
        height: '100%',
        backgroundColor: COLORS.backgroundNeutral,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: COLORS.borderLight,
        borderStyle: 'dashed', // Nice touch for "upload me" feel
    },
    editBadge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: COLORS.primary,
        width: 28,
        height: 28,
        borderRadius: RADIUS.full,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: COLORS.backgroundLight,
    },
});