import { create } from 'zustand';
import supabase from '@/utils/supabase';
import { Database } from '@/types/database.types';
import { persist, createJSONStorage } from 'zustand/middleware';

export type Diary = Database['public']['Tables']['diaries']['Insert'];
//사용 제외할 데이터 사용 양식
// type DiaryPayload = Omit<Diary, 'user_id' | 'created_at' | 'updated_at'>;

export type Marker = Database['public']['Tables']['markers']['Insert'];
// type MarkerPayload = Omit<Marker, 'created_at'>;

export type Profile = Database['public']['Tables']['profiles']['Insert'];
// type Profileload = Omit<Profile, 'created_at'>;

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

  subscribeToPublicDiaries: () => void;
  unsubscribeFromPublicDiaries: () => void;

  fetchCurrentUserData: () => Promise<void>;
  fetchDiaries: () => Promise<void>;
  fetchPublicDiaries: () => Promise<void>;
  fetchMarkers: (userId: string) => Promise<void>;
  fetchProfiles: (userId: string) => Promise<void>;
  fetchAllTables: (userId: string) => Promise<void>;
  addDiary: (diary: Diary) => void;
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

      addMarker: (marker: Marker) => {
        set((state) => ({
          markers: [...state.markers, marker],
        }));
      },

      addDiary: (diary: Diary) => {
        set((state) => ({
          diaries: [...state.diaries, diary],
        }));
      },

      fetchCurrentUserData: async () => {
        try {
          const { data } = await supabase.auth.getUser();
          const user = data?.user;

          if (!user) {
            return;
          }

          const userId = user.id;
          set({ currentUserId: userId });

          const { fetchAllTables, subscribeToPublicDiaries } = get();
          await fetchAllTables(userId);

          subscribeToPublicDiaries();
        } catch (error: any) {
          console.error('사용자 데이터 가져오기 실패:', error.message);
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
        } catch (error: any) {
          set((state) => ({
            loading: { ...state.loading, diaries: false },
            error: { ...state.error, diaries: error.message },
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
        } catch (error: any) {
          set((state) => ({
            loading: { ...state.loading, publicDiaries: false },
            error: { ...state.error, publicDiaries: error.message },
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
    }),
    {
      name: 'diary-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useTableStore;
