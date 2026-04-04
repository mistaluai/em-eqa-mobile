import { useThemeStyles } from "@/theme/useThemeStyles";
import { useThemeColor } from "@/theme/useThemeColor";
import { SCREEN, SPACING } from '@/theme';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppButton from '../../components/AppButton';
import AppHeader from '../../components/HeaderComponent';
import { ConnectionStatusCard } from './components/ConnectionStatusCard';
import { LivePreviewBox } from './components/LivePreviewBox';
import { useDeviceConnectionLogic } from './hooks/useDeviceConnectionLogic';

// --- Ripple Animation Component ---
const RippleLoader = () => {
  const styles = useThemeStyles(createStyles);
  const COLORS = useThemeColor();
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
    <View style={styles.rippleContainer}>
      {/* The Ripple Circle */}
      <Animated.View
        style={[
          styles.rippleCircle,
          {
            transform: [{ scale: scaleAnim }],
            opacity: opacityAnim
          }
        ]}
      />
      {/* The Central Icon (Static) */}
      <View style={styles.centerIcon}>
        <Ionicons name="wifi" size={32} color={COLORS.primary} />
      </View>
      <Text style={styles.searchingText}>Searching for Device...</Text>
    </View>
  );
};

// --- Main Screen ---
const DeviceConnectionScreen: React.FC = () => {
  const styles = useThemeStyles(createStyles);
  const COLORS = useThemeColor();
  const { status, deviceName, deviceModel, batteryLevel, handleReconnect } = useDeviceConnectionLogic();
  const isConnected = status === 'connected';

  return (
    <SafeAreaView style={SCREEN.safeArea}>
      <AppHeader title="Device Connection" showBack={true} />

      <View style={styles.container}>
        {/* 1. Main Visual Area (Scanner or Preview) */}
        <View style={styles.visualArea}>
          {isConnected ? (
            <LivePreviewBox isActive={true} />
          ) : (
            <RippleLoader />
          )}
        </View>

        {/* 2. Status Overlay / Card */}
        {/* We position this slightly overlapping or right below for the integrated look */}
        <View style={styles.statusContainer}>
          <ConnectionStatusCard
            status={status}
            deviceName={deviceName}
            deviceModel={deviceModel}
            batteryLevel={batteryLevel}
          />
        </View>

        {/* 3. Actions */}
        <View style={styles.actionContainer}>
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

const createStyles = (COLORS: any) => StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SPACING.s24,
    paddingTop: SPACING.s24,
  },
  visualArea: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.s24,
  },
  statusContainer: {
    marginBottom: SPACING.s32,
  },
  actionContainer: {
    marginBottom: SPACING.s32,
  },
  // Ripple Styles
  rippleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    height: 200,
  },
  rippleCircle: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.primaryLight,
    zIndex: 1,
  },
  centerIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.backgroundLight,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  searchingText: {
    marginTop: 140, // Push below the circle
    color: COLORS.textSecondary,
    fontWeight: '600',
    letterSpacing: 1,
  },
});

export default DeviceConnectionScreen;