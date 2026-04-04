import { RADIUS, SPACING } from '@/theme';
import { COLORS } from '@/theme/colors';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

// 1. Define the Prop Type based on your Supabase Schema
interface ClipData {
  id?: string;
  title?: string | null;
  summary?: string | null;
  recorded_at: string; // ISO String
  video_url: string;
}

interface EventCardProps {
  clip: ClipData; // Changed from 'event' to 'clip' to be clear
  isLast: boolean;
}

export const EventCard: React.FC<EventCardProps> = ({ clip, isLast }) => {
  const navigation = useNavigation<any>();

  // 2. Helper to extract time from ISO string (e.g. "2023-10-01T14:30:00" -> "14:30")
  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <View style={styles.rowContainer}>
      {/* 1. LEFT TIMELINE COLUMN */}
      <View style={styles.timelineColumn}>
        {/* Prominent Time calculated from recorded_at */}
        <Text style={styles.timeText}>{formatTime(clip.recorded_at)}</Text>

        {!isLast && <View style={styles.timelineLine} />}
        <View style={styles.timelineDot} />
      </View>

      {/* 2. RIGHT CONTENT CARD */}
      <Pressable
        onPress={() => {
          // You can pass the video URL to the details screen later
          console.log("Play video:", clip.video_url);
          // navigation.navigate('EventDetails', { clipId: clip.id }); 
        }}
        style={({ pressed }) => [
          styles.cardContainer,
          pressed && { opacity: 0.9, transform: [{ scale: 0.99 }] }
        ]}
      >
        {/* Hero Media Section - HIDDEN for now as requested, or placeholder */}
        {/* If you want a placeholder icon since we have no thumbnails yet: */}
        <View style={[styles.heroMediaContainer, { height: 60, justifyContent: 'center', alignItems: 'center', backgroundColor: '#eee' }]}>
          <Ionicons name="videocam-off-outline" size={24} color="#999" />
        </View>

        {/* Content Section */}
        <View style={styles.contentPadding}>
          {/* Handle cases where Title/Summary are still generating */}
          <Text style={styles.eventTitle} numberOfLines={2}>
            {clip.title || "Processing Title..."}
          </Text>
          <Text style={styles.eventSummary} numberOfLines={3}>
            {clip.summary || "AI is generating your summary..."}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  // Main Row Layout
  rowContainer: {
    flexDirection: 'row',
    marginBottom: 0, // Handled by the content inside
    minHeight: 100,
  },

  // --- Timeline Column (Left) ---
  timelineColumn: {
    width: 60,
    alignItems: 'center',
    paddingTop: 0,
    marginRight: SPACING.s12,
  },
  timeText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.s8,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.primary, // UltraViolet Node
    borderWidth: 2,
    borderColor: COLORS.backgroundLight, // White border to separate from line
    zIndex: 2,
    marginTop: 4, // Align visually with the card title top
  },
  timelineLine: {
    position: 'absolute',
    top: 24, // Start slightly below the time text
    bottom: -10, // Extend to next item
    width: 2,
    backgroundColor: COLORS.borderLight, // Subtle connection line
    zIndex: 1,
  },

  // --- Content Card (Right) ---
  cardContainer: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
    borderRadius: RADIUS.large,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    marginBottom: SPACING.s24,
    overflow: 'hidden', // Ensures hero image respects corners
    // Optional: Add subtle shadow for depth
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  // Hero Image
  heroMediaContainer: {
    width: '100%',
    height: 120, // Cinematic aspect ratio
    backgroundColor: COLORS.textSecondary, // Placeholder dark grey
    justifyContent: 'center',
    alignItems: 'center',
  },
  durationBadge: {
    position: 'absolute',
    bottom: SPACING.s8,
    right: SPACING.s8,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: SPACING.s8,
    paddingVertical: 2,
    borderRadius: RADIUS.default,
  },
  durationText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },

  // Text Content
  contentPadding: {
    padding: SPACING.s16,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.s4,
  },
  eventSummary: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
});