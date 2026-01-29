import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppButton from '../../components/AppButton';
import AppHeader from '../../components/HeaderComponent';
import { SCREEN } from '../../theme';
import { SPACING } from '../../theme/spacing';
import { EventMetadata } from './components/EventMetadata';
import { SummaryCard } from './components/SummaryCard';
import { VideoPlaceholder } from './components/VideoPlaceholder';
import { useEventDetailsLogic } from './hooks/useEventDetailsLogic';

const event = {
  title: ' Budget Planning Meeting',
  time: '2024-12-05, 14:30 - 15:15',
  location: 'Conference Room Alpha',
  summary: 'Detailed discussion on final Q4 budget forecasts, including resource allocation changes and signing off on key expenditures. Key decisions made on marketing spend.',
};

/**
 * EventDetailsScreen - Main screen component for event details
 * Handles composition and rendering using hooks and components
 */
const EventDetailsScreen: React.FC = () => {
  const { handleDelete } = useEventDetailsLogic();

  return (
    <SafeAreaView style={SCREEN.safeArea}>
      <AppHeader title="Event Details" showBack={true} />

      <ScrollView contentContainerStyle={SCREEN.container}>
        <VideoPlaceholder />

        <EventMetadata title={event.title} time={event.time} location={event.location} />

        <SummaryCard summary={event.summary} />

        <AppButton
          title="Delete Clip"
          onPress={handleDelete}
          variant="primary"
          style={styles.deleteButton}
        />

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  deleteButton: {
    marginTop: SPACING.s32,
    width: '80%',
    alignContent: 'center',
    alignSelf: 'center',
  },
  bottomSpacer: {
    height: SPACING.s32,
  },
});

export default EventDetailsScreen;