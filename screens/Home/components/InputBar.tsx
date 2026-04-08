import { useThemeStyles } from "@/theme/useThemeStyles";
import { useThemeColor } from "@/theme/useThemeColor";
import { RADIUS, SPACING } from '@/theme';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, TextInput, View } from 'react-native';

interface InputBarProps {
  onSend: (message: string) => void;
  placeholder?: string;
  onVoiceInput?: () => void;
}

const MOCK_TRANSCRIPT = [
  "I've", "identified", "a", "critical", "latency", "drop", "on", "the", "main", "server.", "Should", "I", "restart", "it", "now?"
];

export const InputBar: React.FC<InputBarProps> = ({
  onSend,
  placeholder = 'Ask your assistant...',
}) => {
  const styles = useThemeStyles(createStyles);
  const COLORS = useThemeColor();
  const inputRef = useRef<TextInput>(null);

  const [text, setText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  
  // Animation Values
  const modeAnim = useRef(new Animated.Value(0)).current; // 0 = Mic, 1 = Send/Stop
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const transcriptTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const isTextEmpty = text.trim().length === 0;

  // Swap Icon Logic
  useEffect(() => {
    Animated.spring(modeAnim, {
      toValue: (isTextEmpty && !isRecording) ? 0 : 1,
      useNativeDriver: true,
      friction: 6,
      tension: 50,
    }).start();
  }, [isTextEmpty, isRecording]);

  // Pulse Icon Logic for Recording State
  useEffect(() => {
    if (isRecording) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.4, duration: 500, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1, duration: 500, useNativeDriver: true })
        ])
      ).start();
    } else {
      pulseAnim.stopAnimation();
      pulseAnim.setValue(1);
    }
  }, [isRecording]);

  const startMockRecording = () => {
    setIsRecording(true);
    setText("");
    let index = 0;

    transcriptTimer.current = setInterval(() => {
      if (index < MOCK_TRANSCRIPT.length) {
        const word = MOCK_TRANSCRIPT[index];
        setText(prev => prev + (index === 0 ? '' : ' ') + word);
        index++;
      } else {
        stopMockRecording();
      }
    }, 350); // Simulates live speech-to-text timing
  };

  const stopMockRecording = () => {
    if (transcriptTimer.current) clearInterval(transcriptTimer.current);
    setIsRecording(false);
  };

  const handleActionPress = () => {
    if (isRecording) {
      stopMockRecording();
    } else if (isTextEmpty) {
      startMockRecording();
    } else {
      onSend(text.trim());
      setText('');
    }
  };

  const micScale = modeAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 0] });
  const micRotate = modeAnim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '-90deg'] });
  const actionScale = modeAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 1] });
  const actionRotate = modeAnim.interpolate({ inputRange: [0, 1], outputRange: ['90deg', '0deg'] });

  const getActionIcon = () => {
    if (isRecording) return "stop";
    return "send";
  };

  return (
    <View style={styles.container}>
      {/* Input Pill */}
      <View style={[styles.pill, isRecording && styles.pillRecording]}>
        {isRecording && (
          <Animated.View style={[styles.recordingDot, { transform: [{ scale: pulseAnim }] }]} />
        )}
        
        <TextInput
          ref={inputRef}
          style={[styles.textInput, isRecording && { color: COLORS.primary, fontWeight: '500' }]}
          value={text}
          onChangeText={setText}
          placeholder={isRecording ? "Listening..." : placeholder}
          placeholderTextColor={isRecording ? COLORS.primary : COLORS.textSecondary}
          multiline
          editable={!isRecording}
          onSubmitEditing={handleActionPress}
          returnKeyType="send"
          blurOnSubmit={false}
        />
      </View>

      {/* Dynamic Action Button */}
      <Pressable
        onPress={handleActionPress}
        style={[
          styles.actionButton,
          { 
             backgroundColor: (isTextEmpty && !isRecording) ? COLORS.backgroundNeutral : COLORS.primary,
          }
        ]}
      >
        <Animated.View style={{ position: 'absolute', transform: [{ scale: micScale }, { rotate: micRotate }] }}>
          <Ionicons name="mic-outline" size={24} color={COLORS.textPrimary} />
        </Animated.View>

        <Animated.View style={{ position: 'absolute', transform: [{ scale: actionScale }, { rotate: actionRotate }] }}>
          <Ionicons 
            name={getActionIcon()} 
            size={isRecording ? 24 : 20} 
            color={COLORS.backgroundLight} 
            style={!isRecording && { marginLeft: 2 }} // center the send paper-plane perfectly
          />
        </Animated.View>
      </Pressable>
    </View>
  );
};

const createStyles = (COLORS: any) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.s16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: COLORS.borderLight,
  },
  pill: {
    flex: 1,
    minHeight: 48,
    backgroundColor: COLORS.backgroundNeutral,
    borderRadius: RADIUS.large,
    marginRight: SPACING.s12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.s16,
    paddingVertical: SPACING.s8,
  },
  pillRecording: {
    backgroundColor: COLORS.primary + '11', // Subtle tint
    borderWidth: 1,
    borderColor: COLORS.primary + '44',
  },
  textInput: {
    flex: 1,
    color: COLORS.textPrimary,
    minHeight: 24,
  },
  recordingDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.error || '#FF3B30',
    marginRight: SPACING.s12,
  },
  actionButton: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
});