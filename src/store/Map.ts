import { create } from 'zustand';

interface MapState {
  initialLocation: { lat: number; lon: number } | null;
  selectedLocation: { lat: number; lon: number } | null;
  currentLat: number;
  currentLon: number;
  currentMarker: any;
  setInitialLocation: (lat: number, lon: number) => void;
  setSelectedLocation: (lat: number, lon: number) => void;
  setCurrentLocation: (lat: number, lon: number) => void;
  setCurrentMarker: (marker: any) => void;
}

export const useMapStore = create<MapState>((set) => ({
  initialLocation: null,
  selectedLocation: null,
  currentLat: 33.450701, // ✅ 기본값 설정
  currentLon: 126.570667,
  currentMarker: null,
  setInitialLocation: (lat, lon) => set({ initialLocation: { lat, lon } }),
  setSelectedLocation: (lat, lon) => set({ selectedLocation: { lat, lon } }),
  setCurrentLocation: (lat, lon) => set({ currentLat: lat, currentLon: lon }), // ✅ 현재 위치 업데이트 함수 추가
  setCurrentMarker: (marker) => set({ currentMarker: marker }),
}));
