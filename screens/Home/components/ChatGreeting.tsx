import { SPACING, TYPOGRAPHY } from '@/theme';
import { useThemeColor } from "@/theme/useThemeColor";
import { useThemeStyles } from "@/theme/useThemeStyles";
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface ChatGreetingProps {
  userName: string;
}

/**
 * ChatGreeting - Elegant empty-state component for new chats
 */
export const ChatGreeting: React.FC<ChatGreetingProps> = ({ userName }) => {
  const styles = useThemeStyles(createStyles);
  const COLORS = useThemeColor();
  const firstName = userName.split(' ')[0] || 'there';

  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Ionicons name="chatbubble-ellipses" size={40} color={COLORS.primary} />
      </View>
      <Text style={[TYPOGRAPHY.HeadlineM, styles.title]}>
        Hello, {firstName}! 👋
      </Text>
      <Text style={[TYPOGRAPHY.BodyM, styles.subtitle]}>
        I'm your AI assistant. I'm here to help you remember your key points, assist you through your day, and answer any questions you have.
      </Text>
      <Text style={[TYPOGRAPHY.BodyM, styles.prompt]}>
        How can I assist you today?
      </Text>
    </View>
  );
};

const createStyles = (COLORS: any) => StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.s32,
    paddingTop: 100, // Provides vertical centering feel in the list
    transform: [{ rotate: '180deg' }], // Counteract inverted FlatList & potential RTL mirroring
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primary + '15',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.s24,
  },
  title: {
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: SPACING.s12,
  },
  subtitle: {
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: SPACING.s20,
  },
  prompt: {
    color: COLORS.primary,
    fontWeight: '600',
    textAlign: 'center',
  },
});
