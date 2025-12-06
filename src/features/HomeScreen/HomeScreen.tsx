// screens/HomeScreen.tsx

import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AppHeader from '../../components/HeaderComponent';
import AppModal from '../../components/ModalComponent';
import { COLORS } from '../../theme/colors';
import { SCREEN } from '../../theme/styles';

import { ChatContainer } from './components/ChatContainer';
import { DrawerContent } from './components/DrawerContent';
import { EvidenceModal } from './components/EvidenceModal';
import { InputBar } from './components/InputBar';
import { SearchDrawer } from './components/SearchDrawer';
import { mockChatHistory } from './constants';

const { width } = Dimensions.get('window');

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSearchDrawerVisible, setIsSearchDrawerVisible] = useState(false);
  const [isEvidenceModalVisible, setIsEvidenceModalVisible] = useState(false);

  const [chatInput, setChatInput] = useState('');

  const handleSendMessage = () => {
    if (chatInput.trim()) {
      setChatInput('');
    }
  };

  return (
    <SafeAreaView style={[SCREEN.safeArea, { flex: 1, backgroundColor: COLORS.backgroundLight }]}>

      {/* HEADER */}
      <AppHeader
        title="EM-EQA"
        leftIconName="search-outline"
        onLeftIconPress={() => setIsSearchDrawerVisible(true)}
        rightIconName="menu-outline"
        onRightIconPress={() => setIsDrawerOpen(true)}
      />

      {/* MAIN CHAT AREA */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={{ flex: 1 }}>
          <ChatContainer
            messages={mockChatHistory}
            onEvidencePress={() => setIsEvidenceModalVisible(true)}
          />
        </View>

        <View style={{ marginBottom: 10, paddingBottom: 15 }}>
          <InputBar onSend={handleSendMessage} onVoiceInput={() => {}} />
        </View>
      </KeyboardAvoidingView>

      {/* EVIDENCE MODAL */}
      <EvidenceModal
        isVisible={isEvidenceModalVisible}
        onClose={() => setIsEvidenceModalVisible(false)}
        onGoToEventDetails={() => {
          setIsEvidenceModalVisible(false);
          navigation.navigate('EventDetails' as never);
        }}
      />

      {/* RIGHT SIDE CONTENT DRAWER */}
      <AppModal
        isVisible={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        modalWidth={width * 0.8}
      >
        <DrawerContent onClose={() => setIsDrawerOpen(false)} />
      </AppModal>

      {/* LEFT SEARCH DRAWER */}
      <SearchDrawer
        visible={isSearchDrawerVisible}
        onClose={() => setIsSearchDrawerVisible(false)}
      />

    </SafeAreaView>
  );
};

export default HomeScreen;
