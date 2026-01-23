import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { EventCardStyles } from '../../../theme/styles/TimelineEventsScreen/EventCardStyle';

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
    <View style={EventCardStyles.rowContainer}>
      {/* 1. LEFT TIMELINE COLUMN */}
      <View style={EventCardStyles.timelineColumn}>
        {/* Prominent Time calculated from recorded_at */}
        <Text style={EventCardStyles.timeText}>{formatTime(clip.recorded_at)}</Text>

        {!isLast && <View style={EventCardStyles.timelineLine} />}
        <View style={EventCardStyles.timelineDot} />
      </View>

      {/* 2. RIGHT CONTENT CARD */}
      <Pressable
        onPress={() => {
          // You can pass the video URL to the details screen later
          console.log("Play video:", clip.video_url);
          // navigation.navigate('EventDetails', { clipId: clip.id }); 
        }}
        style={({ pressed }) => [
          EventCardStyles.cardContainer,
          pressed && { opacity: 0.9, transform: [{ scale: 0.99 }] }
        ]}
      >
        {/* Hero Media Section - HIDDEN for now as requested, or placeholder */}
        {/* If you want a placeholder icon since we have no thumbnails yet: */}
        <View style={[EventCardStyles.heroMediaContainer, { height: 60, justifyContent: 'center', alignItems: 'center', backgroundColor: '#eee' }]}>
          <Ionicons name="videocam-off-outline" size={24} color="#999" />
        </View>

        {/* Content Section */}
        <View style={EventCardStyles.contentPadding}>
          {/* Handle cases where Title/Summary are still generating */}
          <Text style={EventCardStyles.eventTitle} numberOfLines={2}>
            {clip.title || "Processing Title..."}
          </Text>
          <Text style={EventCardStyles.eventSummary} numberOfLines={3}>
            {clip.summary || "AI is generating your summary..."}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};