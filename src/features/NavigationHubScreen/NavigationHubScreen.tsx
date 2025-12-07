import AppHeader from '@/src/components/HeaderComponent';
import { COLORS } from '@/src/theme/colors';
import { SPACING } from '@/src/theme/styles';
import React from 'react';
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useNavigationHubLogic } from '../NavigationHubScreen/hooks/useNavigationHubLogic'; // ← Import your hook
import { NAV_ITEMS } from './constants';

// --- Type Definitions ---
interface NavItemData {
  id: string;
  title: string;
  description: string;
  icon: string;
  screen: string;
  color: string;
}

interface NavItemProps {
  item: NavItemData;
  handlePress: (screenName: string) => void;
}

interface LogoutItemProps {
  handlePress: (screenName: string) => void;
}

// --- Navigation Item Component ---
const NavItem: React.FC<NavItemProps> = ({ item, handlePress }) => {
  return (
    <TouchableOpacity 
      style={styles.navItemContainer}
      onPress={() => handlePress(item.screen)}
      activeOpacity={0.7}
    >
      <View style={[styles.iconWrapper, { backgroundColor: item.color }]}>
        <Text style={styles.icon}>{item.icon}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>{item.title}</Text>
        <Text style={styles.descriptionText}>{item.description}</Text>
      </View>
      <Text style={styles.chevron}>&gt;</Text>
    </TouchableOpacity>
  );
};

// --- Logout Item Component ---
const LogoutItem: React.FC<LogoutItemProps> = ({ handlePress }) => {
  return (
    <TouchableOpacity 
      style={styles.navItemContainer}
      onPress={() => handlePress('Logout')}
      activeOpacity={0.7}
    >
      <View style={[styles.iconWrapper, { backgroundColor: '#e5e7eb' }]}>
        <Text style={[styles.icon, { color: '#4b5563' }]}>🚪</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>Log Out</Text>
        <Text style={styles.descriptionText}>Securely sign out of your current account session.</Text>
      </View>
      <Text style={styles.chevron}>&gt;</Text>
    </TouchableOpacity>
  );
};

// --- Main Screen Component ---
const NavigationHubScreen: React.FC = () => {
  const { handleCardPress, handleGoBack } = useNavigationHubLogic();

  return (
    <SafeAreaView style={styles.safeArea}>
      
      {/* Header */}
      <AppHeader title="Navigation Hub" showBack={true}  />

        {/* Navigation List Container */}
        <View style={styles.listContainer}>
          {NAV_ITEMS.map(item => (
            <React.Fragment key={item.id}>
              <NavItem 
                item={item} 
                handlePress={handleCardPress} 
              />
              <View style={styles.separator} /> 
            </React.Fragment>
          ))}

          {/* Logout Item */}
          <LogoutItem handlePress={handleCardPress} />
        </View>
      

    </SafeAreaView>
  );
};

// --- Stylesheet ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    paddingTop: Platform.OS === 'android' ? 16 : 0,
    backgroundColor: COLORS.backgroundLight,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight, 
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 16,
  },
  listContainer: {
    backgroundColor: COLORS.backgroundLight,
    borderRadius: 12,
    marginTop: SPACING.s24,
  },
  navItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.s16,
    paddingHorizontal: SPACING.s16,
    backgroundColor: COLORS.backgroundLight,
  },
  separator: {
    height: 1,
    backgroundColor: COLORS.borderLight,
    marginHorizontal: SPACING.s16,
    marginVertical: SPACING.s12,
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    flexShrink: 0,
  },
  icon: {
    fontSize: 22,
    color: '#ffffff',
    marginTop: Platform.OS === 'ios' ? 2 : 0,
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  titleText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  descriptionText: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  chevron: {
    fontSize: 20,
    fontWeight: '300',
    color: '#9ca3af',
    marginLeft: 'auto',
  },
});

export default NavigationHubScreen;
