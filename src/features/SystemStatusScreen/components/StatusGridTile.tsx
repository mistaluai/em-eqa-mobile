import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { COLORS } from '../../../theme/colors';
import { StatusGridTileStyles } from '../../../theme/styles/SystemStatusScreen/StatusGridTileStyle';

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
    return (
        <View style={StatusGridTileStyles.container}>
            {/* Header Icon & Title */}
            <View style={StatusGridTileStyles.header}>
                <Ionicons name={icon as any} size={20} color={COLORS.textSecondary} />
                <Text style={StatusGridTileStyles.title}>{title}</Text>
            </View>

            {/* Circular Gauge Visualization */}
            <View style={[StatusGridTileStyles.gaugeContainer, { borderColor: color + '30' }]}>
                {/* Inner colored ring segment (simulated) */}
                <View style={[StatusGridTileStyles.gaugeFill, { borderColor: color }]} />

                {/* Central Data Value */}
                <View style={StatusGridTileStyles.valueContainer}>
                    <Text style={[StatusGridTileStyles.valueText, { color }]}>{value}</Text>
                </View>
            </View>

            {/* Footer Detail */}
            <Text style={StatusGridTileStyles.detailText}>{detail}</Text>
        </View>
    );
};