import { useThemeStyles } from "@/theme/useThemeStyles";
import { useThemeColor } from "@/theme/useThemeColor";
import { RADIUS, SPACING } from '@/theme';
import React from 'react';
import { FlatList, StyleSheet, TextStyle, View } from 'react-native';
import { ChatMessage } from './ChatMessage';
interface ChatMessageData {
  id: number;
  sender: 'user' | 'ai';
  text: string;
  hasEvidence?: boolean;
}

interface ChatContainerProps {
  messages: ChatMessageData[];
  onEvidencePress?: (messageId: number) => void;
}

/**
 * ChatContainer - Pure presentation component for chat messages list
 */
export const ChatContainer: React.FC<ChatContainerProps> = ({ messages, onEvidencePress }) => {
  const styles = useThemeStyles(createStyles);
  const COLORS = useThemeColor();

  return (
    <View style={styles.container}>
      <FlatList
        data={messages.slice().reverse()}
        renderItem={({ item }) => (
          <ChatMessage
            message={item}
            onEvidencePress={() => onEvidencePress?.(item.id)}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        style={styles.history}
        inverted
      />
    </View>
  );
};

const createStyles = (COLORS: any) => StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SPACING.s16,
    paddingTop: SPACING.s16,
  },
  history: {
    flexGrow: 1,
  },
  // These styles likely belong in ChatMessage.tsx, but are kept here 
  // to complete the merge from CHAT.ts as requested.
  messageRow: {
    maxWidth: '80%',
    marginVertical: SPACING.s4,
  },
  messageRowUser: {
    alignSelf: 'flex-end',
  },
  messageRowAI: {
    alignSelf: 'flex-start',
  },
  bubble: {
    padding: SPACING.s12,
    borderRadius: RADIUS.default,
  },
  bubbleUser: {
    backgroundColor: COLORS.primary,
    borderBottomRightRadius: SPACING.s4,
  },
  bubbleAI: {
    backgroundColor: COLORS.backgroundNeutral,
    borderBottomLeftRadius: SPACING.s4,
  },
  textUser: {
    color: COLORS.backgroundLight,
  } as TextStyle,
  textAI: {
    color: COLORS.textPrimary,
  } as TextStyle,
  evidenceButton: {
    marginTop: SPACING.s8,
    alignSelf: 'flex-end',
  },
  evidenceText: {
    color: COLORS.primary,
    textDecorationLine: 'underline',
  } as TextStyle,
});