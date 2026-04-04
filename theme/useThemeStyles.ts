import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useThemeColor } from './useThemeColor';

export function useThemeStyles<T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>>(
    styleFactory: (colors: any) => T
): T {
    const colors = useThemeColor();
    return useMemo(() => styleFactory(colors), [colors]);
}
