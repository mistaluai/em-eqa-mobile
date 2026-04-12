import * as ExpoDevice from "expo-device";
import { useState } from "react";
import { PermissionsAndroid, Platform } from "react-native";
import { BleManager, Device } from "react-native-ble-plx";
// @ts-ignore - react-native-base64 does not have built-in typescript definitions
import base64 from "react-native-base64";

const SERVICE_UUID = "0000ffe0-0000-1000-8000-00805f9b34fb";
const SSID_CHAR_UUID = "0000ffe1-0000-1000-8000-00805f9b34fb";
const PASS_CHAR_UUID = "0000ffe2-0000-1000-8000-00805f9b34fb";
const IP_CHAR_UUID = "0000ffe3-0000-1000-8000-00805f9b34fb";

const bleManager = new BleManager();

export function useBLE() {
  const [isScanning, setIsScanning] = useState(false);
  const [piDevice, setPiDevice] = useState<Device | null>(null);
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);
  const [provisioningStatus, setProvisioningStatus] = useState<string>('');

  const requestAndroid31Permissions = async () => {
    const bluetoothScanPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      {
        title: "Scan Permission",
        message: "Bluetooth Low Energy requires scan permission",
        buttonPositive: "OK",
      },
    );
    const bluetoothConnectPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      {
        title: "Connect Permission",
        message: "Bluetooth Low Energy requires connect permission",
        buttonPositive: "OK",
      },
    );
    const fineLocationPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Location Permission",
        message: "Bluetooth Low Energy requires location",
        buttonPositive: "OK",
      },
    );
    return (
      bluetoothScanPermission === "granted" &&
      bluetoothConnectPermission === "granted" &&
      fineLocationPermission === "granted"
    );
  };

  const requestPermissions = async () => {
    if (Platform.OS === "android") {
      if ((ExpoDevice.platformApiLevel ?? -1) < 31) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Permission",
            message: "Bluetooth Low Energy requires location",
            buttonPositive: "OK",
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } else {
        const isAndroid31PermissionsGranted =
          await requestAndroid31Permissions();
        return isAndroid31PermissionsGranted;
      }
    } else {
      return true;
    }
  };

  const scanForDevices = () => {
    setIsScanning(true);
    setProvisioningStatus('Scanning for PiCamera...');
    bleManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.error("Scan error", error);
        setProvisioningStatus(`Scan error: ${error.message}`);
        setIsScanning(false);
        return;
      }
      if (
        device &&
        (device.localName === "PiCamera" || device.name === "PiCamera")
      ) {
        setPiDevice(device);
        setProvisioningStatus('Found PiCamera. Ready to connect.');
        bleManager.stopDeviceScan();
        setIsScanning(false);
      }
    });
  };

  const connectToDevice = async (device: Device) => {
    try {
      setProvisioningStatus('Connecting...');
      const deviceConnection = await bleManager.connectToDevice(device.id);
      setConnectedDevice(deviceConnection);
      setProvisioningStatus('Discovering Services...');
      await deviceConnection.discoverAllServicesAndCharacteristics();
      bleManager.stopDeviceScan();
      setProvisioningStatus('Connected & Ready.');
      return deviceConnection;
    } catch (e) {
      setProvisioningStatus('Failed to connect.');
      console.error("FAILED TO CONNECT", e);
      return null;
    }
  };

  const provisionWifi = async (
    ssid: string,
    pass: string,
  ): Promise<string | null> => {
    if (!connectedDevice) return null;

    try {
      setProvisioningStatus('Sending SSID...');
      const ssidBase64 = base64.encode(ssid);
      await connectedDevice.writeCharacteristicWithResponseForService(
        SERVICE_UUID,
        SSID_CHAR_UUID,
        ssidBase64,
      );

      setProvisioningStatus('Sending Password...');
      const passBase64 = base64.encode(pass);
      await connectedDevice.writeCharacteristicWithResponseForService(
        SERVICE_UUID,
        PASS_CHAR_UUID,
        passBase64,
      );

      setProvisioningStatus('Credentials sent. Waiting for IP...');
      // Give the device time to connect to Wi-Fi and fetch an IP
      await new Promise((resolve) => setTimeout(resolve, 5000));

      setProvisioningStatus('Requesting IP...');
      const ipCharacteristic =
        await connectedDevice.readCharacteristicForService(
          SERVICE_UUID,
          IP_CHAR_UUID,
        );

      const ipString = ipCharacteristic.value
        ? base64.decode(ipCharacteristic.value)
        : null;
      setProvisioningStatus(`Provisioning successful. IP: ${ipString ?? 'None'}`);
      return ipString;
    } catch (error: any) {
      console.error("FAILED TO PROVISION", error);
      setProvisioningStatus(`Provisioning failed: ${error.message}`);
      return null;
    }
  };

  const disconnectDevice = async () => {
    if (connectedDevice) {
      await bleManager.cancelDeviceConnection(connectedDevice.id);
      setConnectedDevice(null);
      setPiDevice(null);
    }
  };

  return {
    requestPermissions,
    scanForDevices,
    connectToDevice,
    provisionWifi,
    disconnectDevice,
    piDevice,
    connectedDevice,
    isScanning,
    provisioningStatus,
  };
}
