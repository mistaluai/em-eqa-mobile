import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppButton from '../components/AppButton';
import AppCard from '../components/AppCard';
import AppHeader from '../components/HeaderComponent';
import { COLORS } from '../theme/colors';
import { RADIUS, SHADOW, SPACING, TYPOGRAPHY } from '../theme/styles';

const { width } = Dimensions.get('window');

const EventDetailsScreen: React.FC = () => {
  const navigation = useNavigation();
  const event = {
    title: 'Q4 Budget Planning Meeting',
    time: '2024-12-05, 14:30 - 15:15',
    location: 'Conference Room Alpha',
    summary: 'Detailed discussion on final Q4 budget forecasts, including resource allocation changes and signing off on key expenditures. Key decisions made on marketing spend.',
  };

  const handleDelete = () => {
    // In a real app, this would trigger a confirmation modal (AppModal)
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
        <View style={styles.videoPlaceholder}>
          <Ionicons name="play-circle-outline" size={80} color={COLORS.softGray} />
        </View>

        <Text style={[TYPOGRAPHY.HeadlineL, styles.eventTitle]}>{event.title}</Text>

        <View style={styles.pillsContainer}>
          <View style={styles.pill}>
            <Ionicons name="time-outline" size={16} color={COLORS.desertSand} />
            <Text style={[TYPOGRAPHY.Caption, styles.pillText]}>{event.time}</Text>
          </View>
          <View style={styles.pill}>
            <Ionicons name="location-outline" size={16} color={COLORS.desertSand} />
            <Text style={[TYPOGRAPHY.Caption, styles.pillText]}>{event.location}</Text>
          </View>
        </View>

        <AppCard style={styles.summaryCard}>
          <Text style={[TYPOGRAPHY.HeadlineM, { color: COLORS.white, marginBottom: SPACING.s8 }]}>Summary</Text>
          <Text style={[TYPOGRAPHY.BodyM, { color: COLORS.softGray }]}>{event.summary}</Text>
        </AppCard>

        <AppButton
          title="Delete Clip"
          onPress={handleDelete}
          variant="danger"
          style={{ marginTop: SPACING.s32 }}
        />

        {/* Bottom Spacer */}
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
  videoPlaceholder: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: COLORS.gray700,
    borderRadius: RADIUS.large,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.s24,
    ...SHADOW.default,
  },
  eventTitle: {
    color: COLORS.white,
    marginBottom: SPACING.s16,
    fontWeight: '800',
  },
  pillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: SPACING.s32,
    gap: SPACING.s12,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${COLORS.desertSand}30`,
    paddingHorizontal: SPACING.s12,
    paddingVertical: SPACING.s8,
    borderRadius: RADIUS.large,
  },
  pillText: {
    color: COLORS.desertSand,
    marginLeft: SPACING.s4,
    fontWeight: '600',
  },
  summaryCard: {
    backgroundColor: COLORS.gray700,
  }
});

export default EventDetailsScreen;