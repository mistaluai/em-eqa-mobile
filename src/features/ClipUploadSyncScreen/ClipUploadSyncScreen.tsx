import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../../components/HeaderComponent';
import { SCREEN, SPACING } from '../../theme';
import { COLORS } from '../../theme/colors';
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

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bottomSpacer: {
    height: SPACING.s32,
  },
});

export default ClipUploadSyncScreen;