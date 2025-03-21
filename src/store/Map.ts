import { create } from 'zustand';

interface MapState {
  map: unknown | null;
  setMap: (mapInstance: unknown) => void;

  initialLocation: { lat: number; lon: number } | null;
  setInitialLocation: (lat: number, lon: number) => void;

  currentLat: number;
  currentLon: number;
  setCurrentLocation: (lat: number, lon: number) => void;

  selectedLocation: { lat: number; lon: number } | null;
  setSelectedLocation: (lat: number, lon: number) => void;

  selectedRegion: string | null;
  setSelectedRegion: (region: string) => void;
  getProvinceName: () => string | null;

  savedMarkers: { lat: number; lon: number; address: string; region: string }[];
  addSavedMarker: (
    lat: number,
    lon: number,
    address: string,
    region: string
  ) => void;

  currentMarker: unknown | null;
  setCurrentMarker: (markerInstance: unknown) => void;

  selectedColor: string;
  setSelectedColor: (color: string) => void;
  selectedMarker: string;
  setSelectedMarker: (marker: string) => void;

  selectedMarkerPath: string;
  updateSelectedMarkerPath: () => void;
}

const BASE_PATH = '/icons/pins/';
const DEFAULT_MARKER = 'pin-1';
const DEFAULT_COLOR = 'black';

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
    const province = region.split(' ')[0];
    console.log(` Zustand 업데이트: 선택한 도 - ${province}`);
    set({ selectedRegion: province });
  },

  getProvinceName: () => {
    const region = get().selectedRegion;
    return region ? region.split(' ')[0] : null;
  },

  savedMarkers: [],
  addSavedMarker: (lat, lon, address, region) => {
    set((state) => ({
      savedMarkers: [...state.savedMarkers, { lat, lon, address, region }],
    }));
  },

  currentMarker: null,
  setCurrentMarker: (markerInstance) => set({ currentMarker: markerInstance }),

  selectedColor: DEFAULT_COLOR,
  setSelectedColor: (color) => {
    set({ selectedColor: color });
    get().updateSelectedMarkerPath();
  },

  selectedMarker: DEFAULT_MARKER,
  setSelectedMarker: (marker) => {
    set({ selectedMarker: marker });
    get().updateSelectedMarkerPath();
  },

  selectedMarkerPath: `${BASE_PATH}${DEFAULT_MARKER}-${DEFAULT_COLOR}.svg`,
  updateSelectedMarkerPath: () => {
    const { selectedMarker, selectedColor } = get();
    const newPath = `${BASE_PATH}${selectedMarker}-${selectedColor}.svg`;
    set({ selectedMarkerPath: newPath });
  },
}));
