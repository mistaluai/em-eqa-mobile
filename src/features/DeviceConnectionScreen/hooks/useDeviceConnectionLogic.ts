import { useEffect, useState } from 'react';

/**
 * Custom hook for DeviceConnectionScreen logic
 * Handles device connection state, reconnection, and simulated data.
 */
export const useDeviceConnectionLogic = () => {
  const [status, setStatus] = useState<'connected' | 'disconnected' | 'searching'>('connected');

  // Mock Data
  const deviceName = 'EM-EQA Pro';
  const deviceModel = 'Vision Cam X1';
  const [batteryLevel, setBatteryLevel] = useState(82);

  const handleReconnect = () => {
    setStatus('searching');
    // Simulate searching delay
    setTimeout(() => {
      setStatus('connected');
    }, 3000);
  };

  // Simulate subtle battery drain for realism (optional)
  useEffect(() => {
    const interval = setInterval(() => {
      setBatteryLevel(prev => Math.max(0, prev - 1));
    }, 60000); // every minute
    return () => clearInterval(interval);
  }, []);

  return {
    status,
    deviceName,
    deviceModel,
    batteryLevel,
    handleReconnect,
  };
};