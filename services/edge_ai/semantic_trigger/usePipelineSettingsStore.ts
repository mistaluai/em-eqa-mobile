import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { storage } from '@/services/databases/mmkv/piStorage';

const zustandStorage = {
  setItem: (name: string, value: string) => storage.set(name, value),
  getItem: (name: string) => storage.getString(name) ?? null,
  removeItem: (name: string) => storage.remove(name),
};

interface PipelineSettingsState {
  enableIngestion: boolean;
  enableEvaluation: boolean;
  enableUpload: boolean;
  enableGC: boolean;
  toggleIngestion: () => void;
  toggleEvaluation: () => void;
  toggleUpload: () => void;
  toggleGC: () => void;
}

export const usePipelineSettingsStore = create<PipelineSettingsState>()(
  persist(
    (set) => ({
      enableIngestion: true,
      enableEvaluation: true,
      enableUpload: true,
      enableGC: true,
      toggleIngestion: () => set((state) => ({ enableIngestion: !state.enableIngestion })),
      toggleEvaluation: () => set((state) => ({ enableEvaluation: !state.enableEvaluation })),
      toggleUpload: () => set((state) => ({ enableUpload: !state.enableUpload })),
      toggleGC: () => set((state) => ({ enableGC: !state.enableGC })),
    }),
    {
      name: 'pipeline-settings-storage',
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
