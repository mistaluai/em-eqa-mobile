# Styling Migration Status

## ✅ Completed

1. **Created comprehensive theme/styles.ts** with all reusable styles organized by category
2. **Updated key screen files:**
   - ClipUploadSyncScreen
   - LoginScreen
   - SignUpScreen
   - HomeScreen

3. **Updated key component files:**
   - ProgressCard
   - ProgressBar
   - ClipItem
   - UploadStatusDashboard
   - ClipSection

## 🔄 Pattern for Remaining Files

All remaining files need to follow this pattern:

### Step 1: Update Imports
```tsx
// Remove:
import { StyleSheet } from 'react-native';

// Add theme styles you need:
import { SCREEN, CARD, FORM, TEXT, etc. } from '../../../theme/styles';
```

### Step 2: Remove StyleSheet.create Block
Delete the entire `const styles = StyleSheet.create({ ... });` block at the bottom of the file.

### Step 3: Replace style references
```tsx
// Before:
<View style={styles.container}>

// After:
<View style={SCREEN.container}>
```

### Step 4: Remove StyleSheet from imports
Make sure `StyleSheet` is completely removed from imports.

## 📋 Files Still Needing Updates

All component files in:
- DataPrivacyControlScreen/components/
- DeviceConnectionScreen/components/
- EventDetailsScreen/components/
- HomeScreen/components/ (some)
- OnboardingScreen/components/
- ProfileSettingsScreen/components/
- SystemStatusScreen/components/
- TimelineEventsScreen/components/
- And all main screen files

## 🎯 Quick Reference

Common style mappings:
- `styles.safeArea` → `SCREEN.safeArea`
- `styles.container` → `SCREEN.container`
- `styles.card` → `CARD.default`
- `styles.formContainer` → `FORM.container`
- `styles.title` → `TEXT.title`
- `styles.sectionTitle` → `SECTION.title`
- `styles.button` → `BUTTON.*` (specific button type)

See `src/theme/styles.ts` for complete list of available styles.

