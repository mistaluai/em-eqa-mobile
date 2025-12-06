import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
// CHECK THIS PATH: Ensure it matches your folder structure exactly
import { COLORS } from '../../../theme/colors';
import { SPACING, TYPOGRAPHY } from '../../../theme/styles';

interface NavItem {
  name: string;
  icon: string;
  screen: string;
}

const NAV_ITEMS: NavItem[] = [
  { name: 'Device Connection', icon: 'bluetooth-outline', screen: 'DeviceConnection' },
  { name: 'Timeline & Events', icon: 'calendar-outline', screen: 'TimelineEvents' },
  { name: 'Data Privacy & Control', icon: 'lock-closed-outline', screen: 'PrivacyDataControl' },
  { name: 'Clip Upload & Sync', icon: 'cloud-upload-outline', screen: 'ClipUploadSync' },
  { name: 'Profile & Recording Settings', icon: 'person-circle-outline', screen: 'ProfileSettings' },
  { name: 'System Status', icon: 'pulse-outline', screen: 'SystemStatus' },
];

interface DrawerContentProps {
  onClose: () => void;
}

export const DrawerContent: React.FC<DrawerContentProps> = ({ onClose }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.drawerContainer}>
      <View style={styles.drawerHeader}>
        {/* Added explicit color: 'white' to debug theme issues */}
        <Text style={[TYPOGRAPHY.HeadlineM, { color: COLORS.white || 'white' }]}>
          EM-EQA Menu
        </Text>
        <Pressable onPress={onClose} style={{ padding: SPACING.s8 }}>
          <Ionicons name="close-outline" size={32} color={COLORS.white || 'white'} />
        </Pressable>
      </View>

      {NAV_ITEMS.map((item) => (
        <Pressable
          key={item.name}
          onPress={() => {
            navigation.navigate(item.screen as never);
            onClose();
          }}
          style={styles.drawerItem}
        >
          <Ionicons
            name={item.icon as any}
            size={24}
            // Fallback to white if COLORS.lightLavender is undefined
            color={COLORS.lightLavender || 'white'}
          />
          <Text style={[
            TYPOGRAPHY.BodyM,
            styles.drawerItemText,
            // Ensure color is applied even if style fails
            { color: COLORS.white || 'white' }
          ]}>
            {item.name}
          </Text>
        </Pressable>
      ))}

      {/* Replaced flex: 1 spacer with a fixed margin if needed, or remove it */}
      <View style={{ marginTop: 20 }} />

      <Pressable onPress={() => navigation.navigate('Login' as never)} style={styles.drawerItem}>
        <Ionicons name="log-out-outline" size={24} color={COLORS.desertSand || 'red'} />
        <Text style={[
          TYPOGRAPHY.BodyM,
          { color: COLORS.desertSand || 'red', marginLeft: SPACING.s12 }
        ]}>
          Log Out
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    // REMOVED flex: 1. This prevents the modal from collapsing or clipping.
    width: '100%',
    backgroundColor: COLORS.carbonBlack || '#121212', // Fallback color
    padding: SPACING.s24,
  },
  drawerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.s32,
    // Ensure padding doesn't push it off screen
    paddingTop: SPACING.s12,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.s16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.gray700 || '#333',
  },
  drawerItemText: {
    color: COLORS.white || 'white',
    marginLeft: SPACING.s12,
    fontWeight: '600',
  },
});