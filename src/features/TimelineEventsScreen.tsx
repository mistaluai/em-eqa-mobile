import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppCard from '../components/AppCard';
import AppHeader from '../components/HeaderComponent';
import { COLORS } from '../theme/colors';
import { RADIUS, SPACING, TYPOGRAPHY } from '../theme/styles';

type Filter = 'Today' | 'Week' | 'All';

const mockEvents = [
  { id: 1, time: '14:30', title: 'Q4 Budget Meeting', summary: 'Discussion on quarterly forecasts and resource allocation.', videoThumbnail: true },
  { id: 2, time: '13:00', title: 'Lunch with Jane', summary: 'Casual conversation about weekend plans and team morale.', videoThumbnail: false },
  { id: 3, time: '10:15', title: 'Drafting Pitch Deck', summary: 'Initial review of competitor analysis section of the deck.', videoThumbnail: true },
  { id: 4, time: '09:00', title: 'Morning Check-in', summary: 'Reviewing daily tasks and prioritizing urgent items.', videoThumbnail: false },
];

const FilterPill: React.FC<{ filter: Filter, activeFilter: Filter, onPress: (f: Filter) => void }> = ({ filter, activeFilter, onPress }) => (
  <Pressable
    onPress={() => onPress(filter)}
    style={[
      styles.filterPill,
      activeFilter === filter && styles.activeFilterPill,
    ]}
  >
    <Text style={[
      TYPOGRAPHY.Caption,
      styles.filterText,
      activeFilter === filter && styles.activeFilterText
    ]}>
      {filter}
    </Text>
  </Pressable>
);

const EventCard: React.FC<{ event: typeof mockEvents[0], navigation: any }> = ({ event, navigation }) => (
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

const TimelineEventsScreen: React.FC = () => {
  const navigation = useNavigation();
  const [activeFilter, setActiveFilter] = useState<Filter>('Today');

  const filteredEvents = mockEvents; // Simple mock, no actual filtering logic

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader
        title="Timeline & Events"
        showBack={false}
        rightIconName="menu-outline"
        onRightIconPress={() => console.log('Open Menu')}
      />

      <View style={styles.container}>
        <View style={styles.filterBar}>
          {['Today', 'Week', 'All'].map((filter) => (
            <FilterPill
              key={filter}
              filter={filter as Filter}
              activeFilter={activeFilter}
              onPress={setActiveFilter}
            />
          ))}
        </View>

        <FlatList
          data={filteredEvents}
          renderItem={({ item }) => <EventCard event={item} navigation={navigation} />}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.carbonBlack,
  },
  container: {
    flex: 1,
    paddingHorizontal: SPACING.s24,
  },
  filterBar: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: SPACING.s16,
    gap: SPACING.s12,
  },
  filterPill: {
    paddingHorizontal: SPACING.s16,
    paddingVertical: SPACING.s8,
    borderRadius: RADIUS.large,
    backgroundColor: COLORS.gray700,
  },
  activeFilterPill: {
    backgroundColor: COLORS.ultraViolet,
  },
  filterText: {
    color: COLORS.softGray,
    fontWeight: '600',
  },
  activeFilterText: {
    color: COLORS.white,
  },
  listContent: {
    paddingBottom: SPACING.s24,
  },
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
  }
});

export default TimelineEventsScreen;