import { Ionicons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  TextInput,
  View
} from 'react-native';
// Assuming the COLORS import is now logically configured for Light UI
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
      {/* Voice Button Icon - Uses Dark Text/Icon Color for contrast on white background */}
      <Pressable style={styles.voiceButton} onPress={() => inputRef.current?.focus()}>
        <Ionicons name="mic-outline" size={24} color={COLORS.textPrimary} /> 
      </Pressable>

      <TextInput
        ref={inputRef}
        style={styles.textInputPill}
        value={text}
        onChangeText={setText}
        placeholder={placeholder}
        // Placeholder Text - Uses Secondary Dark Text Color on light background
        placeholderTextColor={COLORS.textSecondary} 
        multiline
        onSubmitEditing={send}
        returnKeyType="send"
        blurOnSubmit={false}
      />

      <Pressable
        onPress={send}
        // Disabled opacity applied dynamically
        style={[styles.sendButton, { opacity: text.trim() ? 1 : 0.5 }]}
        disabled={!text.trim()}
      >
        <Ionicons
          name="send"
          size={20}
          // Icon color swaps based on active/inactive state
          // Active: white on primary background. Inactive: secondary dark color on primary background (or backgroundLight on primary, check previous logic - using backgroundLight for high contrast)
          color={text.trim() ? COLORS.backgroundLight : COLORS.textSecondary}
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
    // Border uses a subtle light border color
    borderTopColor: COLORS.borderLight, 
  },
  voiceButton: {
    padding: SPACING.s8,
  },
  textInputPill: {
    flex: 1,
    height: 48,
    // Input background uses the neutral surface color
    backgroundColor: COLORS.backgroundNeutral, 
    borderRadius: RADIUS.large,
    marginHorizontal: SPACING.s12,
    justifyContent: 'center',
    paddingHorizontal: SPACING.s16,
    // Ensure input text is dark
    color: COLORS.textPrimary,
  },
  sendButton: {
    // Send button uses the main primary/action color
    backgroundColor: COLORS.primary, 
    width: 48,
    height: 48,
    borderRadius: RADIUS.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
});