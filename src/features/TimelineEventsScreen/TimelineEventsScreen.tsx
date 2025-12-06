import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../../components/HeaderComponent';
import { Filter } from '../../shared/types';
import { COLORS } from '../../theme/colors';
import { SPACING } from '../../theme/styles';
import { EventCard } from './components/EventCard';
import { FilterBar } from './components/FilterBar';
import { mockEvents } from './constants';

const TimelineEventsScreen: React.FC = () => {
  const navigation = useNavigation();
  const [activeFilter, setActiveFilter] = useState<Filter>('Today');

  const filteredEvents = mockEvents;

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader
        title="Timeline & Events"
        showBack={false}
      />

      <View style={styles.container}>
        <FilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} />

        <FlatList
          data={filteredEvents}
          renderItem={({ item }) => <EventCard event={item} />}
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
  listContent: {
    paddingBottom: SPACING.s24,
  },
});

export default TimelineEventsScreen;

