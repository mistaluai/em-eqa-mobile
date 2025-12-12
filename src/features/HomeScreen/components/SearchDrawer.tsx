// components/SearchDrawer.tsx
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DRAWER } from '../../../theme';
import { COLORS } from '../../../theme/colors';
import { SearchDrawerStyles } from '../../../theme/styles/HomeScreen/SearchDrawerStyle';

// 1. IMPORT STORES AND COMPONENT
import { Avatar } from '../../../components/Avatar';
import { useAuthStore } from '../../../services/auth/supabaseAuth';
import { useAvatarMedia } from '../../../shared/hooks/useAvatarMedia';

const { width } = Dimensions.get('window');
const DRAWER_WIDTH = width * 0.85;

interface SearchDrawerProps {
  visible: boolean;
  onClose: () => void;
}

// ... MenuItem and ChatHistoryItem components remain the same ...
const MenuItem = ({ icon, label, onPress, isNewChat = false }: { icon: string, label: string, onPress?: () => void, isNewChat?: boolean }) => (
  <TouchableOpacity style={SearchDrawerStyles.menuItem} onPress={onPress}>
    <Ionicons name={icon as any} size={20} color={COLORS.textPrimary} style={SearchDrawerStyles.menuIcon} />
    <Text style={[SearchDrawerStyles.menuLabel, isNewChat && SearchDrawerStyles.newChatLabel]}>{label}</Text>
    {isNewChat && (
      <View style={SearchDrawerStyles.newChatIconContainer}>
        <Ionicons name="create-outline" size={20} color={COLORS.textPrimary} />
      </View>
    )}
  </TouchableOpacity>
);

const ChatHistoryItem = ({ title }: { title: string }) => (
  <TouchableOpacity style={SearchDrawerStyles.chatItem}>
    <Text style={SearchDrawerStyles.chatItemText} numberOfLines={1}>{title}</Text>
  </TouchableOpacity>
);

// --- Updated Content Component ---
const DrawerSidebarContent = ({ onNavigate }: { onNavigate: (screen: string) => void }) => {

  // 2. GET USER DATA
  const { full_name } = useAuthStore();

  // 3. GET AVATAR DATA (This hook automatically handles downloading if needed)
  const { avatarUri } = useAvatarMedia();

  const handleProfilePress = () => {
    onNavigate('NavigationHubScreen');
  };

  const historyItems = [
    "Medicine Query",
    "Interaction Chat",
  ];

  return (
    <View style={SearchDrawerStyles.contentContainer}>
      {/* 1. Search Bar Area */}
      <View style={SearchDrawerStyles.searchContainer}>
        <View style={SearchDrawerStyles.searchBar}>
          <Ionicons name="search" size={20} color={COLORS.textSecondary} style={{ marginRight: 8 }} />
          <TextInput
            style={SearchDrawerStyles.searchBarInput}
            placeholder="Search"
            placeholderTextColor={COLORS.textSecondary}
          />
        </View>
      </View>

      {/* 2. Top Navigation Actions */}
      <View style={SearchDrawerStyles.topMenuContainer}>
        <MenuItem icon="chatbubble-ellipses-outline" label="New chat" isNewChat={true} />
        <MenuItem icon="calendar-outline" label="Timeline & Events" onPress={() => onNavigate('TimelineEvents')} />
        <MenuItem icon="camera-outline" label="Camera Connection" onPress={() => onNavigate('DeviceConnection')} />
      </View>

      <View style={SearchDrawerStyles.sectionTitleContainer}>
        <Text style={SearchDrawerStyles.sectionTitle}>Today</Text>
      </View>

      {/* 3. Scrollable Chat History */}
      <ScrollView
        style={SearchDrawerStyles.scrollArea}
        contentContainerStyle={SearchDrawerStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {historyItems.map((item, index) => (
          <ChatHistoryItem key={index} title={item} />
        ))}
      </ScrollView>

      {/* 4. Footer User Profile (UPDATED) */}
      <Pressable
        onPress={handleProfilePress}
        style={({ pressed }) => [
          SearchDrawerStyles.userProfile,
          { opacity: pressed ? 0.7 : 1 },
        ]}
      >
        {/* Replace hardcoded View with Avatar Component */}
        <Avatar
          uri={avatarUri}
          size={36}
          style={{
            marginRight: 12,
            // 1. Remove Shadow Overrides
            elevation: 0,                 // Android
            shadowOpacity: 0,             // iOS
            shadowColor: 'transparent',   // Safety
            shadowOffset: { width: 0, height: 0 },
            shadowRadius: 0
          }}
        />

        {/* Display Actual Name */}
        <Text style={SearchDrawerStyles.userName}>
          {full_name || 'User'}
        </Text>

        <Ionicons name="ellipsis-horizontal" size={20} color={COLORS.textSecondary} style={{ marginLeft: 'auto' }} />
      </Pressable>
    </View>
  );
};

// ... The SearchDrawer export remains exactly the same ...
export const SearchDrawer: React.FC<SearchDrawerProps> = ({ visible, onClose }) => {
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
          DRAWER.backdrop,
          { opacity: fadeAnim }
        ]}
      >
        <Pressable style={{ flex: 1 }} onPress={closeDrawer} />
      </Animated.View>

      <Animated.View
        style={[
          DRAWER.drawerContainer,
          {
            width: DRAWER_WIDTH,
            transform: [{ translateX: slideAnim }]
          }
        ]}
      >
        <SafeAreaView style={SearchDrawerStyles.safeAreaContent}>
          <Pressable style={SearchDrawerStyles.drawerPressable} onPress={(e) => e.stopPropagation()}>
            <DrawerSidebarContent onNavigate={handleNavigation} />
          </Pressable>
        </SafeAreaView>
      </Animated.View>
    </Modal>
  );
};