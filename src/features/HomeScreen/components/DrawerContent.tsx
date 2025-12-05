import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
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
        <Text style={[TYPOGRAPHY.HeadlineM, { color: COLORS.white }]}>EM-EQA Menu</Text>
        <Pressable onPress={onClose} style={{ padding: SPACING.s8 }}>
          <Ionicons name="close-outline" size={32} color={COLORS.white} />
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
          <Ionicons name={item.icon as any} size={24} color={COLORS.lightLavender} />
          <Text style={[TYPOGRAPHY.BodyM, styles.drawerItemText]}>{item.name}</Text>
        </Pressable>
      ))}
      <View style={{ flex: 1 }} />
      <Pressable onPress={() => navigation.navigate('Login' as never)} style={styles.drawerItem}>
        <Ionicons name="log-out-outline" size={24} color={COLORS.desertSand} />
        <Text style={[TYPOGRAPHY.BodyM, { color: COLORS.desertSand, marginLeft: SPACING.s12 }]}>Log Out</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: COLORS.carbonBlack,
    padding: SPACING.s24,
  },
  drawerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.s32,
    paddingTop: SPACING.s12,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.s16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.gray700,
  },
  drawerItemText: {
    color: COLORS.white,
    marginLeft: SPACING.s12,
    fontWeight: '600',
  },
});

