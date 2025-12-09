import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppButton from '../../components/AppButton';
import AppHeader from '../../components/HeaderComponent';
import { SCREEN } from '../../theme';
import { COLORS } from '../../theme/colors';
import { DeviceConnectionScreenStyles } from '../../theme/styles/DeviceConnectionScreen/DeviceConnectionScreenStyle';
import { ConnectionStatusCard } from './components/ConnectionStatusCard';
import { LivePreviewBox } from './components/LivePreviewBox';
import { useDeviceConnectionLogic } from './hooks/useDeviceConnectionLogic';

// --- Ripple Animation Component ---
const RippleLoader = () => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 2.5,
          duration: 2000,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 2000,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <View style={DeviceConnectionScreenStyles.rippleContainer}>
      {/* The Ripple Circle */}
      <Animated.View
        style={[
          DeviceConnectionScreenStyles.rippleCircle,
          {
            transform: [{ scale: scaleAnim }],
            opacity: opacityAnim
          }
        ]}
      />
      {/* The Central Icon (Static) */}
      <View style={DeviceConnectionScreenStyles.centerIcon}>
        <Ionicons name="wifi" size={32} color={COLORS.primary} />
      </View>
      <Text style={DeviceConnectionScreenStyles.searchingText}>Searching for Device...</Text>
    </View>
  );
};

// --- Main Screen ---
const DeviceConnectionScreen: React.FC = () => {
  const { status, deviceName, deviceModel, batteryLevel, handleReconnect } = useDeviceConnectionLogic();
  const isConnected = status === 'connected';

  return (
    <SafeAreaView style={SCREEN.safeArea}>
      <AppHeader title="Device Connection" showBack={true} />

      <View style={DeviceConnectionScreenStyles.container}>
        {/* 1. Main Visual Area (Scanner or Preview) */}
        <View style={DeviceConnectionScreenStyles.visualArea}>
          {isConnected ? (
            <LivePreviewBox isActive={true} />
          ) : (
            <RippleLoader />
          )}
        </View>

        {/* 2. Status Overlay / Card */}
        {/* We position this slightly overlapping or right below for the integrated look */}
        <View style={DeviceConnectionScreenStyles.statusContainer}>
          <ConnectionStatusCard
            status={status}
            deviceName={deviceName}
            deviceModel={deviceModel}
            batteryLevel={batteryLevel}
          />
        </View>

        {/* 3. Actions */}
        <View style={DeviceConnectionScreenStyles.actionContainer}>
          <AppButton
            title={isConnected ? "Disconnect Device" : "Retry Connection"}
            onPress={handleReconnect}
            variant={isConnected ? "secondary" : "primary"}
            style={{ width: '100%' }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DeviceConnectionScreen;