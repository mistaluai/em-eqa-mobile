import { ImageStyle, StyleSheet, ViewStyle } from 'react-native';
import { COLORS } from '../../colors';
import { RADIUS } from '../../radius';
import { SHADOW } from '../../shadow';

export const AvatarStyles = StyleSheet.create({
    container: {
        // Ensures the badge aligns relative to this container
        position: 'relative',
        ...SHADOW.default, // Optional: gives depth
    } as ViewStyle,

    pressableArea: {
        width: '100%',
        height: '100%',
    } as ViewStyle,

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
    } as ViewStyle,

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
    } as ViewStyle,
});