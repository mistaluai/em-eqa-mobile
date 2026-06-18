import { useThemeStyles } from "@/theme/useThemeStyles";
import { useThemeColor } from "@/theme/useThemeColor";
import { RADIUS, SHADOW, SPACING } from '@/theme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PulsingDot } from './PulsingDot';

interface StatusGridTileProps {
    title: string;
    icon: string;
    value: string;
    detail: string;
    color: string;
    isLoading?: boolean;
}

export const StatusGridTile: React.FC<StatusGridTileProps> = ({
    title,
    icon,
    value,
    detail,
    color,
    isLoading = false,
}) => {
    const styles = useThemeStyles(createStyles);
    const COLORS = useThemeColor();
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={[styles.iconBox, { backgroundColor: `${color}15` }]}>
                    <Ionicons name={icon as any} size={26} color={color} />
                </View>
                <View style={[styles.statusBadge, { borderColor: `${color}30`, backgroundColor: `${color}10` }]}>
                    <PulsingDot color={color} size={8} isPulsing={isLoading} />
                    <Text style={[styles.statusText, { color }]}>{value}</Text>
                </View>
            </View>

            <View style={styles.bottomContent}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.detailText}>{detail}</Text>
            </View>
        </View>
    );
};

const createStyles = (COLORS: any) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.backgroundLight,
        borderRadius: RADIUS.large,
        padding: SPACING.s20,
        marginHorizontal: SPACING.s8,
        justifyContent: 'space-between',
        minHeight: 190,
        borderWidth: 1,
        borderColor: COLORS.borderLight,
        ...SHADOW.default,
        shadowColor: COLORS.primary,
        shadowOpacity: 0.05,
    },
    header: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: SPACING.s16,
    },
    iconBox: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SPACING.s10,
        paddingVertical: SPACING.s8,
        borderRadius: RADIUS.full,
        borderWidth: 1,
        gap: SPACING.s8,
    },
    statusText: {
        fontSize: 11,
        fontWeight: '800',
        textTransform: 'uppercase',
        letterSpacing: 0.8,
    },
    bottomContent: {
        marginTop: SPACING.s24,
    },
    title: {
        fontSize: 18,
        fontWeight: '800',
        color: COLORS.textPrimary,
        marginBottom: SPACING.s4,
    },
    detailText: {
        fontSize: 13,
        color: COLORS.textSecondary,
        fontWeight: '500',
    },
});