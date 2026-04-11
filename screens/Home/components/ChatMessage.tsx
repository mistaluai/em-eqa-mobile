import { useThemeStyles } from "@/theme/useThemeStyles";
import { useThemeColor } from "@/theme/useThemeColor";
import { RADIUS, SPACING, TYPOGRAPHY, SHADOW } from '@/theme';
import { Ionicons } from '@expo/vector-icons';
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
      <View style={[
        styles.bubble, 
        isUser ? styles.bubbleUser : styles.bubbleAI,
        { borderWidth: 1, borderColor: isUser ? 'transparent' : COLORS.borderLight }
      ]}>
        <Text style={[
          TYPOGRAPHY.BodyM, 
          isUser ? styles.textUser : styles.textAI,
          { lineHeight: 22 }
        ]}>
          {message.content}
        </Text>
        
        {!!message.evidence && (
          <Pressable 
            onPress={onEvidencePress} 
            style={({ pressed }) => [
              styles.evidenceBadge,
              pressed && { opacity: 0.7 }
            ]}
          >
            <Ionicons name="play-circle" size={18} color={isUser ? "#FFFFFF" : styles.evidenceText.color} />
            <Text style={[TYPOGRAPHY.Caption, isUser ? styles.textUser : styles.evidenceText, { marginLeft: 4, fontWeight: '600' }]}>
              See Evidence
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

export const ChatMessage = withObservables(['message'], ({ message }: { message: Message }) => ({
  message // observe updates automatically
}))(ChatMessageComponent);

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
  textUser: {
    color: COLORS.backgroundLight,
  } as TextStyle,
  textAI: {
    color: COLORS.textPrimary,
  } as TextStyle,
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