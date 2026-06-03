import { RADIUS, SPACING, useGlobalStyles } from '@/theme';
import { useThemeStyles } from "@/theme/useThemeStyles";
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppButton from '../../components/AppButton';
import AppHeader from '../../components/HeaderComponent';
import { ConnectionStatusCard } from './components/ConnectionStatusCard';
import { useDeviceConnectionLogic } from './hooks/useDeviceConnectionLogic';

// --- Ripple Animation Component ---
const RippleLoader = ({ text }: { text: string }) => {
  const styles = useThemeStyles(createStyles);
  const { COLORS } = useGlobalStyles();
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Continuous spinning for central icon
    Animated.loop(
      Animated.timing(rotateAnim, { toValue: 1, duration: 2500, easing: Easing.linear, useNativeDriver: true })
    ).start();

    // Dual-ring ripple
    Animated.loop(
      Animated.parallel([
        Animated.timing(scaleAnim, { toValue: 2.8, duration: 2200, easing: Easing.out(Easing.ease), useNativeDriver: true }),
        Animated.timing(opacityAnim, { toValue: 0, duration: 2200, easing: Easing.out(Easing.ease), useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.rippleContainer}>
      {/* Dynamic Ripple Layer 1 */}
      <Animated.View style={[styles.rippleCircle, { transform: [{ scale: scaleAnim }], opacity: opacityAnim }]} />
      {/* Dynamic Ripple Layer 2 (Offset start) */}
      <Animated.View style={[styles.rippleCircle, { transform: [{ scale: scaleAnim.interpolate({ inputRange: [0, 1], outputRange: [-0.1, 1] }) }], opacity: opacityAnim.interpolate({ inputRange: [0, 0.8], outputRange: [0.5, 0] }) }]} />

      <View style={styles.centerIcon}>
        <Animated.View style={{ transform: [{ rotate: spin }] }}>
          <Ionicons name="bluetooth" size={32} color={COLORS.primary} />
        </Animated.View>
      </View>
      <Text style={styles.searchingText}>{text}</Text>
    </View>
  );
};

// --- Main Screen ---
const DeviceConnectionScreen: React.FC = () => {
  const styles = useThemeStyles(createStyles);
  const { SCREEN, COLORS } = useGlobalStyles();
  const {
    status,
    deviceName,
    provisioningStatus,
    ssid,
    setSsid,
    password,
    setPassword,
    ipAddress,
    handleStartScan,
    handleConnect,
    handleProvision,
    handleDisconnect,
  } = useDeviceConnectionLogic();

  // Helper to render the primary visual area based on state
  const renderVisualArea = () => {
    switch (status) {
      case 'scanning':
        return <RippleLoader text={provisioningStatus || "Scanning for PiCamera..."} />;

      case 'found':
        return (
          <View style={styles.centeredContainer}>
            <View style={styles.visualBadgeSuccess}>
              <MaterialCommunityIcons name="camera-outline" size={64} color={COLORS.success} />
            </View>
            <Text style={styles.statusTitle}>Device Located</Text>
            <Text style={styles.statusDescription}>A compatible PiCamera was found nearby.</Text>
            <AppButton
              title="Establish Connection"
              onPress={handleConnect}
              style={{ marginTop: SPACING.s24 }}
              variant="primary"
            />
          </View>
        );

      case 'connected':
        return (
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Initialize Wi-Fi</Text>
            <Text style={styles.formSubtitle}>Provide network credentials to connect the camera.</Text>

            <View style={styles.inputWrapper}>
              <Ionicons name="wifi-outline" size={18} color={COLORS.textSecondary} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Network SSID"
                placeholderTextColor={COLORS.textSecondary}
                value={ssid}
                onChangeText={setSsid}
                autoCorrect={false}
              />
            </View>

            <View style={styles.inputWrapper}>
              <Ionicons name="lock-closed-outline" size={18} color={COLORS.textSecondary} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Network Password"
                placeholderTextColor={COLORS.textSecondary}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
              />
            </View>

            <AppButton
              title="Send Credentials"
              onPress={handleProvision}
              disabled={!ssid || !password}
              style={{ marginTop: SPACING.s16 }}
              variant="primary"
            />
            <View style={styles.provisionStatusWrapper}>
              <View style={styles.pulseDot} />
              <Text style={styles.liveStatusText}>{provisioningStatus || 'Awaiting transmission...'}</Text>
            </View>
          </View>
        );

      case 'provisioned':
        return (
          <View style={styles.centeredContainer}>
            <View style={styles.visualBadgeSuccess}>
              <Ionicons name="checkmark-circle" size={90} color={COLORS.success || '#4CAF50'} />
            </View>
            <Text style={styles.statusTitle}>Authentication Successful</Text>
            <Text style={styles.statusDescription}>Camera is online and accessible at:</Text>
          </View>
        );

      case 'disconnected':
      default:
        return (
          <View style={styles.centeredContainer}>
            <View style={styles.visualBadgeMuted}>
              <Ionicons name="bluetooth-outline" size={72} color={COLORS.textSecondary} />
            </View>
            <Text style={styles.statusTitle}>Ready to Pair</Text>
            <Text style={styles.statusDescription}>Ensure the PiCamera is powered on</Text>
          </View>
        );
    }
  };

  return (
    <SafeAreaView style={SCREEN.safeArea}>
      <AppHeader title="Camera Connection" showBack={true} />

      <View style={styles.container}>
        <View style={styles.visualArea}>
          {renderVisualArea()}
        </View>

        <View style={styles.statusContainer}>
          <ConnectionStatusCard
            status={status}
            deviceName={deviceName}
            deviceIP={ipAddress || 'Disconnected'}
          />
        </View>

        <View style={styles.actionContainer}>
          <AppButton
            title={status === 'disconnected' ? "Initiate Device Discovery" : "Factory Reset & Forget"}
            onPress={status === 'disconnected' ? handleStartScan : handleDisconnect}
            variant={status === 'disconnected' ? "primary" : "secondary"}
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
    // Add a very subtle background variance
    backgroundColor: COLORS.backgroundLight,
  },
  visualArea: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.s24,
  },
  centeredContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  statusContainer: {
    marginBottom: SPACING.s32,
  },
  actionContainer: {
    marginBottom: SPACING.s32,
  },
  // Visuals Badges
  visualBadgeMuted: {
    padding: SPACING.s32,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.backgroundNeutral,
    marginBottom: SPACING.s24,
    borderColor: COLORS.borderLight,
    borderWidth: 1,
  },
  visualBadgeSuccess: {
    padding: SPACING.s24,
    borderRadius: RADIUS.full,
    backgroundColor: 'rgba(76, 175, 80, 0.1)', // Subtle Success backdrop
    marginBottom: SPACING.s24,
    borderColor: COLORS.success,
    borderWidth: 2,
  },
  // Dynamic visual states text
  statusTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.s8,
  },
  statusDescription: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.s12,
  },
  // Ripple Styles
  rippleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 250,
    height: 250,
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
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: COLORS.backgroundNeutral,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    borderWidth: 2,
    borderColor: COLORS.primary,
    elevation: 20, // Premium shadow
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
  },
  searchingText: {
    marginTop: 150, // Spacing from central icon
    color: COLORS.textSecondary,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 1,
    textTransform: 'uppercase',
    fontSize: 12,
  },
  // Form Styles (Refined "Card" look)
  formContainer: {
    width: '100%',
    padding: SPACING.s24,
    backgroundColor: COLORS.backgroundNeutral, // Deep Surface
    borderRadius: RADIUS.large + 4,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 18,
    elevation: 8,
  },
  formTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.s8,
    textAlign: 'center',
  },
  formSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: SPACING.s24,
    textAlign: 'center',
  },
  // Refined Input
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundLight,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    borderRadius: RADIUS.default,
    paddingHorizontal: SPACING.s16,
    marginBottom: SPACING.s16,
  },
  inputIcon: {
    marginRight: SPACING.s12,
  },
  input: {
    flex: 1,
    paddingVertical: SPACING.s12 + 2,
    color: COLORS.textPrimary,
    fontSize: 15,
  },
  // Form feedback
  provisionStatusWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.s16,
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.warning,
    marginRight: SPACING.s10,
  },
  liveStatusText: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: '500',
  },
  // Provisioned success IP
  ipBadge: {
    marginTop: SPACING.s12,
    backgroundColor: COLORS.backgroundNeutral,
    paddingHorizontal: SPACING.s24,
    paddingVertical: SPACING.s12,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.success,
  },
  ipText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: COLORS.success || '#4CAF50',
    letterSpacing: 2,
  }
});

export default DeviceConnectionScreen;