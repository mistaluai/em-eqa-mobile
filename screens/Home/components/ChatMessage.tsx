import { RADIUS, SPACING, TYPOGRAPHY } from '@/theme';
import { COLORS } from '@/theme/colors';
import React from 'react';
import { Pressable, StyleSheet, Text, TextStyle, View } from 'react-native';
import AppCard from '../../../components/AppCard';
interface ChatMessageProps {
  message: {
    id: number;
    sender: 'user' | 'ai';
    text: string;
    hasEvidence?: boolean;
  };
  onEvidencePress?: () => void;
}

/**
 * ChatMessage - Pure presentation component for individual chat message
 */
export const ChatMessage: React.FC<ChatMessageProps> = ({ message, onEvidencePress }) => {
  const isUser = message.sender === 'user';
  return (
    <View style={[styles.messageRow, isUser ? styles.messageRowUser : styles.messageRowAI]}>
      <AppCard style={[styles.bubble, isUser ? styles.bubbleUser : styles.bubbleAI]}>
        <Text style={[TYPOGRAPHY.BodyM, isUser ? styles.textUser : styles.textAI]}>{message.text}</Text>
        {message.hasEvidence && (
          <Pressable onPress={onEvidencePress} style={styles.evidenceButton}>
            <Text style={[TYPOGRAPHY.Caption, styles.evidenceText]}>See Evidence</Text>
          </Pressable>
        )}
      </AppCard>
    </View>
  );
};

const styles = StyleSheet.create({
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