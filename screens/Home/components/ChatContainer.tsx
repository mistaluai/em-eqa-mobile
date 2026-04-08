import { useThemeStyles } from "@/theme/useThemeStyles";
import { useThemeColor } from "@/theme/useThemeColor";
import { RADIUS, SPACING } from '@/theme';
import React from 'react';
import { FlatList, StyleSheet, TextStyle, View } from 'react-native';
import { ChatMessage } from './ChatMessage';
import Chat from '../../../services/databases/watermelondb/models/Chat';
import Message from '../../../services/databases/watermelondb/models/Message';
import { withObservables } from '@nozbe/watermelondb/react';
import { of as of$ } from 'rxjs';
import { EvidenceType } from '../../../shared/types/evidence';
import { TypingIndicator } from './TypingIndicator';
import { ChatGreeting } from './ChatGreeting';
import { useAuthStore } from '@/services/auth/supabaseAuth';
import { useEffect } from 'react';

interface ChatContainerProps {
  chat?: Chat | null;
  messages: Message[];
  onEvidencePress?: (evidence: EvidenceType) => void;
  isTyping?: boolean;
  onAiResponseReceived?: () => void;
}

/**
 * ChatContainerComponent - Pure presentation component for chat messages list
 */
const ChatContainerComponent: React.FC<ChatContainerProps> = ({ messages, onEvidencePress, isTyping, onAiResponseReceived }) => {
  const styles = useThemeStyles(createStyles);
  const COLORS = useThemeColor();
  const { full_name } = useAuthStore();

  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === 'model') {
        onAiResponseReceived?.();
      }
    }
  }, [messages, onAiResponseReceived]);

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
        ListHeaderComponent={isTyping ? <TypingIndicator /> : null}
        ListEmptyComponent={<ChatGreeting userName={full_name} />}
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
});