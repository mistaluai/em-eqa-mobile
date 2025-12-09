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

const { width } = Dimensions.get('window');
const DRAWER_WIDTH = width * 0.85;

interface SearchDrawerProps {
  visible: boolean;
  onClose: () => void;
}

// --- Menu Item Component (New Chat, Library, etc) ---
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

// --- Chat History Item Component (Clean Text) ---
const ChatHistoryItem = ({ title }: { title: string }) => (
  <TouchableOpacity style={SearchDrawerStyles.chatItem}>
    <Text style={SearchDrawerStyles.chatItemText} numberOfLines={1}>{title}</Text>
  </TouchableOpacity>
);

// --- Updated Content Component to accept navigation handler ---
const DrawerSidebarContent = ({ onNavigate }: { onNavigate: (screen: string) => void }) => {

  const handleProfilePress = () => {
    onNavigate('NavigationHubScreen');
  };

  // Mock data matching your screenshot for visual verification
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
        {/* Use onNavigate to close drawer then navigate */}
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

      {/* 4. Footer User Profile */}
      <Pressable
        onPress={handleProfilePress}
        style={({ pressed }) => [
          SearchDrawerStyles.userProfile,
          { opacity: pressed ? 0.7 : 1 },
        ]}
      >
        <View style={SearchDrawerStyles.userAvatar}>
          <Text style={SearchDrawerStyles.avatarText}>LA</Text>
        </View>
        <Text style={SearchDrawerStyles.userName}>Luai Waleed Abdelkarim</Text>
        <Ionicons name="ellipsis-horizontal" size={20} color={COLORS.textSecondary} style={{ marginLeft: 'auto' }} />
      </Pressable>
    </View>
  );
};

export const SearchDrawer: React.FC<SearchDrawerProps> = ({ visible, onClose }) => {
  const navigation = useNavigation<any>();

  // 1. Setup Animation Values
  // Slide starts off-screen (-width)
  const slideAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  // Fade starts at 0 (invisible)
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // 2. Trigger Entry Animation when 'visible' becomes true
  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
          easing: Easing.out(Easing.quad), // Smooth deceleration
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  // 3. Helper to Animate Out then Close
  const closeDrawer = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: -DRAWER_WIDTH,
        duration: 250,
        useNativeDriver: true,
        easing: Easing.in(Easing.quad), // Smooth acceleration
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Actually unmount/hide the modal after animation finishes
      onClose();
    });
  };

  // 4. Handle Navigation (Close first, then navigate)
  const handleNavigation = (screenName: string) => {
    closeDrawer();
    // Small timeout to ensure animation starts smoothly before screen transition
    setTimeout(() => {
      navigation.navigate(screenName);
    }, 100);
  };

  return (
    <Modal
      visible={visible}
      transparent
      // Important: Disable default 'fade' so our custom animation controls it
      animationType="none"
      onRequestClose={closeDrawer} // Android back button support
    >
      {/* Animated Backdrop */}
      <Animated.View
        style={[
          DRAWER.backdrop,
          { opacity: fadeAnim }
        ]}
      >
        <Pressable style={{ flex: 1 }} onPress={closeDrawer} />
      </Animated.View>

      {/* Animated Drawer Container */}
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
            {/* Pass the custom navigation handler */}
            <DrawerSidebarContent onNavigate={handleNavigation} />
          </Pressable>
        </SafeAreaView>
      </Animated.View>
    </Modal>
  );
};