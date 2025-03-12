import { create } from 'zustand';

interface MapState {
  map: any | null; // ✅ Kakao Map 객체 저장
  setMap: (mapInstance: any) => void;

  initialLocation: { lat: number; lon: number } | null; // ✅ 초기 위치 저장
  setInitialLocation: (lat: number, lon: number) => void;

  currentLat: number;
  currentLon: number;
  setCurrentLocation: (lat: number, lon: number) => void;

  selectedLocation: { lat: number; lon: number } | null; // ✅ 클릭한 위치 좌표 저장
  setSelectedLocation: (lat: number, lon: number) => void;

  selectedRegion: string | null; // ✅ 클릭한 위치의 '도' 정보 저장
  setSelectedRegion: (region: string) => void;

  records: { region: string; count: number }[]; // ✅ 저장된 지역 정보
  addRecord: (region: string) => void;

  cachedRegions: { [key: string]: string }; // ✅ '좌표 → 도' 캐싱
  cacheRegion: (lat: number, lon: number, region: string) => void;
  getCachedRegion: (lat: number, lon: number) => string | null;

  currentMarker: any | null; // ✅ 현재 마커 저장
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
  setSelectedRegion: (region) => set({ selectedRegion: region }),

  records: [],
  addRecord: (region) =>
    set((state) => {
      const existingRecord = state.records.find((r) => r.region === region);
      if (existingRecord) {
        return {
          records: state.records.map((r) =>
            r.region === region ? { ...r, count: r.count + 1 } : r
          ),
        };
      } else {
        return { records: [...state.records, { region, count: 1 }] };
      }
    }),

  cachedRegions: {},
  cacheRegion: (lat, lon, region) =>
    set((state) => ({
      cachedRegions: {
        ...state.cachedRegions,
        [`${lat},${lon}`]: region,
      },
    })),
  getCachedRegion: (lat, lon) => get().cachedRegions[`${lat},${lon}`] || null,

  currentMarker: null,
  setCurrentMarker: (markerInstance) => set({ currentMarker: markerInstance }),
}));
