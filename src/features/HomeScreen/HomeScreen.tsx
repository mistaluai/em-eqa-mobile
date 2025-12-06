import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../../components/HeaderComponent';
import AppModal from '../../components/ModalComponent';
import { COLORS } from '../../theme/colors';
import { SCREEN, WELCOME } from '../../theme/styles';
import { ChatContainer } from './components/ChatContainer';
import { DrawerContent } from './components/DrawerContent';
import { EvidenceModal } from './components/EvidenceModal';
import { InputBar } from './components/InputBar';
import { mockChatHistory } from './constants';

const { width } = Dimensions.get('window');

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [chatInput, setChatInput] = useState('');

  const handleSendMessage = () => {
    if (chatInput.trim()) {
      setChatInput('');
    }
  };

  const handleEvidencePress = (messageId: number) => {
    setIsModalVisible(true);
  };

  return (
    // FIX 1: Ensure SafeAreaView takes full height
    <SafeAreaView style={[SCREEN.safeArea, { flex: 1 }]}>

      {/* Header stays OUTSIDE the keyboard view so it doesn't get pushed off */}
      <AppHeader
        title="EM-EQA"
        showBack={false}
        rightIconName="person-circle-outline"
        onRightIconPress={() => navigation.navigate('ProfileSettings' as never)}
      />

      {/* FIX 2: KeyboardAvoidingView fills the space between Header and Bottom */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        // Tweak this number if input is still slightly hidden (try 60-100)
        keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
      >

        {/* FIX 3: THE FLEX CHAIN FIX 
            This View forces the ChatContainer to occupy all available space 
            but shrink when the keyboard pushes the InputBar up. 
        */}
        <View style={{ flex: 1 }}>
          <ChatContainer
            messages={mockChatHistory}
            onEvidencePress={handleEvidencePress}
          />
        </View>

        <InputBar
          onVoiceInput={() => console.log('Voice Input')}
          onSend={handleSendMessage}
        />

      </KeyboardAvoidingView>

      <EvidenceModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onGoToEventDetails={() => {
          setIsModalVisible(false);
          navigation.navigate('EventDetails' as never);
        }}
      />

      <AppModal
        isVisible={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        modalWidth={width * 0.85}
      >
        <DrawerContent onClose={() => setIsDrawerOpen(false)} />
      </AppModal>

      <Pressable
        onPress={() => setIsDrawerOpen(true)}
        style={WELCOME.menuButtonOverride}
      >
        <Ionicons name="menu-outline" size={32} color={COLORS.white} />
      </Pressable>
    </SafeAreaView>
  );
};

export default HomeScreen;