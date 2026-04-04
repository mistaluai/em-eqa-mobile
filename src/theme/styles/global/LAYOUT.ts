import { ViewStyle } from 'react-native';

export const LAYOUT = {
    flex1: { flex: 1 } as ViewStyle,
    flexCenter: { justifyContent: 'center', alignItems: 'center' } as ViewStyle,
    flexRowCenter: { flexDirection: 'row', alignItems: 'center' } as ViewStyle,
    flexRowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' } as ViewStyle,
} as const;
