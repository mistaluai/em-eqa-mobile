import { SPACING, TYPOGRAPHY } from '@/theme';
import { useThemeColor } from "@/theme/useThemeColor";
import { useThemeStyles } from "@/theme/useThemeStyles";
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import AppHeader from '../../components/HeaderComponent';
import { StatusBarCard } from './components/StatusBarCard';
import { StatusGridTile } from './components/StatusGridTile';
import { useSystemStatusLogic } from './hooks/useSystemStatusLogic';
import { usePipelineSettingsStore } from '@/services/edge_ai/semantic_trigger/usePipelineSettingsStore';
import { Switch } from 'react-native';

const SystemStatusScreen: React.FC = () => {
  const styles = useThemeStyles(createStyles);
  const COLORS = useThemeColor();
  const navigation = useNavigation<any>();
  const { clipReady, ttsReady, vqaAlive, piAlive, isCheckingVqa, isCheckingPi } = useSystemStatusLogic();
  
  const { 
    enableIngestion, enableEvaluation, enableUpload, enableGC, 
    toggleIngestion, toggleEvaluation, toggleUpload, toggleGC 
  } = usePipelineSettingsStore();

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
          onPress={() => navigation.navigate('PiStorage')}
        />

        {/* SECTION 3: Pipeline Settings */}
        <Text style={[TYPOGRAPHY.HeadlineM, styles.sectionTitle]}>Pipeline Execution</Text>
        <View style={styles.settingsCard}>
          <View style={styles.settingRow}>
            <View>
              <Text style={styles.settingTitle}>Phase 1: Video Fetching</Text>
              <Text style={styles.settingDesc}>Download segments from Pi</Text>
            </View>
            <Switch 
              value={enableIngestion} 
              onValueChange={toggleIngestion} 
              trackColor={{ true: COLORS.primary, false: COLORS.borderLight }}
            />
          </View>
          <View style={styles.settingDivider} />
          
          <View style={styles.settingRow}>
            <View>
              <Text style={styles.settingTitle}>Phase 2: AI Processing</Text>
              <Text style={styles.settingDesc}>Evaluate clips locally</Text>
            </View>
            <Switch 
              value={enableEvaluation} 
              onValueChange={toggleEvaluation} 
              trackColor={{ true: COLORS.primary, false: COLORS.borderLight }}
            />
          </View>
          <View style={styles.settingDivider} />
          
          <View style={styles.settingRow}>
            <View>
              <Text style={styles.settingTitle}>Phase 3: Cloud Syncing</Text>
              <Text style={styles.settingDesc}>Upload recorded clips</Text>
            </View>
            <Switch 
              value={enableUpload} 
              onValueChange={toggleUpload} 
              trackColor={{ true: COLORS.primary, false: COLORS.borderLight }}
            />
          </View>
          <View style={styles.settingDivider} />
          
          <View style={styles.settingRow}>
            <View>
              <Text style={styles.settingTitle}>Phase 4: Garbage Collection</Text>
              <Text style={styles.settingDesc}>Clean up disk space</Text>
            </View>
            <Switch 
              value={enableGC} 
              onValueChange={toggleGC} 
              trackColor={{ true: COLORS.primary, false: COLORS.borderLight }}
            />
          </View>
        </View>

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
  settingsCard: {
    backgroundColor: COLORS.surfaceCard,
    borderRadius: SPACING.s16,
    padding: SPACING.s16,
    marginBottom: SPACING.s16,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.s8,
  },
  settingTitle: {
    ...TYPOGRAPHY.BodyL,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  settingDesc: {
    ...TYPOGRAPHY.BodyM,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  settingDivider: {
    height: 1,
    backgroundColor: COLORS.borderLightLight,
    marginVertical: SPACING.s8,
  },
});

export default SystemStatusScreen;