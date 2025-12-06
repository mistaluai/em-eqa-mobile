import { useState } from 'react';
import { Clip, UploadStatus } from '../../../shared/types';

const mockClips: Clip[] = [
  { name: 'Meeting_20241205_1430', progress: 100, status: 'completed' },
  { name: 'Lunch_20241205_1300', progress: 75, status: 'uploading' },
  { name: 'Draft_Pitch_Deck_1015', progress: 0, status: 'pending' },
  { name: 'Morning_Checkin_0900', progress: 0, status: 'failed' },
];

/**
 * Custom hook for ClipUploadSyncScreen logic
 * Handles clip state and actions
 */
export const useClipUploadSyncLogic = () => {
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

  return {
    status,
    completedClips,
    uploadingClips,
    pendingClips,
    failedClips,
    handleClipAction,
    handleClearAllCompleted,
    handlePauseAll,
  };
};

