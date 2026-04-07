import { useColorScheme } from 'react-native';
import { darkTheme, lightTheme } from './colors';

export function useThemeColor() {
    const theme = useColorScheme() ?? 'light';
    return theme === 'dark' ? darkTheme : lightTheme;
}
