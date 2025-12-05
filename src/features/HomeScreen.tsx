import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Dimensions, FlatList, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppButton from '../components/AppButton';
import AppCard from '../components/AppCard';
import AppHeader from '../components/HeaderComponent';
import AppModal from '../components/ModalComponent';
import { COLORS } from '../theme/colors';
import { RADIUS, SHADOW, SPACING, TYPOGRAPHY } from '../theme/styles';

const { width } = Dimensions.get('window');

const ChatMessage: React.FC<{ message: any }> = ({ message }) => {
  const isUser = message.sender === 'user';
  return (
    <View style={[styles.messageRow, isUser ? styles.userMessageRow : styles.aiMessageRow]}>
      <AppCard style={[styles.messageBubble, isUser ? styles.userBubble : styles.aiBubble]}>
        <Text style={[TYPOGRAPHY.BodyM, isUser ? styles.userText : styles.aiText]}>{message.text}</Text>
        {message.hasEvidence && (
          <Pressable onPress={() => console.log('View Evidence')} style={styles.evidenceButton}>
            <Text style={[TYPOGRAPHY.Caption, styles.evidenceText]}>See Evidence</Text>
          </Pressable>
        )}
      </AppCard>
    </View>
  );
};

const mockChatHistory = [
  { id: 1, sender: 'ai', text: 'Welcome back, John. I have summarized your events from the last 2 hours. You were highly engaged in a meeting about the Q4 budget.', hasEvidence: true },
  { id: 2, sender: 'user', text: 'What did I agree to do next?', hasEvidence: false },
  { id: 3, sender: 'ai', text: 'You agreed to draft the initial pitch deck by Friday. I have the full clip if you want to verify the commitment.', hasEvidence: true },
];

const NAV_ITEMS = [
  { name: 'Device Connection', icon: 'bluetooth-outline', screen: 'DeviceConnection' },
  { name: 'Timeline & Events', icon: 'calendar-outline', screen: 'TimelineEvents' },
  { name: 'Data Privacy & Control', icon: 'lock-closed-outline', screen: 'PrivacyDataControl' },
  { name: 'Clip Upload & Sync', icon: 'cloud-upload-outline', screen: 'ClipUploadSync' },
  { name: 'Profile & Recording Settings', icon: 'person-circle-outline', screen: 'ProfileSettings' },
  { name: 'System Status', icon: 'pulse-outline', screen: 'SystemStatus' },
];

const DrawerContent: React.FC<{ navigation: any, onClose: () => void }> = ({ navigation, onClose }) => (
  <View style={styles.drawerContainer}>
    <View style={styles.drawerHeader}>
      <Text style={[TYPOGRAPHY.HeadlineM, { color: COLORS.white }]}>EM-EQA Menu</Text>
      <Pressable onPress={onClose} style={{ padding: SPACING.s8 }}>
        <Ionicons name="close-outline" size={32} color={COLORS.white} />
      </Pressable>
    </View>
    {NAV_ITEMS.map((item) => (
      <Pressable
        key={item.name}
        onPress={() => {
          navigation.navigate(item.screen as never);
          onClose();
        }}
        style={styles.drawerItem}
      >
        <Ionicons name={item.icon as any} size={24} color={COLORS.lightLavender} />
        <Text style={[TYPOGRAPHY.BodyM, styles.drawerItemText]}>{item.name}</Text>
      </Pressable>
    ))}
    <View style={{ flex: 1 }} />
    <Pressable onPress={() => navigation.navigate('Login' as never)} style={styles.drawerItem}>
      <Ionicons name="log-out-outline" size={24} color={COLORS.desertSand} />
      <Text style={[TYPOGRAPHY.BodyM, { color: COLORS.desertSand, marginLeft: SPACING.s12 }]}>Log Out</Text>
    </Pressable>
  </View>
);

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [chatInput, setChatInput] = useState('');

  const handleSendMessage = () => {
    if (chatInput.trim()) {
      // Logic to add message to history and get AI response
      setChatInput('');
    }
  };

  const handleStartEvaluation = () => {
    navigation.navigate('Evaluation' as never);
  };

  const EvidenceModal: React.FC = () => (
    <AppModal isVisible={isModalVisible} onClose={() => setIsModalVisible(false)} modalWidth={width * 0.95}>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
        <Pressable onPress={() => setIsModalVisible(false)}>
            <Ionicons name="close-circle-outline" size={32} color={COLORS.softGray} />
        </Pressable>
      </View>
      <Text style={[TYPOGRAPHY.HeadlineM, { color: COLORS.white, marginBottom: SPACING.s16 }]}>Evidence Clip</Text>

      <View style={styles.videoPlaceholder}>
        <Ionicons name="play-circle-outline" size={80} color={COLORS.softGray} />
      </View>

      <AppCard style={{ marginTop: SPACING.s16 }}>
        <Text style={[TYPOGRAPHY.HeadlineM, { color: COLORS.white, marginBottom: SPACING.s8 }]}>Summary</Text>
        <Text style={[TYPOGRAPHY.BodyM, { color: COLORS.softGray }]}>
          Clip timestamp: 14:32 - 14:45. Confirmed commitment to draft the pitch deck.
        </Text>
      </AppCard>

      <View style={{ height: SPACING.s24 }} />
      <AppButton title="Go to Event Details" onPress={() => setIsModalVisible(false)} />
    </AppModal>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader
        title="EM-EQA"
        showBack={false}
        rightIconName="person-circle-outline"
        onRightIconPress={() => navigation.navigate('ProfileSettings' as never)}
      />

      <EvidenceModal />

      {/* Main Content Area */}
      <View style={styles.container}>
        <ScrollView style={styles.welcomeArea}>
          <Text style={[TYPOGRAPHY.HeadlineL, styles.welcomeText]}>
            Welcome back, <Text style={{ color: COLORS.ultraViolet }}>John!</Text>
          </Text>
          <AppButton
            title="Start Evaluation"
            onPress={handleStartEvaluation}
            style={styles.evaluationButton}
          />
        </ScrollView>

        <View style={styles.chatContainer}>
          <FlatList
            data={mockChatHistory.slice().reverse()} // Inverted list
            renderItem={({ item }) => <ChatMessage message={item} />}
            keyExtractor={(item) => item.id.toString()}
            style={styles.chatHistory}
            inverted
          />
        </View>

        <View style={styles.inputBar}>
          <Pressable onPress={() => console.log('Voice Input')} style={styles.voiceButton}>
            <Ionicons name="mic-outline" size={24} color={COLORS.ultraViolet} />
          </Pressable>
          <View style={styles.textInputPill}>
            <Text style={[TYPOGRAPHY.BodyM, { color: COLORS.gray700 }]}>Ask your assistant...</Text>
          </View>
          <Pressable onPress={handleSendMessage} style={styles.sendButton}>
            <Ionicons name="send" size={20} color={COLORS.white} />
          </Pressable>
        </View>
      </View>

      {/* Floating Avatar */}
      <Pressable style={styles.floatingAvatar} onPress={() => setIsModalVisible(true)}>
        <Ionicons name="flash-outline" size={32} color={COLORS.white} />
      </Pressable>

      {/* Drawer Implementation (Modal/Overlay for simplicity) */}
      <AppModal isVisible={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} modalWidth={width * 0.8}>
        <DrawerContent navigation={navigation} onClose={() => setIsDrawerOpen(false)} />
      </AppModal>

      {/* Menu Button override (placed after modal so it sits on top) */}
      <Pressable
        onPress={() => setIsDrawerOpen(true)}
        style={styles.menuButtonOverride}
      >
        <Ionicons name="menu-outline" size={28} color={COLORS.white} />
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.carbonBlack,
  },
  container: {
    flex: 1,
  },
  welcomeArea: {
    padding: SPACING.s24,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.gray700,
  },
  welcomeText: {
    marginBottom: SPACING.s16,
    fontWeight: '800',
  },
  evaluationButton: {
    alignSelf: 'flex-start',
    paddingVertical: SPACING.s12,
  },
  // --- Chat Styles ---
  chatContainer: {
    flex: 1,
    paddingHorizontal: SPACING.s16,
    paddingTop: SPACING.s16,
  },
  chatHistory: {
    flexGrow: 1,
  },
  messageRow: {
    maxWidth: '80%',
    marginVertical: SPACING.s4,
  },
  userMessageRow: {
    alignSelf: 'flex-end',
  },
  aiMessageRow: {
    alignSelf: 'flex-start',
  },
  messageBubble: {
    padding: SPACING.s12,
    borderRadius: RADIUS.default,
  },
  userBubble: {
    backgroundColor: COLORS.ultraViolet,
    borderBottomRightRadius: SPACING.s4, // Tail effect
  },
  aiBubble: {
    backgroundColor: `${COLORS.lightLavender}33`,
    borderBottomLeftRadius: SPACING.s4, // Tail effect
  },
  userText: {
    color: COLORS.white,
  },
  aiText: {
    color: COLORS.softGray,
  },
  evidenceButton: {
    marginTop: SPACING.s8,
    alignSelf: 'flex-end',
  },
  evidenceText: {
    color: COLORS.desertSand,
    textDecorationLine: 'underline',
  },
  // --- Input Bar ---
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.s16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: COLORS.gray700,
  },
  voiceButton: {
    padding: SPACING.s8,
  },
  textInputPill: {
    flex: 1,
    height: 48,
    backgroundColor: COLORS.gray700,
    borderRadius: RADIUS.large,
    marginHorizontal: SPACING.s12,
    justifyContent: 'center',
    paddingHorizontal: SPACING.s16,
  },
  sendButton: {
    backgroundColor: COLORS.ultraViolet,
    width: 48,
    height: 48,
    borderRadius: RADIUS.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // --- Floating Avatar ---
  floatingAvatar: {
    position: 'absolute',
    bottom: SPACING.s24,
    right: SPACING.s24,
    backgroundColor: COLORS.ultraViolet,
    width: 64,
    height: 64,
    borderRadius: RADIUS.full,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOW.default,
  },
  // --- Drawer Styles ---
  drawerContainer: {
    flex: 1,
    backgroundColor: COLORS.carbonBlack,
    padding: SPACING.s24,
  },
  drawerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.s32,
    paddingTop: SPACING.s12,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.s16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.gray700,
  },
  drawerItemText: {
    color: COLORS.white,
    marginLeft: SPACING.s12,
    fontWeight: '600',
  },
  // --- Header Menu Button Fix (simulating left drawer open) ---
  menuButtonOverride: {
    position: 'absolute',
    top: 0,
    left: SPACING.s16,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100, // Ensure it is above the header line
  },
  // --- Video Placeholder ---
  videoPlaceholder: {
    backgroundColor: COLORS.gray700,
    borderRadius: RADIUS.default,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.s16,
  },
});

export default HomeScreen;