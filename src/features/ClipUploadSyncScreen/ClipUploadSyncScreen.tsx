import React from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../../components/HeaderComponent';
import { COLORS } from '../../theme/colors';
import { ClipUploadSyncScreenStyles } from '../../theme/styles/ClipUploadSyncScreen/ClipUploadSyncScreenStyle';
import { SCREEN } from '../../theme';
import { ClipSection } from './components/ClipSection';
import { UploadStatusDashboard } from './components/UploadStatusDashboard';
import { useClipUploadSyncLogic } from './hooks/useClipUploadSyncLogic';

/**
 * ClipUploadSyncScreen - Main screen component for clip upload and sync
 * Handles composition and rendering using hooks and components
 */
const ClipUploadSyncScreen: React.FC = () => {
  const {
    status,
    completedClips,
    uploadingClips,
    pendingClips,
    failedClips,
    handleClipAction,
    handleClearAllCompleted,
    handlePauseAll,
  } = useClipUploadSyncLogic();

  return (
    <SafeAreaView style={SCREEN.safeArea}>
      <AppHeader title="Clip Upload & Sync" showBack={true} />

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
          titleColor={COLORS.textPrimary}
        />

        <View style={ClipUploadSyncScreenStyles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ClipUploadSyncScreen;