import { useThemeStyles } from "@/theme/useThemeStyles";
import { useThemeColor } from "@/theme/useThemeColor";
import { SPACING } from '@/theme';
import React from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../../components/HeaderComponent';
import { EventCard } from './components/EventCard';
import { FilterBar } from './components/FilterBar';
import { useTimelineEventsLogic } from './hooks/useTimelineEventsLogic';

const TimelineEventsScreen: React.FC = () => {
  const styles = useThemeStyles(createStyles);
  const COLORS = useThemeColor();
  const {
    activeFilter,
    setActiveFilter,
    events,
    loading,
    refreshEvents
  } = useTimelineEventsLogic();

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader title="Timeline & Events" showBack={true} />

      <View style={styles.timelineContainer}>
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
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                {loading ? "Loading..." : "No events found."}
              </Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
};

const createStyles = (COLORS: any) => StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
  },
  timelineContainer: {
    flex: 1,
    paddingHorizontal: SPACING.s24,
  },
  listContent: {
    paddingBottom: SPACING.s24,
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    color: '#888', // Consider using COLORS.textSecondary if available
  },
});

export default TimelineEventsScreen;