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
    readDeviceIP,
    disconnectDevice,
    piDevice,
    connectedDevice,
    isScanning,
    provisioningStatus,
  } = useBLE();

  const [ssid, setSsid] = useState('');
  const [password, setPassword] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [ipAddress, setIpAddress] = useState<string | null>(() => {
    return PiStorageService.getDetails()?.ip || null;
  });

  // Verify connection immediately if an IP exists in MMKV
  const checkConnection = useCallback(async () => {
    if (!ipAddress) return;

    const isAlive = await PiNetworkService.ping(ipAddress);
    if (!isAlive) {
      PiStorageService.clearDetails();
      setIpAddress(null);
    } else {
      try {
        const result = await PiNetworkService.getCameraConfig();
        if (result?.status === 'success' && result.config) {
          const isRec = result.config.recording;
          setIsRecording(isRec === true || isRec === 'true' || isRec === 'True');
        }
      } catch (error) {
        console.error('Failed to fetch camera config:', error);
      }
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
    if (piDevice && !isConnecting) {
      setIsConnecting(true);
      try {
        const deviceConnection = await connectToDevice(piDevice);
        if (deviceConnection) {
          const existingIp = await readDeviceIP(deviceConnection);
          if (existingIp) {
            const isAlive = await PiNetworkService.ping(existingIp);
            if (isAlive) {
              setIpAddress(existingIp);
              PiStorageService.saveDetails({
                ip: existingIp,
                name: deviceConnection.name || 'PiCamera',
              });
            }
          }
        }
      } finally {
        setIsConnecting(false);
      }
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

  const handleToggleRecording = async (recording: boolean) => {
    try {
      const result = await PiNetworkService.updateCameraConfig({ recording });
      if (result?.status === 'success' && result.config) {
        const isRec = result.config.recording;
        setIsRecording(isRec === true || isRec === 'true' || isRec === 'True');
      } else {
        setIsRecording(recording);
      }
    } catch (error) {
      console.error('Failed to toggle recording:', error);
    }
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
    isConnecting,
    checkConnection,
    handleStartScan,
    handleConnect,
    handleProvision,
    handleDisconnect,
    handleToggleRecording,
    isRecording,
  };
};