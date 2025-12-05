import React from 'react';
import { Pressable, Text } from 'react-native';
import AppButton from '../../../components/AppButton';
import { COLORS } from '../../../theme/colors';
import { SPACING, TEXT, TYPOGRAPHY } from '../../../theme/styles';
import { Clip } from '../../../shared/types';
import { ClipItem } from './ClipItem';

interface ClipSectionProps {
  title: string;
  clips: Clip[];
  onClipAction: (clipName: string) => void;
  onClearAll?: () => void;
  onPauseAll?: () => void;
  titleColor?: string;
}

export const ClipSection: React.FC<ClipSectionProps> = ({
  title,
  clips,
  onClipAction,
  onClearAll,
  onPauseAll,
  titleColor = COLORS.white,
}) => {
  if (clips.length === 0) return null;

  return (
    <>
      <Text style={[TYPOGRAPHY.HeadlineM, TEXT.sectionTitle, { color: titleColor }]}>{title}</Text>
      {clips.map((clip, index) => (
        <ClipItem key={index} clip={clip} onAction={() => onClipAction(clip.name)} />
      ))}
      {onClearAll && (
        <Pressable onPress={onClearAll}>
          <Text style={[TYPOGRAPHY.Caption, TEXT.retryAll]}>Clear All Completed</Text>
        </Pressable>
      )}
      {onPauseAll && (
        <AppButton
          title="Pause All Uploads"
          onPress={onPauseAll}
          variant="secondary"
          style={{ marginTop: SPACING.s12 }}
        />
      )}
      {title === 'Failed Uploads' && (
        <Pressable onPress={() => console.log('Retry All')}>
          <Text style={[TYPOGRAPHY.Caption, TEXT.retryAll]}>Retry All Failed Uploads</Text>
        </Pressable>
      )}
    </>
  );
};

