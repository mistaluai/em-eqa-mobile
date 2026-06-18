import { SPACING, TYPOGRAPHY } from '@/theme';
import { useThemeColor } from "@/theme/useThemeColor";
import { useThemeStyles } from "@/theme/useThemeStyles";
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../../components/HeaderComponent';
import { StatusBarCard } from './components/StatusBarCard';
import { StatusGridTile } from './components/StatusGridTile';
import { useSystemStatusLogic } from './hooks/useSystemStatusLogic';

const SystemStatusScreen: React.FC = () => {
  const styles = useThemeStyles(createStyles);
  const COLORS = useThemeColor();
  const { clipReady, ttsReady, vqaAlive, piAlive, isCheckingVqa, isCheckingPi } = useSystemStatusLogic();

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader title="System Status" showBack={true} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* SECTION 1: AI Models */}
        <Text style={[TYPOGRAPHY.HeadlineM, styles.sectionTitleNoTopMargin]}>AI Edge Models</Text>
        <View style={styles.gridContainer}>
          <StatusGridTile
            title="CLIP Model"
            icon="images-outline"
            value={clipReady ? "Ready" : "Loading"}
            detail="Vision-Language"
            color={clipReady ? COLORS.components.navigation.sync : COLORS.components.navigation.status}
            isLoading={!clipReady}
          />
          <StatusGridTile
            title="STT Engine"
            icon="mic-outline"
            value={ttsReady ? "Ready" : "Loading"}
            detail="Whisper Tiny"
            color={ttsReady ? COLORS.components.navigation.sync : COLORS.components.navigation.status}
            isLoading={!ttsReady}
          />
        </View>

        {/* SECTION 2: Network Services */}
        <Text style={[TYPOGRAPHY.HeadlineM, styles.sectionTitle]}>Network Services</Text>

        <StatusBarCard
          title="VQA Cloud Service"
          iconName="cloud-outline"
          statusText={isCheckingVqa ? "Checking..." : (vqaAlive ? "Online" : "Unreachable")}
          detailText={vqaAlive ? "Responding to queries" : "Service may be asleep or down"}
          statusColor={isCheckingVqa ? COLORS.primary : (vqaAlive ? COLORS.components.navigation.sync : COLORS.warning)}
          isLoading={isCheckingVqa}
        />

        <StatusBarCard
          title="Raspberry Pi Camera"
          iconName="hardware-chip-outline"
          statusText={isCheckingPi ? "Checking..." : (piAlive ? "Connected" : "Disconnected")}
          detailText={piAlive ? "Active on local network" : "Unable to reach hardware node"}
          statusColor={isCheckingPi ? COLORS.primary : (piAlive ? COLORS.components.navigation.sync : COLORS.warning)}
          isLoading={isCheckingPi}
        />

        {/* Extra spacer at the bottom */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
};

const createStyles = (COLORS: any) => StyleSheet.create({
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