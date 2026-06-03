import { createMMKV } from 'react-native-mmkv';

// 1. Initialize the storage instance
export const storage = createMMKV();

// 2. Define storage keys to prevent typos
const STORAGE_KEYS = {
    PI_IP_ADDRESS: 'pi.network.ip',
    PI_DEVICE_NAME: 'pi.ble.name',
} as const;

// 3. Define the shape of Pi data
export interface PiDetails {
    ip: string;
    name?: string;
}

// 4. Expose the Service Methods
export const PiStorageService = {
    /**
     * Saves the Pi details securely in MMKV.
     */
    saveDetails: (details: PiDetails) => {
        storage.set(STORAGE_KEYS.PI_IP_ADDRESS, details.ip);

        if (details.name) {
            storage.set(STORAGE_KEYS.PI_DEVICE_NAME, details.name);
        }
    },

    /**
     * Retrieves the saved Pi details. Returns null if no IP is found.
     */
    getDetails: (): PiDetails | null => {
        const ip = storage.getString(STORAGE_KEYS.PI_IP_ADDRESS);

        // If we don't have an IP, consider the device unprovisioned
        if (!ip) return null;

        return {
            ip,
            name: storage.getString(STORAGE_KEYS.PI_DEVICE_NAME),
        };
    },

    /**
     * Wipes the Pi details from storage (useful for a "Forget Device" feature).
     */
    clearDetails: () => {
        storage.remove(STORAGE_KEYS.PI_IP_ADDRESS);
        storage.remove(STORAGE_KEYS.PI_DEVICE_NAME);
    },

    /**
     * Quick boolean check to see if a Pi is already saved.
     */
    hasSavedPi: (): boolean => {
        return storage.contains(STORAGE_KEYS.PI_IP_ADDRESS);
    }
};