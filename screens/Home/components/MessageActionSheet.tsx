import { RADIUS, SPACING, TYPOGRAPHY } from '@/theme';
import { useThemeColor } from '@/theme/useThemeColor';
import { useThemeStyles } from '@/theme/useThemeStyles';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import Message from '../../../services/databases/watermelondb/models/Message';
import * as Haptics from 'expo-haptics';

interface MessageActionSheetProps {
  visible: boolean;
  message: Message | null;
  onClose: () => void;
  onCopy: (message: Message) => void;
  onEdit: (message: Message) => void;
  onDelete: (message: Message) => void;
  onRetry: (message: Message) => void;
  canEdit: boolean;
  canRetry: boolean;
}

export const MessageActionSheet: React.FC<MessageActionSheetProps> = ({
  visible,
  message,
  onClose,
  onCopy,
  onEdit,
  onDelete,
  onRetry,
  canEdit,
  canRetry,
}) => {
  const styles = useThemeStyles(createStyles);
  const COLORS = useThemeColor();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (visible) {
      setCopied(false);
    }
  }, [visible]);

  if (!message) return null;

  const handleCopy = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setCopied(true);
    onCopy(message);
    setTimeout(() => {
      onClose();
    }, 600);
  };

  const handleEdit = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onClose();
    onEdit(message);
  };

  const handleDelete = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onClose();
    onDelete(message);
  };

  const handleRetry = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onClose();
    onRetry(message);
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.sheet} onStartShouldSetResponder={() => true}>
          <View style={styles.handle} />

          {/* Copy */}
          <Pressable style={({ pressed }) => [styles.actionButton, pressed && styles.actionButtonPressed]} onPress={handleCopy}>
            <Ionicons name={copied ? "checkmark" : "copy-outline"} size={24} color={copied ? COLORS.success : COLORS.textPrimary} />
            <Text style={[styles.actionText, copied && { color: COLORS.success }]}>{copied ? "Copied" : "Copy"}</Text>
          </Pressable>

          {/* Edit */}
          {canEdit && (
            <Pressable style={({ pressed }) => [styles.actionButton, pressed && styles.actionButtonPressed]} onPress={handleEdit}>
              <Ionicons name="pencil-outline" size={24} color={COLORS.textPrimary} />
              <Text style={styles.actionText}>Edit</Text>
            </Pressable>
          )}

          {/* Retry */}
          {canRetry && (
            <Pressable style={({ pressed }) => [styles.actionButton, pressed && styles.actionButtonPressed]} onPress={handleRetry}>
              <Ionicons name="refresh-outline" size={24} color={COLORS.primary} />
              <Text style={[styles.actionText, { color: COLORS.primary }]}>Retry</Text>
            </Pressable>
          )}

          {/* Delete */}
          <Pressable style={({ pressed }) => [styles.actionButton, pressed && styles.actionButtonPressed]} onPress={handleDelete}>
            <Ionicons name="trash-outline" size={24} color="#FF3B30" />
            <Text style={[styles.actionText, { color: '#FF3B30' }]}>Delete</Text>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
};

const createStyles = (COLORS: any) => StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: COLORS.backgroundLight,
    borderTopLeftRadius: RADIUS.large,
    borderTopRightRadius: RADIUS.large,
    padding: SPACING.s16,
    paddingBottom: SPACING.s32,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: COLORS.borderLight,
    borderRadius: RADIUS.full,
    alignSelf: 'center',
    marginBottom: SPACING.s16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.s16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  actionButtonPressed: {
    opacity: 0.7,
    backgroundColor: COLORS.backgroundNeutral,
  },
  actionText: {
    ...TYPOGRAPHY.BodyL,
    marginLeft: SPACING.s16,
    color: COLORS.textPrimary,
  },
});
