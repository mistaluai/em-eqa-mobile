import { StyleSheet } from 'react-native';
import { COLORS } from '../../colors';
import { SPACING } from '../../spacing';

export const DeleteAllMyDataStyles = StyleSheet.create({
    sectionContainer: {
        marginBottom: SPACING.s32,
    },
    // Creates a visual "Danger Zone" box
    dangerZoneContainer: {
        marginTop: SPACING.s24,
        padding: SPACING.s16,
        // Using navPrivacy (red-600) with low opacity for the background to keep it "Danger" themed
        // Alternatively, if you want it purely white/neutral, use COLORS.backgroundNeutral
        backgroundColor: `${COLORS.navPrivacy}15`, // Adding alpha for a light red tint
        borderRadius: SPACING.s12,
        borderWidth: 1,
        borderColor: COLORS.navPrivacy, // Red border
    },
    dangerTitle: {
        color: COLORS.navPrivacy, // Red title
        marginBottom: SPACING.s16,
        marginTop: SPACING.s4
    },
    dangerButton: {
        backgroundColor: COLORS.navPrivacy, // Strong Red
        borderColor: COLORS.navPrivacy,
    },
    dangerButtonText: {
        color: COLORS.backgroundLight, // White text
        fontWeight: '700',
    },
    warningContainer: {
        flexDirection: 'row',
        marginTop: SPACING.s12,
        paddingHorizontal: SPACING.s4,
        gap: SPACING.s8,
    },
    warningText: {
        flex: 1,
        fontSize: 13,
        lineHeight: 18,
        color: COLORS.navPrivacy, // Red text for readability
    },
});