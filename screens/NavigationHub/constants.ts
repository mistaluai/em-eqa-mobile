import { COLORS } from '@/theme/colors';
import { NavItemData } from './types';

export const NAV_ITEMS: NavItemData[] = [
  {
    id: 'device',
    title: 'Camera Connection',
    description: 'Manage pairing and connection settings.',
    icon: 'camera', // Ionicons name
    screen: 'DeviceConnectionScreen',
    color: COLORS.navDevice
  },
  {
    id: 'timeline',
    title: 'Timeline & Events',
    description: 'Review daily summaries and history.',
    icon: 'calendar',
    screen: 'TimelineEventsScreen',
    color: COLORS.navTimeline
  },
  {
    id: 'sync',
    title: 'Clip Upload & Sync',
    description: 'Monitor cloud synchronization status.',
    icon: 'cloud-upload',
    screen: 'ClipSyncScreen',
    color: COLORS.navSync
  },
  {
    id: 'privacy',
    title: 'Cloud Data Control',
    description: 'Retention rules and deletion.',
    icon: 'cloud',
    screen: 'DataPrivacyScreen',
    color: COLORS.navPrivacy
  },
  {
    id: 'profile',
    title: 'Profile Settings',
    description: 'Personal info and recording triggers.',
    icon: 'person',
    screen: 'ProfileSettingsScreen',
    color: COLORS.navProfile
  },
  {
    id: 'status',
    title: 'System Status',
    description: 'Health, battery, and operations.',
    icon: 'pulse',
    screen: 'SystemStatusScreen',
    color: COLORS.navStatus
  },
  {
    id: 'logout',
    title: 'Log Out',
    description: 'Sign out of your account.',
    icon: 'log-out',
    screen: 'Logout',
    color: COLORS.textSecondary // Neutral color for logout
  },
];