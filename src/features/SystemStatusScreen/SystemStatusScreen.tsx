import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../../components/HeaderComponent';
import { SCREEN, SECTION, TYPOGRAPHY } from '../../theme';
import { COLORS } from '../../theme/colors';
import { SystemStatusScreenStyles } from '../../theme/styles/SystemStatusScreen/SystemStatusScreenStyle';
import { StatusBarCard } from './components/StatusBarCard';
import { StatusGridTile } from './components/StatusGridTile';
import { useSystemStatusLogic } from './hooks/useSystemStatusLogic';

const SystemStatusScreen: React.FC = () => {
  useSystemStatusLogic();

  return (
    <SafeAreaView style={SCREEN.safeArea}>
      <AppHeader title="System Status" showBack={true} />

      <ScrollView
        style={{ flex: 1 }} // Take up full screen space
        // FIX: Use specific scrollContent style instead of SCREEN.container
        contentContainerStyle={SystemStatusScreenStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        {/* SECTION 1: Hardware HUD (Grid) */}
        <Text style={[TYPOGRAPHY.HeadlineM, SECTION.titleNoTopMargin]}>Device Health</Text>
        <View style={SystemStatusScreenStyles.gridContainer}>
          <StatusGridTile
            title="Camera Battery"
            icon="battery-charging-outline"
            value="82%"
            detail="~4h Remaining"
            color={COLORS.navStatus}
          />
          <StatusGridTile
            title="Cloud Storage"
            icon="server-outline"
            value="72%"
            detail="28GB Free"
            color={COLORS.navDevice}
          />
        </View>

        {/* SECTION 2: Active Processes (List) */}
        <Text style={[TYPOGRAPHY.HeadlineM, SECTION.title]}>Live Processes</Text>

        <StatusBarCard
          title="Audio Recording"
          iconName="mic-outline"
          statusText="Active"
          detailText="Session: 00:12:20"
          statusColor={COLORS.navPrivacy}
        />

        <StatusBarCard
          title="Cloud Sync"
          iconName="cloud-upload-outline"
          statusText="Syncing (3/10)"
          detailText="7 clips queued"
          statusColor={COLORS.navSync}
          progress={30}
        />

        <StatusBarCard
          title="AI Analysis"
          iconName="aperture-outline"
          statusText="Processing"
          detailText="Contextualizing events..."
          statusColor={COLORS.primary}
        />

        {/* Extra spacer at the bottom */}
        <View style={SystemStatusScreenStyles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SystemStatusScreen;