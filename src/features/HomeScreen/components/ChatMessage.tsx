import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import AppCard from '../../../components/AppCard';
import { COLORS } from '../../../theme/colors';
import { RADIUS, SPACING, TYPOGRAPHY } from '../../../theme/styles';

interface ChatMessageProps {
  message: {
    id: number;
    sender: 'user' | 'ai';
    text: string;
    hasEvidence?: boolean;
  };
  onEvidencePress?: () => void;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, onEvidencePress }) => {
  const isUser = message.sender === 'user';
  return (
    <View style={[styles.messageRow, isUser ? styles.userMessageRow : styles.aiMessageRow]}>
      <AppCard style={[styles.messageBubble, isUser ? styles.userBubble : styles.aiBubble]}>
        <Text style={[TYPOGRAPHY.BodyM, isUser ? styles.userText : styles.aiText]}>{message.text}</Text>
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
    // UI CHANGE: Background from ultraViolet to primary
    backgroundColor: COLORS.primary,
    borderBottomRightRadius: SPACING.s4,
  },
  aiBubble: {
    // UI CHANGE: Background from lightLavender to backgroundNeutral
    backgroundColor: COLORS.backgroundNeutral,
    borderBottomLeftRadius: SPACING.s4,
  },
  userText: {
    // UI CHANGE: Text color for contrast on primary (still white)
    color: COLORS.backgroundLight,
  },
  aiText: {
    // UI CHANGE: Text color from softGray to textPrimary (dark)
    color: COLORS.textPrimary,
  },
  evidenceButton: {
    marginTop: SPACING.s8,
    alignSelf: 'flex-end',
  },
  evidenceText: {
    // UI CHANGE: Text color from desertSand to secondary
    color: COLORS.secondary,
    textDecorationLine: 'underline',
  },
});