import { useState } from 'react';

/**
 * Custom hook for DeviceConnectionScreen logic
 * Handles device connection state and reconnection
 */
export const useDeviceConnectionLogic = () => {
  const [status, setStatus] = useState<'connected' | 'disconnected'>('connected');
  const deviceName = 'EM-EQA Pro 001';

  const handleReconnect = () => {
    setStatus('disconnected');
    setTimeout(() => setStatus('connected'), 2000);
  };

  return {
    status,
    deviceName,
    handleReconnect,
  };
};

