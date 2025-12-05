import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppButton from '../components/AppButton';
import AppCard from '../components/AppCard';
import AppHeader from '../components/HeaderComponent';
import { COLORS } from '../theme/colors';
import { RADIUS, SHADOW, SPACING, TYPOGRAPHY } from '../theme/styles';

const { width } = Dimensions.get('window');

const DeviceConnectionScreen: React.FC = () => {
  const navigation = useNavigation();
  const [status, setStatus] = useState<'connected' | 'disconnected'>('connected');
  const deviceName = 'EM-EQA Pro 001';

  const handleReconnect = () => {
    // Mock reconnection logic
    setStatus('disconnected');
    setTimeout(() => setStatus('connected'), 2000);
  };

  const statusColor = status === 'connected' ? COLORS.ultraViolet : COLORS.desertSand;
  const statusText = status === 'connected' ? 'Connected' : 'Disconnected';
  const statusIcon = status === 'connected' ? 'wifi' : 'warning';

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader
        title="Device Connection"
        showBack={true}
        // Mocking a menu icon to match the request
        rightIconName="menu-outline"
        onRightIconPress={() => console.log('Open Menu')}
      />

      <View style={styles.container}>
        <View style={styles.livePreviewBox}>
          <Text style={[TYPOGRAPHY.BodyL, { color: COLORS.gray700 }]}>Live Preview Placeholder (16:9)</Text>
          <Ionicons name="videocam-outline" size={60} color={COLORS.gray700} style={{ marginTop: SPACING.s12 }} />
        </View>

        <AppCard style={styles.statusCard}>
          <View style={styles.statusRow}>
            <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
            <Text style={[TYPOGRAPHY.BodyM, { color: statusColor, fontWeight: '700' }]}>
              {statusText}
            </Text>
            <Text style={[TYPOGRAPHY.Caption, styles.deviceName]}>{deviceName}</Text>
          </View>
          <View style={styles.statusRow}>
            <Ionicons name={statusIcon as any} size={24} color={statusColor} style={{ marginRight: SPACING.s8 }} />
            <Text style={[TYPOGRAPHY.BodyM, { color: COLORS.softGray }]}>
              Last Check: {new Date().toLocaleTimeString()}
            </Text>
          </View>
        </AppCard>

        <AppButton
          title="Reconnect Device"
          onPress={handleReconnect}
          disabled={status === 'connected'}
          style={styles.reconnectButton}
        />

        <View style={{ flex: 1 }} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.carbonBlack,
  },
  container: {
    flex: 1,
    padding: SPACING.s24,
    alignItems: 'center',
  },
  livePreviewBox: {
    width: '90%',
    aspectRatio: 16 / 9,
    backgroundColor: COLORS.gray700,
    borderRadius: RADIUS.large,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.s32,
    ...SHADOW.default,
  },
  statusCard: {
    width: '100%',
    marginBottom: SPACING.s32,
    gap: SPACING.s12,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: RADIUS.full,
    marginRight: SPACING.s8,
  },
  deviceName: {
    color: COLORS.softGray,
    marginLeft: SPACING.s16,
    flex: 1,
    textAlign: 'right',
  },
  reconnectButton: {
    width: '100%',
  }
});

export default DeviceConnectionScreen;