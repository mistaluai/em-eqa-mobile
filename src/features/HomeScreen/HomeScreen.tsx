import React, { useEffect, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../../components/HeaderComponent';
import { SCREEN, SPACING } from '../../theme/styles';
import { ChatContainer } from './components/ChatContainer';
import { InputBar } from './components/InputBar';
import { SearchDrawer } from './components/SearchDrawer';
import { useHomeLogic } from './hooks/useHomeLogic';

/**
 * HomeScreen - Main screen component for chat interface
 * Handles composition and rendering using hooks and components
 */
const HomeScreen: React.FC = () => {
  const {
    isSearchDrawerVisible,
    isEvidenceModalVisible,
    messages,
    handleSendMessage,
    handleEvidencePress,
    handleCloseEvidenceModal,
    handleGoToEventDetails,
    handleOpenSearchDrawer,
    handleCloseSearchDrawer,
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

  return (
    <SafeAreaView style={[SCREEN.safeArea, { flex: 1 }]}>
      <AppHeader
        title="EM-EQA"
        leftIconName="menu-outline"
        onLeftIconPress={handleOpenSearchDrawer}
      />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <View style={{ flex: 1 }}>
          <ChatContainer messages={messages} onEvidencePress={handleEvidencePress} />
        </View>

        <View style={[SCREEN.homeInputBarContainer, { marginBottom: isKeyboardOpen ? SPACING.s12 : 0 }]}>
          <InputBar onSend={handleSendMessage} onVoiceInput={() => {}} />
        </View>
      </KeyboardAvoidingView>

      <SearchDrawer visible={isSearchDrawerVisible} onClose={handleCloseSearchDrawer} />
    </SafeAreaView>
  );
};

export default HomeScreen;
