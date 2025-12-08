import React from 'react';
import { FlatList, View } from 'react-native';
import { CHAT } from '../../../theme';
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
export const ChatContainer: React.FC<ChatContainerProps> = ({ messages, onEvidencePress }) => (
  <View style={CHAT.container}>
    <FlatList
      data={messages.slice().reverse()}
      renderItem={({ item }) => (
        <ChatMessage
          message={item}
          onEvidencePress={() => onEvidencePress?.(item.id)}
        />
      )}
      keyExtractor={(item) => item.id.toString()}
      style={CHAT.history}
      inverted
    />
  </View>
);