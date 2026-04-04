import { useThemeStyles } from "@/theme/useThemeStyles";
import { useThemeColor } from "@/theme/useThemeColor";
import { RADIUS, SHADOW, SPACING } from '@/theme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface StatusGridTileProps {
    title: string;
    icon: string;
    value: string;
    detail: string;
    color: string;
}

export const StatusGridTile: React.FC<StatusGridTileProps> = ({
    title,
    icon,
    value,
    detail,
    color
}) => {
    const styles = useThemeStyles(createStyles);
    const COLORS = useThemeColor();
    return (
        <View style={styles.container}>
            {/* Header Icon & Title */}
            <View style={styles.header}>
                <Ionicons name={icon as any} size={20} color={COLORS.textSecondary} />
                <Text style={styles.title}>{title}</Text>
            </View>

            {/* Circular Gauge Visualization */}
            <View style={[styles.gaugeContainer, { borderColor: color + '30' }]}>
                {/* Inner colored ring segment (simulated) */}
                <View style={[styles.gaugeFill, { borderColor: color }]} />

                {/* Central Data Value */}
                <View style={styles.valueContainer}>
                    <Text style={[styles.valueText, { color }]}>{value}</Text>
                </View>
            </View>

            {/* Footer Detail */}
            <Text style={styles.detailText}>{detail}</Text>
        </View>
    );
};

const createStyles = (COLORS: any) => StyleSheet.create({
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
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginBottom: SPACING.s12,
    },
    title: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.textSecondary,
        marginLeft: SPACING.s8,
    },
    // The Gauge Visualization
    gaugeContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 6,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SPACING.s12,
    },
    gaugeFill: {
        position: 'absolute',
        top: -6, left: -6, right: -6, bottom: -6,
        borderWidth: 6,
        borderRadius: 40,
        borderLeftColor: 'transparent', // Create the "gap" or "progress" effect
        borderBottomColor: 'transparent',
        transform: [{ rotate: '-45deg' }], // Rotate to look like a gauge
    },
    valueContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    valueText: {
        fontSize: 20,
        fontWeight: '800',
    },
    detailText: {
        fontSize: 12,
        color: COLORS.textSecondary,
        fontWeight: '500',
    },
});