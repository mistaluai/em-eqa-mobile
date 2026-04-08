import AppHeader from '@/components/HeaderComponent';
import { SPACING } from '@/theme';
import { useThemeColor } from "@/theme/useThemeColor";
import { useThemeStyles } from "@/theme/useThemeStyles";
import React, { useEffect, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChatContainer } from './components/ChatContainer';
import { EvidenceModal } from './components/EvidenceModal';
import { InputBar } from './components/InputBar';
import { SearchDrawer } from './components/SearchDrawer';
import { useHomeLogic } from './hooks/useHomeLogic';

/**
 * HomeScreen - Main screen component for chat interface
 * Handles composition and rendering using hooks and components
 */
const HomeScreen: React.FC = () => {
  const styles = useThemeStyles(createStyles);
  const COLORS = useThemeColor();
  const insets = useSafeAreaInsets();
  const {
    isSearchDrawerVisible,
    isEvidenceModalVisible,
    isAiTyping,
    selectedEvidence,
    activeChat,
    handleSendMessage,
    handleSelectChat,
    handleDeleteChat,
    handleEvidencePress,
    handleCloseEvidenceModal,
    handleGoToEventDetails,
    handleOpenSearchDrawer,
    handleCloseSearchDrawer,
    handleAiResponseReceived,
  } = useHomeLogic();

  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  // Detect keyboard open/close events for animation
  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', () => setIsKeyboardOpen(true));
    const hideSub = Keyboard.addListener('keyboardDidHide', () => setIsKeyboardOpen(false));

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const renderChatContent = () => (
    <>
      <View style={styles.chatContainer}>
        <ChatContainer 
          chat={activeChat} 
          onEvidencePress={handleEvidencePress} 
          isTyping={isAiTyping}
          onAiResponseReceived={handleAiResponseReceived}
        />
      </View>

      <View style={[
        styles.inputBarContainer,
        { paddingBottom: Platform.OS === 'android' && isKeyboardOpen ? Math.max(insets.bottom, 24) : 15 },
        isKeyboardOpen && styles.inputBarContainerKeyboard
      ]}>
        <InputBar onSend={handleSendMessage} onVoiceInput={() => { }} />
      </View>
    </>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {<AppHeader
        title=""
        leftIconName="menu-outline"
        onLeftIconPress={handleOpenSearchDrawer}
      />}
      
      {Platform.OS === 'ios' ? (
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior="padding"
          keyboardVerticalOffset={90}
        >
          {renderChatContent()}
        </KeyboardAvoidingView>
      ) : (
        <View style={styles.keyboardAvoidingView}>
          {renderChatContent()}
        </View>
      )}

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
    keyboardAvoidingView: {
      flex: 1,
    },
    chatContainer: {
      flex: 1,
    },
    inputBarContainer: {
      // Merged from SCREEN.homeInputBarContainer and HomeScreenStyles.inputBarContainer
      paddingBottom: 15,
      marginBottom: 0,
    },
    inputBarContainerKeyboard: {
      // Standard keyboard gap
      marginBottom: SPACING.s12,
    },
  });
}

export default HomeScreen;