import { useThemeStyles } from "@/theme/useThemeStyles";
import { useThemeColor } from "@/theme/useThemeColor";
import { RADIUS, SHADOW, SPACING } from '@/theme';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';

interface VideoPlaceholderProps {
  url: string | null;
}

export const VideoPlaceholder: React.FC<VideoPlaceholderProps> = ({ url }) => {
  const styles = useThemeStyles(createStyles);
  const COLORS = useThemeColor();

  const player = useVideoPlayer(url, (player) => {
    if (url) {
      player.play();
    }
  });

  if (!url) return null;

  return (
    <View style={styles.container}>
      <VideoView 
        player={player} 
        style={styles.absoluteVideo} 
        allowsFullscreen 
        allowsPictureInPicture 
        nativeControls={true}
        contentFit="cover"
      />
    </View>
  );
};

const createStyles = (COLORS: any) => StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: (16 / 9) / 1.25,
    backgroundColor: COLORS.backgroundNeutral,
    borderRadius: RADIUS.large,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.s24,
    overflow: 'hidden',
    ...SHADOW.default,
  },
  absoluteVideo: {
    ...StyleSheet.absoluteFillObject,
  },
});