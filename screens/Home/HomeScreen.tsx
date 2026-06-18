import AppHeader from '@/components/HeaderComponent';
import { SPACING } from '@/theme';
import { useThemeColor } from "@/theme/useThemeColor";
import { useThemeStyles } from "@/theme/useThemeStyles";
import React, { useEffect, useState } from 'react';
import { Keyboard, Platform, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChatContainer } from './components/ChatContainer';
import { EvidenceModal } from './components/EvidenceModal';
import { InputBar } from './components/InputBar';
import { SearchDrawer } from './components/SearchDrawer';
import { useHomeLogic } from './hooks/useHomeLogic';

const HomeScreen: React.FC = () => {
  const styles = useThemeStyles(createStyles);
  const COLORS = useThemeColor();

  // State to track keyboard height manually for Android/iOS stability
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const {
    isSearchDrawerVisible,
    isEvidenceModalVisible,
    selectedEvidence,
    activeChat,
    isAiTyping,
    aiStatusText,
    liveStreamedContent,
    inputText,
    setInputText,
    handleSendMessage,
    handleSelectChat,
    handleDeleteChat,
    handleDeleteMessage,
    handleEditMessage,
    handleRetryMessage,
    handleEvidencePress,
    handleCloseEvidenceModal,
    handleGoToEventDetails,
    handleOpenSearchDrawer,
    handleCloseSearchDrawer,
    handleAiResponseReceived,
  } = useHomeLogic();

  useEffect(() => {
    const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const showSub = Keyboard.addListener(showEvent, (e) => {
      setKeyboardHeight(e.endCoordinates.height);
    });
    const hideSub = Keyboard.addListener(hideEvent, () => {
      setKeyboardHeight(0);
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader
        title=""
        leftIconName="menu-outline"
        onLeftIconPress={handleOpenSearchDrawer}
      />

      {/* Main chat area */}
      <View style={styles.chatContainer}>
        <ChatContainer
          chat={activeChat}
          onEvidencePress={handleEvidencePress}
          isTyping={isAiTyping}
          aiStatusText={aiStatusText}
          liveStreamedContent={liveStreamedContent}
          onAiResponseReceived={handleAiResponseReceived}
          onDeleteMessage={handleDeleteMessage}
          onEditMessage={handleEditMessage}
          onRetryMessage={handleRetryMessage}
        />
      </View>

      {/* Input area with dynamic marginBottom to push it above the keyboard */}
      <View style={[styles.inputBarContainer, { marginBottom: keyboardHeight }]}>
        <InputBar 
          onSend={handleSendMessage} 
          onVoiceInput={() => { }} 
          value={inputText}
          onChangeText={setInputText}
        />
      </View>

      <SearchDrawer
        visible={isSearchDrawerVisible}
        onClose={handleCloseSearchDrawer}
        onChatSelect={handleSelectChat}
        onChatDelete={handleDeleteChat}
      />

      <EvidenceModal
        isVisible={isEvidenceModalVisible}
        evidence={selectedEvidence}
        onClose={handleCloseEvidenceModal}
        onGoToEventDetails={handleGoToEventDetails}
      />
    </SafeAreaView>
  );
};

function createStyles(COLORS: any) {
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: COLORS.backgroundLight,
    },
    chatContainer: {
      flex: 1,
      // Ensures the list content isn't cut off when keyboard opens
      paddingBottom: SPACING.s8,
    },
    inputBarContainer: {
      padding: SPACING.s16,
      backgroundColor: COLORS.backgroundLight,
      borderTopWidth: 0,
      borderTopColor: COLORS.borderLight,
    },
  });
}

export default HomeScreen;