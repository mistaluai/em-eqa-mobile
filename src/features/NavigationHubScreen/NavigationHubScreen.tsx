import AppHeader from '@/src/components/HeaderComponent';
import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationHubScreenStyles } from '../../theme/styles/NavigationHubScreen/NavigationHubScreenStyle';
import { NavigationCard } from './components/NavigationCard';
import { NAV_ITEMS } from './constants';
import { useNavigationHubLogic } from './hooks/useNavigationHubLogic';

// --- Main Screen Component ---
const NavigationHubScreen: React.FC = () => {
  const { handleCardPress } = useNavigationHubLogic();

  return (
    <SafeAreaView style={NavigationHubScreenStyles.safeArea}>
      {/* Header */}
      <AppHeader title="Navigation Hub" showBack={true} />

      {/* Navigation List Container */}
      <View style={NavigationHubScreenStyles.listContainer}>
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

export default NavigationHubScreen;
