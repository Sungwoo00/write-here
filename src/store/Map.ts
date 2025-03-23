import { create } from 'zustand';
import { Marker } from './DiaryData';

type TempMarker = Omit<Marker, 'diary_id' | 'user_id'>;

interface MapState {
  // 여유되면 변경
  // kakaoMap: kakao.maps.Map | null;
  // setKaKaoMap: (kakaoMap: kakao.maps.Map) => void;

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

  isOverlayOpen: boolean;
  markerId: number | undefined;
  openOverlay: (markerId: number | undefined) => void;
  closeOverlay: () => void;

  isPageModalOpen: boolean;
  setPageModalOpen: (state: boolean) => void;
}

export const useMapStore = create<MapState>((set) => ({
  // kakaoMap: null,
  // setKaKaoMap: (kakaoMap: kakao.maps.Map) => set({ kakaoMap }),

  currentLat: 37.5665,
  currentLon: 126.978,
  setCurrentLocation: (lat, lon) => set({ currentLat: lat, currentLon: lon }),

  addMarkerMode: null,
  setAddMarkerMode: (state) => set({ addMarkerMode: state }),

  tempMarker: {
    lat: 0,
    lon: 0,
    marker_path: '/icons/pins/pin-1-black.svg',
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
      tempMarker: {
        lat: 0,
        lon: 0,
        marker_path: '/icons/pins/pin-1-black.svg',
        region: '',
      },
    }));
  },

  initialPlace: '',
  setInitialPlace: (address) => set({ initialPlace: address }),

  currentMarker: null,
  setCurrentMarker: (markerInstance) => set({ currentMarker: markerInstance }),

  isOverlayOpen: false,
  markerId: undefined,
  openOverlay: (markerId) => set({ isOverlayOpen: true, markerId }),
  closeOverlay: () => set({ isOverlayOpen: false, markerId: undefined }),

  isPageModalOpen: false,
  setPageModalOpen: (state) => set({ isPageModalOpen: state }),
}));
