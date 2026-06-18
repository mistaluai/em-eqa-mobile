import { useThemeStyles } from '@/theme/useThemeStyles';
import { useThemeColor } from '@/theme/useThemeColor';
import { SPACING } from '@/theme';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { DeviceEventEmitter, StyleSheet, Text, View } from 'react-native';
import AppModal from './ModalComponent';
import AppButton from './AppButton';
import { innerNavigation } from '@/app/index';

const GlobalConnectionLostModal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const styles = useThemeStyles(createStyles);
  const COLORS = useThemeColor();

  useEffect(() => {
    const showSub = DeviceEventEmitter.addListener('showConnectionLostModal', () => {
      setIsVisible(true);
    });
    const hideSub = DeviceEventEmitter.addListener('hideConnectionLostModal', () => {
      setIsVisible(false);
    });
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const handleReconnect = () => {
    setIsVisible(false);
    // Navigate to the connection screen using the inner stack navigator
    if (innerNavigation) {
      innerNavigation.navigate('DeviceConnection');
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
  };

  return (
    <AppModal
      isVisible={isVisible}
      onClose={handleDismiss}
      position="center"
    >
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Ionicons name="wifi-outline" size={48} color={COLORS.warning || '#ef4444'} />
        </View>
        <Text style={styles.title}>Connection Lost</Text>
        <Text style={styles.description}>
          Connection to the Raspberry Pi was lost. Please check your connection and make sure you are on the same Wi-Fi network.
        </Text>
        <View style={styles.buttonContainer}>
          <AppButton
            title="Reconnect"
            variant="primary"
            onPress={handleReconnect}
            style={styles.button}
          />
          <AppButton
            title="Dismiss"
            variant="secondary"
            onPress={handleDismiss}
            style={styles.button}
          />
        </View>
      </View>
    </AppModal>
  );
};

const createStyles = (COLORS: any) => StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: SPACING.s8,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.s16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: SPACING.s12,
    textAlign: 'center',
  },
  description: {
    fontSize: 15,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.s24,
    lineHeight: 22,
  },
  buttonContainer: {
    width: '100%',
    gap: SPACING.s12,
  },
  button: {
    width: '100%',
  },
});

export default GlobalConnectionLostModal;
