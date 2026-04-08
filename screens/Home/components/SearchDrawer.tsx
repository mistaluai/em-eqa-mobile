import { useThemeStyles } from "@/theme/useThemeStyles";
import { useThemeColor } from "@/theme/useThemeColor";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// 1. IMPORT STORES AND COMPONENT
import { LAYOUT, SPACING } from '@/theme';
import { Avatar } from '../../../components/Avatar';
import { useAuthStore } from '../../../services/auth/supabaseAuth';
import { useAvatarMedia } from '../../../shared/hooks/useAvatarMedia';
import { useDebounce } from '../hooks/useDebounce';
import Chat from '../../../services/databases/watermelondb/models/Chat';
import { localDatabase } from '../../../services/databases/watermelondb/database';
import { Q } from '@nozbe/watermelondb';
import { withObservables } from '@nozbe/watermelondb/react';

const { width } = Dimensions.get('window');
const DRAWER_WIDTH = width * 0.85;

interface SearchDrawerProps {
  visible: boolean;
  onClose: () => void;
  onChatSelect: (chat: Chat | null) => void;
}

// ... MenuItem and ChatHistoryItem components remain the same ...
const MenuItem = (
  { icon, label, onPress, isNewChat = false }: { icon: string, label: string, onPress?: () => void, isNewChat?: boolean }
) => {
  const styles = useThemeStyles(createStyles);
  const COLORS = useThemeColor();

  return (
    <TouchableOpacity style={[LAYOUT.flexRowCenter, styles.menuItem]} onPress={onPress}>
      <Ionicons name={icon as any} size={20} color={COLORS.textPrimary} style={styles.menuIcon} />
      <Text style={[styles.menuLabel, isNewChat && styles.newChatLabel]}>{label}</Text>
      {isNewChat && (
        <View style={styles.newChatIconContainer}>
          <Ionicons name="create-outline" size={20} color={COLORS.textPrimary} />
        </View>
      )}
    </TouchableOpacity>
  );
};

const ChatHistoryItem = ({ title, onPress }: { title: string, onPress: () => void }) => {
  const styles = useThemeStyles(createStyles);
  const COLORS = useThemeColor();

  return (
    <TouchableOpacity style={styles.chatItem} onPress={onPress}>
      <Text style={styles.chatItemText} numberOfLines={1}>{title}</Text>
    </TouchableOpacity>
  );
};

// --- Updated Content Component ---
const ObservableChatListComponent = ({ chats, onChatSelect }: { chats: Chat[], onChatSelect: (chat: Chat | null) => void }) => {
  const styles = useThemeStyles(createStyles);

  return (
    <>
      <View style={styles.sectionTitleContainer}>
        <Text style={styles.sectionTitle}>Today</Text>
      </View>

      {/* 3. Scrollable Chat History */}
      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {chats.map((chat) => (
          <ChatHistoryItem key={chat.id} title={chat.title} onPress={() => onChatSelect(chat)} />
        ))}
      </ScrollView>
    </>
  );
};

const ObservableChatList = withObservables(['searchQuery'], ({ searchQuery }: { searchQuery: string }) => ({
  chats: localDatabase.collections.get<Chat>('chats').query(
    ...Chat.buildSearchQuery(searchQuery)
  ).observe(),
}))(ObservableChatListComponent);

const DrawerSidebarLayout = ({ onNavigate, onChatSelect }: { onNavigate: (screen: string) => void, onChatSelect: (chat: Chat | null) => void }) => {
  const styles = useThemeStyles(createStyles);
  const COLORS = useThemeColor();

  // 2. GET USER DATA
  const { full_name } = useAuthStore();

  // 3. GET AVATAR DATA
  const { avatarUri } = useAvatarMedia();

  const [searchText, setSearchText] = useState('');
  const debouncedSearchText = useDebounce(searchText, 300);

  const handleProfilePress = () => {
    onNavigate('NavigationHubScreen');
  };

  return (
    <View style={styles.contentContainer}>
      {/* 1. Search Bar Area */}
      <View style={styles.searchContainer}>
        <View style={[LAYOUT.flexRowCenter, styles.searchBar]}>
          <Ionicons name="search" size={20} color={COLORS.textSecondary} style={{ marginRight: 8 }} />
          <TextInput
            style={styles.searchBarInput}
            placeholder="Search"
            placeholderTextColor={COLORS.textSecondary}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
      </View>

      {/* 2. Top Navigation Actions */}
      <View style={styles.topMenuContainer}>
        <MenuItem icon="chatbubble-ellipses-outline" label="New chat" isNewChat={true} onPress={() => onChatSelect(null)} />
        <MenuItem icon="calendar-outline" label="Timeline & Events" onPress={() => onNavigate('TimelineEvents')} />
        <MenuItem icon="camera-outline" label="Camera Connection" onPress={() => onNavigate('DeviceConnection')} />
      </View>

      <ObservableChatList searchQuery={debouncedSearchText} onChatSelect={onChatSelect} />

      {/* 4. Footer User Profile */}
      <Pressable
        onPress={handleProfilePress}
        style={({ pressed }) => [
          LAYOUT.flexRowCenter,
          styles.userProfile,
          { opacity: pressed ? 0.7 : 1 },
        ]}
      >
        <Avatar
          uri={avatarUri}
          size={36}
          style={{
            marginRight: 12,
            elevation: 0,
            shadowOpacity: 0,
            shadowColor: 'transparent',
            shadowOffset: { width: 0, height: 0 },
            shadowRadius: 0
          }}
        />
        <Text style={styles.userName}>
          {full_name || 'User'}
        </Text>
        <Ionicons name="ellipsis-horizontal" size={20} color={COLORS.textSecondary} style={{ marginLeft: 'auto' }} />
      </Pressable>
    </View>
  );
};

// ... The SearchDrawer export remains exactly the same ...
export const SearchDrawer: React.FC<SearchDrawerProps> = ({ visible, onClose, onChatSelect }) => {
  const styles = useThemeStyles(createStyles);
  const COLORS = useThemeColor();
  // ... same animation and modal logic ...
  const navigation = useNavigation<any>();
  const slideAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
          easing: Easing.out(Easing.quad),
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const closeDrawer = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: -DRAWER_WIDTH,
        duration: 250,
        useNativeDriver: true,
        easing: Easing.in(Easing.quad),
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose();
    });
  };

  const handleNavigation = (screenName: string) => {
    closeDrawer();
    setTimeout(() => {
      navigation.navigate(screenName);
    }, 100);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={closeDrawer}
    >
      <Animated.View
        style={[
          styles.backdrop,
          { opacity: fadeAnim }
        ]}
      >
        <Pressable style={LAYOUT.flex1} onPress={closeDrawer} />
      </Animated.View>

      <Animated.View
        style={[
          styles.drawerContainer,
          {
            width: DRAWER_WIDTH,
            transform: [{ translateX: slideAnim }]
          }
        ]}
      >
        <SafeAreaView style={styles.safeAreaContent}>
          <Pressable style={styles.drawerPressable} onPress={(e) => e.stopPropagation()}>
            <DrawerSidebarLayout onNavigate={handleNavigation} onChatSelect={onChatSelect} />
          </Pressable>
        </SafeAreaView>
      </Animated.View>
    </Modal>
  );
};

const createStyles = (COLORS: any) => StyleSheet.create({
  // --- Global Drawer Styles (Merged) ---
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  drawerContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: COLORS.backgroundLight,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },

  // --- SearchDrawer Specific Styles ---
  safeAreaContent: {
    flex: 1,
    // Using backgroundLight (White) as the main canvas
    backgroundColor: COLORS.backgroundLight,
  },
  drawerPressable: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: SPACING.s16,
    paddingTop: SPACING.s12,
  },

  // --- Search Bar ---
  searchContainer: {
    marginBottom: SPACING.s12,
  },
  searchBar: {
    // Using backgroundNeutral (Soft Gray) for the input pill background
    backgroundColor: COLORS.backgroundNeutral,
    borderRadius: 24,
    height: 44,
    paddingHorizontal: SPACING.s16,
  },
  searchBarInput: {
    flex: 1,
    // Dark text for readability on light gray background
    color: COLORS.textPrimary,
    fontSize: 16,
    padding: 0,
  },

  // --- Top Menu Items ---
  topMenuContainer: {
    marginBottom: SPACING.s12,
  },
  menuItem: {
    paddingVertical: SPACING.s12,
    paddingHorizontal: SPACING.s4,
  },
  menuIcon: {
    marginRight: SPACING.s12,
    // Dark text color for high contrast icons
    color: COLORS.textPrimary,
  },
  menuLabel: {
    // Dark text for menu labels
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
  newChatLabel: {
    fontWeight: '600',
  },
  newChatIconContainer: {
    marginLeft: 'auto',
  },

  // --- Section Headers ---
  sectionTitleContainer: {
    marginTop: SPACING.s8,
    marginBottom: SPACING.s8,
    paddingHorizontal: SPACING.s4,
  },
  sectionTitle: {
    // Medium gray for subtle section headers
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: '600',
  },

  // --- Chat History List ---
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: SPACING.s24,
  },
  chatItem: {
    paddingVertical: SPACING.s12,
    paddingHorizontal: SPACING.s4,
  },
  chatItemText: {
    // Dark text for history items
    color: COLORS.textPrimary,
    fontSize: 15,
    fontWeight: '400',
  },

  // --- User Profile Footer ---
  userProfile: {
    // Modern Card Styling
    backgroundColor: COLORS.backgroundNeutral, // Creates the card shape against the white background
    borderRadius: 16,                          // Rounded edges
    padding: SPACING.s12,                      // Inner spacing for the card content
    // Positioning
    marginTop: SPACING.s16,                    // Push away from the chat list
    marginBottom: SPACING.s24,                 // Space from the bottom of the screen
    marginHorizontal: SPACING.s4,              // Slight inset from the sides if needed
    // Remove the old "Divider" look
    borderTopWidth: 0,
  },
  // Note: userAvatar style preserved for safety, though Avatar component handles rendering
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.s12,
  },
  avatarText: {
    color: COLORS.backgroundLight,
    fontSize: 14,
    fontWeight: '700',
  },
  userName: {
    // Dark text for the username
    color: COLORS.textPrimary,
    fontSize: 15,
    fontWeight: '600',
  },
});