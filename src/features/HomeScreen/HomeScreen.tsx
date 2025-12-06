import React from 'react';
import { Dimensions, KeyboardAvoidingView, Platform, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../../components/HeaderComponent';
import AppModal from '../../components/ModalComponent';
import { SCREEN } from '../../theme/styles';
import { ChatContainer } from './components/ChatContainer';
import { DrawerContent } from './components/DrawerContent';
import { EvidenceModal } from './components/EvidenceModal';
import { InputBar } from './components/InputBar';
import { SearchDrawer } from './components/SearchDrawer';
import { mockChatHistory } from './constants';
import { useHomeLogic } from './hooks/useHomeLogic';

const { width } = Dimensions.get('window');

/**
 * HomeScreen - Main screen component for chat interface
 * Handles composition and rendering using hooks and components
 */
const HomeScreen: React.FC = () => {
  const {
    isDrawerOpen,
    isSearchDrawerVisible,
    isEvidenceModalVisible,
    handleSendMessage,
    handleEvidencePress,
    handleCloseEvidenceModal,
    handleGoToEventDetails,
    handleOpenDrawer,
    handleCloseDrawer,
    handleOpenSearchDrawer,
    handleCloseSearchDrawer,
  } = useHomeLogic();

  return (
    <SafeAreaView style={[SCREEN.safeArea, { flex: 1 }]}>
      <AppHeader
        title="EM-EQA"
        leftIconName="search-outline"
        onLeftIconPress={handleOpenSearchDrawer}
        rightIconName="menu-outline"
        onRightIconPress={handleOpenDrawer}
      />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={{ flex: 1 }}>
          <ChatContainer messages={mockChatHistory} onEvidencePress={handleEvidencePress} />
        </View>

        <View style={SCREEN.homeInputBarContainer}>
          <InputBar onSend={handleSendMessage} onVoiceInput={() => {}} />
        </View>
      </KeyboardAvoidingView>

      <EvidenceModal
        isVisible={isEvidenceModalVisible}
        onClose={handleCloseEvidenceModal}
        onGoToEventDetails={handleGoToEventDetails}
      />

      <AppModal
        isVisible={isDrawerOpen}
        onClose={handleCloseDrawer}
        modalWidth={width * 0.8}
      >
        <DrawerContent onClose={handleCloseDrawer} />
      </AppModal>

      <SearchDrawer visible={isSearchDrawerVisible} onClose={handleCloseSearchDrawer} />
    </SafeAreaView>
  );
};

export default HomeScreen;
