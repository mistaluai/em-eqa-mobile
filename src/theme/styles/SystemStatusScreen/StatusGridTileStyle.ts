import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { COLORS } from '../../colors';
import { RADIUS } from '../../radius';
import { SHADOW } from '../../shadow';
import { SPACING } from '../../spacing';

export const StatusGridTileStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.backgroundNeutral,
        borderRadius: RADIUS.large,
        padding: SPACING.s16,
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: 160,
        // Add margin to separate grid items
        marginHorizontal: SPACING.s4,
        ...SHADOW.default,
    } as ViewStyle,

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginBottom: SPACING.s12,
    } as ViewStyle,

    title: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.textSecondary,
        marginLeft: SPACING.s8,
    } as TextStyle,

    // The Gauge Visualization
    gaugeContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 6,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SPACING.s12,
    } as ViewStyle,

    gaugeFill: {
        position: 'absolute',
        top: -6, left: -6, right: -6, bottom: -6,
        borderWidth: 6,
        borderRadius: 40,
        borderLeftColor: 'transparent', // Create the "gap" or "progress" effect
        borderBottomColor: 'transparent',
        transform: [{ rotate: '-45deg' }], // Rotate to look like a gauge
    } as ViewStyle,

    valueContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    } as ViewStyle,

    valueText: {
        fontSize: 20,
        fontWeight: '800',
    } as TextStyle,

    detailText: {
        fontSize: 12,
        color: COLORS.textSecondary,
        fontWeight: '500',
    } as TextStyle,
});