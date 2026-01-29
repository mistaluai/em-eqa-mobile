import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../../components/HeaderComponent';
import { TYPOGRAPHY } from '../../theme';
import { COLORS } from '../../theme/colors';
import { SPACING } from '../../theme/spacing';
import { StatusBarCard } from './components/StatusBarCard';
import { StatusGridTile } from './components/StatusGridTile';
import { useSystemStatusLogic } from './hooks/useSystemStatusLogic';

const SystemStatusScreen: React.FC = () => {
  useSystemStatusLogic();

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader title="System Status" showBack={true} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        {/* SECTION 1: Hardware HUD (Grid) */}
        <Text style={[TYPOGRAPHY.HeadlineM, styles.sectionTitleNoTopMargin]}>Device Health</Text>
        <View style={styles.gridContainer}>
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
        <Text style={[TYPOGRAPHY.HeadlineM, styles.sectionTitle]}>Live Processes</Text>

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
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: SPACING.s24,
    paddingTop: SPACING.s24,
    paddingBottom: SPACING.s64, // Extra padding at bottom for scrolling past navigation/safe area
  },
  gridContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.s12,
    marginBottom: SPACING.s8,
  },
  sectionTitle: {
    color: COLORS.textPrimary,
    marginTop: SPACING.s32,
    marginBottom: SPACING.s16,
    fontWeight: '700',
  },
  sectionTitleNoTopMargin: {
    color: COLORS.textPrimary,
    marginBottom: SPACING.s12,
    fontWeight: '700',
  },
  bottomSpacer: {
    height: SPACING.s32,
  },
});

export default SystemStatusScreen;