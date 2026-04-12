import { useAuthStore } from '@/services/databases/supabase/supabaseAuth';
import { SPACING } from '@/theme';
import { useThemeColor } from "@/theme/useThemeColor";
import { useThemeStyles } from "@/theme/useThemeStyles";
import { withObservables } from '@nozbe/watermelondb/react';
import React, { useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { of as of$ } from 'rxjs';
import Chat from '../../../services/databases/watermelondb/models/Chat';
import Message from '../../../services/databases/watermelondb/models/Message';
import { EvidenceType } from '../../../shared/types/evidence';
import { ChatGreeting } from './ChatGreeting';
import { ChatMessage } from './ChatMessage';
import { TypingIndicator } from './TypingIndicator';

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