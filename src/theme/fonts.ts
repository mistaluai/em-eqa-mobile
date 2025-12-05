// src/theme/fonts.ts
import * as Font from 'expo-font';

export function useFonts() {
  return Font.useFonts({
    'Inter-Regular': require('../fonts/Inter_400Regular.ttf'),
    'Inter-Medium': require('../fonts/Inter_500Medium.ttf'),
    'Inter-SemiBold': require('../fonts/Inter_600SemiBold.ttf'),
    'Inter-Bold': require('../fonts/Inter_700Bold.ttf'),
    'Inter-ExtraBold': require('../fonts/Inter_800ExtraBold.ttf'),
  });
}

export { Font };

