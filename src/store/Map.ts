import { create } from 'zustand';
import { Marker } from './DiaryData';

type TempMarker = Omit<Marker, 'diary_id' | 'user_id'>;

interface MapState {
  currentLat: number;
  currentLon: number;
  setCurrentLocation: (lat: number, lon: number) => void;

  addMarkerMode: boolean | null;
  setAddMarkerMode: (state: boolean) => void;
  initTempMarker: () => void;

  tempMarker: TempMarker;
  setTempMarkerPath: (marker_path: string) => void;
  setTempMarkerRegion: (region: string) => void;
  setTempMarkerLocation: (lat: number, lon: number) => void;

  initialPlace: string;
  setInitialPlace: (address: string) => void;

  currentMarker: unknown | null;
  setCurrentMarker: (markerInstance: unknown) => void;
}

export const useMapStore = create<MapState>((set) => ({
  currentLat: 37.5665,
  currentLon: 126.978,
  setCurrentLocation: (lat, lon) => set({ currentLat: lat, currentLon: lon }),

  addMarkerMode: null,
  setAddMarkerMode: (state) => set({ addMarkerMode: state }),

  tempMarker: {
    lat: 0,
    lon: 0,
    marker_path: '',
    region: '',
  },
  setTempMarkerPath: (path) => {
    set((state) => ({
      tempMarker: { ...state.tempMarker, marker_path: path },
    }));
  },
  setTempMarkerRegion: (region) => {
    set((state) => ({
      tempMarker: { ...state.tempMarker, region },
    }));
  },
  setTempMarkerLocation: (lat, lon) => {
    set((state) => ({
      tempMarker: { ...state.tempMarker, lat, lon },
    }));
  },
  initTempMarker: () => {
    set(() => ({
      tempMarker: { lat: 0, lon: 0, marker_path: '', region: '' },
    }));
  },

  initialPlace: '',
  setInitialPlace: (address) => set({ initialPlace: address }),

  currentMarker: null,
  setCurrentMarker: (markerInstance) => set({ currentMarker: markerInstance }),
}));
