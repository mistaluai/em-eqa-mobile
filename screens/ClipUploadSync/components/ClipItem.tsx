// ClipItem.tsx
import { CARD, SPACING, TYPOGRAPHY } from '@/src/theme';
import { COLORS } from '@/src/theme/colors';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import AppCard from '../../../components/AppCard';
import { Clip } from '../../../shared/types';
import { ProgressBar } from './ProgressBar';

interface ClipItemProps {
  clip: Clip;
  onAction: () => void;
}

export const ClipItem: React.FC<ClipItemProps> = ({ clip, onAction }) => (
  <AppCard style={CARD.clip}>
    <View style={CARD.row}>
      <Text
        style={[
          TYPOGRAPHY.BodyM,
          // Text color is primary dark, or secondary (accent) if failed
          { color: clip.status === 'failed' ? COLORS.textPrimary : COLORS.textSecondary, flex: 1 }
        ]}
        numberOfLines={1}
      >
        {clip.name}
      </Text>
      {clip.status === 'completed' && (
        // Progress text uses the primary color
        <Text style={[TYPOGRAPHY.Caption, { color: COLORS.primary, fontWeight: '700' }]}>100%</Text>
      )}
      {clip.status === 'uploading' && (
        // Progress text uses the primary color
        <Text style={[TYPOGRAPHY.Caption, { color: COLORS.primary, fontWeight: '700' }]}>{clip.progress}%</Text>
      )}
      {clip.status === 'pending' && (
        // Pending icon uses secondary dark text/icon color
        <Ionicons name="sync-circle-outline" size={24} color={COLORS.primary} />
      )}
      {clip.status === 'failed' && (
        <Pressable onPress={onAction}>
          {/* Failed icon uses the accent/secondary color */}
          <Ionicons name="reload-circle-outline" size={24} color={COLORS.warning} />
        </Pressable>
      )}
    </View>
    {(clip.status === 'uploading' || clip.status === 'pending') && (
      <ProgressBar progress={clip.progress} />
    )}

    {clip.status === 'failed' && (
      <Pressable>
        {/* Error text uses the accent/secondary color */}
        <Text style={[TYPOGRAPHY.Caption, { color: COLORS.textSecondary, marginTop: SPACING.s4 }]}>Error: Connection Lost</Text>
      </Pressable>
    )}
  </AppCard>
);