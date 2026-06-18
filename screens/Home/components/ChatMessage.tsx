import { RADIUS, SPACING, TYPOGRAPHY } from '@/theme';
import { useThemeColor } from "@/theme/useThemeColor";
import { useThemeStyles } from "@/theme/useThemeStyles";
import { Ionicons } from '@expo/vector-icons';
import { withObservables } from '@nozbe/watermelondb/react';
import React from 'react';
import { Pressable, StyleSheet, Text, TextStyle, View } from 'react-native';
import Markdown from 'react-native-markdown-display';
import Message from '../../../services/databases/watermelondb/models/Message';

interface ChatMessageProps {
  message: Message;
  onEvidencePress?: () => void;
  onLongPress?: (message: Message) => void;
}

const ChatMessageComponent: React.FC<ChatMessageProps> = ({ message, onEvidencePress, onLongPress }) => {
  // Pass the styles creator to the hook
  const styles = useThemeStyles(createStyles);
  const COLORS = useThemeColor();
  const isUser = message.role === 'user';

  const markdownStyle = {
    body: {
      ...TYPOGRAPHY.BodyM,
      color: isUser ? COLORS.backgroundLight : COLORS.textPrimary,
      lineHeight: 22,
    },
    code_inline: {
      backgroundColor: isUser ? 'rgba(255,255,255,0.2)' : COLORS.backgroundNeutral,
      padding: 2,
    },
    code_block: {
      backgroundColor: '#000',
      borderRadius: 8,
      padding: 10,
    }
  };

  return (
    <Pressable onLongPress={() => onLongPress?.(message)} delayLongPress={300} style={[styles.messageRow, isUser ? styles.messageRowUser : styles.messageRowAI]}>
      <View style={[
        styles.bubble,
        isUser ? styles.bubbleUser : styles.bubbleAI,
        { borderWidth: 1, borderColor: isUser ? 'transparent' : COLORS.borderLight }
      ]}>
        <Markdown style={markdownStyle}>
          {message.content}
        </Markdown>

        {!!message.evidence && (
          <Pressable
            onPress={onEvidencePress}
            style={({ pressed }) => [styles.evidenceBadge, pressed && { opacity: 0.7 }]}
          >
            <Ionicons name="play-circle" size={18} color={isUser ? "#FFFFFF" : COLORS.primary} />
            <Text style={[TYPOGRAPHY.Caption, isUser ? { color: '#FFFFFF' } : styles.evidenceText, { marginLeft: 4, fontWeight: '600' }]}>
              See Evidence
            </Text>
          </Pressable>
        )}
      </View>
    </Pressable>
  );
};

// --- FIX: Define createStyles inside the file ---
const createStyles = (COLORS: any) => StyleSheet.create({
  messageRow: {
    maxWidth: '85%',
    marginVertical: SPACING.s8,
  },
  messageRowUser: {
    alignSelf: 'flex-end',
  },
  messageRowAI: {
    alignSelf: 'flex-start',
  },
  bubble: {
    paddingVertical: SPACING.s12,
    paddingHorizontal: SPACING.s16,
  },
  bubbleUser: {
    backgroundColor: COLORS.primary,
    borderTopLeftRadius: RADIUS.large,
    borderTopRightRadius: RADIUS.large,
    borderBottomLeftRadius: RADIUS.large,
    borderBottomRightRadius: SPACING.s4,
  },
  bubbleAI: {
    backgroundColor: COLORS.backgroundNeutral,
    borderTopLeftRadius: RADIUS.large,
    borderTopRightRadius: RADIUS.large,
    borderBottomRightRadius: RADIUS.large,
    borderBottomLeftRadius: SPACING.s4,
  },
  evidenceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary + '15',
    paddingVertical: SPACING.s4,
    paddingHorizontal: SPACING.s8,
    borderRadius: RADIUS.full,
    marginTop: SPACING.s10,
    alignSelf: 'flex-start',
  },
  evidenceText: {
    color: COLORS.primary,
  } as TextStyle,
});

export const ChatMessage = withObservables(['message'], ({ message }: { message: Message }) => ({
  message
}))(ChatMessageComponent);