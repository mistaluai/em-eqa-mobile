import { useAuthStore } from '@/services/databases/supabase/supabaseAuth';
import { SPACING } from '@/theme';
import { useThemeColor } from "@/theme/useThemeColor";
import { useThemeStyles } from "@/theme/useThemeStyles";
import { withObservables } from '@nozbe/watermelondb/react';
import React, { useEffect } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { of as of$ } from 'rxjs';
import Chat from '../../../services/databases/watermelondb/models/Chat';
import Message from '../../../services/databases/watermelondb/models/Message';
import { EvidenceType } from '../../../shared/types/evidence';
import { ChatGreeting } from './ChatGreeting';
import { ChatMessage } from './ChatMessage';
import { StreamMessage } from './StreamMessage';
import { TypingIndicator } from './TypingIndicator';
import { MessageActionSheet } from './MessageActionSheet';
import * as Clipboard from 'expo-clipboard';
import * as Haptics from 'expo-haptics';

interface ChatContainerProps {
  chat?: Chat | null;
  messages: Message[];
  onEvidencePress?: (evidence: EvidenceType) => void;
  isTyping?: boolean;
  // --- NEW STREAMING PROPS ---
  aiStatusText?: string | null;
  liveStreamedContent?: string;
  onAiResponseReceived?: () => void;
  // --- ACTION PROPS ---
  onDeleteMessage?: (message: Message) => void;
  onEditMessage?: (message: Message) => void;
  onRetryMessage?: (message: Message) => void;
}

const ChatContainerComponent: React.FC<ChatContainerProps> = ({
  messages,
  onEvidencePress,
  isTyping,
  aiStatusText,
  liveStreamedContent,
  onAiResponseReceived,
  onDeleteMessage,
  onEditMessage,
  onRetryMessage
}) => {
  const styles = useThemeStyles(createStyles);
  const COLORS = useThemeColor();
  const { full_name } = useAuthStore();
  
  const [actionSheetVisible, setActionSheetVisible] = React.useState(false);
  const [selectedMessage, setSelectedMessage] = React.useState<Message | null>(null);

  const handleLongPress = (message: Message) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedMessage(message);
    setActionSheetVisible(true);
  };

  const handleCopy = async (message: Message) => {
    await Clipboard.setStringAsync(message.content);
  };

  const handleDelete = (message: Message) => {
    onDeleteMessage?.(message);
  };

  const handleEdit = (message: Message) => {
    onEditMessage?.(message);
  };

  const handleRetry = (message: Message) => {
    onRetryMessage?.(message);
  };

  // Logic to determine if edit/retry is allowed
  const isLastMessage = (message: Message) => {
    if (messages.length === 0) return false;
    // messages is sorted reverse (index 0 is the last message)
    return messages[0].id === message.id;
  };

  const isLastUserMessage = (message: Message) => {
    if (message.role !== 'user') return false;
    if (!messages || messages.length === 0) return false;
    // Check if it's the absolute last message
    if (isLastMessage(message)) return true;
    // Check if the only message after it is an AI message (which means we are editing the prompt)
    if (messages[0]?.role === 'model' && messages[1]?.id === message.id) return true;
    return false;
  };

  const canEdit = selectedMessage ? isLastUserMessage(selectedMessage) : false;
  const canRetry = selectedMessage ? (selectedMessage.role === 'user' && isLastMessage(selectedMessage)) || (selectedMessage.role === 'model' && selectedMessage.status === 'error') : false;

  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === 'model' && !isTyping) {
        onAiResponseReceived?.();
      }
    }
  }, [messages, isTyping, onAiResponseReceived]);

  // --- THE LIVE STREAM BUBBLE ---
  // This renders at the bottom of the chat (top of the inverted list)
  const renderLiveStreamBubble = () => {
    if (!isTyping) return null;

    return (
      <View style={styles.liveStreamContainer}>
        {/* 1. Show the status text (e.g., "Agent thinking...", "Downloading video...") */}
        {aiStatusText && (
          <View style={styles.statusBadge}>
            <TypingIndicator />
            <Text style={[styles.statusText, { color: COLORS.textSecondary }]}>
              {aiStatusText}
            </Text>
          </View>
        )}

        {/* 2. Show the tokens as they arrive, disguised as a normal ChatMessage */}
        {liveStreamedContent ? (
          <StreamMessage content={liveStreamedContent} />
        ) : null}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages.slice().reverse()}
        renderItem={({ item }) => (
          <ChatMessage
            message={item}
            onEvidencePress={() => {
              if (item.evidence) onEvidencePress?.(item.evidence);
            }}
            onLongPress={handleLongPress}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.history}
        inverted
        // Replace the basic TypingIndicator with our new dynamic bubble
        ListHeaderComponent={renderLiveStreamBubble()}
        ListEmptyComponent={!isTyping ? <ChatGreeting userName={full_name} /> : null}
      />
      <MessageActionSheet
        visible={actionSheetVisible}
        message={selectedMessage}
        onClose={() => setActionSheetVisible(false)}
        onCopy={handleCopy}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onRetry={handleRetry}
        canEdit={canEdit}
        canRetry={canRetry}
      />
    </View>
  );
};

export const ChatContainer = withObservables(['chat'], ({ chat }: { chat?: Chat | null }) => ({
  messages: chat ? chat.messages.observe() : of$([]),
}))(ChatContainerComponent);

const createStyles = (COLORS: any) => StyleSheet.create({
  container: {
    flex: 1,
  },
  history: {
    paddingHorizontal: SPACING.s16,
    paddingTop: SPACING.s16,
    paddingBottom: SPACING.s16,
  },
  liveStreamContainer: {
    marginBottom: SPACING.s8,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.s8,
    marginLeft: SPACING.s12,
  },
  statusText: {
    marginLeft: SPACING.s8,
    fontSize: 13,
    fontStyle: 'italic',
  }
});