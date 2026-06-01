import { PiStorageService } from '@/services/databases/mmkv/piStorage';
import { useBLE } from '@/services/hardware/bluetooth/useBLE';
import { useState } from 'react';

export type ConnectionStatus = 'disconnected' | 'scanning' | 'found' | 'connected' | 'provisioned';

export const useDeviceConnectionLogic = () => {
  const {
    requestPermissions,
    scanForDevices,
    connectToDevice,
    provisionWifi,
    disconnectDevice,
    piDevice,
    connectedDevice,
    isScanning,
    provisioningStatus,
  } = useBLE();

  // Local state for Wi-Fi provisioning
  const [ssid, setSsid] = useState('');
  const [password, setPassword] = useState('');

  // INTEGRATION 1: Synchronously check MMKV on startup. 
  // If an IP is saved, it immediately initializes with it, bypassing the BLE flow.
  const [ipAddress, setIpAddress] = useState<string | null>(() => {
    return PiStorageService.getDetails()?.ip || null;
  });

  // Determine overarching UI status based on BLE states
  let status: ConnectionStatus = 'disconnected';
  if (ipAddress) status = 'provisioned';
  else if (connectedDevice) status = 'connected';
  else if (piDevice) status = 'found';
  else if (isScanning) status = 'scanning';

  // Actions
  const handleStartScan = async () => {
    const hasPermissions = await requestPermissions();
    if (hasPermissions) {
      setIpAddress(null); // Reset on new scan
      await scanForDevices();
    }
  };

  const handleConnect = async () => {
    if (piDevice) {
      await connectToDevice(piDevice);
    }
  };

  const handleProvision = async () => {
    if (ssid && password && connectedDevice) {
      const ip = await provisionWifi(ssid, password);
      if (ip) {
        setIpAddress(ip);

        // INTEGRATION 2: Save the IP and device info to MMKV immediately upon success.
        PiStorageService.saveDetails({
          ip: ip,
          name: connectedDevice.name || 'PiCamera',
        });
      }
    }
  };

  const handleDisconnect = async () => {
    await disconnectDevice();
    setIpAddress(null);
    setSsid('');
    setPassword('');

    // INTEGRATION 3: Wipe the saved details from local storage so the device is truly "forgotten".
    PiStorageService.clearDetails();
  };

  // Helper to get device info either from active BLE or from MMKV storage
  const getDeviceName = () => connectedDevice?.name || piDevice?.name || PiStorageService.getDetails()?.name || 'PiCamera';

  return {
    status,
    deviceName: getDeviceName(),
    provisioningStatus, // Real-time feedback from BLE hook
    ssid,
    setSsid,
    password,
    setPassword,
    ipAddress,
    handleStartScan,
    handleConnect,
    handleProvision,
    handleDisconnect,
  };
};