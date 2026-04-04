# UI Architecture & Contribution Guide

Welcome to the UI contribution guide for the `em-eqa-mobile` project. This document outlines how our interface is structured and guides you on where to modify code when building or updating UI features.

## 1. Global Theme Configuration (`/theme`)
All shared visual constants live here. Always use the theme system instead of hardcoding raw styles (like hex codes, paddings, or font sizes) directly into components.

- **`/theme/colors.ts`**: The central color palette. Add or modify semantic colors here (e.g., `COLORS.backgroundLight`, `COLORS.textPrimary`).
- **`/theme/typography.ts`**: Text styles (e.g., `HeadlineXL`, `BodyM`). 
- **`/theme/spacing.ts`** & **`/theme/radius.ts`**: Precise measurements used for margins, paddings, and borders (e.g., `SPACING.s16`, `RADIUS.large`).
- **`/theme/shadow.ts`**: Shared shadow abstractions for depth styling. Keep the application planar and cohesive.

### The Global Styles Module (`/theme/styles/global`)
To prevent repetitive `StyleSheet` blocks, common combinations are extracted here. 
- **`LAYOUT.ts`**: Contains wrappers for flexbox behavior (`flexCenter`, `flexRowBetween`). Use these compositionally: `style={[LAYOUT.flexRowBetween, styles.container]}`.
- **`CARD.ts`**, **`SCREEN.ts`**, etc.: Common module shapes and padding boundaries.

## 2. Global Shared Components (`/components`)
If a component is entirely domain-agnostic and reused globally, it belongs in `/components`. 
*Examples: `AppButton`, `Avatar`, `HeaderComponent`, `InputComponent`, `ModalComponent`.*

**When modifying these:** Realize that changes here cascade across the entire app. Be mindful of prop boundaries and maintain backward compatibility.

**When adding here:** Only place elements here if they are reused across *two or more completely distinct feature screens*. 

## 3. Feature Screens & Local Components (`/screens`)
The top-level application router points to the feature modules within `/screens`. 
Our app is strictly modularized by domain.

*Examples: `/screens/TimelineEvents`, `/screens/DeviceConnection`, `/screens/Home`.*

### Screen-Level Architecture
Inside a typical feature screen directory (e.g., `/screens/DeviceConnection`):
1. **`DeviceConnectionScreen.tsx`**: The main orchestrator composing the user interface for that domain.
2. **`/components/`**: Components deeply specific to this screen that wouldn’t make sense globally.
   - Example: `ConnectionStatusCard.tsx` lives directly under `/DeviceConnection/components/` instead of the root `/components` folder structure.
3. **`/hooks/`**: Local logic hooks used exclusively by this screen.

**Modifying existing UI:**
If you need to change a piece of UI that only appears on the **Home** screen, check `/screens/Home/HomeScreen.tsx` or its local sibling `/screens/Home/components/`. Do not pollute the root `/components/` folder for one-off behaviors!

## Best Practices
1. **Never use inline styles** if possible. Always create a `const styles = StyleSheet.create({...})` or leverage the `/theme` module.
2. **Eliminate Layout Boilerplate**. When you find yourself writing `{ flexDirection: 'row', alignItems: 'center' }`, invoke the `LAYOUT.flexRowCenter` config instead.
3. **Respect Scope**. Before creating a component, ask: *"Is this highly specific? Screen-level components directory. Is it a generic design system element? Global components directory."* 
