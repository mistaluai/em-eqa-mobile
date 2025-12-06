import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppButton from '../../components/AppButton';
import AppHeader from '../../components/HeaderComponent';
import { COLORS } from '../../theme/colors';
import { SPACING } from '../../theme/styles';
import { ConnectionStatusCard } from './components/ConnectionStatusCard';
import { LivePreviewBox } from './components/LivePreviewBox';

const DeviceConnectionScreen: React.FC = () => {
  const navigation = useNavigation();
  const [status, setStatus] = useState<'connected' | 'disconnected'>('connected');
  const deviceName = 'EM-EQA Pro 001';

  const handleReconnect = () => {
    setStatus('disconnected');
    setTimeout(() => setStatus('connected'), 2000);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader
        title="Device Connection"
        showBack={true}
      />

      <View style={styles.container}>
        <LivePreviewBox />

        <ConnectionStatusCard
          status={status}
          deviceName={deviceName}
          lastCheckTime={new Date().toLocaleTimeString()}
        />

        <AppButton
          title="Reconnect Device" 
          //variant='primary'
          onPress={handleReconnect}
          disabled={status === 'connected'}
          style={styles.reconnectButton }
          
        />

        <View style={{ flex: 1 }} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    // Switched background from COLORS.carbonBlack to COLORS.backgroundLight
    backgroundColor: COLORS.backgroundLight,
  },
  container: {
    flex: 1,
    padding: SPACING.s24,
    alignItems: 'center',
  },
  reconnectButton: {
    width: '80%',
    borderColor: COLORS.primary,
    borderWidth: 2,
    marginTop: SPACING.s16,
    //backgroundColor: COLORS.primary,
    backgroundColor: COLORS.primary,
    marginHorizontal: SPACING.s24,
    paddingHorizontal: SPACING.s12,
    
  },
});

export default DeviceConnectionScreen;