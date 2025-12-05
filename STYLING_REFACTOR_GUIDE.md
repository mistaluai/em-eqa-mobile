# Styling Refactoring Guide

## Overview
All styles have been extracted from component files into `src/theme/styles.ts`. Components now use theme styles instead of local StyleSheet.create().

## Theme Structure

The theme/styles.ts file contains all reusable styles organized by category:

- **SCREEN** - Screen layouts (safeArea, container, scrollContainer)
- **SECTION** - Section titles
- **CARD** - Card styles (default, mini, status, clip, event, etc.)
- **PROGRESS** - Progress bar styles
- **PILL** - Pill/badge styles (default, filter, trigger)
- **BUTTON** - Button styles
- **FORM** - Form container and input styles
- **INPUT_BAR** - Input bar styles
- **AVATAR** - Avatar/photo upload styles
- **CHAT** - Chat message styles
- **DRAWER** - Drawer menu styles
- **MODAL** - Modal styles
- **VIDEO** - Video placeholder styles
- **STATUS** - Status card styles
- **LIST** - List and event card styles
- **ONBOARDING** - Onboarding screen styles
- **WELCOME** - Welcome section styles
- **TEXT** - Text styles
- **TRIGGER_HEADER** - Trigger header styles
- **SLIDER** - Slider label styles

## Migration Pattern

### Before:
```tsx
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.carbonBlack,
  },
});
```

### After:
```tsx
import { SCREEN } from '../../../theme/styles';

// Use directly:
<SafeAreaView style={SCREEN.safeArea}>
```

## Files Updated

All component files have been updated to use theme styles. Check each file for the new import pattern.

## Colors

All colors must come from `src/theme/colors.ts`:
- COLORS.carbonBlack
- COLORS.ultraViolet
- COLORS.lightLavender
- COLORS.softGray
- COLORS.white
- COLORS.desertSand
- COLORS.gray700
- COLORS.gray200

No hardcoded colors are allowed.

