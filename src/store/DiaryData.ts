import { create } from 'zustand';
import supabase from '@/utils/supabase';

export interface Diary {
  id: number;
  user_id: string | null;
  title: string;
  place: string;
  place_type: string;
  content: string;
  post_date: string;
  tag: string[] | null;
  img: string[] | null;
  like_count: number | null;
  is_public: boolean;
  created_at: string | null;
  updated_at: string | null;
}

interface Marker {
  id: number;
  user_id: string;
  created_at: string | null;
  marker_type: string;
  marker_color: string;
  lat: number;
  lon: number;
  diary_id: number[] | null;
}

interface Profile {
  user_id: string;
  email: string;
  nickname: string | null;
  profile_msg: string | null;
  profile_img: string | null;
  created_at: string | null;
}

interface TableState {
  diaries: Diary[];
  markers: Marker[];
  profiles: Profile[];
  loading: {
    diaries: boolean;
    markers: boolean;
    profiles: boolean;
  };
  error: {
    diaries: string | null;
    markers: string | null;
    profiles: string | null;
  };
  currentUserId: string | null;
  fetchCurrentUserData: () => Promise<void>;
  getCurrentUserDiaries: () => Diary[];

  fetchDiaries: () => Promise<void>;
  fetchMarkers: (userId: string) => Promise<void>;
  fetchProfiles: (userId: string) => Promise<void>;
  fetchAllTables: (userId: string) => Promise<void>;
}

const useTableStore = create<TableState>((set, get) => ({
  diaries: [],
  markers: [],
  profiles: [],
  loading: {
    diaries: false,
    markers: false,
    profiles: false,
  },
  error: {
    diaries: null,
    markers: null,
    profiles: null,
  },
  currentUserId: null,

  fetchCurrentUserData: async () => {
    try {
      const { data } = await supabase.auth.getUser();

      const user = data?.user;

      if (!user) {
        return;
      }

      const userId = user.id;

      set({ currentUserId: userId });

      const { fetchAllTables } = get();
      await fetchAllTables(userId);
    } catch (error: any) {
      console.error('사용자 데이터 가져오기 실패:', error.message);
    }
  },

  getCurrentUserDiaries: () => {
    const { diaries, currentUserId } = get();
    if (!currentUserId) return [];
    return diaries.filter((diary) => diary.user_id === currentUserId);
  },

  fetchDiaries: async () => {
    set((state) => ({
      loading: { ...state.loading, diaries: true },
      error: { ...state.error, diaries: null },
    }));

    try {
      const { data, error } = await supabase.from('diaries').select('*');

      if (error) throw error;

      set((state) => ({
        diaries: data || [],
        loading: { ...state.loading, diaries: false },
      }));
    } catch (error: any) {
      set((state) => ({
        loading: { ...state.loading, diaries: false },
        error: { ...state.error, diaries: error.message },
      }));
    }
  },

  fetchMarkers: async (userId: string) => {
    set((state) => ({
      loading: { ...state.loading, markers: true },
      error: { ...state.error, markers: null },
    }));

    try {
      const { data, error } = await supabase
        .from('markers')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;

      set((state) => ({
        markers: data || [],
        loading: { ...state.loading, markers: false },
      }));
    } catch (error: any) {
      console.error('마커 데이터 로드 오류:', error.message);

      set((state) => ({
        loading: { ...state.loading, markers: false },
        error: { ...state.error, markers: error.message },
      }));
    }
  },

  fetchProfiles: async () => {
    set((state) => ({
      loading: { ...state.loading, profiles: true },
      error: { ...state.error, profiles: null },
    }));

    try {
      const { data, error } = await supabase.from('profiles').select('*');

      if (error) throw error;

      set((state) => ({
        profiles: data || [],
        loading: { ...state.loading, profiles: false },
      }));
    } catch (error: any) {
      console.error('프로필 데이터 로드 오류:', error.message);

      set((state) => ({
        loading: { ...state.loading, profiles: false },
        error: { ...state.error, profiles: error.message },
      }));
    }
  },

  fetchAllTables: async (userId: string) => {
    const { fetchDiaries, fetchMarkers, fetchProfiles } = get();

    await Promise.all([
      fetchDiaries(),
      fetchMarkers(userId),
      fetchProfiles(userId),
    ]);
  },
}));

export default useTableStore;
