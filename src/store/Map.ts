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

  savedMarkers: { lat: number; lon: number; address: string }[];
  addSavedMarker: (lat: number, lon: number, address: string) => void;

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
  setSelectedRegion: (region) => set({ selectedRegion: region }),

  savedMarkers: [],
  addSavedMarker: (lat, lon, address) => {
    set((state) => ({
      savedMarkers: [...state.savedMarkers, { lat, lon, address }],
    }));
  },

  currentMarker: null,
  setCurrentMarker: (markerInstance) => set({ currentMarker: markerInstance }),
}));
