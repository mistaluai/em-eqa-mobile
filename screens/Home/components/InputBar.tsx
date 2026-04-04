import { RADIUS, SPACING } from '@/theme';
import { COLORS } from '@/theme/colors';
import { Ionicons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

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
    <View style={styles.container}>
      <Pressable style={styles.voiceButton} onPress={() => inputRef.current?.focus()}>
        <Ionicons name="mic-outline" size={24} color={COLORS.textPrimary} />
      </Pressable>

      <TextInput
        ref={inputRef}
        style={styles.pill}
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
        style={[styles.sendButton, { opacity: text.trim() ? 1 : 0.5 }]}
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

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.s16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: COLORS.borderLight,
  },
  voiceButton: {
    padding: SPACING.s8,
  },
  pill: {
    flex: 1,
    height: 48,
    backgroundColor: COLORS.backgroundNeutral,
    borderRadius: RADIUS.large,
    marginHorizontal: SPACING.s12,
    justifyContent: 'center',
    paddingHorizontal: SPACING.s16,
    color: COLORS.textPrimary,
  },
  sendButton: {
    backgroundColor: COLORS.primary,
    width: 48,
    height: 48,
    borderRadius: RADIUS.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
});