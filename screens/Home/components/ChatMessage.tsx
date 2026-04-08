import { useThemeStyles } from "@/theme/useThemeStyles";
import { useThemeColor } from "@/theme/useThemeColor";
import { RADIUS, SPACING, TYPOGRAPHY } from '@/theme';
import React from 'react';
import { Pressable, StyleSheet, Text, TextStyle, View } from 'react-native';
import AppCard from '../../../components/AppCard';
import Message from '../../../services/databases/watermelondb/models/Message';
import { withObservables } from '@nozbe/watermelondb/react';

interface ChatMessageProps {
  message: Message;
  onEvidencePress?: () => void;
}

/**
 * ChatMessageComponent - Presentation component for individual chat message
 */
const ChatMessageComponent: React.FC<ChatMessageProps> = ({ message, onEvidencePress }) => {
  const styles = useThemeStyles(createStyles);
  const COLORS = useThemeColor();
  const isUser = message.role === 'user';
  return (
    <View style={[styles.messageRow, isUser ? styles.messageRowUser : styles.messageRowAI]}>
      <AppCard style={[styles.bubble, isUser ? styles.bubbleUser : styles.bubbleAI]}>
        <Text style={[TYPOGRAPHY.BodyM, isUser ? styles.textUser : styles.textAI]}>{message.content}</Text>
        {!!message.evidence && (
          <Pressable onPress={onEvidencePress} style={styles.evidenceButton}>
            <Text style={[TYPOGRAPHY.Caption, styles.evidenceText]}>See Evidence</Text>
          </Pressable>
        )}
      </AppCard>
    </View>
  );
};

export const ChatMessage = withObservables(['message'], ({ message }: { message: Message }) => ({
  message // observe updates automatically
}))(ChatMessageComponent);

const createStyles = (COLORS: any) => StyleSheet.create({
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