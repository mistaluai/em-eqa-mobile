import { Ionicons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { COLORS } from '../../../theme/colors';
import { INPUT_BAR } from '../../../theme/styles';

interface InputBarProps {
  onSend: (message: string) => void;
  placeholder?: string;
  onVoiceInput?: () => void;
}

/**
 * InputBar - Pure presentation component for chat input
 * Handles its own local text state for input management
 */
export const InputBar: React.FC<InputBarProps> = ({
  onSend,
  placeholder = 'Ask your assistant...',
}) => {
  const [text, setText] = useState('');
  const inputRef = useRef<TextInput>(null);

  const send = () => {
    if (text.trim()) {
      onSend(text.trim());
      setText('');
    }
  };

  return (
    <View style={INPUT_BAR.container}>
      <Pressable style={INPUT_BAR.voiceButton} onPress={() => inputRef.current?.focus()}>
        <Ionicons name="mic-outline" size={24} color={COLORS.textPrimary} />
      </Pressable>

      <TextInput
        ref={inputRef}
        style={INPUT_BAR.pill}
        value={text}
        onChangeText={setText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.textSecondary}
        multiline
        onSubmitEditing={send}
        returnKeyType="send"
        blurOnSubmit={false}
      />

      <Pressable
        onPress={send}
        style={[INPUT_BAR.sendButton, { opacity: text.trim() ? 1 : 0.5 }]}
        disabled={!text.trim()}
      >
        <Ionicons
          name="send"
          size={20}
          color={text.trim() ? COLORS.backgroundLight : COLORS.textSecondary}
        />
      </Pressable>
    </View>
  );
};