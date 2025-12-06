// ClipSection.tsx
import React from 'react';
import { Pressable, Text } from 'react-native';
import { Clip } from '../../../shared/types';
import { COLORS } from '../../../theme/colors';
import { TEXT, TYPOGRAPHY } from '../../../theme/styles';
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
  // Default title color is now primary dark text
  titleColor = COLORS.textPrimary, 
}) => {
  if (clips.length === 0) return null;

  // Note: TEXT.sectionTitle and TEXT.retryAll will need to be updated 
  // in styles.ts to use the new semantic colors if they contain hardcoded values.
  
  return (
    <>
      <Text style={[TYPOGRAPHY.HeadlineM, TEXT.sectionTitle, { color: titleColor }]}>{title}</Text>
      {clips.map((clip, index) => (
        <ClipItem key={index} clip={clip} onAction={() => onClipAction(clip.name)} />
      ))}
      {onClearAll && (
        <Pressable onPress={onClearAll}>
          {/* Link text style relies on TEXT.retryAll being updated to use COLORS.secondary */}
          <Text style={[TYPOGRAPHY.Caption, TEXT.retryAll,]}>Clear All Completed</Text>
        </Pressable>
      )}
      {onPauseAll && (
        // <AppButton
        //   title="Pause All Uploads"
        //   onPress={onPauseAll}
        //   variant="secondary"
        //   style={{  alignSelf: 'flex-end', borderRadius : 32 ,}} 
        // />
        <Pressable onPress={onClearAll}>
          {/* Link text style relies on TEXT.retryAll being updated to use COLORS.secondary */}
          <Text style={[TYPOGRAPHY.Caption, TEXT.clearAll,]}>Pause All Uploads</Text>
        </Pressable>
      )}
      {title === 'Failed Uploads' && (
        <Pressable onPress={() => console.log('Retry All')}>
          {/* Link text style relies on TEXT.retryAll being updated to use COLORS.secondary */}
          <Text style={[TYPOGRAPHY.Caption, TEXT.retryAll]}>Retry All Failed Uploads</Text>
        </Pressable>
      )}
    </>
  );
};