import { CHAT, TYPOGRAPHY } from '@/src/theme';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
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
    <View style={[CHAT.messageRow, isUser ? CHAT.messageRowUser : CHAT.messageRowAI]}>
      <AppCard style={[CHAT.bubble, isUser ? CHAT.bubbleUser : CHAT.bubbleAI]}>
        <Text style={[TYPOGRAPHY.BodyM, isUser ? CHAT.textUser : CHAT.textAI]}>{message.text}</Text>
        {message.hasEvidence && (
          <Pressable onPress={onEvidencePress} style={CHAT.evidenceButton}>
            <Text style={[TYPOGRAPHY.Caption, CHAT.evidenceText]}>See Evidence</Text>
          </Pressable>
        )}
      </AppCard>
    </View>
  );
};