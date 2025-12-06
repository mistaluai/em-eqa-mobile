import React from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../../components/HeaderComponent';
import { COLORS } from '../../theme/colors';
import { SCREEN, SPACING } from '../../theme/styles';
import { StatusBarCard } from './components/StatusBarCard';
import { useSystemStatusLogic } from './hooks/useSystemStatusLogic';

/**
 * SystemStatusScreen - Main screen component for system status
 * Handles composition and rendering using hooks and components
 */
const SystemStatusScreen: React.FC = () => {
  useSystemStatusLogic();

  return (
    <SafeAreaView style={SCREEN.safeArea}>
      <AppHeader title="System Status" showBack={true} />

      <ScrollView contentContainerStyle={SCREEN.systemStatusContainer}>
        <StatusBarCard
          title="Recording Status"
          iconName="mic-outline"
          statusText="Active"
          detailText="Timer: 00:12:20"
          statusColor={COLORS.primary}
        />

        <StatusBarCard
          title="Uploading Status"
          iconName="cloud-upload-outline"
          statusText="3/10 Clips"
          detailText="Remaining: 7 Clips"
          statusColor={COLORS.primary}
          progress={75}
        />

        <StatusBarCard
          title="AI Processing Status"
          iconName="aperture-outline"
          statusText="Processed: 2 Clips"
          detailText="Pending: 5 Clips"
          statusColor={COLORS.primary}
        />

        <StatusBarCard
          title="Wearable Device Status"
          iconName="watch-outline"
          statusText="Connected"
          detailText="Device: EM-01"
          statusColor={COLORS.primary}
        />

        <StatusBarCard
          title="Storage Usage"
          iconName="server-outline"
          statusText="28 GB used"
          detailText="Available: 100 GB"
          statusColor={COLORS.primary}
        />

        <View style={{ height: SPACING.s32 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SystemStatusScreen;