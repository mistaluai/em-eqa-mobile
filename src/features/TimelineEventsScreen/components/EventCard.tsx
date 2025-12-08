import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import AppCard from '../../../components/AppCard';
import { Event } from '../../../shared/types';
import { COLORS } from '../../../theme/colors';
import { EventCardStyles } from '../../../theme/styles/TimelineEventsScreen/EventCardStyle';

interface EventCardProps {
  event: Event;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const navigation = useNavigation<any>();

  return (
    <Pressable
      onPress={() => navigation.navigate('EventDetails' as never)}
      style={EventCardStyles.eventCardContainer}
    >
      <AppCard style={EventCardStyles.eventCard}>
        <View style={EventCardStyles.headerSection}>
          <Text style={EventCardStyles.eventTitle} numberOfLines={2}>
            {event.title}
          </Text>
          <Text style={EventCardStyles.eventTime}>{event.time}</Text>
        </View>

        <View style={EventCardStyles.footerRow}>
          <Text style={EventCardStyles.eventSummary} numberOfLines={3}>
            {event.summary}
          </Text>

          {event.videoThumbnail && (
            <View style={EventCardStyles.videoIconContainer}>
              <Ionicons name="videocam" size={24} color={COLORS.textSecondary} />
            </View>
          )}
        </View>
      </AppCard>
    </Pressable>
  );
};