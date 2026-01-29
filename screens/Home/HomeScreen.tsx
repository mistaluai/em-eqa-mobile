import { SPACING } from '@/src/theme';
import { COLORS } from '@/src/theme/colors';
import React, { useEffect, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../../components/HeaderComponent';
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
    messages,
    handleSendMessage,
    handleEvidencePress,
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
    <SafeAreaView style={styles.safeArea}>
      <AppHeader
        title=""
        leftIconName="menu-outline"
        onLeftIconPress={handleOpenSearchDrawer}
      />

      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <View style={styles.chatContainer}>
          <ChatContainer messages={messages} onEvidencePress={handleEvidencePress} />
        </View>

        <View style={[
          styles.inputBarContainer,
          isKeyboardOpen && styles.inputBarContainerKeyboard
        ]}>
          <InputBar onSend={handleSendMessage} onVoiceInput={() => { }} />
        </View>
      </KeyboardAvoidingView>

      <SearchDrawer visible={isSearchDrawerVisible} onClose={handleCloseSearchDrawer} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    // Merged from HomeScreenStyles.inputBarContainerKeyboard
    marginBottom: SPACING.s12,
  },
});

export default HomeScreen;