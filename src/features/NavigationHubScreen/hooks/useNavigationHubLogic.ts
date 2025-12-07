import { useNavigation } from '@react-navigation/native';

/**
 * Navigation logic for NavigationHubScreen
 * Dynamically routes each card to its appropriate screen.
 */
export const useNavigationHubLogic = () => {
  const navigation = useNavigation();

  // Unified map for card keys → actual navigation routes
  const screenMap: Record<string, string> = {
    DeviceConnectionScreen: 'DeviceConnection',
    HomeScreen: 'Home',
    TimelineEventsScreen: 'TimelineEvents',
    DataPrivacyScreen: 'PrivacyDataControl',
    ClipSyncScreen: 'ClipUploadSync',
    ProfileSettingsScreen: 'ProfileSettings',
    SystemStatusScreen: 'SystemStatus',
    Logout: 'Login',
  };

  /** 
   * Handles navigating to the correct screen
   * Falls back to using the original name if no mapping exists
   */
  const handleCardPress = (screenName: string) => {
    const target = screenMap[screenName] ?? screenName;
    navigation.navigate(target as never);
  };

  const handleGoBack = () => {
navigation.navigate('Home' as never);  };

  return {
    handleCardPress,
    handleGoBack,
  };
};
