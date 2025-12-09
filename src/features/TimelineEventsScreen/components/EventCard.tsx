import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Event } from '../../../shared/types';
import { COLORS } from '../../../theme/colors';
import { EventCardStyles } from '../../../theme/styles/TimelineEventsScreen/EventCardStyle';

interface EventCardProps {
  event: Event;
  isLast: boolean;
}

export const EventCard: React.FC<EventCardProps> = ({ event, isLast }) => {
  const navigation = useNavigation<any>();

  return (
    <View style={EventCardStyles.rowContainer}>
      {/* 1. LEFT TIMELINE COLUMN */}
      <View style={EventCardStyles.timelineColumn}>
        {/* Prominent Time */}
        <Text style={EventCardStyles.timeText}>{event.time}</Text>

        {/* The Connector Line */}
        {/* We use a conditional height or style to stop it if it's the last item */}
        {!isLast && <View style={EventCardStyles.timelineLine} />}

        {/* The Node/Dot */}
        <View style={EventCardStyles.timelineDot} />
      </View>

      {/* 2. RIGHT CONTENT CARD */}
      <Pressable
        onPress={() => navigation.navigate('EventDetails' as never)}
        style={({ pressed }) => [
          EventCardStyles.cardContainer,
          pressed && { opacity: 0.9, transform: [{ scale: 0.99 }] }
        ]}
      >
        {/* Hero Media Section (Full Width) */}
        {event.videoThumbnail && (
          <View style={EventCardStyles.heroMediaContainer}>
            <Ionicons name="play-circle" size={48} color={COLORS.backgroundLight} />
            <View style={EventCardStyles.durationBadge}>
              <Text style={EventCardStyles.durationText}>00:45</Text>
            </View>
          </View>
        )}

        {/* Content Section */}
        <View style={EventCardStyles.contentPadding}>
          <Text style={EventCardStyles.eventTitle} numberOfLines={2}>
            {event.title}
          </Text>
          <Text style={EventCardStyles.eventSummary} numberOfLines={3}>
            {event.summary}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};