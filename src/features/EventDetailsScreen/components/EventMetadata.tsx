import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { COLORS } from '../../../theme/colors';
import { EventMetadataStyles } from '../../../theme/styles/EventDetailsScreen/EventMetadataStyle';
import { TYPOGRAPHY } from '../../../theme';

interface EventMetadataProps {
  title: string;
  time: string;
  location: string;
}

export const EventMetadata: React.FC<EventMetadataProps> = ({ title, time, location }) => (
  <>
    <Text style={[TYPOGRAPHY.HeadlineL, EventMetadataStyles.eventTitle]}>{title}</Text>
    <View style={EventMetadataStyles.pillsContainer}>
      <View style={EventMetadataStyles.pill}>
        <Ionicons name="time-outline" size={20} color={COLORS.primary} />
        <Text style={[TYPOGRAPHY.Caption, EventMetadataStyles.pillText]}>{time}</Text>
      </View>
      <View style={EventMetadataStyles.pill}>
        <Ionicons name="location-outline" size={20} color={COLORS.primary} />
        <Text style={[TYPOGRAPHY.Caption, EventMetadataStyles.pillText]}>{location}</Text>
      </View>
    </View>
  </>
);