import React from 'react';
import { FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../../components/HeaderComponent';
import { LIST, SCREEN } from '../../theme';
import { EventCard } from './components/EventCard';
import { FilterBar } from './components/FilterBar';
import { mockEvents } from './constants';
import { useTimelineEventsLogic } from './hooks/useTimelineEventsLogic';

/**
 * TimelineEventsScreen - Main screen component for timeline and events
 * Handles composition and rendering using hooks and components
 */
const TimelineEventsScreen: React.FC = () => {
  const { activeFilter, setActiveFilter, getFilteredEvents } = useTimelineEventsLogic();
  const filteredEvents = getFilteredEvents(mockEvents);

  return (
    <SafeAreaView style={SCREEN.safeArea}>
      <AppHeader title="Timeline & Events" showBack={true} />

      <View style={SCREEN.timelineContainer}>
        <FilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} />

        <FlatList
          data={filteredEvents}
          renderItem={({ item }) => <EventCard event={item} />}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={LIST.content}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default TimelineEventsScreen;