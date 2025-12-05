import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppCard from '../components/AppCard';
import AppHeader from '../components/HeaderComponent';
import { COLORS } from '../theme/colors';
import { RADIUS, SPACING, TYPOGRAPHY } from '../theme/styles';

const StatusBarCard: React.FC<{
  title: string;
  iconName: string;
  statusText: string;
  detailText: string;
  statusColor: string;
  progress?: number;
}> = ({ title, iconName, statusText, detailText, statusColor, progress }) => (
  <View>
    <Text style={[TYPOGRAPHY.HeadlineM, styles.sectionTitle]}>{title}</Text>
    <AppCard style={styles.statusCard}>
      <View style={styles.cardContent}>
        <Ionicons name={iconName as any} size={32} color={statusColor} style={{ marginRight: SPACING.s20 }} />
        <View style={styles.textBlock}>
          <Text style={[TYPOGRAPHY.BodyL, { color: statusColor, fontWeight: '700' }]}>{statusText}</Text>
          <Text style={[TYPOGRAPHY.Caption, { color: COLORS.softGray }]}>{detailText}</Text>
        </View>
        {progress !== undefined && (
          <Text style={[TYPOGRAPHY.BodyL, { color: statusColor, fontWeight: '700', marginLeft: 'auto' }]}>
            {progress}%
          </Text>
        )}
      </View>
      {progress !== undefined && (
        <View style={styles.progressBarTrack}>
          <View style={[styles.progressBarFill, { width: `${progress}%`, backgroundColor: statusColor }]} />
        </View>
      )}
    </AppCard>
  </View>
);

const SystemStatusScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader
        title="System Status"
        showBack={true}
        rightIconName="menu-outline"
        onRightIconPress={() => console.log('Open Menu')}
      />

      <ScrollView contentContainerStyle={styles.container}>
        {/* 1. Recording Status */}
        <StatusBarCard
          title="Recording Status"
          iconName="mic-outline"
          statusText="Active"
          detailText="Timer: 00:12:20"
          statusColor={COLORS.ultraViolet}
        />

        {/* 2. Uploading Status */}
        <StatusBarCard
          title="Uploading Status"
          iconName="cloud-upload-outline"
          statusText="3/10 Clips"
          detailText="Remaining: 7 Clips"
          statusColor={COLORS.ultraViolet}
          progress={75}
        />

        {/* 3. AI Processing Status */}
        <StatusBarCard
          title="AI Processing Status"
          iconName="aperture-outline"
          statusText="Processed: 2 Clips"
          detailText="Pending: 5 Clips"
          statusColor={COLORS.ultraViolet}
        />

        {/* 4. Wearable Device Status */}
        <StatusBarCard
          title="Wearable Device Status"
          iconName="watch-outline"
          statusText="Connected"
          detailText="Device: EM-01"
          statusColor={COLORS.ultraViolet}
        />

        {/* 5. Storage Usage */}
        <StatusBarCard
          title="Storage Usage"
          iconName="server-outline"
          statusText="28 GB used"
          detailText="Available: 100 GB"
          statusColor={COLORS.desertSand} // Use desertSand for storage caution
        />
        
        <View style={{ height: SPACING.s32 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.carbonBlack,
  },
  container: {
    padding: SPACING.s24,
    gap: SPACING.s32,
  },
  sectionTitle: {
    color: COLORS.white,
    marginBottom: SPACING.s12,
    fontWeight: '700',
  },
  statusCard: {
    backgroundColor: `${COLORS.lightLavender}33`,
    padding: SPACING.s16,
    borderRadius: RADIUS.large,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 60,
  },
  textBlock: {
    flex: 1,
  },
  progressBarTrack: {
    height: SPACING.s4,
    backgroundColor: `${COLORS.lightLavender}30`,
    borderRadius: RADIUS.full,
    marginTop: SPACING.s12,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: RADIUS.full,
  }
});

export default SystemStatusScreen;