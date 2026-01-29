import { DRAWER, SPACING, TYPOGRAPHY } from '@/src/theme';
import { COLORS } from '@/src/theme/colors';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

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
    <View style={DRAWER.container}>
      <View style={DRAWER.header}>
        <Text style={[TYPOGRAPHY.HeadlineM, { color: COLORS.textPrimary }]}>EM-EQA Menu</Text>
        <Pressable onPress={onClose} style={styles.closeButton}>
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
          style={DRAWER.item}
        >
          <Ionicons name={item.icon as any} size={24} color={COLORS.primary} />
          <Text style={[TYPOGRAPHY.BodyM, DRAWER.itemText, { color: COLORS.textPrimary }]}>
            {item.name}
          </Text>
        </Pressable>
      ))}

      <View style={styles.spacer} />

      <Pressable onPress={() => navigation.navigate('Login' as never)} style={DRAWER.item}>
        <Ionicons name="log-out-outline" size={24} color={COLORS.primary} />
        <Text style={[TYPOGRAPHY.BodyM, { color: COLORS.textPrimary }, styles.logoutText]}>
          Log Out
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  closeButton: {
    padding: SPACING.s8,
  },
  spacer: {
    marginTop: 6,
  },
  logoutText: {
    marginLeft: SPACING.s12,
  },
});