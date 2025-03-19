import { create } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';

interface DiaryEntry {
  title: string;
  place: string;
  place_type: string;
  content: string;
  post_date: string;
  tag: string[];
  img: File[];
  like_count: number;
}

interface DiaryState {
  diaries: DiaryEntry[];
  setDiaries: (newDiaries: DiaryEntry[]) => void;
  removeDiary: (title: string) => void;
  toggleLike: (title: string) => void;
}

const useDiaryStore = create<DiaryState>()(
  persist(
    (set, get) => ({
      diaries: [],

      setDiaries: (newDiaries: DiaryEntry[]) =>
        set(() => ({
          diaries: newDiaries,
        })),

      removeDiary: (title: string) =>
        set((state: DiaryState) => ({
          diaries: state.diaries.filter((diary) => diary.title !== title),
        })),

      toggleLike: (title: string) => {
        set((state: DiaryState) => ({
          diaries: state.diaries.map((diary) =>
            diary.title === title
              ? { ...diary, like_count: diary.like_count + 1 }
              : diary
          ),
        }));
      },
    }),
    {
      name: 'diary-storage',
      getStorage: () => localStorage,
      serialize: (state: DiaryState) => JSON.stringify(state),
      deserialize: (str: string): DiaryState => JSON.parse(str) as DiaryState,
    } as PersistOptions<DiaryState>
  )
);

export default useDiaryStore;
