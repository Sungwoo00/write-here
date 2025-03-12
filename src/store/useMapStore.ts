import { create } from 'zustand';

interface MapState {
  initialLocation: { lat: number; lon: number } | null;
  setInitialLocation: (lat: number, lon: number) => void;
}

export const useMapStore = create<MapState>((set) => ({
  initialLocation: null, // ✅ 최초 위치 저장 (처음만 설정)
  setInitialLocation: (lat, lon) => set({ initialLocation: { lat, lon } }),
}));
