// Shared types used across multiple screens

export interface Clip {
  name: string;
  progress: number; // 0 to 100
  status: 'completed' | 'uploading' | 'pending' | 'failed';
}

export interface UploadStatus {
  completed: number;
  pending: number;
  failed: number;
}

export type Filter = 'Today' | 'Week' | 'All';

export interface Event {
  id: number;
  time: string;
  title: string;
  summary: string;
  videoThumbnail: boolean;
}

