import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import AppCard from '../../../components/AppCard';
import { COLORS } from '../../../theme/colors';
import { RADIUS, SPACING, TYPOGRAPHY } from '../../../theme/styles';
import { Event } from '../../../shared/types';

interface EventCardProps {
  event: Event;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => navigation.navigate('EventDetails' as never)}
      style={styles.eventCardContainer}
    >
      <AppCard style={styles.eventCard}>
        <View style={styles.timeTitleRow}>
          <Text style={[TYPOGRAPHY.BodyM, styles.eventTime]}>{event.time}</Text>
          <Text style={[TYPOGRAPHY.BodyL, styles.eventTitle]} numberOfLines={1}>{event.title}</Text>
        </View>
        <View style={styles.summaryRow}>
          <View style={styles.summaryBox}>
            <Text style={[TYPOGRAPHY.Caption, { color: COLORS.softGray }]}>{event.summary}</Text>
          </View>
          {event.videoThumbnail && (
            <View style={styles.videoThumbnail}>
              <Ionicons name="videocam" size={24} color={COLORS.gray700} />
            </View>
          )}
        </View>
      </AppCard>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  eventCardContainer: {
    marginBottom: SPACING.s16,
  },
  eventCard: {
    padding: SPACING.s16,
    backgroundColor: COLORS.gray700,
  },
  timeTitleRow: {
    flexDirection: 'row',
    marginBottom: SPACING.s12,
    alignItems: 'center',
  },
  eventTime: {
    color: COLORS.desertSand,
    fontWeight: '700',
    marginRight: SPACING.s16,
  },
  eventTitle: {
    color: COLORS.white,
    fontWeight: '700',
    flex: 1,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  summaryBox: {
    flex: 1,
    paddingRight: SPACING.s16,
  },
  videoThumbnail: {
    width: 80,
    height: 50,
    backgroundColor: COLORS.gray200,
    borderRadius: RADIUS.default / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

