import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Dimensions, Pressable } from 'react-native';
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
    <SafeAreaView style={SCREEN.safeArea}>
      <AppHeader
        title="EM-EQA"
        showBack={false}
        rightIconName="person-circle-outline"
        onRightIconPress={() => navigation.navigate('ProfileSettings' as never)}
      />

      <EvidenceModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onGoToEventDetails={() => {
          setIsModalVisible(false);
          navigation.navigate('EventDetails' as never);
        }}
      />

      <ChatContainer messages={mockChatHistory} onEvidencePress={handleEvidencePress} />

      <InputBar
        onVoiceInput={() => console.log('Voice Input')}
        onSend={handleSendMessage}
      />

      
      <AppModal
  isVisible={isDrawerOpen}
  onClose={() => setIsDrawerOpen(false)}
  modalWidth={width * 0.85}   // or whatever you like (280–320 is perfect)
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

