import AppHeader from '@/components/HeaderComponent';
import { RADIUS, SPACING } from '@/theme';
import { useThemeColor } from '@/theme/useThemeColor';
import { useThemeStyles } from '@/theme/useThemeStyles';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationCard } from './components/NavigationCard';
import { NAV_ITEMS } from './constants';
import { useNavigationHubLogic } from './hooks/useNavigationHubLogic';

// --- Main Screen Component ---
const NavigationHubScreen: React.FC = () => {
  const styles = useThemeStyles(createStyles);
  const COLORS = useThemeColor();
  const { handleCardPress } = useNavigationHubLogic();

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <AppHeader title="Navigation Hub" showBack={true} />

      {/* Navigation List Container */}
      <View style={styles.listContainer}>
        {NAV_ITEMS.map((item) => (
          <NavigationCard
            key={item.id}
            item={item}
            onPress={() => handleCardPress(item.screen)}
          />
        ))}
      </View>
    </SafeAreaView>
  );
};

const createStyles = (COLORS: any) => StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
  },
  listContainer: {
    backgroundColor: COLORS.backgroundLight,
    borderRadius: RADIUS.default,
    marginTop: SPACING.s24,
    paddingHorizontal: SPACING.s16,
  },
});

export default NavigationHubScreen;