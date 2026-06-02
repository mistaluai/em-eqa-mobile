import { PiStorageService } from '@/services/databases/mmkv/piStorage';

const getBaseUrl = () => {
    const details = PiStorageService.getDetails();
    if (!details?.ip) throw new Error('No IP address found');
    return `http://${details.ip}:8000/api/v1/segments`;
};

export const PiNetworkService = {
    ping: async (): Promise<boolean> => {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 3000);

            const response = await fetch(`${getBaseUrl()}/alive`, {
                signal: controller.signal
            });
            clearTimeout(timeoutId);

            if (response.ok) {
                const data = await response.json();
                return data.status === 'alive';
            }
            return false;
        } catch (error) {
            return false;
        }
    },

    listSegments: async (skip = 0, limit = 100) => {
        const response = await fetch(`${getBaseUrl()}/list?skip=${skip}&limit=${limit}`);
        return response.json();
    },

    getNextSegmentUrl: () => {
        return `${getBaseUrl()}/next`;
    },

    deleteSegment: async (segmentId: number) => {
        const response = await fetch(`${getBaseUrl()}/deleted/${segmentId}`);
        return response.json();
    },

    updateCameraConfig: async (config: {
        framerate?: number;
        width?: number;
        height?: number;
        segment_duration_ms?: number;
        recording?: boolean;
    }) => {
        const response = await fetch(`${getBaseUrl()}/camera/config`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(config),
        });
        return response.json();
    }
};