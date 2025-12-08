import { COLORS } from '../../theme/colors';
import { NavItemData } from './types';

// NOTE: Using emojis and symbols as placeholders for icons.
export const NAV_ITEMS: NavItemData[] = [
  { 
    id: 'device', 
    title: 'Device Connection', 
    description: 'Manage pairing and connection settings for your external devices.', 
    //icon: '🔗',
    screen: 'DeviceConnectionScreen',
    color: COLORS.navDevice
  },
  { 
    id: 'timeline', 
    title: 'Timeline & Events', 
    description: 'Review and search through your summarized daily events and history.', 
   // icon: '🗓️',
    screen: 'TimelineEventsScreen',
    color: COLORS.navTimeline
  },
  { 
    id: 'privacy', 
    title: 'Data Privacy & Control', 
    description: 'Adjust permissions, data retention, and sharing settings.', 
   // icon: '🛡️',
    screen: 'DataPrivacyScreen',
    color: COLORS.navPrivacy
  },
  { 
    id: 'sync', 
    title: 'Clip Upload & Sync', 
    description: 'Monitor and control the synchronization of recorded clips to the cloud.', 
    //icon: '☁️',
    screen: 'ClipSyncScreen',
    color: COLORS.navSync
  },
  { 
    id: 'profile', 
    title: 'Profile & Recording Settings', 
    description: 'Update personal information and configure recording preferences.', 
   // icon: '👤',
    screen: 'ProfileSettingsScreen',
    color: COLORS.navProfile
  },
  { 
    id: 'status', 
    title: 'System Status', 
    description: 'Check the health, battery, and real-time operational status of the app.', 
    //icon: '🩺',
    screen: 'SystemStatusScreen',
    color: COLORS.navStatus
  },
  { 
    id: 'logout', 
    title: 'Log Out', 
    description: 'Securely sign out of your current account session.', 
    //icon: '🚪',
    screen: 'Logout',
    color: COLORS.navLogoutBg
  },
];