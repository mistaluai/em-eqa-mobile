// components/SearchDrawer.tsx
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

import React from 'react';
import {
  Dimensions,
  Modal,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../../theme/colors';
import { DRAWER } from '../../../theme';
import { SearchDrawerStyles } from '../../../theme/styles/HomeScreen/SearchDrawerStyle';
//import {NavigationHub} from "../features/NavigationHubScreen/NavigationHubScreen";


const { width } = Dimensions.get('window');
const DRAWER_WIDTH = width * 0.85;

interface SearchDrawerProps {
  visible: boolean;
  onClose: () => void;
}

// --- Reusable Component for Chat History Item ---
const ChatHistoryItem = ({ title }: { title: string }) => (
  <TouchableOpacity style={SearchDrawerStyles.chatItem}>
    <Text style={SearchDrawerStyles.chatItemText}>{title}</Text>
  </TouchableOpacity>
);

// --- Content Component (The actual Sidebar UI) ---
const DrawerSidebarContent = () => {
  const SearchIconPlaceholder = () => (
    <View style={SearchDrawerStyles.searchIconPlaceholder}>
      <Text style={SearchDrawerStyles.searchIconText}>
        🔍
      </Text>
    </View>
  );
  const navigation = useNavigation<any>();
  const handleProfilePress = () => {
    navigation.navigate('NavigationHubScreen');

  };

  return (
    <View style={SearchDrawerStyles.contentContainer}>
      {/* 1. Header and Search Bar Area */}
      <View style={SearchDrawerStyles.header}>
        <View style={SearchDrawerStyles.searchBarContainer}>
          <TextInput
            style={SearchDrawerStyles.searchBarInput}
            placeholder="Search your chats"
            placeholderTextColor={COLORS.textSecondary}
          />
          <SearchIconPlaceholder />
        </View>
        <TouchableOpacity>
          <Ionicons name="chatbox-outline" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
      </View>

      {/* 2. Chat History */}
      <Text style={SearchDrawerStyles.chatHistoryTitle}>Chat History</Text>
      <View style={SearchDrawerStyles.chatHistoryList}>
        <ChatHistoryItem title="chat1" />
        <ChatHistoryItem title="chat2" />
        <ChatHistoryItem title="chat3" />
        <ChatHistoryItem title="chat4" />
      </View>

      {/* 3. USER PROFILE AREA – NOW PRESSABLE */}
      <Pressable
        onPress={handleProfilePress}
        style={({ pressed }) => [
          SearchDrawerStyles.userProfile,
          { opacity: pressed ? 0.7 : 1 },
        ]}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <View style={SearchDrawerStyles.userPhoto} />
        <Text style={SearchDrawerStyles.userName}>User_name</Text>
      </Pressable>
    </View>
  );
};

export const SearchDrawer: React.FC<SearchDrawerProps> = ({ visible, onClose }) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      {/* BACKDROP – closes drawer when tapped */}
      <Pressable style={DRAWER.backdrop} onPress={onClose} />

      {/* LEFT DRAWER – stop propagation so taps inside don't close it */}
      <View style={[DRAWER.drawerContainer, { width: DRAWER_WIDTH }]}>
        <SafeAreaView style={SearchDrawerStyles.safeAreaContent}>
          {/* This inner Pressable prevents backdrop onPress from firing when tapping inside the drawer */}
          <Pressable style={SearchDrawerStyles.drawerPressable} onPress={(e) => e.stopPropagation()}>
            <DrawerSidebarContent />
          </Pressable>
        </SafeAreaView>
      </View>
    </Modal>
  );
};