// components/SearchDrawer.tsx
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Dimensions,
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

const DrawerSidebarContent = () => {
  const navigation = useNavigation<any>();

  const handleProfilePress = () => {
    navigation.navigate('NavigationHubScreen');
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
        <MenuItem icon="grid-outline" label="Timeline & Events" />
        <MenuItem icon="camera-outline" label="Camera Connection" />
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
  return (
    <Modal visible={visible} transparent animationType="fade">
      <Pressable style={DRAWER.backdrop} onPress={onClose} />
      <View style={[DRAWER.drawerContainer, { width: DRAWER_WIDTH }]}>
        <SafeAreaView style={SearchDrawerStyles.safeAreaContent}>
          <Pressable style={SearchDrawerStyles.drawerPressable} onPress={(e) => e.stopPropagation()}>
            <DrawerSidebarContent />
          </Pressable>
        </SafeAreaView>
      </View>
    </Modal>
  );
};