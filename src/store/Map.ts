import { create } from 'zustand';

interface MapState {
  map: any | null;
  setMap: (mapInstance: any) => void;

  initialLocation: { lat: number; lon: number } | null;
  setInitialLocation: (lat: number, lon: number) => void;

  currentLat: number;
  currentLon: number;
  setCurrentLocation: (lat: number, lon: number) => void;

  selectedLocation: { lat: number; lon: number } | null;
  setSelectedLocation: (lat: number, lon: number) => void;

  selectedRegion: string | null;
  setSelectedRegion: (region: string) => void;
  getProvinceName: () => string | null; //  '도' 정보만 반환하는 함수 추가

  savedMarkers: { lat: number; lon: number; address: string; region: string }[];
  addSavedMarker: (
    lat: number,
    lon: number,
    address: string,
    region: string
  ) => void;

  currentMarker: any | null;
  setCurrentMarker: (markerInstance: any) => void;
}

export const useMapStore = create<MapState>((set, get) => ({
  map: null,
  setMap: (mapInstance) => set({ map: mapInstance }),

  initialLocation: null,
  setInitialLocation: (lat, lon) => set({ initialLocation: { lat, lon } }),

  currentLat: 37.5665,
  currentLon: 126.978,
  setCurrentLocation: (lat, lon) => set({ currentLat: lat, currentLon: lon }),

  selectedLocation: null,
  setSelectedLocation: (lat, lon) => set({ selectedLocation: { lat, lon } }),

  selectedRegion: null,
  setSelectedRegion: (region) => {
    const province = region.split(' ')[0]; // '서울특별시 강남구' → '서울특별시'
    console.log(`🗺 Zustand 업데이트: 선택한 도 - ${province}`);
    set({ selectedRegion: province });
  },

  getProvinceName: () => {
    const region = get().selectedRegion;
    return region ? region.split(' ')[0] : null; //  '도' 정보만 반환
  },

  savedMarkers: [],
  addSavedMarker: (lat, lon, address, region) => {
    set((state) => ({
      savedMarkers: [...state.savedMarkers, { lat, lon, address, region }],
    }));
  },

  currentMarker: null,
  setCurrentMarker: (markerInstance) => set({ currentMarker: markerInstance }),
}));
