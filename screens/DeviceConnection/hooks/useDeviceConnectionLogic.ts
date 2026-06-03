import { PiStorageService } from '@/services/databases/mmkv/piStorage';
import { useBLE } from '@/services/hardware/bluetooth/useBLE';
import { PiNetworkService } from '@/services/hardware/http/piNetworkService';
import { useCallback, useEffect, useState } from 'react';

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

  const [ssid, setSsid] = useState('');
  const [password, setPassword] = useState('');
  const [ipAddress, setIpAddress] = useState<string | null>(() => {
    return PiStorageService.getDetails()?.ip || null;
  });

  // Verify connection immediately if an IP exists in MMKV
  const checkConnection = useCallback(async () => {
    if (!ipAddress) return;

    const isAlive = await PiNetworkService.ping();
    if (!isAlive) {
      PiStorageService.clearDetails();
      setIpAddress(null);
    }
  }, [ipAddress]);

  useEffect(() => {
    checkConnection();
  }, [checkConnection]);

  let status: ConnectionStatus = 'disconnected';
  if (ipAddress) status = 'provisioned';
  else if (connectedDevice) status = 'connected';
  else if (piDevice) status = 'found';
  else if (isScanning) status = 'scanning';

  const handleStartScan = async () => {
    const hasPermissions = await requestPermissions();
    if (hasPermissions) {
      setIpAddress(null);
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
    PiStorageService.clearDetails();
  };

  const getDeviceName = () => connectedDevice?.name || piDevice?.name || PiStorageService.getDetails()?.name || 'PiCamera';

  return {
    status,
    deviceName: getDeviceName(),
    provisioningStatus,
    ssid,
    setSsid,
    password,
    setPassword,
    ipAddress,
    checkConnection,
    handleStartScan,
    handleConnect,
    handleProvision,
    handleDisconnect,
  };
};