import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppButton from '../../components/AppButton';
import AppHeader from '../../components/HeaderComponent';
import { SCREEN } from '../../theme/styles';
import { ConnectionStatusCard } from './components/ConnectionStatusCard';
import { LivePreviewBox } from './components/LivePreviewBox';
import { useDeviceConnectionLogic } from './hooks/useDeviceConnectionLogic';

/**
 * DeviceConnectionScreen - Main screen component for device connection
 * Handles composition and rendering using hooks and components
 */
const DeviceConnectionScreen: React.FC = () => {
  const { status, deviceName, handleReconnect } = useDeviceConnectionLogic();

  return (
    <SafeAreaView style={SCREEN.safeArea}>
      <AppHeader title="Device Connection" showBack={true} />

      <View style={SCREEN.deviceConnectionContainer}>
        <LivePreviewBox />

        <ConnectionStatusCard
          status={status}
          deviceName={deviceName}
          lastCheckTime={new Date().toLocaleTimeString()}
        />

        <AppButton
          title="Reconnect Device"
          onPress={handleReconnect}
          disabled={status === 'connected'}
          style={SCREEN.deviceReconnectButton}
        />

        <View style={{ flex: 1 }} />
      </View>
    </SafeAreaView>
  );
};

export default DeviceConnectionScreen;