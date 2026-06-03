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

interface ChatContainerProps {
  chat?: Chat | null;
  messages: Message[];
  onEvidencePress?: (evidence: EvidenceType) => void;
  isTyping?: boolean;
  // --- NEW STREAMING PROPS ---
  aiStatusText?: string | null;
  liveStreamedContent?: string;
  onAiResponseReceived?: () => void;
}

const ChatContainerComponent: React.FC<ChatContainerProps> = ({
  messages,
  onEvidencePress,
  isTyping,
  aiStatusText,
  liveStreamedContent,
  onAiResponseReceived
}) => {
  const styles = useThemeStyles(createStyles);
  const COLORS = useThemeColor();
  const { full_name } = useAuthStore();

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
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.history}
        inverted
        // Replace the basic TypingIndicator with our new dynamic bubble
        ListHeaderComponent={renderLiveStreamBubble()}
        ListEmptyComponent={!isTyping ? <ChatGreeting userName={full_name} /> : null}
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