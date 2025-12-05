import { Ionicons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  TextInput,
  View
} from 'react-native';
import { COLORS } from '../../../theme/colors';
import { RADIUS, SPACING } from '../../../theme/styles';

interface InputBarProps {
  onSend: (message: string) => void;
  placeholder?: string;
  onVoiceInput?: () => void;
}

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
    <View style={styles.inputBar}>
      <Pressable style={styles.voiceButton} onPress={() => inputRef.current?.focus()}>
        <Ionicons name="mic-outline" size={24} color={COLORS.ultraViolet} />
      </Pressable>

      <TextInput
        ref={inputRef}
        style={styles.textInputPill}
        value={text}
        onChangeText={setText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.white}
        multiline
        onSubmitEditing={send}
        returnKeyType="send"
        blurOnSubmit={false}
      />

      <Pressable
        onPress={send}
        style={[styles.sendButton, !text.trim() && styles.sendButton, { opacity: text.trim() ? 1 : 0.5 }]}
        disabled={!text.trim()}
      >
        <Ionicons
          name="send"
          size={20}
          color={text.trim() ? COLORS.white : COLORS.gray700}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.s16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: COLORS.gray700,
  },
  voiceButton: {
    padding: SPACING.s8,
  },
  textInputPill: {
    flex: 1,
    height: 48,
    backgroundColor: COLORS.gray700,
    borderRadius: RADIUS.large,
    marginHorizontal: SPACING.s12,
    justifyContent: 'center',
    paddingHorizontal: SPACING.s16,
  },
  sendButton: {
    backgroundColor: COLORS.ultraViolet,
    width: 48,
    height: 48,
    borderRadius: RADIUS.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

