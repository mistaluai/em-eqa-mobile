import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../../components/HeaderComponent';
import { COLORS } from '../../theme/colors';
import { SPACING } from '../../theme/styles';
import { StatusBarCard } from './components/StatusBarCard';

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
        <StatusBarCard
          title="Recording Status"
          iconName="mic-outline"
          statusText="Active"
          detailText="Timer: 00:12:20"
          statusColor={COLORS.ultraViolet}
        />

        <StatusBarCard
          title="Uploading Status"
          iconName="cloud-upload-outline"
          statusText="3/10 Clips"
          detailText="Remaining: 7 Clips"
          statusColor={COLORS.ultraViolet}
          progress={75}
        />

        <StatusBarCard
          title="AI Processing Status"
          iconName="aperture-outline"
          statusText="Processed: 2 Clips"
          detailText="Pending: 5 Clips"
          statusColor={COLORS.ultraViolet}
        />

        <StatusBarCard
          title="Wearable Device Status"
          iconName="watch-outline"
          statusText="Connected"
          detailText="Device: EM-01"
          statusColor={COLORS.ultraViolet}
        />

        <StatusBarCard
          title="Storage Usage"
          iconName="server-outline"
          statusText="28 GB used"
          detailText="Available: 100 GB"
          statusColor={COLORS.desertSand}
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
});

export default SystemStatusScreen;

