import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppButton from '../../components/AppButton';
import AppHeader from '../../components/HeaderComponent';
import { COLORS } from '../../theme/colors';
import { SPACING } from '../../theme/styles';
import { VideoPlaceholder } from './components/VideoPlaceholder';
import { EventMetadata } from './components/EventMetadata';
import { SummaryCard } from './components/SummaryCard';

const EventDetailsScreen: React.FC = () => {
  const navigation = useNavigation();
  const event = {
    title: 'Q4 Budget Planning Meeting',
    time: '2024-12-05, 14:30 - 15:15',
    location: 'Conference Room Alpha',
    summary: 'Detailed discussion on final Q4 budget forecasts, including resource allocation changes and signing off on key expenditures. Key decisions made on marketing spend.',
  };

  const handleDelete = () => {
    console.log('Delete clip action triggered');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader
        title="Event Details"
        showBack={true}
        rightIconName="menu-outline"
        onRightIconPress={() => console.log('Open Menu')}
      />

      <ScrollView contentContainerStyle={styles.container}>
        <VideoPlaceholder />

        <EventMetadata title={event.title} time={event.time} location={event.location} />

        <SummaryCard summary={event.summary} />

        <AppButton
          title="Delete Clip"
          onPress={handleDelete}
          variant="danger"
          style={{ marginTop: SPACING.s32 }}
        />

        <View style={{ height: SPACING.s32 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.carbonBlack,
  },
  container: {
    padding: SPACING.s24,
  },
});

export default EventDetailsScreen;

