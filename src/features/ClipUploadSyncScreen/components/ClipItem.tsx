import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import AppCard from '../../../components/AppCard';
import { COLORS } from '../../../theme/colors';
import { CARD, SPACING, TYPOGRAPHY } from '../../../theme/styles';
import { Clip } from '../../../shared/types';
import { ProgressBar } from './ProgressBar';

interface ClipItemProps {
  clip: Clip;
  onAction: () => void;
}

export const ClipItem: React.FC<ClipItemProps> = ({ clip, onAction }) => (
  <AppCard style={CARD.clip}>
    <View style={CARD.row}>
      <Text style={[TYPOGRAPHY.BodyM, { color: clip.status === 'failed' ? COLORS.desertSand : COLORS.white, flex: 1 }]} numberOfLines={1}>
        {clip.name}
      </Text>
      {clip.status === 'completed' && (
        <Text style={[TYPOGRAPHY.Caption, { color: COLORS.ultraViolet, fontWeight: '700' }]}>100%</Text>
      )}
      {clip.status === 'uploading' && (
        <Text style={[TYPOGRAPHY.Caption, { color: COLORS.ultraViolet, fontWeight: '700' }]}>{clip.progress}%</Text>
      )}
      {clip.status === 'pending' && (
        <Ionicons name="sync-circle-outline" size={24} color={COLORS.softGray} />
      )}
      {clip.status === 'failed' && (
        <Pressable onPress={onAction}>
          <Ionicons name="reload-circle-outline" size={24} color={COLORS.desertSand} />
        </Pressable>
      )}
    </View>
    {(clip.status === 'uploading' || clip.status === 'pending') && (
      <ProgressBar progress={clip.progress} />
    )}
    {clip.status === 'completed' && (
      <Pressable onPress={onAction}>
        <Text style={[TYPOGRAPHY.Caption, { color: COLORS.desertSand, marginTop: SPACING.s8, alignSelf: 'flex-end' }]}>
          Clear Completed
        </Text>
      </Pressable>
    )}
    {clip.status === 'failed' && (
        <Text style={[TYPOGRAPHY.Caption, { color: COLORS.desertSand, marginTop: SPACING.s4 }]}>Error: Connection Lost</Text>
    )}
  </AppCard>
);

