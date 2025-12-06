import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../../components/HeaderComponent';
import { Clip, UploadStatus } from '../../shared/types';
import { COLORS } from '../../theme/colors';
import { SCREEN, SPACING } from '../../theme/styles';
import { ClipSection } from './components/ClipSection';
import { UploadStatusDashboard } from './components/UploadStatusDashboard';

const mockClips: Clip[] = [
  { name: 'Meeting_20241205_1430', progress: 100, status: 'completed' },
  { name: 'Lunch_20241205_1300', progress: 75, status: 'uploading' },
  { name: 'Draft_Pitch_Deck_1015', progress: 0, status: 'pending' },
  { name: 'Morning_Checkin_0900', progress: 0, status: 'failed' },
];

const ClipUploadSyncScreen: React.FC = () => {
  const navigation = useNavigation();
  const [clips, setClips] = useState(mockClips);

  const status: UploadStatus = {
    completed: clips.filter(c => c.status === 'completed').length,
    pending: clips.filter(c => c.status === 'pending').length,
    failed: clips.filter(c => c.status === 'failed').length,
  };

  const completedClips = clips.filter(c => c.status === 'completed');
  const uploadingClips = clips.filter(c => c.status === 'uploading');
  const pendingClips = clips.filter(c => c.status === 'pending');
  const failedClips = clips.filter(c => c.status === 'failed');

  const handleClipAction = (clipName: string) => {
    const clip = clips.find(c => c.name === clipName);
    if (clip?.status === 'completed') {
      setClips(clips.filter(c => c.name !== clipName));
    } else if (clip?.status === 'failed') {
      console.log('Retry clip', clipName);
    }
  };

  const handleClearAllCompleted = () => {
    setClips(clips.filter(c => c.status !== 'completed'));
  };

  const handlePauseAll = () => {
    console.log('Pause');
  };

  return (
    <SafeAreaView style={SCREEN.safeArea}>
      <AppHeader
        title="Clip Upload & Sync"
        showBack={true}
      />

      <ScrollView contentContainerStyle={SCREEN.container}>
        <UploadStatusDashboard status={status} />

        <ClipSection
          title="Upload Completed"
          clips={completedClips}
          onClipAction={handleClipAction}
          onClearAll={handleClearAllCompleted}
        />

        <ClipSection
          title="Uploading Now"
          clips={uploadingClips}
          onClipAction={handleClipAction}
          onPauseAll={handlePauseAll}
        />

        <ClipSection
          title="Pending Uploads"
          clips={pendingClips}
          onClipAction={handleClipAction}
        />

        <ClipSection
          title="Failed Uploads"
          clips={failedClips}
          onClipAction={handleClipAction}
          // Changed non-semantic color (COLORS.desertSand) to semantic accent/error color (COLORS.secondary)
          titleColor={COLORS.secondary} 
        />

        <View style={{ height: SPACING.s32 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ClipUploadSyncScreen;