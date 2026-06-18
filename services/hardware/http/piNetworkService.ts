import { PiStorageService } from '@/services/databases/mmkv/piStorage';

const getBaseUrl = (ipOverride?: string): string | null => {
    const ip = ipOverride || PiStorageService.getDetails()?.ip;
    if (!ip) return null;
    return `http://${ip}:8080/api/v1/segments`;
};

export const PiNetworkService = {
    ping: async (ip?: string): Promise<boolean> => {
        try {
            const baseUrl = getBaseUrl(ip);
            if (!baseUrl) return false;

            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 3000);

            const response = await fetch(`${baseUrl}/alive?cb=${Date.now()}`, {
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
        const baseUrl = getBaseUrl();
        if (!baseUrl) return { status: 'error', message: 'No IP address found' };
        const response = await fetch(`${baseUrl}/list?skip=${skip}&limit=${limit}&cb=${Date.now()}`);
        return response.json();
    },

    getNextSegmentUrl: (): string | null => {
        const baseUrl = getBaseUrl();
        if (!baseUrl) return null;
        return `${baseUrl}/next?cb=${Date.now()}`;
    },

    deleteSegment: async (segmentId: number) => {
        const baseUrl = getBaseUrl();
        if (!baseUrl) return { status: 'error', message: 'No IP address found' };
        const response = await fetch(`${baseUrl}/deleted/${segmentId}?cb=${Date.now()}`);
        return response.json();
    },

    updateCameraConfig: async (config: {
        framerate?: number;
        width?: number;
        height?: number;
        segment_duration_ms?: number;
        recording?: boolean;
    }) => {
        const baseUrl = getBaseUrl();
        if (!baseUrl) return { status: 'error', message: 'No IP address found' };
        const response = await fetch(`${baseUrl}/camera/config`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(config),
        });
        return response.json();
    }
};