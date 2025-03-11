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
  isLiked: boolean;
}

interface DiaryState {
  diaries: DiaryEntry[];
  addDiary: (newDiary: DiaryEntry) => void;
  removeDiary: (title: string) => void;
  toggleLike: (title: string) => void;
}

const useDiaryStore = create<DiaryState>()(
  persist(
    (set) => ({
      diaries: [],

      addDiary: (newDiary: DiaryEntry) =>
        set((state: DiaryState) => ({
          diaries: [...state.diaries, { ...newDiary, isLiked: false }],
        })),

      removeDiary: (title: string) =>
        set((state: DiaryState) => ({
          diaries: state.diaries.filter((diary) => diary.title !== title),
        })),

      toggleLike: (title: string) =>
        set((state: DiaryState) => ({
          diaries: state.diaries.map((diary) =>
            diary.title === title
              ? { ...diary, isLiked: !diary.isLiked }
              : diary
          ),
        })),
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
