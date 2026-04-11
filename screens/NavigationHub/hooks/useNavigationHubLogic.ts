import { useAuthStore } from '@/services/databases/supabase/supabaseAuth';
import { useNavigation } from '@react-navigation/native';
/**
 * Navigation logic for NavigationHubScreen
 * Dynamically routes each card to its appropriate screen or action.
 */
export const useNavigationHubLogic = () => {
  const navigation = useNavigation();

  // 2. Destructure the signOut function
  const { signOut } = useAuthStore();

  // Unified map for card keys → actual navigation routes
  const screenMap: Record<string, string> = {
    DeviceConnectionScreen: 'DeviceConnection',
    HomeScreen: 'Home',
    TimelineEventsScreen: 'TimelineEvents',
    DataPrivacyScreen: 'PrivacyDataControl',
    ClipSyncScreen: 'ClipUploadSync',
    ProfileSettingsScreen: 'ProfileSettings',
    SystemStatusScreen: 'SystemStatus',
    // Logout mapping is no longer needed since we handle it explicitly below
  };

  /** * Handles navigating to the correct screen OR signing out
   */
  const handleCardPress = async (screenName: string) => {
    // 3. Intercept the 'Logout' action defined in constants.ts
    if (screenName === 'Logout') {
      await signOut();
      // No need to navigate manually. 
      // app/index.tsx detects the session change and swaps to the Auth Stack automatically.
      return;
    }

    // Standard navigation for other items
    const target = screenMap[screenName] ?? screenName;
    navigation.navigate(target as never);
  };

  const handleGoBack = () => {
    navigation.navigate('Home' as never);
  };

  return {
    handleCardPress,
    handleGoBack,
  };
};