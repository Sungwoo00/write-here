import { create } from 'zustand';
import supabase from '@/utils/supabase';
import { Database } from '@/types/database.types';
import { persist, createJSONStorage } from 'zustand/middleware';

export type Diary = Database['public']['Tables']['diaries']['Insert'];
export type Marker = Database['public']['Tables']['markers']['Insert'];
export type Profile = Database['public']['Tables']['profiles']['Insert'];

interface PostgrestError {
  message: string;
}

interface TableState {
  diaries: Diary[];
  publicDiaries: Diary[];
  markers: Marker[];
  profiles: Profile[];
  loading: {
    diaries: boolean;
    publicDiaries: boolean;
    markers: boolean;
    profiles: boolean;
  };
  subscriptions: {
    publicDiaries: null | (() => void);
  };
  error: {
    diaries: string | null;
    publicDiaries: string | null;
    markers: string | null;
    profiles: string | null;
  };
  currentUserId: string | null;
  diarySearchKeyword: string;
  setDiarySearchKeyword: (keyword: string) => void;

  subscribeToPublicDiaries: () => void;
  unsubscribeFromPublicDiaries: () => void;

  fetchCurrentUserData: () => Promise<void>;
  fetchDiaries: () => Promise<void>;
  fetchPublicDiaries: () => Promise<void>;
  fetchMarkers: (userId: string) => Promise<void>;
  fetchProfiles: (userId: string) => Promise<void>;
  fetchAllTables: (userId: string) => Promise<void>;

  addDiary: (diary: Diary) => void;
  updateDiary: (diary: Diary) => void;
  removeDiary: (diaryId: number) => void;
  addMarker: (marker: Marker) => void;
}

const useTableStore = create<TableState>()(
  persist(
    (set, get) => ({
      subscriptions: {
        publicDiaries: null,
      },

      diaries: [],
      publicDiaries: [],
      markers: [],
      profiles: [],
      loading: {
        diaries: false,
        publicDiaries: false,
        markers: false,
        profiles: false,
      },
      error: {
        diaries: null,
        publicDiaries: null,
        markers: null,
        profiles: null,
      },
      currentUserId: null,
      diarySearchKeyword: '',
      setDiarySearchKeyword: (keyword: string) =>
        set(() => ({ diarySearchKeyword: keyword })),

      updateDiary: (updatedDiary) =>
        set((state) => ({
          diaries: state.diaries.map((d) =>
            d.diary_id === updatedDiary.diary_id ? updatedDiary : d
          ),
        })),

      removeDiary: (diaryId) =>
        set((state) => ({
          diaries: state.diaries.filter((d) => d.diary_id !== diaryId),
        })),

      addDiary: (diary) =>
        set((state) => ({
          diaries: [...state.diaries, diary],
        })),

      addMarker: (marker) =>
        set((state) => ({
          markers: [...state.markers, marker],
        })),

      fetchCurrentUserData: async () => {
        try {
          const { data } = await supabase.auth.getUser();
          const user = data?.user;

          if (!user) return;

          const userId = user.id;
          set({ currentUserId: userId });

          const { fetchAllTables, subscribeToPublicDiaries } = get();
          await fetchAllTables(userId);
          subscribeToPublicDiaries();
        } catch (error: unknown) {
          const err = error as PostgrestError;
          console.error('사용자 데이터 가져오기 실패:', err.message);
        }
      },

      fetchDiaries: async () => {
        set((state) => ({
          loading: { ...state.loading, diaries: true },
          error: { ...state.error, diaries: null },
        }));

        try {
          const { currentUserId } = get();
          if (!currentUserId) {
            set((state) => ({
              diaries: [],
              loading: { ...state.loading, diaries: false },
            }));
            return;
          }

          const { data, error } = await supabase
            .from('diaries')
            .select('*')
            .eq('user_id', currentUserId);

          if (error) throw error;

          set((state) => ({
            diaries: data || [],
            loading: { ...state.loading, diaries: false },
          }));
        } catch (error: unknown) {
          const err = error as PostgrestError;
          set((state) => ({
            loading: { ...state.loading, diaries: false },
            error: { ...state.error, diaries: err.message },
          }));
        }
      },

      fetchPublicDiaries: async () => {
        set((state) => ({
          loading: { ...state.loading, publicDiaries: true },
          error: { ...state.error, publicDiaries: null },
        }));

        try {
          const { data, error } = await supabase
            .from('diaries')
            .select('*')
            .eq('is_public', true);

          if (error) throw error;

          set((state) => ({
            publicDiaries: data || [],
            loading: { ...state.loading, publicDiaries: false },
          }));
        } catch (error: unknown) {
          const err = error as PostgrestError;
          set((state) => ({
            loading: { ...state.loading, publicDiaries: false },
            error: { ...state.error, publicDiaries: err.message },
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
        } catch (error: unknown) {
          const err = error as PostgrestError;
          console.error('마커 데이터 로드 오류:', err.message);
          set((state) => ({
            loading: { ...state.loading, markers: false },
            error: { ...state.error, markers: err.message },
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
        } catch (error: unknown) {
          const err = error as PostgrestError;
          console.error('프로필 데이터 로드 오류:', err.message);
          set((state) => ({
            loading: { ...state.loading, profiles: false },
            error: { ...state.error, profiles: err.message },
          }));
        }
      },

      fetchAllTables: async (userId: string) => {
        const {
          fetchDiaries,
          fetchPublicDiaries,
          fetchMarkers,
          fetchProfiles,
        } = get();

        await Promise.all([
          fetchDiaries(),
          fetchPublicDiaries(),
          fetchMarkers(userId),
          fetchProfiles(userId),
        ]);
      },

      subscribeToPublicDiaries: () => {
        const { unsubscribeFromPublicDiaries } = get();
        unsubscribeFromPublicDiaries();

        const subscription = supabase
          .channel('public_diaries_changes')
          .on(
            'postgres_changes',
            {
              event: '*',
              schema: 'is_public',
              table: 'diaries',
              filter: 'is_public=eq.true',
            },
            () => {
              const { fetchPublicDiaries } = get();
              fetchPublicDiaries();
            }
          )
          .subscribe();

        set((state) => ({
          subscriptions: {
            ...state.subscriptions,
            publicDiaries: () => subscription.unsubscribe(),
          },
        }));
      },

      unsubscribeFromPublicDiaries: () => {
        const { subscriptions } = get();
        if (subscriptions.publicDiaries) {
          subscriptions.publicDiaries();
          set((state) => ({
            subscriptions: {
              ...state.subscriptions,
              publicDiaries: null,
            },
          }));
        }
      },
    }),
    {
      name: 'diary-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useTableStore;
