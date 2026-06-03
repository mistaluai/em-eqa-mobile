import { SCREEN, SPACING } from '@/theme';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppButton from '../../components/AppButton';
import AppHeader from '../../components/HeaderComponent';
import { EventMetadata } from './components/EventMetadata';
import { SummaryCard } from './components/SummaryCard';
import { VideoPlaceholder } from './components/VideoPlaceholder';
import { useEventDetailsLogic } from './hooks/useEventDetailsLogic';

/**
 * EventDetailsScreen - Main screen component for event details
 * Handles composition and rendering using hooks and components
 */
const EventDetailsScreen: React.FC = () => {
  const { handleDelete, evidence } = useEventDetailsLogic();

  const title = evidence?.title || 'Unknown Event';
  const time = evidence?.timestamp ? new Date(evidence.timestamp).toLocaleString() : 'Unknown Time';
  const location = evidence?.location || 'Unknown Location';
  const summary = evidence?.summary || 'No summary available.';

  return (
    <SafeAreaView style={SCREEN.safeArea}>
      <AppHeader title="Event Details" showBack={true} />

      <ScrollView contentContainerStyle={[SCREEN.container, { flex: undefined, flexGrow: 1 }]}>
        <VideoPlaceholder url={evidence?.video_url || null} />

        <EventMetadata title={title} time={time} location={location} />

        <SummaryCard summary={summary} />

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