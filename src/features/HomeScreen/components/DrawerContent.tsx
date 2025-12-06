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
        {/* UI CHANGE: Text color from white to textPrimary */}
        <Text style={[TYPOGRAPHY.HeadlineM, { color: COLORS.textPrimary }]}>
          EM-EQA Menu
        </Text>
        <Pressable onPress={onClose} style={{ padding: SPACING.s8 }}>
          {/* UI CHANGE: Icon color from white to textPrimary */}
          <Ionicons name="close-outline" size={32} color={COLORS.textPrimary} />
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
            // UI CHANGE: Icon color from lightLavender to primary
            color={COLORS.primary}
          />
          <Text style={[
            TYPOGRAPHY.BodyM,
            styles.drawerItemText,
            // UI CHANGE: Text color from white to textPrimary
            { color: COLORS.textPrimary }
          ]}>
            {item.name}
          </Text>
        </Pressable>
      ))}

      {/* Replaced flex: 1 spacer with a fixed margin if needed, or remove it */}
      <View style={{ marginTop: 6 }} />

      <Pressable onPress={() => navigation.navigate('Login' as never)} style={styles.drawerItem}>
        {/* UI CHANGE: Icon color from desertSand to secondary */}
        <Ionicons name="log-out-outline" size={24} color={COLORS.primary} />
        <Text style={[
          TYPOGRAPHY.BodyM,
          // UI CHANGE: Text color from desertSand to secondary
          { color: COLORS.textPrimary, marginLeft: SPACING.s12 }
        ]}>
          Log Out
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    width: '100%',
    backgroundColor: COLORS.backgroundLight,
    padding: SPACING.s24,
   position: 'absolute',
    direction:'ltr'
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
    // UI CHANGE: Border color from gray700 to borderLight
    borderBottomColor: COLORS.borderDark,
  },
  drawerItemText: {
    // UI CHANGE: Text color from white to textPrimary
    color: COLORS.textPrimary,
    marginLeft: SPACING.s12,
    fontWeight: '600',
  },
});