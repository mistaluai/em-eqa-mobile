import React from 'react';
import { FlatList, RefreshControl, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../../components/HeaderComponent';
import { LIST, SCREEN } from '../../theme';
import { EventCard } from './components/EventCard';
import { FilterBar } from './components/FilterBar';
import { useTimelineEventsLogic } from './hooks/useTimelineEventsLogic';

const TimelineEventsScreen: React.FC = () => {
  const {
    activeFilter,
    setActiveFilter,
    events,
    loading,
    refreshEvents
  } = useTimelineEventsLogic();

  return (
    <SafeAreaView style={SCREEN.safeArea}>
      <AppHeader title="Timeline & Events" showBack={true} />

      <View style={SCREEN.timelineContainer}>
        <FilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} />

        <FlatList
          data={events}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={refreshEvents} />
          }
          renderItem={({ item, index }) => (
            <EventCard
              clip={item}
              isLast={index === events.length - 1}
            />
          )}
          keyExtractor={(item) => item.id || item.video_url} // Fallback ID
          contentContainerStyle={LIST.content}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={{ padding: 20, alignItems: 'center' }}>
              <Text style={{ color: '#888' }}>
                {loading ? "Loading..." : "No events found."}
              </Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default TimelineEventsScreen;