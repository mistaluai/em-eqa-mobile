// components/SearchDrawer.tsx
import React from 'react';
import {
  Dimensions,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput, // Changed TextInputComponent to TextInput
  TouchableOpacity, // Added for clickable elements
  View,
} from 'react-native';
import { COLORS } from '../../../theme/colors';
import { sidebarStyles } from '../../../theme/styles';
// import { DrawerContent } from './DrawerContent'; // Not needed if we use the generated code

const { width } = Dimensions.get('window');
const DRAWER_WIDTH = width * 0.85;

interface SearchDrawerProps {
  visible: boolean;
  onClose: () => void;
}

// --- Reusable Component for Chat History Item ---
const ChatHistoryItem = ({ title }: { title: string }) => (
  <TouchableOpacity style={sidebarStyles.chatItem}>
    <Text style={sidebarStyles.chatItemText }>{title}</Text>
  </TouchableOpacity>
);

// --- Content Component (The actual Sidebar UI) ---
const DrawerSidebarContent = () => {
  const SearchIconPlaceholder = () => (
    <View style={sidebarStyles.searchIconPlaceholder}>
      <Text style={sidebarStyles.searchIconText}>🔍</Text>
    </View>
  );

  return (
    <View style={sidebarStyles.contentContainer}>
      {/* 1. Header and Search Bar Area */}
      <View style={sidebarStyles.header}>
        <View style={sidebarStyles.searchBarContainer}>
          <TextInput
            style={sidebarStyles.searchBarInput}
            placeholder="Search your"
            placeholderTextColor= {COLORS.textSecondary}
          />
          <SearchIconPlaceholder />
        </View>
        <TouchableOpacity>
          <Text style={sidebarStyles.newChatText}>new chat</Text>
        </TouchableOpacity>
      </View>

      {/* 2. Chat History */}
      <Text style={sidebarStyles.chatHistoryTitle}>Chat History</Text>
      <View style={sidebarStyles.chatHistoryList}>
        <ChatHistoryItem title="chat1" />
        <ChatHistoryItem title="chat2" />
        <ChatHistoryItem title="chat3" />
        <ChatHistoryItem title="chat4" />
      </View>

      {/* 3. User Profile Area */}
      <View style={sidebarStyles.userProfile}>
        <View style={sidebarStyles.userPhoto} />
        <Text style={sidebarStyles.userName}>User_name</Text>
      </View>
    </View>
  );
};
// --- END: Sidebar Content Styles and Component ---

export const SearchDrawer: React.FC<SearchDrawerProps> = ({ visible, onClose }) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      {/* BACKDROP */}
      <Pressable style={styles.backdrop} onPress={onClose} />

      {/* LEFT DRAWER */}
      <View style={[styles.drawer, { width: DRAWER_WIDTH }]}>
        <SafeAreaView style={{ flex: 1 }}>
          <DrawerSidebarContent /> {/* INJECTED SIDEBAR CONTENT HERE */}
        </SafeAreaView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  drawer: {
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
});