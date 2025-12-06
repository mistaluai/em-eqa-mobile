import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
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

export const ChatContainer: React.FC<ChatContainerProps> = ({ messages, onEvidencePress }) => (
  <View style={styles.chatContainer}>
    <FlatList
      data={messages.slice().reverse()}
      renderItem={({ item }) => (
        <ChatMessage
          message={item}
          onEvidencePress={() => onEvidencePress?.(item.id)}
        />
      )}
      keyExtractor={(item) => item.id.toString()}
      style={styles.chatHistory}
      inverted
    />
  </View>
);

const styles = StyleSheet.create({
  chatContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  chatHistory: {
    flexGrow: 1,
  },
});